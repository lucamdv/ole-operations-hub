import { useCallback, useEffect, useState } from "react";
import { DEFAULT_POLICY_STATUS_RULES, type PolicyStatusRules } from "@/lib/policies/status";

const KEY = "ole.policy.status.rules.v1";

type Listener = (rules: PolicyStatusRules) => void;
const listeners = new Set<Listener>();

function read(): PolicyStatusRules {
  if (typeof window === "undefined") return DEFAULT_POLICY_STATUS_RULES;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_POLICY_STATUS_RULES;
    return { ...DEFAULT_POLICY_STATUS_RULES, ...(JSON.parse(raw) as Partial<PolicyStatusRules>) };
  } catch {
    return DEFAULT_POLICY_STATUS_RULES;
  }
}

export function usePolicyStatusRules() {
  const [rules, setRules] = useState<PolicyStatusRules>(() => read());

  useEffect(() => {
    const listener: Listener = (next) => setRules(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const update = useCallback((patch: Partial<PolicyStatusRules>) => {
    const next = { ...read(), ...patch };
    localStorage.setItem(KEY, JSON.stringify(next));
    listeners.forEach((listener) => listener(next));
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(KEY);
    listeners.forEach((listener) => listener(DEFAULT_POLICY_STATUS_RULES));
  }, []);

  return { rules, update, reset };
}
