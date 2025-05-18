import { headers } from "next/headers";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Get authorization header
    const headersList = await headers();
    const authorization =
      headersList.get("authorization") ||
      headersList.get("Authorization") ||
      "";

    // Create backend URL
    const url = new URL("instance", process.env.NEXT_PUBLIC_BACKEND_URL).href;

    // Set up headers for backend request
    const backendHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authorization if available
    if (authorization) {
      backendHeaders.Authorization = authorization.startsWith("Bearer ")
        ? authorization
        : `Bearer ${authorization}`;
    }

    // Make the request to backend
    const response = await fetch(url, { headers: backendHeaders });

    // Get the response as text first to handle empty responses
    const responseText = await response.text();

    // Parse as JSON if response is not empty
    const data = responseText ? JSON.parse(responseText) : [];

    // Return the response
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
