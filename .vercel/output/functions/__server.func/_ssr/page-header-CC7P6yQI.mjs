import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-C--tI9WT.mjs";
function PageHeader({ title, description, eyebrow, actions, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-1.5", children: eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "page-title", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "page-subtitle mt-1.5 max-w-2xl", children: description })
        ] }),
        actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2 sm:justify-end sm:shrink-0", children: actions })
      ]
    }
  );
}
export {
  PageHeader as P
};
