import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, difficulty } = await req.json();

    // Replace with your actual backend URL
    const backendUrl = `http://localhost:8000/api/generate-content/`;

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic, difficulty }),
    });

    if (!response.ok) {
      console.error('Backend error:', response.status, response.statusText);
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error || 'Failed to generate content' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('API route error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred' }, { status: 500 });
  }
}