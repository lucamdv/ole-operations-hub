import { r as reactExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useServerFn, i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { a as useNotifPrefs, p as playNotifBeep } from "./use-settings-CkvJQFhU.mjs";
const getNotifications = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createSsrRpc("c0aad9f33018b8faf6632300a6819e56cab5d97dccf9d8d06ce4d7db41fcaec8"));
const READ_KEY = "ole.notif.read.v1";
const DISMISSED_KEY = "ole.notif.dismissed.v1";
const LAST_SEEN_KEY = "ole.notif.lastSeenAt.v1";
function readSet(key) {
  if (typeof window === "undefined") return /* @__PURE__ */ new Set();
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return /* @__PURE__ */ new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return /* @__PURE__ */ new Set();
  }
}
function writeSet(key, s) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify([...s]));
}
function readLastSeen() {
  if (typeof window === "undefined") return new Date(Date.now() - 7 * 864e5).toISOString();
  return localStorage.getItem(LAST_SEEN_KEY) ?? new Date(Date.now() - 7 * 864e5).toISOString();
}
function relTime(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "agora";
  if (m < 60) return `há ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.floor(h / 24);
  return `há ${d} d`;
}
function useNotifications() {
  const fetchFn = useServerFn(getNotifications);
  const { prefs } = useNotifPrefs();
  const [lastSeenAt] = reactExports.useState(() => readLastSeen());
  const [readIds, setReadIds] = reactExports.useState(() => readSet(READ_KEY));
  const [dismissedIds, setDismissedIds] = reactExports.useState(() => readSet(DISMISSED_KEY));
  const seenIdsRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const { data: serverItems = [] } = useQuery({
    queryKey: ["notifications", lastSeenAt],
    queryFn: () => fetchFn({ data: { lastSeenAt } }),
    refetchInterval: 9e4,
    refetchIntervalInBackground: false,
    staleTime: 6e4
  });
  const [, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const i = setInterval(() => setTick((n) => n + 1), 6e4);
    return () => clearInterval(i);
  }, []);
  reactExports.useEffect(() => {
    if (!prefs.som) {
      for (const n of serverItems) seenIdsRef.current.add(n.id);
      return;
    }
    if (seenIdsRef.current.size === 0) {
      for (const n of serverItems) seenIdsRef.current.add(n.id);
      return;
    }
    const fresh = serverItems.filter(
      (n) => !seenIdsRef.current.has(n.id) && (n.severity === "critical" || n.severity === "high") && !readIds.has(n.id) && !dismissedIds.has(n.id)
    );
    if (fresh.length > 0) playNotifBeep();
    for (const n of serverItems) seenIdsRef.current.add(n.id);
  }, [serverItems, prefs.som, readIds, dismissedIds]);
  const items = reactExports.useMemo(() => {
    return serverItems.filter((n) => prefs[n.kind] !== false).filter((n) => !dismissedIds.has(n.id)).map((n) => {
      const ts = new Date(n.createdAt).getTime();
      return {
        id: n.id,
        kind: n.kind,
        severity: n.severity,
        text: n.text,
        createdAt: ts,
        time: relTime(ts),
        read: readIds.has(n.id),
        link: n.link
      };
    });
  }, [serverItems, prefs, readIds, dismissedIds]);
  const unread = items.filter((n) => !n.read).length;
  const markAllRead = reactExports.useCallback(() => {
    const next = new Set(readIds);
    for (const n of items) next.add(n.id);
    writeSet(READ_KEY, next);
    setReadIds(next);
    localStorage.setItem(LAST_SEEN_KEY, (/* @__PURE__ */ new Date()).toISOString());
  }, [items, readIds]);
  const markRead = reactExports.useCallback(
    (id) => {
      const next = new Set(readIds);
      next.add(id);
      writeSet(READ_KEY, next);
      setReadIds(next);
    },
    [readIds]
  );
  const remove = reactExports.useCallback(
    (id) => {
      const next = new Set(dismissedIds);
      next.add(id);
      writeSet(DISMISSED_KEY, next);
      setDismissedIds(next);
    },
    [dismissedIds]
  );
  const clearAll = reactExports.useCallback(() => {
    const next = new Set(dismissedIds);
    for (const n of items) next.add(n.id);
    writeSet(DISMISSED_KEY, next);
    setDismissedIds(next);
  }, [items, dismissedIds]);
  const resetReadHistory = reactExports.useCallback(() => {
    writeSet(READ_KEY, /* @__PURE__ */ new Set());
    writeSet(DISMISSED_KEY, /* @__PURE__ */ new Set());
    setReadIds(/* @__PURE__ */ new Set());
    setDismissedIds(/* @__PURE__ */ new Set());
    localStorage.removeItem(LAST_SEEN_KEY);
  }, []);
  return { items, unread, markAllRead, markRead, remove, clearAll, resetReadHistory };
}
export {
  useNotifications as u
};
