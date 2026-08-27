import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useVirtualizer } from "../_libs/tanstack__react-virtual.mjs";
import { c as cn } from "./router-C--tI9WT.mjs";
function VirtualList({
  items,
  getKey,
  estimateSize = 64,
  className,
  gap = 0,
  overscan = 6,
  threshold = 30,
  children
}) {
  const parentRef = reactExports.useRef(null);
  const virtualize = items.length > threshold;
  const virtualizer = useVirtualizer({
    count: virtualize ? items.length : 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize + gap,
    overscan
  });
  if (!virtualize) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: gap ? { display: "flex", flexDirection: "column", gap } : void 0, children: items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: children(item, i) }, getKey(item, i))) });
  }
  const virtualItems = virtualizer.getVirtualItems();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: parentRef,
      className: cn("overflow-y-auto overflow-x-hidden overscroll-contain", className),
      style: { contain: "paint" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: virtualizer.getTotalSize(), position: "relative", width: "100%" }, children: virtualItems.map((vi) => {
        const item = items[vi.index];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-index": vi.index,
            ref: virtualizer.measureElement,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: `translateY(${vi.start}px)`,
              paddingBottom: gap
            },
            children: children(item, vi.index)
          },
          getKey(item, vi.index)
        );
      }) })
    }
  );
}
export {
  VirtualList as V
};
