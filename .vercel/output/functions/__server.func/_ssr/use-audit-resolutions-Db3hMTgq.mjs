import { u as useQuery, a as useQueryClient, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
const listAuditResolutions = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d2888893047f221536c7c8206a44a09f9c024af4bd03447c28733743d15d38e0"));
const ResolveSchema = object({
  apolice: string().min(1).max(120),
  tipo_erro: string().min(1).max(200),
  endosso: string().max(120).optional().nullable(),
  run_id: string().uuid().optional().nullable(),
  motivo: string().max(500).optional().nullable()
});
const resolveFinding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ResolveSchema.parse(d)).handler(createSsrRpc("f4fb64a4ac46c1192657ca4449dd4a8ca48bdcd5546b0d0ebc86369a99ba3d9f"));
const unresolveFinding = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(createSsrRpc("729ceb73ec9e2cb220145cd50035031e97b0d4c651f95437dce6f7f2753cf84e"));
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("c1444affb35ef1659daf20980ad3599f011226becc8d8ef8948b3750257a9b32"));
const auditResolutionsQuery = queryOptions({
  queryKey: ["audit-resolutions"],
  queryFn: () => listAuditResolutions(),
  staleTime: 6e4
});
function useAuditResolutions() {
  return useQuery(auditResolutionsQuery);
}
function invalidateAll(qc) {
  qc.invalidateQueries({ queryKey: ["audit-resolutions"] });
  qc.invalidateQueries({ queryKey: ["audit"] });
  qc.invalidateQueries({ queryKey: ["kpis"] });
  qc.invalidateQueries({ queryKey: ["system-status"] });
}
function useResolveFinding() {
  const qc = useQueryClient();
  const resolveFn = useServerFn(resolveFinding);
  const undoFn = useServerFn(unresolveFinding);
  return useMutation({
    mutationFn: (input) => resolveFn({ data: input }),
    onSuccess: (res, vars) => {
      invalidateAll(qc);
      toast.success(res.alreadyExists ? "Já estava resolvido" : "Marcado como resolvido", {
        description: `${vars.tipo_erro} em ${vars.apolice}`,
        action: {
          label: "Desfazer",
          onClick: async () => {
            await undoFn({ data: { id: res.id } });
            invalidateAll(qc);
          }
        }
      });
    },
    onError: (err) => {
      toast.error("Falha ao marcar como resolvido", { description: err.message });
    }
  });
}
function useUnresolveFinding() {
  const qc = useQueryClient();
  const undoFn = useServerFn(unresolveFinding);
  return useMutation({
    mutationFn: (input) => undoFn({ data: input }),
    onSuccess: () => {
      invalidateAll(qc);
      toast.success("Resolução removida");
    },
    onError: (err) => {
      toast.error("Falha ao remover resolução", { description: err.message });
    }
  });
}
export {
  useAuditResolutions as a,
  useUnresolveFinding as b,
  useResolveFinding as u
};
