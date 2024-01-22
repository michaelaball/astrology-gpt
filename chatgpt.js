import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const chatGptInterpret = async (input) => {
    const client = axios.create({
        headers: {
            Authorization: "Bearer " + process.env.OPENAI_AUTH,
        },
    });

    const params = {
        messages: [{
            role: 'user',
            content: input
        }],
        model: "gpt-4-1106-preview",
        temperature: 0,
    };

    const response = await client
        .post("https://api.openai.com/v1/chat/completions", params)
    return response.data.choices[0].message.content
};

export default {
    chatGptInterpret
};
