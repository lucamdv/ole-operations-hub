import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as useServerFn, w as listUsers, x as listInvites, y as createUserManual, z as createInvite, A as updateUser, B as deleteUser, C as revokeInvite, c as cn } from "./router-C--tI9WT.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DxLsNwLg.mjs";
import { I as Input } from "./input-7ljYa1o2.mjs";
import { L as Label } from "./label-w_HgpYX6.mjs";
import { C as Card } from "./card-D8ih621p.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-Cw2eQtk0.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BPFiSsdh.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-OIaO8IaO.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { x as Copy, a3 as Pencil, h as Trash2, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
import "./client-BQqbDqk4.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-BxlZVXOU.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-BqwiLAOE.mjs";
import "./webhook-mode-DKZeQYsl.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-effect-event+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "./translate-CoDrOLOt.mjs";
import "./policy-sync-runner.server-qrVcf3rg.mjs";
import "./client.server-BIG6Ien0.mjs";
import "./motor-client.server--eqOBXIb.mjs";
import "./audit-run.server-DDaKmDPQ.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function AdminUsersPanel() {
  const qc = useQueryClient();
  const lU = useServerFn(listUsers);
  const lI = useServerFn(listInvites);
  const { data: users } = useQuery({ queryKey: ["admin-users"], queryFn: () => lU() });
  const { data: invites } = useQuery({ queryKey: ["admin-invites"], queryFn: () => lI() });
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-users"] });
    qc.invalidateQueries({ queryKey: ["admin-invites"] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Administração de Usuários" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-muted-foreground", children: "Cadastre, edite, remova ou convide usuários para a plataforma." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreateUserDialog, { onCreated: invalidate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreateInviteDialog, { onCreated: invalidate })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border text-[12px] font-medium uppercase tracking-wider text-muted-foreground", children: [
        "Usuários (",
        users?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Nome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Criado em" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          (users ?? []).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user: u, onChanged: invalidate }, u.id)),
          users && users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Nenhum usuário." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-border text-[12px] font-medium uppercase tracking-wider text-muted-foreground", children: [
        "Convites (",
        invites?.length ?? 0,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Expira em" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Ações" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          (invites ?? []).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InviteRow, { invite: i, onChanged: invalidate }, i.id)),
          invites && invites.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-6", children: "Nenhum convite emitido." }) })
        ] })
      ] })
    ] })
  ] });
}
function UserRow({ user, onChanged }) {
  const [editing, setEditing] = reactExports.useState(false);
  const [fullName, setFullName] = reactExports.useState(user.full_name ?? "");
  const [role, setRole] = reactExports.useState(user.roles?.[0] ?? "user");
  const update = useServerFn(updateUser);
  const del = useServerFn(deleteUser);
  async function save() {
    try {
      await update({ data: { user_id: user.id, full_name: fullName, role } });
      toast.success("Usuário atualizado");
      setEditing(false);
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha");
    }
  }
  async function remove() {
    if (!confirm(`Remover ${user.email}?`)) return;
    try {
      await del({ data: { user_id: user.id } });
      toast.success("Usuário removido");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha");
    }
  }
  const currentRole = user.roles?.[0] ?? "user";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), className: "h-8" }) : user.full_name || /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-[12px]", children: user.email }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manager", children: "manager" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user", children: "user" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: currentRole === "admin" ? "default" : "secondary", children: currentRole }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] text-muted-foreground", children: new Date(user.created_at).toLocaleDateString("pt-BR") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-1", children: editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: save, children: "Salvar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: () => setEditing(false), children: "Cancelar" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setEditing(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: remove, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5 text-destructive" }) })
    ] }) }) })
  ] });
}
function InviteRow({ invite, onChanged }) {
  const revoke = useServerFn(revokeInvite);
  const expired = new Date(invite.expires_at).getTime() < Date.now();
  const status = invite.used_at ? { label: "usado", variant: "secondary" } : invite.revoked_at ? { label: "revogado", variant: "destructive" } : expired ? { label: "expirado", variant: "destructive" } : { label: "pendente", variant: "default" };
  async function handleRevoke() {
    try {
      await revoke({ data: { id: invite.id } });
      toast.success("Convite revogado");
      onChanged();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-[12px]", children: invite.email }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: invite.role }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: status.variant, children: status.label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-[12px] text-muted-foreground", children: new Date(invite.expires_at).toLocaleString("pt-BR") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: !invite.used_at && !invite.revoked_at && !expired && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: handleRevoke, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) }) })
  ] });
}
function CreateUserDialog({ onCreated }) {
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("user");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const create = useServerFn(createUserManual);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await create({ data: { email, full_name: fullName, role, password } });
      toast.success("Usuário criado. Deve trocar a senha no primeiro acesso.");
      setOpen(false);
      setEmail("");
      setFullName("");
      setRole("user");
      setPassword("");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Cadastrar manualmente" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Cadastrar usuário" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Define uma senha temporária. O usuário será obrigado a trocá-la no primeiro acesso." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nome completo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fullName, onChange: (e) => setFullName(e.target.value), required: true, maxLength: 120 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manager", children: "manager" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user", children: "user" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Senha temporária" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 8 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Criando…" : "Criar usuário" }) })
      ] })
    ] })
  ] });
}
function CreateInviteDialog({ onCreated }) {
  const [open, setOpen] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("user");
  const [loading, setLoading] = reactExports.useState(false);
  const [link, setLink] = reactExports.useState(null);
  const create = useServerFn(createInvite);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await create({ data: { email, role } });
      const url = `${window.location.origin}/invite/${res.token}`;
      setLink(url);
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha");
    } finally {
      setLoading(false);
    }
  }
  function reset() {
    setOpen(false);
    setLink(null);
    setEmail("");
    setRole("user");
  }
  async function copy() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    toast.success("Link copiado");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => v ? setOpen(true) : reset(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Gerar link de convite" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Gerar link de convite" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Link válido por 24 horas e utilizável apenas uma vez." })
      ] }),
      !link ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email do convidado" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Perfil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "admin", children: "admin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "manager", children: "manager" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "user", children: "user" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Gerando…" : "Gerar link" }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-muted/30 p-3 break-all text-[12px] font-mono", children: link }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: copy, className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-4 w-4 mr-2" }),
            " Copiar link"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: reset, children: "Fechar" })
        ] })
      ] })
    ] })
  ] });
}
const SplitComponent = AdminUsersPanel;
export {
  SplitComponent as component
};
