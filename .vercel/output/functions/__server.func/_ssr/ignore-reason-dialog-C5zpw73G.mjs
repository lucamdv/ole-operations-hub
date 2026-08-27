import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Cw2eQtk0.mjs";
import { c as cn, a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { E as EyeOff } from "../_libs/lucide-react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const HEX = /^#[0-9a-fA-F]{6}$/;
const listExceptionReasonTags = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("126b2803b4bb9a9b3bb9fd718879690ed19500f35f4de8154c22171a19a64bee"));
const AddTagSchema = object({
  name: string().trim().min(1).max(60),
  color: string().regex(HEX, "Cor inválida")
});
const addExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => AddTagSchema.parse(d)).handler(createSsrRpc("2ea295ff8b3cb11662d55154cf637700b4819323f71b14140991795dc052d814"));
const UpdateTagSchema = object({
  id: string().uuid(),
  name: string().trim().min(1).max(60).optional(),
  color: string().regex(HEX, "Cor inválida").optional()
});
const updateExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => UpdateTagSchema.parse(d)).handler(createSsrRpc("6614dac4b16812a4e50d24e80d06ba28d8b61804fdb30ed4fa494bb760fbecb2"));
const removeExceptionReasonTag = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => object({
  id: string().uuid()
}).parse(d)).handler(createSsrRpc("b120782695f5867d4940aff0aee6e539a125c25fd9cca947c516a577fc058f9f"));
const exceptionTagsQuery = queryOptions({
  queryKey: ["exception-reason-tags"],
  queryFn: () => listExceptionReasonTags(),
  staleTime: 5 * 6e4
});
function useExceptionTags() {
  return useQuery(exceptionTagsQuery);
}
const describeError = (err) => err.message === "Forbidden" ? "Apenas administradores." : err.message;
function useAddExceptionTag() {
  const qc = useQueryClient();
  const fn = useServerFn(addExceptionReasonTag);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exception-reason-tags"] });
      toast.success("Tag criada");
    },
    onError: (err) => toast.error("Falha ao criar tag", { description: describeError(err) })
  });
}
function useUpdateExceptionTag() {
  const qc = useQueryClient();
  const fn = useServerFn(updateExceptionReasonTag);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exception-reason-tags"] });
      qc.invalidateQueries({ queryKey: ["audit-ignores"] });
      qc.invalidateQueries({ queryKey: ["endorsement-exceptions"] });
      toast.success("Tag atualizada");
    },
    onError: (err) => toast.error("Falha ao atualizar tag", { description: describeError(err) })
  });
}
function useRemoveExceptionTag() {
  const qc = useQueryClient();
  const fn = useServerFn(removeExceptionReasonTag);
  return useMutation({
    mutationFn: (input) => fn({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exception-reason-tags"] });
      qc.invalidateQueries({ queryKey: ["audit-ignores"] });
      qc.invalidateQueries({ queryKey: ["endorsement-exceptions"] });
      toast.success("Tag removida");
    },
    onError: (err) => toast.error("Falha ao remover tag", { description: describeError(err) })
  });
}
function readableOn(hex) {
  const m = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "#ffffff";
  const int = parseInt(m[1], 16);
  const r = int >> 16 & 255;
  const g = int >> 8 & 255;
  const b = int & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.62 ? "#111827" : "#ffffff";
}
function ReasonTagChip({
  tag,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ${className ?? ""}`,
      style: { backgroundColor: tag.color, color: readableOn(tag.color) },
      children: tag.name
    }
  );
}
function ReasonDisplay({
  motivo,
  tagId,
  tags,
  emptyLabel
}) {
  const tag = tagId ? tags.find((t) => t.id === tagId) : void 0;
  if (tag) {
    const extra = motivo && motivo !== tag.name ? motivo : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex flex-wrap items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReasonTagChip, { tag }),
      extra && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12.5px] text-muted-foreground", children: extra })
    ] });
  }
  if (motivo) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12.5px]", children: motivo });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-muted-foreground", children: emptyLabel ?? "Sem motivo" });
}
function IgnoreReasonDialog({
  open,
  onOpenChange,
  title = "Registrar exceção",
  targetLabel,
  description,
  confirmLabel = "Registrar exceção",
  initialMotivo = "",
  initialTagId = null,
  pending,
  onConfirm
}) {
  const { data: tags = [] } = useExceptionTags();
  const [tagId, setTagId] = reactExports.useState(initialTagId);
  const [motivo, setMotivo] = reactExports.useState(initialMotivo);
  reactExports.useEffect(() => {
    if (open) {
      setTagId(initialTagId);
      setMotivo(initialMotivo);
    }
  }, [open, initialTagId, initialMotivo]);
  const selected = tags.find((t) => t.id === tagId) ?? null;
  const trimmed = motivo.trim();
  const canConfirm = !!selected || trimmed.length > 0;
  const confirm = () => {
    if (!canConfirm) return;
    onConfirm({
      motivo: trimmed || (selected ? selected.name : ""),
      reason_tag_id: selected ? selected.id : null
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-[15px] flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }),
        " ",
        title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-[12.5px]", children: description ?? "O motivo é obrigatório. Selecione uma tag pronta e/ou descreva o motivo." })
    ] }),
    targetLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-surface-2/40 px-3 py-2 text-[12.5px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mr-2", children: "Alvo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono break-all", children: targetLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Tags de motivo" }),
      tags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-muted-foreground", children: "Nenhuma tag cadastrada. Crie tags em Configurações → Exceções." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: tags.map((t) => {
        const active = tagId === t.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTagId(active ? null : t.id),
            className: `rounded-full px-2.5 py-1 text-[11.5px] font-medium leading-none transition ${active ? "ring-2 ring-offset-1 ring-offset-background" : "opacity-70 hover:opacity-100"}`,
            style: {
              backgroundColor: t.color,
              color: readableOn(t.color),
              ...active ? { boxShadow: `0 0 0 2px ${t.color}` } : {}
            },
            children: t.name
          },
          t.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: [
        "Motivo personalizado ",
        selected ? "(opcional)" : "(obrigatório)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          autoFocus: true,
          value: motivo,
          onChange: (e) => setMotivo(e.target.value),
          maxLength: 500,
          rows: 3,
          placeholder: selected ? "Complemente o motivo, se quiser…" : "Descreva o motivo da exceção…",
          className: "text-[12.5px] resize-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground text-right", children: [
        motivo.length,
        "/500"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "h-9 text-[12.5px]", onClick: () => onOpenChange(false), children: "Cancelar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "h-9 text-[12.5px]",
          disabled: !canConfirm || pending,
          onClick: confirm,
          children: confirmLabel
        }
      )
    ] })
  ] }) });
}
export {
  IgnoreReasonDialog as I,
  ReasonDisplay as R,
  ReasonTagChip as a,
  useAddExceptionTag as b,
  useUpdateExceptionTag as c,
  useRemoveExceptionTag as d,
  useExceptionTags as u
};
