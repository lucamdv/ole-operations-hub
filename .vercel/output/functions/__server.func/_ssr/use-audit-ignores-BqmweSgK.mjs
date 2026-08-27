import { u as useQuery, a as useQueryClient, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
const listAuditIgnores = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("88edb9b4231b68ed0f9f60d341eb7b966d5c927c58a29cc5cf88410c4b733659"));
const AddSchema = object({
  apolice: string().min(1).max(120),
  tipo_erro: string().min(1).max(200).optional().nullable(),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const addAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddSchema.parse(d)).handler(createSsrRpc("4b6fc12bbf21cd8d645e5e16ad0e6486cd7d7dff98801bbaa1dc95db99a1d753"));
const UpdateSchema = object({
  id: string().uuid(),
  motivo: string().trim().min(1, "Motivo obrigatório").max(500),
  reason_tag_id: string().uuid().optional().nullable()
});
const updateAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateSchema.parse(d)).handler(createSsrRpc("f48ea7f0ef9a3ccaa7a179c39bbca8514d69a621727a97fe9bd195fe7955f991"));
const removeAuditIgnore = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(createSsrRpc("d9930ec315ddad261a9c3b58b7cc7bc3e338c351e0252329373a9262415dd71f"));
const auditIgnoresQuery = queryOptions({
  queryKey: ["audit-ignores"],
  queryFn: () => listAuditIgnores(),
  staleTime: 6e4
});
function useAuditIgnores() {
  return useQuery(auditIgnoresQuery);
}
function useAddAuditIgnore() {
  const qc = useQueryClient();
  const addFn = useServerFn(addAuditIgnore);
  const removeFn = useServerFn(removeAuditIgnore);
  return useMutation({
    mutationFn: (input) => addFn({ data: input }),
    onSuccess: (res, vars) => {
      qc.invalidateQueries({ queryKey: ["audit-ignores"] });
      qc.invalidateQueries({ queryKey: ["audit"] });
      qc.invalidateQueries({ queryKey: ["system-status"] });
      const desc = vars.tipo_erro ? `${vars.tipo_erro} em ${vars.apolice}` : `Apólice ${vars.apolice}`;
      toast.success(res.alreadyExists ? "Já estava ignorado" : "Exceção registrada", {
        description: desc,
        action: {
          label: "Desfazer",
          onClick: async () => {
            await removeFn({ data: { id: res.id } });
            qc.invalidateQueries({ queryKey: ["audit-ignores"] });
            qc.invalidateQueries({ queryKey: ["audit"] });
            qc.invalidateQueries({ queryKey: ["system-status"] });
          }
        }
      });
    },
    onError: (err) => {
      toast.error("Falha ao registrar exceção", { description: err.message });
    }
  });
}
function useRemoveAuditIgnore() {
  const qc = useQueryClient();
  const removeFn = useServerFn(removeAuditIgnore);
  return useMutation({
    mutationFn: (input) => removeFn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["audit-ignores"] });
      qc.invalidateQueries({ queryKey: ["audit"] });
      qc.invalidateQueries({ queryKey: ["system-status"] });
      toast.success("Exceção removida");
    },
    onError: (err) => {
      toast.error("Falha ao remover exceção", { description: err.message });
    }
  });
}
function useUpdateAuditIgnore() {
  const qc = useQueryClient();
  const updateFn = useServerFn(updateAuditIgnore);
  return useMutation({
    mutationFn: (input) => updateFn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["audit-ignores"] });
      toast.success("Motivo atualizado");
    },
    onError: (err) => {
      toast.error("Falha ao atualizar motivo", { description: err.message });
    }
  });
}
export {
  useAddAuditIgnore as a,
  useRemoveAuditIgnore as b,
  useUpdateAuditIgnore as c,
  useAuditIgnores as u
};
