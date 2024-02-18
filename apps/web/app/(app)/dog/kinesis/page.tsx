"use client";

import ProbabilityPie from "@/components/ProbabilityPie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useNeurosity from "@/lib/api/stores/neurosity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AvailableActions } from "@/components/AvailableActions";

interface KinesisPageProps {}

function KinesisPage({}: KinesisPageProps): JSX.Element {
  const [isConnected, setIsConnected] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const [probability, setProbability] = useState(0);
  const [dispatches, setDispatches] = useState(0);
  const [signal, setSignal] = useState("Unconnected");
  const { push } = useRouter();
  const { neurosity } = useNeurosity();

  useEffect(() => {
    if (!neurosity) push("/dog");
  }, [neurosity, push]);

  const onKinesis = async () => setIsConnected(true);

  useEffect(() => {
    let lastTime = Date.now();

    if (!neurosity || !isConnected) return;

    const unsubscribeCalm = neurosity.calm().subscribe((data) => {
      const newValue = data.probability;
      setConfidence(newValue);
    });
    const unsubscribeSignal = neurosity.signalQuality().subscribe((data) => {
      setSignal(data[4].status);
    });
    const unsubscribeKinesis = neurosity.kinesis("tongue").subscribe((data) => {
      // Check if the dispatch was made less than 5 seconds away from the next
      if (Date.now() - lastTime > 5000) {
        toast.success("Dispatched action");
        setDispatches(dispatches + 1);
      }
      lastTime = Date.now();
    });
    const unsubscribePredictions = neurosity
      .predictions("tongue")
      .subscribe((data) => {
        setProbability(data.probability);
      });

    return () => {
      unsubscribeCalm?.unsubscribe();
      unsubscribeSignal?.unsubscribe();
      unsubscribeKinesis?.unsubscribe();
      unsubscribePredictions?.unsubscribe();
    };
  }, [dispatches, isConnected, neurosity]);

  return (
    <div className="">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Service Dog</h2>
          <div className="flex items-center space-x-2">
            <Button
              onClick={onKinesis}
              disabled={isConnected}
              className={cn(
                "transition-all",
                isConnected ? "text-green-400 bg-green-400/40" : ""
              )}
            >
              <Activity className="mr-2 w-4 h-4" />
              {isConnected ? "Connected" : "Connect Kinesis"}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dispatches</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dispatches}</div>
              <p className="text-xs text-muted-foreground">
                Actions taken ({(probability * 100).toLocaleString()}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confidence</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(confidence * 100).toLocaleString()}%
              </div>
              <p className="text-xs text-muted-foreground">Calmness</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Signal Status
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{signal}</div>
              <p className="text-xs text-muted-foreground">
                Quality of connection
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex justify-between">
                <h1>Calmness</h1>
                <h1>{(confidence * 100).toLocaleString()}%</h1>
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ProbabilityPie probability={probability} />
              <p className="ml-4 text-xs text-muted-foreground">
                Your calmness level
              </p>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Available Actions</CardTitle>
              <CardDescription>
                These are the actions available to the dog.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AvailableActions />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default KinesisPage;
