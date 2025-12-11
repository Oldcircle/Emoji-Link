# 🧩 Emoji Link (表情连连看)

**Emoji Link** is a modern, AI-powered semantic memory game. Unlike traditional memory games that match identical images, Emoji Link challenges you to match **Words** with their corresponding **Emojis** (e.g., "Idea" ↔ "💡").

**Emoji Link** 是一款由 AI 驱动的现代语义记忆游戏。与传统匹配相同图片的记忆游戏不同，Emoji Link 需要你将 **单词** 与其对应的 **表情符号** 进行配对（例如 “灵感” ↔ “💡”）。

---

## ✨ Features (功能特性)

### 🎮 Game Modes (游戏模式)
1. **Adventure Mode (闯关模式):**
   - Play through curated, pre-defined levels with increasing difficulty.
   - **Offline Capable:** No AI API key required. Works completely locally.
   - **闯关模式：** 挑战精心设计的关卡，难度递增。无需联网或 API Key，完全本地运行。

2. **Custom Mode (自定义模式):**
   - **AI Generates Everything:** Enter *any* topic (e.g., "Harry Potter", "Quantum Physics", "80s Pop Music"), and the AI creates a unique deck for you.
   - **Adjustable Difficulty:** Choose grid sizes from 4x3 to 6x4.
   - **自定义模式：** 输入任意主题（如“哈利波特”、“量子物理”、“80年代流行乐”），AI 将为你生成独一无二的卡牌。支持调节网格大小。

### 🤖 AI Integration (AI 集成)
- **Multi-Provider Support:** Built-in support for **Google Gemini**, **OpenAI**, **DeepSeek**, and **Ollama** (Local LLM).
- **Flexible Configuration:** Change API Keys, Base URLs, and Model Names directly in the UI.
- **多模型支持：** 内置支持 Google Gemini, OpenAI, DeepSeek 和 Ollama (本地模型)。支持在界面中直接修改 API Key、API 地址和模型名称。

### 🎨 Modern UI (现代 UI)
- **Fluid Animations:** Smooth card flips, bounce effects, and victory celebrations.
- **Bilingual:** Full English and Chinese (Simplified) support.
- **Responsive:** Works perfectly on Desktop and Mobile.
- **流畅动画：** 丝滑的翻牌、回弹效果和胜利动画。全面支持中英文双语，完美适配移动端和桌面端。

---

## ⚙️ AI Configuration Guide (AI 配置指南)

Go to **Settings (设置) > Model Configuration (模型配置)** to set up your AI provider.

### 1. Google Gemini (Default)
- **Provider:** Google Gemini
- **API Key:** Your Google GenAI API Key.
- **Model:** `gemini-2.5-flash` (Recommended)

### 2. DeepSeek (深度求索)
- **Provider:** DeepSeek
- **API Key:** Your DeepSeek API Key.
- **Base URL:** `https://api.deepseek.com`
- **Model:** `deepseek-chat`

### 3. OpenAI (GPT-4o / GPT-3.5)
- **Provider:** OpenAI
- **API Key:** Your OpenAI API Key.
- **Base URL:** `https://api.openai.com/v1` (Default)
- **Model:** `gpt-4o` or `gpt-3.5-turbo`

### 4. Local Ollama (本地模型)
- **Provider:** Ollama
- **Base URL:** `http://localhost:11434/v1`
- **Model:** `llama3`, `mistral`, or `qwen2.5`
- **Note:** You must enable CORS in Ollama (`OLLAMA_ORIGINS="*" ollama serve`).
- **注意：** 需在启动 Ollama 时允许跨域请求。

---

## 🛠️ Installation & Development (安装与开发)

This project uses **React 19** and **Tailwind CSS**.

### Prerequisites (前置要求)
- Node.js (v18+)

### Steps (步骤)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/emoji-link.git
   cd emoji-link
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local server:**
   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📄 License

MIT License. Feel free to use and modify.