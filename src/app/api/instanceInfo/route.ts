import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (req.nextUrl.searchParams.has("id")) {
      const authorization = (await headers()).get("authorization") || "";

      const url = new URL(["instance", req.nextUrl.searchParams.get("id")].join("/"), process.env.NEXT_PUBLIC_BACKEND_URL).href;
      const data = await fetch(url, { headers: { authorization } }).then(async (res) => {
        try {
          return await res?.json();
        } catch (err) {
          throw Error(`Server Error: ${err}`);
        }
      }); 
      return new Response(JSON.stringify(data), {
        status: new RegExp("\\b" + "error" + "\\b").test(JSON.stringify(data).toLowerCase()) ? 500 : 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      throw Error("No instance ID was passed");
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
