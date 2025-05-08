import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    if (body.email && body.display && body.password) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      const statusCode = data.status || response.status;
      return NextResponse.json(data, { status: statusCode });
    } else {
      throw Error("Invalid data - Missing required field/s")
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "Failed to register",
        details: "Could not connect to service",
      },
      { status: 500 }
    );
  }
}
