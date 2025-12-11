
import { GoogleGenAI, Type } from "@google/genai";
import { AIPair, Language, AIConfig } from "../types";

// Default Env Key for fallback
const ENV_API_KEY = process.env.API_KEY || ''; 

export const DEFAULT_AI_CONFIGS: AIConfig[] = [
    {
        id: 'default-gemini',
        name: 'Gemini (Default)',
        provider: 'google',
        apiKey: '',
        modelName: 'gemini-2.5-flash'
    },
    {
        id: 'deepseek-v3',
        name: 'DeepSeek V3',
        provider: 'deepseek',
        apiKey: '',
        baseUrl: 'https://api.deepseek.com',
        modelName: 'deepseek-chat'
    },
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'openai',
        apiKey: '',
        modelName: 'gpt-4o'
    },
    {
        id: 'local-ollama',
        name: 'Ollama (Local)',
        provider: 'ollama',
        apiKey: 'ollama',
        baseUrl: 'http://localhost:11434/v1',
        modelName: 'llama3'
    }
];

const getSystemPrompt = (count: number, topic: string, lang: Language) => {
    const languagePrompt = lang === 'zh' ? 'Chinese (Simplified)' : 'English';
    return `Generate exactly ${count} pairs of related (word, emoji) based on the topic: "${topic}".
    Language: ${languagePrompt}.
    Rules:
    1. Words must be short (max 2 words).
    2. Emojis must be single unicode characters.
    3. Return strictly valid JSON: { "pairs": [{ "word": "X", "emoji": "Y" }] }`;
};

// Fallback dictionary for offline/error modes in Custom Mode
const FALLBACK_DATA: AIPair[] = [
    { word: "Pizza", emoji: "🍕" }, { word: "Burger", emoji: "🍔" },
    { word: "Fries", emoji: "🍟" }, { word: "Hotdog", emoji: "🌭" },
    { word: "Sushi", emoji: "🍣" }, { word: "Ramen", emoji: "🍜" },
    { word: "Taco", emoji: "🌮" }, { word: "Donut", emoji: "🍩" },
    { word: "Cookie", emoji: "🍪" }, { word: "Cake", emoji: "🍰" },
    { word: "Coffee", emoji: "☕" }, { word: "Beer", emoji: "🍺" },
    { word: "Wine", emoji: "🍷" }, { word: "Cocktail", emoji: "🍹" },
    { word: "Ice Cream", emoji: "🍦" }, { word: "Chocolate", emoji: "🍫" }
];

const fetchOpenAICompatible = async (config: AIConfig, systemPrompt: string): Promise<AIPair[]> => {
    const apiKey = config.apiKey || ENV_API_KEY;
    
    let baseUrl = config.baseUrl;
    if (!baseUrl) {
        if (config.provider === 'openai') baseUrl = 'https://api.openai.com/v1';
        if (config.provider === 'deepseek') baseUrl = 'https://api.deepseek.com';
        if (config.provider === 'ollama') baseUrl = 'http://localhost:11434/v1';
    }
    baseUrl = baseUrl?.replace(/\/$/, '');

    try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: config.modelName,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Generate JSON now." }
                ],
                temperature: 0.8,
                response_format: { type: "json_object" } 
            })
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);
        const data = await response.json();
        const content = data.choices[0].message.content;
        const parsed = JSON.parse(content);
        return parsed.pairs || [];
    } catch (e) {
        console.error("AI API Error:", e);
        throw e;
    }
};

const fetchGoogleGenAI = async (config: AIConfig, count: number, topic: string, lang: Language): Promise<AIPair[]> => {
    const apiKey = config.apiKey || ENV_API_KEY;
    if (!apiKey) throw new Error("No API Key");

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Topic: ${topic}. Count: ${count}. Lang: ${lang}. Return JSON pairs of word and emoji.`;

    try {
        const response = await ai.models.generateContent({
            model: config.modelName || 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        pairs: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    word: { type: Type.STRING },
                                    emoji: { type: Type.STRING },
                                },
                                required: ["word", "emoji"]
                            }
                        }
                    }
                }
            }
        });

        if (response.text) {
            return JSON.parse(response.text).pairs;
        }
        return [];
    } catch (e) {
        console.error("Gemini API Error:", e);
        throw e;
    }
}

export const generateGamePairs = async (
    topic: string, 
    count: number, 
    lang: Language, 
    config: AIConfig
): Promise<AIPair[]> => {
    
    // Quick local fallback for testing or if user forces it
    if (topic.toLowerCase() === 'test' || topic === '测试') {
        return FALLBACK_DATA.slice(0, count);
    }

    try {
        let pairs: AIPair[] = [];
        
        if (config.provider === 'google') {
            pairs = await fetchGoogleGenAI(config, count, topic, lang);
        } else {
            const prompt = getSystemPrompt(count, topic, lang);
            pairs = await fetchOpenAICompatible(config, prompt);
        }

        if (!pairs || pairs.length === 0) throw new Error("Empty result from AI");
        return pairs.slice(0, count);

    } catch (error) {
        console.warn("Falling back to offline data due to error.", error);
        // Fallback: Return a slice of mock data so game continues
        return FALLBACK_DATA.slice(0, count);
    }
};
