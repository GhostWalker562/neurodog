"use client";

import useAudioPermissions from "@/lib/api/queries/useAudioPermissions";
import useRecord from "@/lib/api/useRecord";
import { cn } from "@/lib/utils";
import { Mic, Text } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useTranscript } from "@/lib/api/stores/recordings";

interface VoiceActionsProps {}

function VoiceActions({}: VoiceActionsProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const permissions = useAudioPermissions();
  const { startRecording, stopRecording, isRecording } = useRecord();
  const { transcript, reset } = useTranscript();

  return (
    <>
      <Button
        onClick={() => {
          reset();
          startRecording();
          setOpen(true);
        }}
        variant="outline"
        className={cn(
          "hover:text-green-500 hover:bg-green-500/10",
          isRecording &&
            "animate-pulse text-green-500 border-green-500 bg-green-500/10 transition-all"
        )}
      >
        <Mic className="mr-2 w-4 h-4" />
        {!permissions.data && !permissions.isLoading
          ? "Requires Permissions"
          : "Voice Actions"}
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(e) => {
          if (!e) stopRecording();
          setOpen(e);
        }}
      >
        <CommandInput placeholder="Listening for instructions..." disabled />
        <CommandList>
          <CommandGroup heading="Transcript">
            <CommandItem>
              <Text className="mr-2 h-4 w-4" />
              <span>{transcript}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default VoiceActions;
