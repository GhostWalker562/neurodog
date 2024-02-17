"use client";

import { TranscribeActionRequest } from "@/app/api/transcribe-action/route";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import logout from "./logout";
import { toast } from "sonner";

function useTranscribeAction() {
  const { push } = useRouter();

  return useMutation({
    mutationFn: async (transcript: string) => {
      const res = await fetch("/api/transcribe-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: transcript }),
      });

      const actionRequest = (await res.json()) as TranscribeActionRequest;

      switch (actionRequest.action) {
        case "open-home-page":
          return push("/dashboard");
        case "logout":
          await logout();
          break;
        case "go-to-landing":
          return push("/");
        case "open-dog-services":
          return push("/dog");
      }

      toast("Unknown command");

      return actionRequest;
    },
  });
}

export default useTranscribeAction;
