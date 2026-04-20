import { splitCodeIntoChunks, simpleKeywordRetrieve } from "@/lib/rag";
import { parseGitHubRepoUrl, fetchGitHubFile } from "@/lib/github";

export async function POST(req) {
  try {
    const body = await req.json();
    const { code, mode, repoUrl } = body;

    let finalCode = code || "";

    if (repoUrl && repoUrl.trim()) {
      const parsed = parseGitHubRepoUrl(repoUrl);

      if (!parsed) {
        return Response.json({
          result: "Invalid GitHub repository URL.",
        });
      }

      const token = process.env.GITHUB_TOKEN || "";

      const readme = await fetchGitHubFile(parsed.owner, parsed.repo, "README.md", token);
      const pkg = await fetchGitHubFile(parsed.owner, parsed.repo, "package.json", token);

      finalCode = `
FILE: README.md
${readme || "Not found"}

-------------------

FILE: package.json
${pkg || "Not found"}
      `;
    }

    if (!finalCode || !finalCode.trim()) {
      return Response.json({
        result: "Please provide some code or a GitHub repo URL first.",
      });
    }

    const chunks = await splitCodeIntoChunks(finalCode);
    const relevantChunks = simpleKeywordRetrieve(chunks, mode);
    const context = relevantChunks.join("\n\n---\n\n");

    const promptMap = {
      explain: `You are a senior software engineer.

Use only the context below.
Explain the code or repo clearly.

Answer format:
1. Summary
2. Step-by-step explanation
3. Important observations

Context:
${context}`,

      debug: `You are a senior software engineer.

Use only the context below.
Find bugs, issues, weak architecture, or bad practices.

Answer format:
1. Summary
2. Issues Found
3. Fixes
4. Improved Code or Suggestions

Context:
${context}`,

      optimize: `You are a senior software engineer.

Use only the context below.
Suggest performance, readability, and architecture improvements.

Answer format:
1. Summary
2. Improvement Areas
3. Suggestions
4. Improved Code or Suggestions

Context:
${context}`,
    };

    const finalPrompt = promptMap[mode] || promptMap.debug;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-OpenRouter-Title": "AI Code Assistant",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: finalPrompt,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({
        result: data?.error?.message || "Something went wrong while calling the AI API.",
      });
    }

    return Response.json({
      result: data?.choices?.[0]?.message?.content || "No response from AI.",
    });
  } catch (error) {
    return Response.json({
      result: "Server Error: " + error.message,
    });
  }
}