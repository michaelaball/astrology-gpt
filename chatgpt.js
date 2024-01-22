import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const chatGptInterpret = async (input) => {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: input,
        max_tokens: 60
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
    });

    return response.data.choices[0].text.trim();
};

export default {
    chatGptInterpret
};
