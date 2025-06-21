import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

const FRONTEND_TOKEN_KEY = process.env.NEXT_PUBLIC_FRONTEND_TOKEN_KEY as string;

export async function GET(req: NextRequest) {
  try {
    let url = new URL(process.env.NEXT_PUBLIC_BACKEND_CONFIRMATION_PATH as string, process.env.NEXT_PUBLIC_BACKEND_URL).href;

    let token;
    if (req.nextUrl.searchParams.has(FRONTEND_TOKEN_KEY)) {
      token = req.nextUrl.searchParams.get(FRONTEND_TOKEN_KEY);
    }
    if (!token) {
      throw Error("Failed getting token from params");
    }

    const data = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    }).then(async (res) => {
      try {
        return await res?.json();
      } catch (err) {
        throw Error(`Server Error: ${err}`);
      }
    });

    // JSON.stringify(data).toLowerCase().includes("code") && data.code === 'otp_expired' -- Optional for detailed returned value
    const verified = JSON.stringify(data).toLowerCase().includes("success") && data.success;

    return new Response("Verifying..", {
      status: 301,
      headers: { Location: `${process.env.NEXT_PUBLIC_BASEURL as string}/login?verified=${verified}` },
    });
  } catch (err: any) {
    return notFound();
  }
}
