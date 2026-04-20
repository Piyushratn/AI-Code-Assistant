export function parseGitHubRepoUrl(url) {
  try {
    const cleanUrl = url.replace("https://github.com/", "").replace(/\/$/, "");
    const parts = cleanUrl.split("/");
    if (parts.length < 2) return null;

    return {
      owner: parts[0],
      repo: parts[1],
    };
  } catch {
    return null;
  }
}

export async function fetchGitHubFile(owner, repo, path, token = "") {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      }
    : {
        Accept: "application/vnd.github+json",
      };

  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    { headers }
  );

  if (!res.ok) return null;

  const data = await res.json();

  if (data.content) {
    return atob(data.content.replace(/\n/g, ""));
  }

  return null;
}