export async function GET(req: Request) {
  const url = new URL(process.env.NEXT_PUBLIC_TERMS_FILENAME as string, process.env.NEXT_PUBLIC_BASEURL).href;
  const data = await fetch(url).then(async (res) => {
    try {
      return await res?.text();
    } catch (err) {
      throw Error(`Server Error: ${err}`);
    }
  });
  return new Response(JSON.stringify(data), {
    status: JSON.stringify(data).toLowerCase().includes("error") ? 500 : 200,
    headers: { "Content-Type": "application/json" },
  });
}
