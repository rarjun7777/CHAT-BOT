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

## Demo

[Live Demo Link] - Add your deployment URL here

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

Using Python:
```bash
python -m http.server 8000
```
Using Node.js:
```bash
npx http-server -p 8000
```

Open your browser and navigate to http://localhost:8000
Enter your ChatGPT API key when prompted

### Deployment
This is a static website that can be deployed to any hosting service:

**Vercel**
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` in the project directory
- Follow the prompts

**Netlify**
- Drag and drop the project folder to Netlify Drop
- Your site will be live instantly

**GitHub Pages**
- Push code to GitHub
- Go to Settings > Pages
- Select source branch and save

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

## License
MIT License - see LICENSE file for details

## Contributing
- Fork the repository
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## Support
For issues or questions, please open an issue on GitHub.

## Deployment Instructions

### For Vercel:
1. Create account at vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in project directory
4. Follow prompts to deploy

### For Netlify:
1. Go to app.netlify.com/drop
2. Drag and drop your project folder
3. Site will be live immediately

### For GitHub Pages:
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main)
4. Save and wait for deployment

The app will prompt users for their ChatGPT API key on first visit, which is stored locally in their browser.