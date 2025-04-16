export async function GET(req: Request) {
  const url = process.env.NEXT_PUBLIC_API_PATH + "/terms.txt";
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
