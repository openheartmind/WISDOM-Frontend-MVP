import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return Response.json(
        { error: "Instance ID is required" },
        { status: 400 }
      );
    }

    const headersList = await headers();
    const authorization =
      headersList.get("authorization") ||
      headersList.get("Authorization") ||
      "";

    if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
      return Response.json(
        { error: "Backend URL is not configured" },
        { status: 500 }
      );
    }

    const url = new URL(`instance/${id}`, process.env.NEXT_PUBLIC_BACKEND_URL)
      .href;

    // Make the request to backend
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization.startsWith("Bearer ")
          ? authorization
          : `Bearer ${authorization}`,
      },
    });

    // Get the response as text first to handle empty responses
    const responseText = await response.text();

    // Parse as JSON if response is not empty
    const data = responseText ? JSON.parse(responseText) : {};

    return Response.json(data, {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
}
