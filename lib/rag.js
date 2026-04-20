import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function splitCodeIntoChunks(code) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 150,
  });

  const docs = await splitter.createDocuments([code]);
  return docs.map((doc) => doc.pageContent);
}

export function simpleKeywordRetrieve(chunks, mode) {
  if (!chunks || chunks.length === 0) return [];

  if (mode === "explain") {
    return chunks.slice(0, 3);
  }

  if (mode === "debug") {
    return chunks
      .filter((chunk) =>
        /if|else|for|while|return|function|try|catch|class|const|let|var/i.test(chunk)
      )
      .slice(0, 4);
  }

  if (mode === "optimize") {
    return chunks
      .filter((chunk) =>
        /for|while|map|filter|reduce|sort|loop|array|object/i.test(chunk)
      )
      .slice(0, 4);
  }

  return chunks.slice(0, 3);
}