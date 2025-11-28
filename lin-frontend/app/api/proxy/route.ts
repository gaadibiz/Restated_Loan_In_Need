import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

const BACKEND_URL = config.backendUrl;

export async function POST(request: NextRequest) {
  try {
    const { path, body, isFormData } = await request.json();
    const url = `${BACKEND_URL}${path}`;
    
    let requestBody: string | FormData;
    let contentType = 'application/json';
    
    if (isFormData && body) {
      // Handle FormData conversion
      const formData = new FormData();
      
      for (const [key, value] of Object.entries(body)) {
        if (value && typeof value === 'object' && 'data' in value) {
          // This is a file object with base64 data
          const fileObj = value as any;
          const base64Data = fileObj.data;
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: fileObj.type });
          formData.append(key, blob, fileObj.name);
        } else {
          formData.append(key, value as string);
        }
      }
      
      requestBody = formData;
      contentType = 'multipart/form-data';
    } else {
      requestBody = JSON.stringify(body);
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(contentType === 'application/json' && { 'Content-Type': 'application/json' }),
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        }),
      },
      body: requestBody,
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    
    if (!path) {
      return NextResponse.json(
        { message: 'Path parameter is required' },
        { status: 400 }
      );
    }

    const url = `${BACKEND_URL}${path}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(request.headers.get('authorization') && {
          'Authorization': request.headers.get('authorization')!
        }),
      },
    });

    const data = await response.json();
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
