import { json } from "@sveltejs/kit";
import { OpenAI } from "openai";
import { OPENAI_API_KEY } from "$env/static/private";

type ChatRole = "function" | "system" | "user" | "assistant";

/** @type {import('./$types').RequestHandler} */
export async function POST(request) {
    const openai = new OpenAI({apiKey: OPENAI_API_KEY});
    const messages: {role: ChatRole, content: string}[] = await request.request.json().then(response => response.data);
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-16k",
        messages: messages,
      });

    const result = completion.choices[0].message.content;

    const fullMessages = [...messages, {role: "assistant", content: result}]
    return json({
      status: 200,
      body: { result, messages: fullMessages },
    });
  }