export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false,
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({ reply: data.response }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("OLLAMA ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong" }),
      { status: 500 }
    );
  }
}
