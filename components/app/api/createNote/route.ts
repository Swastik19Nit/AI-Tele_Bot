import { generateImage, generateImagePrompt } from '@/lib/openai';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
    const session = await getServerSession();
    if (!session) {
        return new NextResponse("unauthorized",{status:401});
    }

    const body= await req.json();
    const {noteName}=body;
    // console.log(noteName);
    const image_description = await generateImagePrompt(noteName);
    const image_url=await generateImage(image_description);
    return new NextResponse("ok");


}