import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, q as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { i as createSsrRpc } from "./router-C--tI9WT.mjs";
import { c as createServerFn } from "./server-BxlZVXOU.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BqwiLAOE.mjs";
import { i as ResponsiveContainer$1 } from "../_libs/recharts.mjs";
const ResponsiveContainer = reactExports.memo(function InViewResponsiveContainer({
  width = "100%",
  height = "100%",
  minHeight,
  className,
  children
}) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className, style: { width: "100%", height: "100%", minHeight }, children: visible ? /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer$1, { width, height, minHeight, children }) : null });
});
const getOperationKpis = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b045d17174f00cbdc7ede0531012d8f28adc5b6e81de952b6de2491814d84db4"));
const operationKpisQuery = queryOptions({
  queryKey: ["kpis", "operation"],
  queryFn: () => getOperationKpis(),
  staleTime: 6e4
});
function useOperationKpis() {
  return useQuery(operationKpisQuery);
}
export {
  ResponsiveContainer as R,
  useOperationKpis as u
};
