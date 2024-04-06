// pages/api/createNote.js

import { generateImage, generateImagePrompt } from '@/lib/openai';
import { NextResponse } from 'next/server';

export async function POST(req:any) {
  const { noteName } = await req.json();

  try {
    const imageDescription = await generateImagePrompt(noteName);
    const imageUrl = await generateImage(imageDescription, noteName);
    return new NextResponse(JSON.stringify({ imageUrl, noteName }), { status: 200 });
  } catch (error) {
    console.error('Failed to create note:', error);
    return new NextResponse('Failed to create note', { status: 500 });
  }
}
