"use client";

import { Button } from "@/components/ui/button";
import useNeurosity from "@/lib/api/stores/neurosity";
import { useTranscript } from "@/lib/api/stores/recordings";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface KinesisPageProps {}

function KinesisPage({}: KinesisPageProps): JSX.Element {
  const { push } = useRouter();
  const { neurosity } = useNeurosity();
  const { transcript } = useTranscript();

  useEffect(() => {
    if (!neurosity) push("/dog");
  }, [neurosity, push]);

  const onKinesis = async () => {
    if (!neurosity) return;
  };

  return (
    <div>
      {transcript}
      <Button onClick={onKinesis}>Kinesis</Button>
    </div>
  );
}

export default KinesisPage;
