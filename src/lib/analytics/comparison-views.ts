import type { AnalyticsChartId } from "@/components/analytics/dashboard-charts";
import { DEFAULT_RANGE, type DateRangeState } from "@/lib/analytics/date-filter";

export interface ComparisonChartState {
  id: AnalyticsChartId;
  range: DateRangeState;
  zoom: number;
}

export interface SavedComparisonView {
  id: string;
  name: string;
  charts: ComparisonChartState[];
  updatedAt: string;
}

const STORAGE_KEY = "ole.analytics.comparison-views.v1";

export function defaultComparisonChart(id: AnalyticsChartId): ComparisonChartState {
  return { id, range: { ...DEFAULT_RANGE }, zoom: 100 };
}

export function readComparisonViews(): SavedComparisonView[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (view): view is SavedComparisonView =>
        !!view &&
        typeof view === "object" &&
        typeof (view as SavedComparisonView).id === "string" &&
        typeof (view as SavedComparisonView).name === "string" &&
        Array.isArray((view as SavedComparisonView).charts),
    );
  } catch {
    return [];
  }
}

function writeComparisonViews(views: SavedComparisonView[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
  window.dispatchEvent(new CustomEvent("ole:analytics-comparison-views"));
}

export function saveComparisonView(
  name: string,
  charts: ComparisonChartState[],
  existingId?: string,
): SavedComparisonView {
  const views = readComparisonViews();
  const id = existingId ?? globalThis.crypto?.randomUUID?.() ?? `view-${Date.now()}`;
  const saved: SavedComparisonView = {
    id,
    name: name.trim() || "Visualização sem título",
    charts,
    updatedAt: new Date().toISOString(),
  };
  const next = [saved, ...views.filter((view) => view.id !== id)].slice(0, 30);
  writeComparisonViews(next);
  return saved;
}

export function deleteComparisonView(id: string) {
  writeComparisonViews(readComparisonViews().filter((view) => view.id !== id));
}

export function findComparisonView(id: string | null | undefined) {
  if (!id) return null;
  return readComparisonViews().find((view) => view.id === id) ?? null;
}
