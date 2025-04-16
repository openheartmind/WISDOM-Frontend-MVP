export async function GET(req: Request) {
  const url = new URL(process.env.NEXT_PUBLIC_BASEURL || '', process.env.NEXT_PUBLIC_TERMS_FILENAME).href;
  const data = await fetch(url).then(async (res) => {
    try {
      return await res?.text();
    } catch (err) {
      return `Server Error: ${err}`;
    }
  });
  return new Response(data, {
    status: data.toLowerCase().includes("error") ? 500 : 200,
    headers: { "Content-Type": "application/json" },
  });
}
