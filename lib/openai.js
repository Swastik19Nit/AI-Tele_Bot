import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.trim(),
});

console.log(process.env.OPENAI_API_KEY);
export async function generateImage(prompt) {
  try {
  
    const response = await openai.images.generate({
      model:'dall-e-2',
      prompt:prompt,
      n: 1, 
      size: '256x256', 
    });
    console.log(response.data[0].url)
    const imageUrl = response.data[0].url;

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}