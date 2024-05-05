import { Configuration, OpenAIApi } from 'openai-edge'
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function generateImagePrompt(name: string) {

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an creative and helpful AI assistance capable of generating interesting thumnail descrpitons for my notes. Your output will be fed into DALLE API to generate a thumbnail.The description should be minimalistic and flat styled.'
                },
                {
                    role: 'user',
                    content: `Please generate a thumbnail description for my notebook titles ${name}`
                }
            ],
        });
        const data = await response.json();
        const image_description = data.choices[0].message.content
        return image_description as string;
    } catch (error) {
        console.error(error);
        return error;
    }

}

export async function generateImage(image_description : string) {
    
}