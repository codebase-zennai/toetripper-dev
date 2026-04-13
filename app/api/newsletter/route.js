import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    const { form_type, ...submissionData } = formData;

    // Prepare data for Web3Forms using URLSearchParams (proper Node.js form encoding)
    const params = new URLSearchParams();
    params.append('access_key', process.env.WEB3FORMS_ACCESS_KEY);
    params.append('name', submissionData.name);
    params.append('email', submissionData.email || `${submissionData.name.toLowerCase().replace(/\s+/g, '.')}@newsletter.toetripper.com`);
    params.append('phone', submissionData.phone || '');
    params.append('destination', submissionData.destination || '');
    params.append('travelTiming', submissionData.travelTiming || '');
    params.append('travellers', submissionData.travellers || '');
    params.append('budget', submissionData.budget || '');
    params.append('message', submissionData.message || '');
    params.append('form_type', form_type || 'general');
    params.append('subject', `New Newsletter Signup (${form_type}) from ${submissionData.name}`);
    params.append('from_name', 'Toe Tripper Newsletter');
    params.append('to_email', process.env.ADMIN_EMAIL || 'info@toetripper.com');

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: params.toString(),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || 'Failed to submit form' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Newsletter signup submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
