// app/api/identify/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    // Remove the data:image/jpeg;base64, prefix if it exists
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `Analyze this plant image and provide:
    1. Plant name (common and scientific)
    2. Brief description
    3. Basic care instructions
    Format as JSON with fields: name, description, careInstructions`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: 'image/jpeg'
        }
      }
    ]);
    
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown formatting if present
    text = text.replace(/```json\n?/, '').replace(/```\n?$/, '').trim();
    
    try {
      const jsonResponse = JSON.parse(text);
      return NextResponse.json(jsonResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      return NextResponse.json(
        { error: 'Failed to parse plant identification response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to identify plant' },
      { status: 500 }
    );
  }
}