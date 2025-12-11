
# Emoji Link (表情连连看)

**Emoji Link** is an AI-powered semantic memory game. Unlike traditional games that match identical images, Emoji Link asks you to match **Words** with their corresponding **Emojis** (e.g., "Idea" ↔ "💡").

**Emoji Link** 是一款由 AI 驱动的语义记忆游戏。与传统匹配相同图片的游戏不同，你需要将 **单词** 与对应的 **表情符号** 进行配对（例如 “灵感” ↔ “💡”）。

## Features (功能特性)

- **Adventure Mode (闯关模式):** Progress through curated levels with increasing difficulty and varied themes (Animals, Space, Abstract, etc.).
  - **闯关模式：** 挑战精心设计的关卡，难度递增，主题丰富（动物、太空、抽象概念等）。
- **Custom Mode (自定义模式):** Quick play with your own rules. Choose difficulty and input any topic you like.
  - **自定义模式：** 快速开始，自定义难度和任意主题。
- **AI-Powered (AI 驱动):** Uses LLMs to generate infinite unique game pairs.
  - **AI 驱动：** 利用大语言模型生成无限的独特游戏配对。
- **Multi-Model Support (多模型支持):** Configure your own AI providers including OpenAI, DeepSeek, Ollama (Local), and Google Gemini.
  - **多模型支持：** 支持配置多种 AI 服务商，包括 OpenAI、DeepSeek、Ollama (本地) 和 Google Gemini。

## AI Configuration (模型配置)

You can configure the AI model in **Settings > Model Configuration**.
可以在 **设置 > 模型配置** 中添加和修改 AI 模型。

### Supported Providers (支持的服务商)

1. **Google Gemini (Default):**
   - Uses the official Google GenAI SDK.
   - Requires API Key if not using the built-in default.
   
2. **OpenAI / DeepSeek / Compatible:**
   - Supports any provider compatible with the OpenAI Chat API format (`/v1/chat/completions`).
   - **DeepSeek:** Set Base URL to `https://api.deepseek.com`.
   - **OpenAI:** Set Base URL to `https://api.openai.com/v1`.
   
3. **Local Ollama:**
   - Run LLMs locally on your machine.
   - Base URL: `http://localhost:11434/v1`
   - Model Name: `llama3`, `mistral`, etc.

## Setup & Run (安装与运行)

1. Clone or download the source code.
2. If bundling: `npm install` and `npm start` (standard React setup).
3. If using single-file HTML (via tools): Open `index.html`.

## Tech Stack (技术栈)

- **Frontend:** React 19, Tailwind CSS, Lucide Icons.
- **AI Integration:** Google GenAI SDK + Custom Fetch Adapter for OpenAI/DeepSeek.
- **State:** LocalStorage for persistence.
