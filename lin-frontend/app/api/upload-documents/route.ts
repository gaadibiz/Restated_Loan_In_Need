import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

const BACKEND_URL = config.backendUrl;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const url = `${BACKEND_URL}/api/document/submit`;
    
    // Forward the FormData directly to the backend
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        }),
      },
      body: formData,
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Document upload error:', error);
    return NextResponse.json(
      { message: 'Document upload failed' },
      { status: 500 }
    );
  }
}
