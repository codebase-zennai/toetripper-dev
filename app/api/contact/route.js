import { NextResponse } from 'next/server';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    // Log the access key to verify it's loaded
    if (!process.env.WEB3FORMS_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'WEB3FORMS_ACCESS_KEY is not configured' },
        { status: 500 }
      );
    }

    // Send via Web3Forms using URLSearchParams (proper Node.js form encoding)
    const params = new URLSearchParams();
    params.append('access_key', process.env.WEB3FORMS_ACCESS_KEY);
    params.append('name', name);
    params.append('email', email);
    params.append('message', message);
    params.append('subject', `New Contact Form Submission from ${name}`);
    params.append('from_name', 'Toe Tripper API');
    params.append('to_email', process.env.ADMIN_EMAIL || 'info@toetripper.com');

    const paramsNikita = new URLSearchParams(params.toString());
    paramsNikita.set('to_email', 'nikita@toetripper.com');

    // Submit to Web3Forms

    const [response, responseNikita] = await Promise.all([
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: params.toString(),
      }),
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
        body: paramsNikita.toString(),
      })
    ]);

    const responseText = await response.text();
    console.log('Web3Forms response status:', response.status);
    console.log('Web3Forms response text:', responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Web3Forms response as JSON:', responseText.substring(0, 200));
      return NextResponse.json(
        { error: 'Web3Forms API returned invalid response. Access key may be invalid.' },
        { status: 500 }
      );
    }

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message');
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Web3Forms error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to send message' },
      { status: 500 }
    );
  }
}

