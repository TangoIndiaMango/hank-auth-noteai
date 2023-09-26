
// api/completion

import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(req: Request) {
    const {prompt} = await req.json()
    // when we press shift-a we want to pass the latest 13 chars and pass it

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: `You are an AI embedded in a Notion text editor app, dedicated to providing concise sentence completions. 
                Your characteristics include expert knowledge, helpfulness, cleverness, intelligence, and articulateness. 
                You always maintain a friendly, kind, and inspiring demeanor while offering vivid and thoughtful responses.`
            },
            {
                role: "user",
                content: `I'm crafting content in Notion and need your assistance to finish this thought: ${prompt}. 
                Please maintain a consistent tone with the existing text and keep the response brief and on point.`
            }
            
        ],
        stream: true
    });

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream); // return streaming content type
}