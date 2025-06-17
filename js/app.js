import { ChatGPTAPI } from './chatgpt.js';
import { SpeechHandler } from './speech.js';

class ChatBot {
    constructor() {
        this.chatgptAPI = null;
        this.speechHandler = new SpeechHandler();
        this.elements = this.initializeElements();
        this.isProcessing = false;
        
        this.initializeApp();
    }

    initializeElements() {
        return {
            chatMessages: document.getElementById('chat-messages'),
            textInput: document.getElementById('text-input'),
            sendButton: document.getElementById('send-button'),
            voiceButton: document.getElementById('voice-button'),
            statusText: document.getElementById('status-text'),
            statusIndicator: document.getElementById('status-indicator'),
            apiKeyModal: document.getElementById('api-key-modal'),
            apiKeyInput: document.getElementById('api-key-input'),
            saveApiKeyButton: document.getElementById('save-api-key'),
            clearHistoryButton: document.getElementById('clear-history')
        };
    }

    async initializeApp() {
        // Check for stored API key
        const storedApiKey = localStorage.getItem('azure_openai_api_key');
        if (storedApiKey) {
            this.chatgptAPI = new ChatGPTAPI(storedApiKey);
            this.setupEventListeners();
            await this.loadChatHistory();
        } else {
            this.showApiKeyModal();
        }
    }

    showApiKeyModal() {
        this.elements.apiKeyModal.classList.add('show');
        this.elements.saveApiKeyButton.addEventListener('click', async () => {
            const apiKey = this.elements.apiKeyInput.value.trim();
            if (apiKey) {
                localStorage.setItem('azure_openai_api_key', apiKey);
                this.chatgptAPI = new ChatGPTAPI(apiKey);
                this.elements.apiKeyModal.classList.remove('show');
                this.setupEventListeners();
                await this.loadChatHistory();
            }
        });
        // Allow Enter key to save
        this.elements.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.elements.saveApiKeyButton.click();
            }
        });
    }

    setupEventListeners() {
        // Voice button click
        this.elements.voiceButton.addEventListener('click', () => {
            this.handleVoiceInput();
        });

        // Text input enter key
        this.elements.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isProcessing) {
                this.handleTextInput();
            }
        });

        // Send button click
        this.elements.sendButton.addEventListener('click', () => {
            if (!this.isProcessing) {
                this.handleTextInput();
            }
        });

        // Speech recognition callbacks
        this.speechHandler.onResult = (transcript) => {
            console.log('Speech recognition result:', transcript);
            this.processUserInput(transcript);
        };

        this.speechHandler.onError = (error) => {
            console.error('Speech recognition error:', error);
            this.updateStatus('Error: ' + error, 'error');
            this.addMessage('Sorry, I had trouble understanding your voice. Please try again or type your message.', 'bot');
        };

        this.speechHandler.onStart = () => {
            this.elements.voiceButton.classList.add('recording');
            this.updateStatus('Listening...', 'loading');
        };

        this.speechHandler.onEnd = () => {
            this.elements.voiceButton.classList.remove('recording');
            this.updateStatus('Processing...', 'loading');
        };

        // Clear history button
        this.elements.clearHistoryButton.addEventListener('click', async () => {
            try {
                await fetch('/api/chat-history', { method: 'DELETE' });
                this.elements.chatMessages.innerHTML = '';
                // Add initial bot message
                this.addMessage("Hello! I'm your AI assistant powered by ChatGPT. Click the microphone button and ask me anything!", 'bot');
            } catch (err) {
                alert('Failed to clear history.');
            }
        });
    }

    handleVoiceInput() {
        if (this.isProcessing) return;
        
        if (this.speechHandler.isListening) {
            this.speechHandler.stop();
        } else {
            this.speechHandler.start();
        }
    }

    handleTextInput() {
        const text = this.elements.textInput.value.trim();
        if (text) {
            this.processUserInput(text);
            this.elements.textInput.value = '';
        }
    }

    async processUserInput(input) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        this.elements.sendButton.disabled = true;
        
        // Add user message
        this.addMessage(input, 'user');
        await this.saveChat('user', input, '', new Date());
        
        // Show typing indicator
        const typingId = this.showTypingIndicator();
        
        try {
            this.updateStatus('Thinking...', 'loading');
            
            // Get response from ChatGPT
            const response = await this.chatgptAPI.generateResponse(input);
            
            // Remove typing indicator
            this.removeTypingIndicator(typingId);
            
            // Add bot response
            this.addMessage(response, 'bot');
            await this.saveChat('bot', input, response, new Date());
            
            // Speak the response
            this.speechHandler.speak(response);
            
            this.updateStatus('Ready', 'success');
        } catch (error) {
            console.error('Error processing input:', error);
            this.removeTypingIndicator(typingId);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
            await this.saveChat('bot', input, 'Sorry, I encountered an error. Please try again.', new Date());
            this.updateStatus('Error occurred', 'error');
        } finally {
            this.isProcessing = false;
            this.elements.sendButton.disabled = false;
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${this.escapeHtml(content)}</p>`;
        
        messageDiv.appendChild(contentDiv);
        this.elements.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const id = Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = `typing-${id}`;
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.elements.chatMessages.appendChild(typingDiv);
        this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        return id;
    }

    removeTypingIndicator(id) {
        const typingDiv = document.getElementById(`typing-${id}`);
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    updateStatus(text, type) {
        this.elements.statusText.textContent = text;
        this.elements.statusIndicator.className = 'status-indicator';
        
        if (type === 'loading') {
            this.elements.statusIndicator.classList.add('loading');
        } else if (type === 'error') {
            this.elements.statusIndicator.classList.add('error');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async saveChat(user, message, response, timestamp) {
        try {
            await fetch('/api/chat-history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user, message, response, timestamp })
            });
        } catch (err) {
            console.error('Failed to save chat:', err);
        }
    }

    async loadChatHistory() {
        try {
            const res = await fetch('/api/chat-history');
            const history = await res.json();
            this.elements.chatMessages.innerHTML = '';
            for (const chat of history) {
                if (chat.user === 'user') {
                    this.addMessage(chat.message, 'user');
                } else if (chat.user === 'bot') {
                    this.addMessage(chat.response, 'bot');
                }
            }
        } catch (err) {
            console.error('Failed to load chat history:', err);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
});