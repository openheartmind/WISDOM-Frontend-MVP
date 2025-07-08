import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const token = (await cookies()).get('E3352');
        if (!token) {
          return NextResponse.json('Unauthorized', { status: 401 });
        }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/instance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token.value}`
        },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      // Use the status code from the response data if available
      const statusCode = data.status || response.status;

    //   if (!data.status) {
    //     return NextResponse.json('Invalid Response', { status: 401 });
    //   }

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