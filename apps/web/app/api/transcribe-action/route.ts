import { validateRequest } from "@/lib/lucia";

export interface TranscribeActionRequest {
  action:
    | "open-dog-services"
    | "open-home-page"
    | "logout"
    | "go-to-landing"
    | "unknown";
}

export async function POST(request: Request): Promise<Response> {
  const { session } = await validateRequest();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { message } = await request.json();
  if (!message) return Response.json({ action: "unknown" });

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/ai/request-action",
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    }
  );

  const transcriptionRequest = (await res.json()) as TranscribeActionRequest;

  return Response.json(transcriptionRequest);
}
