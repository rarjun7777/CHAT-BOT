# ChatGPT Voice Bot

A modern, voice-enabled chatbot powered by OpenAI's ChatGPT API. This web application allows users to interact with an AI assistant using voice commands or text input.

## Features

- 🎤 Voice input using Web Speech API
- 🔊 Text-to-speech responses
- 💬 Text input option
- 🎨 Modern, dark-themed UI
- 📱 Fully responsive design
- 🔒 Secure API key storage (browser localStorage)
- ⚡ Real-time interaction


## Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Safari, or Firefox)
- An OpenAI ChatGPT API key from [OpenAI Platform](https://platform.openai.com/account/api-keys)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chatgpt-voice-bot.git
cd chatgpt-voice-bot
```

Serve the files using any static web server:

Use Terminal:
```bash
npm run dev 
```

Open your browser and navigate to http://localhost:3000
Enter your ChatGPT API key when prompted

## Usage

- Click the microphone button to start voice input
- Speak your question clearly
- Wait for the AI response
- The response will be displayed and spoken aloud
- Alternatively, type your question in the text input

## Security Note
The API key is stored in browser localStorage. For production use, consider:
- Implementing a backend proxy to hide the API key
- Using environment variables with a build process
- Adding rate limiting and usage controls

## Browser Compatibility
- Chrome/Edge: Full support
- Safari: Full support (iOS 14.5+)
- Firefox: Text input only (no speech recognition)

## Technologies Used
- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript (ES6+)
- OpenAI ChatGPT API
- Web Speech API
- Speech Synthesis API





The app will prompt users for their ChatGPT API key on first visit, which is stored locally in their browser.
