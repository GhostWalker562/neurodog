import { createStore } from "zustand";

interface ServiceDogProps {
  dispatches: number;
  signal: number;
  probability: number;
  //   Subscriptions
  calmSubscription?: { unsubscribe: () => void };
  signalSubscription?: { unsubscribe: () => void };
  //   Setters
  setDispatches: (dispatches: number) => void;
  setSignal: (signal: number) => void;
  setProbability: (probability: number) => void;
  setCalmSubscription: (subscription: { unsubscribe: () => void }) => void;
  setSignalSubscription: (subscription: { unsubscribe: () => void }) => void;
}

const useServiceDog = createStore<ServiceDogProps>((set) => ({
  isConnected: false,
  dispatches: 0,
  signal: 0,
  probability: 0,
  setCalmSubscription: (subscription) =>
    set({ calmSubscription: subscription }),
  setSignalSubscription: (subscription) =>
    set({ signalSubscription: subscription }),
  setProbability: (probability) => set({ probability }),
  setDispatches: (dispatches) => set({ dispatches }),
  setSignal: (signal) => set({ signal }),
}));

export default useServiceDog;
