import { useEffect, useState } from "react";
import { RotateCcw, Settings2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

export type OverviewPreferences = {
  auditSummary: boolean;
  priorities: boolean;
  quickRead: boolean;
};

const STORAGE_KEY = "ole-copilot:overview-preferences:v1";

export const DEFAULT_OVERVIEW_PREFERENCES: OverviewPreferences = {
  auditSummary: true,
  priorities: true,
  quickRead: true,
};

const OPTIONS: Array<{
  id: keyof OverviewPreferences;
  label: string;
  description: string;
}> = [
  {
    id: "auditSummary",
    label: "Resultado e indicadores",
    description: "Conformidade, criticidade e alcance da última auditoria.",
  },
  {
    id: "priorities",
    label: "Prioridades da auditoria",
    description: "Apólices que concentram as ocorrências mais relevantes.",
  },
  {
    id: "quickRead",
    label: "Leitura rápida",
    description: "Resumo da execução, próximos passos e exportação do relatório.",
  },
];

function isOverviewPreferences(value: unknown): value is OverviewPreferences {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<OverviewPreferences>;
  return OPTIONS.every(({ id }) => typeof candidate[id] === "boolean");
}

export function useOverviewPreferences() {
  const [preferences, setPreferences] = useState<OverviewPreferences>(DEFAULT_OVERVIEW_PREFERENCES);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: unknown = JSON.parse(stored);
      if (isOverviewPreferences(parsed)) setPreferences(parsed);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function updatePreferences(next: OverviewPreferences) {
    setPreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The dashboard still updates in-memory when storage is unavailable.
    }
  }

  function resetPreferences() {
    updatePreferences(DEFAULT_OVERVIEW_PREFERENCES);
  }

  return { preferences, updatePreferences, resetPreferences };
}

export function OverviewPersonalizer({
  preferences,
  onChange,
  onReset,
}: {
  preferences: OverviewPreferences;
  onChange: (preferences: OverviewPreferences) => void;
  onReset: () => void;
}) {
  const enabledCount = OPTIONS.filter(({ id }) => preferences[id]).length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="apple-button-secondary rounded-full">
          <Settings2 className="h-4 w-4" />
          Personalizar
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-panel max-w-md rounded-3xl border-border/80 p-0 shadow-elevated">
        <DialogHeader className="border-b border-border/70 px-6 pb-5 pt-6 text-left">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <DialogTitle className="text-xl tracking-[-0.025em]">
            Personalizar visão geral
          </DialogTitle>
          <DialogDescription className="pt-1 text-[13px] leading-relaxed">
            Escolha os blocos que deseja ver. A preferência fica salva apenas neste navegador e pode
            ser restaurada a qualquer momento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 px-4 py-4">
          {OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-center gap-4 rounded-2xl border border-transparent px-3 py-3 transition hover:border-border hover:bg-surface-2/70"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[13px] font-semibold">{option.label}</span>
                <span className="mt-0.5 block text-[11.5px] leading-relaxed text-muted-foreground">
                  {option.description}
                </span>
              </span>
              <Switch
                checked={preferences[option.id]}
                onCheckedChange={(checked) => onChange({ ...preferences, [option.id]: checked })}
                aria-label={`Exibir ${option.label.toLowerCase()}`}
              />
            </label>
          ))}
        </div>

        <DialogFooter className="flex-row items-center justify-between gap-3 border-t border-border/70 px-6 py-4 sm:justify-between sm:space-x-0">
          <span className="text-[11px] text-muted-foreground">
            {enabledCount} de {OPTIONS.length} blocos visíveis
          </span>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={onReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Restaurar padrão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
