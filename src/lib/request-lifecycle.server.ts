import { getRequest } from "@tanstack/react-start/server";

export function keepRequestAlive(promise: Promise<unknown>) {
  const request = getRequest() as Request & {
    waitUntil?: (task: Promise<unknown>) => void;
  };
  request.waitUntil?.(promise);
}
