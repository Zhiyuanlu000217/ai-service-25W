require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3080;

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());

// Generate description endpoint
app.post('/api/generate-description', async (req, res) => {
    try {
        const { keywords } = req.body;
        
        if (!keywords) {
            return res.status(400).json({ error: 'Keywords are required' });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a product description generator. Generate concise, engaging descriptions between 20-30 words."
                },
                {
                    role: "user",
                    content: `Generate a product description for: ${keywords}`
                }
            ],
            stream: true
        });

        let description = '';
        for await (const chunk of completion) {
            if (chunk.choices[0]?.delta?.content) {
                description += chunk.choices[0].delta.content;
                // Send each chunk to the client
                res.write(chunk.choices[0].delta.content);
            }
        }
        res.end();
    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({ error: 'Failed to generate description' });
    }
});

// Generate image endpoint
app.post('/api/generate-image', async (req, res) => {
    try {
        const { keywords } = req.body;
        
        if (!keywords) {
            return res.status(400).json({ error: 'Keywords are required' });
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Create a professional product image for: ${keywords}. The image should be high quality and suitable for e-commerce.`,
            n: 1,
            size: "1024x1024",
        });

        res.json({ imageUrl: response.data[0].url });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 