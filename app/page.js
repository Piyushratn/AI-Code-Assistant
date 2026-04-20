"use client";

import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [response, setResponse] = useState("");
  const [mode, setMode] = useState("debug");
  const [loading, setLoading] = useState(false);

  const analyzeCode = async () => {
    if (!code.trim() && !repoUrl.trim()) {
      alert("Please paste code or a GitHub repo URL first");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, mode, repoUrl }),
      });

      const data = await res.json();
      setResponse(data.result || "No response from AI");
    } catch (error) {
      setResponse("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1120] text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm text-blue-400 font-medium tracking-wide uppercase">
            AI Code Assistant
          </p>
          <h1 className="text-4xl font-bold mt-2">
            Explain, Debug, and Improve Code
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Input</h2>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option value="explain">Explain</option>
                <option value="debug">Debug</option>
                <option value="optimize">Optimize</option>
              </select>
            </div>

            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Optional: Paste GitHub repo URL here..."
              className="w-full mb-4 bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-sm text-gray-200 focus:outline-none"
            />

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Or paste your code here..."
              className="w-full h-[360px] bg-[#0f172a] border border-gray-700 rounded-xl p-4 text-sm text-gray-200 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={analyzeCode}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 px-5 py-3 rounded-xl font-medium transition"
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>

              <button
                onClick={() => {
                  setCode("");
                  setRepoUrl("");
                  setResponse("");
                }}
                className="bg-[#1f2937] hover:bg-[#273449] px-5 py-3 rounded-xl font-medium transition"
              >
                Clear
              </button>
            </div>
          </section>

          <section className="bg-[#111827] border border-gray-800 rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">AI Analysis</h2>

            <div className="h-[500px] bg-[#0f172a] border border-gray-700 rounded-xl p-4 overflow-y-auto">
              {!loading && !response && (
                <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                  Your AI response will appear here.
                </div>
              )}

              {loading && (
                <div className="h-full flex items-center justify-center text-blue-400">
                  AI is analyzing...
                </div>
              )}

              {!loading && response && (
                <pre className="whitespace-pre-wrap text-gray-200 text-sm leading-7">
                  {response}
                </pre>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}