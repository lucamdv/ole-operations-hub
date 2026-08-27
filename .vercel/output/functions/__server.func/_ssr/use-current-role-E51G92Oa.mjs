import { a as useServerFn, J as getCurrentRole } from "./router-C--tI9WT.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
function useCurrentRole() {
  const fn = useServerFn(getCurrentRole);
  return useQuery({
    queryKey: ["current-role"],
    queryFn: () => fn(),
    staleTime: 6e4
  });
}
export {
  useCurrentRole as u
};
