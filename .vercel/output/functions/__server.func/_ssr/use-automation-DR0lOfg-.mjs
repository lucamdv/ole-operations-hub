import { u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
const getAutomationSchedules = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a6691374db1e6f2781de2c0565132cf29160cb77c2bd743bf6996a2ac72b72a3"));
const updateAutomationSchedule = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("acb922d13a5ff634c3eab89f3dc86b04f246c73750006e769eebc8106cffa916"));
function useAutomationSchedules() {
  const fetchFn = useServerFn(getAutomationSchedules);
  return useQuery({
    queryKey: ["automation-schedules"],
    queryFn: () => fetchFn(),
    staleTime: 6e4,
    refetchInterval: 5 * 6e4
  });
}
function useAutomationSchedule(job) {
  const { data, ...rest } = useAutomationSchedules();
  const schedule = (data ?? []).find((s) => s.job === job);
  return { schedule, ...rest };
}
function useUpdateAutomationSchedule() {
  const qc = useQueryClient();
  const fn = useServerFn(updateAutomationSchedule);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["automation-schedules"] });
      toast.success("Agendamento atualizado");
    },
    onError: (e) => toast.error(e.message || "Falha ao salvar agendamento")
  });
}
export {
  useAutomationSchedules as a,
  useUpdateAutomationSchedule as b,
  useAutomationSchedule as u
};
