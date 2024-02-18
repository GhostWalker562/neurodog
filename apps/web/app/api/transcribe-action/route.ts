import { env } from "@/lib/env";
import { validateRequest } from "@/lib/lucia";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export interface TranscribeActionRequest {
  action:
    | "open-dog-services"
    | "open-home-page"
    | "logout"
    | "go-to-landing"
    | "toggle-theme"
    | "unknown";
}

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

export async function POST(request: Request): Promise<Response> {
  const { session } = await validateRequest();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await request.json();
  if (!message) return Response.json({ action: "unknown" });

  const messages: ChatCompletionMessageParam[] = [];
  messages.push({
    role: "system",
    content:
      "The user is currently using a frontend application and wants to do an action. It is speaking to you through the backend and wants you to understand the action it wants to take. If you don't understand, return a tool call with the argument unknown",
  });
  messages.push({ role: "user", content: message });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages,
    function_call: { name: "get_user_action" },
    functions: [
      {
        name: "get_user_action",
        description:
          "A user will pass in a transcription of an action they want to do on the frontend. This function will return the action that the user wants to do. Pass in the action wants to do. If the user changes their mind, it is an unknown action.",
        parameters: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: [
                "open-dog-services",
                "open-home-page",
                "logout",
                "go-to-landing",
                "toggle-theme",
                "unknown",
              ],
            },
          },
          required: ["action"],
        },
      },
    ],
  });

  const argument = response.choices.at(0)?.message?.function_call?.arguments;
  if (!argument) return Response.json({ action: "unknown" });

  return Response.json(JSON.parse(argument) as TranscribeActionRequest);
}
