import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_TERMS_FILENAME as string, process.env.NEXT_PUBLIC_BASEURL).href;
    const data = await fetch(url).then(async (res) => {
      try {
        return await res?.text();
      } catch (err) {
        throw Error(`Server Error: ${err}`);
      }
    });
    return new Response(data, {
      status: new RegExp('\\b' + 'error' + '\\b').test(JSON.stringify(data).toLowerCase()) ? 500 : 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    return new Response(JSON.stringify({error}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
