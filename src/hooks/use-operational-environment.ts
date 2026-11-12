import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getOperationalEnvironment } from "@/lib/environment.functions";

export function useOperationalEnvironment() {
  const fetchEnvironment = useServerFn(getOperationalEnvironment);
  return useQuery({
    queryKey: ["operational-environment"],
    queryFn: () => fetchEnvironment(),
    staleTime: 60_000,
  });
}
