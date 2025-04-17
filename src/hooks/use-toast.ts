
import React from "react";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  id: number;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

const TOAST_LIMIT = 100;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = ToastProps;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count;
}

const toasts: ToasterToast[] = [];
const observers: Array<(toasts: ToasterToast[]) => void> = [];

const useToast = () => {
  const [_toasts, setToasts] = React.useState<ToasterToast[]>([]);

  const toast = (props: Omit<ToasterToast, "id">) => {
    const id = genId();
    const newToast = { id, ...props };
    toasts.push(newToast);
    observers.forEach((observer) => observer(toasts));
    return id;
  };

  React.useEffect(() => {
    const observer = (newToasts: ToasterToast[]) => {
      setToasts([...newToasts]);
    };
    observers.push(observer);
    return () => {
      const index = observers.indexOf(observer);
      if (index > -1) {
        observers.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: _toasts,
    toast,
  };
};

// Re-export sonner's toast for easy API usage
const toast = sonnerToast;

export { useToast, toast };
