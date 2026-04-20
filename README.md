<div align="center">

# 🚀 AI Code Assistant

### 🧠 Explain • Debug • Optimize Code using AI + RAG

[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js)]
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)]
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blue?style=for-the-badge)]
[![RAG](https://img.shields.io/badge/RAG-Contextual%20AI-black?style=for-the-badge)]

</div>

---

## 📌 Overview

AI Code Assistant is a full-stack AI application that helps developers:

- 🔍 Understand code  
- 🐛 Detect bugs  
- ⚡ Optimize performance  

It uses **Retrieval-Augmented Generation (RAG)** to analyze code context intelligently instead of relying on simple prompts.

---

## ✨ Features

- 🧠 **Explain Code** — Step-by-step breakdown  
- 🐛 **Bug Detection** — Find logical & syntax issues  
- ⚡ **Optimization Suggestions** — Improve performance & readability  
- 🔗 **GitHub Repo Analysis** — Analyze public repositories  
- 💬 **Modern UI** — Clean, developer-friendly interface  
- ⚡ **Fast API Integration** using OpenRouter  

---

## 🧠 Architecture

```
User Input (Code / Repo URL)
        ↓
Code Chunking
        ↓
Context Retrieval (RAG)
        ↓
LLM (OpenRouter API)
        ↓
Structured AI Response
```

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js

### AI / RAG
- OpenRouter API
- LangChain Text Splitter
- Custom Context Retrieval Logic

### APIs
- GitHub REST API

---

## 📸 Screenshots

![Explain Mode](./screenshots/explain.png)
![Debug Mode](./screenshots/debug.png)
![Optimize Mode](./screenshots/optimize.png)
![Repo Analysis](./screenshots/repo-analysis.png)

---

## 🚀 Live Demo

👉 https://your-vercel-link.vercel.app

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/ai-code-assistant.git
cd ai-code-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
OPENROUTER_API_KEY=your_openrouter_key
GITHUB_TOKEN=your_github_token
```

### 4. Run the project

```bash
npm run dev
```

Open:
```
http://localhost:3000
```

---

## 📈 Key Highlights

- 🚀 Built AI-powered developer tool using RAG  
- 📊 Improves response accuracy using contextual retrieval  
- ⚡ Designed full-stack architecture from scratch  
- 🧠 Implements real-world AI system design  

---

## 🎯 Use Cases

- Developers debugging code  
- Students learning programming  
- Code review & improvement  
- Understanding large codebases  

---

## 🔐 Security Note

- API keys are stored using environment variables  
- `.env.local` is not pushed to GitHub  

---

## 📬 Contact

👤 Piyush Ratn  
🔗 LinkedIn: https://linkedin.com/in/piyush-ratn  
💻 GitHub: https://github.com/Piyushratn  

---

<div align="center">

⭐ If you found this project useful, consider starring the repo!

</div>
