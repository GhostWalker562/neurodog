"use client";

import { Button } from "@/components/ui/button";
import useNeurosity from "@/lib/api/stores/neurosity";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface KinesisPageProps {}

function KinesisPage({}: KinesisPageProps): JSX.Element {
  const { push } = useRouter();
  const { neurosity } = useNeurosity();

  useEffect(() => {
    if (!neurosity) push("/dog");
  }, [neurosity, push]);

  const onKinesis = async () => {
    if (!neurosity) return;
    neurosity.kinesis("tongue").subscribe((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <Button onClick={onKinesis}>Kinesis</Button>
    </div>
  );
}

export default KinesisPage;
