import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log({data});

    (await cookies()).set('E3352', data.accessToken
    );

    // Use the status code from the response data if available
    const statusCode = data.status || response.status;
    return NextResponse.json(data, { status: statusCode });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Failed to sign in",
        details: "Could not connect to authentication service",
      },
      { status: 500 }
    );
  }
}
