import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./router-C--tI9WT.mjs";
const url = "/__l5e/assets-v1/780bc76b-664a-436b-95c9-c956dd603c74/olex.png";
const olexAsset = {
  url
};
function BrandMark({ className, height = 32 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: olexAsset.url,
      alt: "Oléx",
      style: { height, width: "auto" },
      className: cn("object-contain select-none", className),
      draggable: false
    }
  );
}
export {
  BrandMark as B
};
