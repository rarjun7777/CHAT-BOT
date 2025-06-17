export class ChatGPTAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.endpoint = 'https://auxods.openai.azure.com';
        this.deployment = 'gpt-4o-mini';
        this.apiUrl = `${this.endpoint}/openai/deployments/${this.deployment}/chat/completions?api-version=2023-03-15-preview`;
    }

    async generateResponse(prompt) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': this.apiKey
                },
                body: JSON.stringify({
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 512,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API Error Response:', errorData);
                throw new Error(`API request failed: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            }
            throw new Error('No response generated from API');
        } catch (error) {
            console.error('Azure OpenAI API Error:', error);
            throw new Error(`Failed to get response: ${error.message}`);
        }
    }
} 