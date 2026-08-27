import { r as reactExports, b as React } from "./react.mjs";
import { r as reactDomExports } from "./react-dom.mjs";
import { c as clsx } from "./clsx.mjs";
import { S as Symbol$1, s as symbolWye, a as symbolTriangle, b as symbolStar, c as symbolSquare, d as symbolDiamond, e as symbolCross, f as symbolCircle, g as shapeStack, h as stackOrderNone, i as stackOffsetNone, j as stackOffsetWiggle, k as stackOffsetSilhouette, l as stackOffsetExpand, m as shapeArea, n as shapeLine, o as stepBefore, p as stepAfter, q as curveStep, r as curveNatural, t as monotoneY, u as monotoneX, v as curveLinear, w as curveLinearClosed, x as bumpY, y as bumpX, z as curveBasis, A as curveBasisOpen, B as curveBasisClosed } from "./d3-shape.mjs";
import { c as createSelector } from "./reselect.mjs";
import { g as get, u as uniqBy, s as sortBy$1, t as throttle, r as range, i as isEqual } from "./es-toolkit.mjs";
import { r as reactIsExports } from "./react-is.mjs";
import { i as invariant } from "./tiny-invariant.mjs";
import { c as createSlice, p as prepareAutoBatched, a as createAction, b as createListenerMiddleware, d as configureStore, e as autoBatchEnhancer } from "./reduxjs__toolkit.mjs";
import { s as shallowEqual, P as Provider_default } from "./react-redux.mjs";
import { c as current, a as castDraft } from "./immer.mjs";
import { w as withSelectorExports } from "./use-sync-external-store.mjs";
import { d as d3Scales } from "./victory-vendor.mjs";
import { D as Decimal } from "./decimal.js-light.mjs";
import { c as combineReducers } from "./redux.mjs";
import { E as EventEmitter } from "./eventemitter3.mjs";
var EventKeys = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function isEventKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  var allowedEventKeys = EventKeys;
  return allowedEventKeys.includes(key);
}
var SVGElementPropKeys = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
];
var SVGElementPropKeySet = new Set(SVGElementPropKeys);
function isSvgElementPropKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  return SVGElementPropKeySet.has(key);
}
function isDataAttribute(key) {
  return typeof key === "string" && key.startsWith("data-");
}
function svgPropertiesNoEvents(obj) {
  if (typeof obj !== "object" || obj === null) {
    return {};
  }
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesNoEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(input) && typeof input.props === "object" && input.props !== null) {
    var p = input.props;
    return svgPropertiesNoEvents(p);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesNoEvents(input);
  }
  return null;
}
function svgPropertiesAndEvents(obj) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesAndEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(input)) {
    return svgPropertiesAndEvents(input.props);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesAndEvents(input);
  }
  return null;
}
var _excluded$s = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function _extends$w() {
  return _extends$w = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$w.apply(null, arguments);
}
function _objectWithoutProperties$s(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$s(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$s(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Surface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, width = props.width, height = props.height, viewBox = props.viewBox, className = props.className, style = props.style, title = props.title, desc = props.desc, others = _objectWithoutProperties$s(props, _excluded$s);
  var svgView = viewBox || {
    width,
    height,
    x: 0,
    y: 0
  };
  var layerClass = clsx("recharts-surface", className);
  return /* @__PURE__ */ reactExports.createElement("svg", _extends$w({}, svgPropertiesAndEvents(others), {
    className: layerClass,
    width,
    height,
    style,
    viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
    ref
  }), /* @__PURE__ */ reactExports.createElement("title", null, title), /* @__PURE__ */ reactExports.createElement("desc", null, desc), children);
});
var _excluded$r = ["children", "className"];
function _extends$v() {
  return _extends$v = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$v.apply(null, arguments);
}
function _objectWithoutProperties$r(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$r(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$r(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Layer = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, className = props.className, others = _objectWithoutProperties$r(props, _excluded$r);
  var layerClass = clsx("recharts-layer", className);
  return /* @__PURE__ */ reactExports.createElement("g", _extends$v({
    className: layerClass
  }, svgPropertiesAndEvents(others), {
    ref
  }), children);
});
var defaultRoundPrecision = 4;
function round(num) {
  var roundPrecision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultRoundPrecision;
  var factor = 10 ** roundPrecision;
  var rounded = Math.round(num * factor) / factor;
  if (Object.is(rounded, -0)) {
    return 0;
  }
  return rounded;
}
function roundTemplateLiteral(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  return strings.reduce((result, string, i) => {
    var value = values[i - 1];
    if (typeof value === "string") {
      return result + value + string;
    }
    if (value !== void 0) {
      return result + round(value) + string;
    }
    return result + string;
  }, "");
}
var mathSign = (value) => {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isNan = (value) => {
  return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.length > 1 && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix) => {
  var id = ++idCounter;
  return "".concat(prefix || "").concat(id);
};
var getPercentValue = function getPercentValue2(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!isNumber(percent) && typeof percent !== "string") {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    if (totalValue == null) {
      return defaultValue;
    }
    var index = percent.indexOf("%");
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNan(value)) {
    value = defaultValue;
  }
  if (validate && totalValue != null && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var hasDuplicate = (ary) => {
  if (!Array.isArray(ary)) {
    return false;
  }
  var len = ary.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[String(ary[i])]) {
      cache[String(ary[i])] = true;
    } else {
      return true;
    }
  }
  return false;
};
function interpolate(start, end, animationElapsedTime) {
  if (isNumber(start) && isNumber(end)) {
    return round(start + animationElapsedTime * (end - start));
  }
  return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
  if (!ary || !ary.length) {
    return void 0;
  }
  return ary.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get(entry, specifiedKey)) === specifiedValue);
}
var isNullish = (value) => {
  return value === null || typeof value === "undefined";
};
var upperFirst = (value) => {
  if (isNullish(value)) {
    return value;
  }
  return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
function isNotNil(value) {
  return value != null;
}
function noop$1() {
}
function cartesianViewBoxToTrapezoid(box) {
  if (!box) {
    return void 0;
  }
  return {
    x: box.x,
    y: box.y,
    upperWidth: "upperWidth" in box ? box.upperWidth : box.width,
    lowerWidth: "lowerWidth" in box ? box.lowerWidth : box.width,
    width: box.width,
    height: box.height
  };
}
function ownKeys$J(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$J(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$J(Object(t), true).forEach(function(r2) {
      _defineProperty$M(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$J(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$M(e, r, t) {
  return (r = _toPropertyKey$M(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$M(t) {
  var i = _toPrimitive$M(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$M(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getCartesianPosition = (options) => {
  var viewBox = options.viewBox, position = options.position, _options$offset = options.offset, offset = _options$offset === void 0 ? 0 : _options$offset, parentViewBoxFromOptions = options.parentViewBox, clamp = options.clamp;
  var _cartesianViewBoxToTr = cartesianViewBoxToTrapezoid(viewBox), x = _cartesianViewBoxToTr.x, y = _cartesianViewBoxToTr.y, height = _cartesianViewBoxToTr.height, upperWidth = _cartesianViewBoxToTr.upperWidth, lowerWidth = _cartesianViewBoxToTr.lowerWidth;
  var upperX = x;
  var lowerX = x + (upperWidth - lowerWidth) / 2;
  var middleX = (upperX + lowerX) / 2;
  var midHeightWidth = (upperWidth + lowerWidth) / 2;
  var centerX = upperX + upperWidth / 2;
  var verticalSign = height >= 0 ? 1 : -1;
  var verticalOffset = verticalSign * offset;
  var verticalEnd = verticalSign > 0 ? "end" : "start";
  var verticalStart = verticalSign > 0 ? "start" : "end";
  var horizontalSign = upperWidth >= 0 ? 1 : -1;
  var horizontalOffset = horizontalSign * offset;
  var horizontalEnd = horizontalSign > 0 ? "end" : "start";
  var horizontalStart = horizontalSign > 0 ? "start" : "end";
  var parentViewBox = parentViewBoxFromOptions;
  if (position === "top") {
    var result = {
      x: upperX + upperWidth / 2,
      y: y - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    };
    if (clamp && parentViewBox) {
      result.height = Math.max(y - parentViewBox.y, 0);
      result.width = upperWidth;
    }
    return result;
  }
  if (position === "bottom") {
    var _result = {
      x: lowerX + lowerWidth / 2,
      y: y + height + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    };
    if (clamp && parentViewBox) {
      _result.height = Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0);
      _result.width = lowerWidth;
    }
    return _result;
  }
  if (position === "left") {
    var _result2 = {
      x: middleX - horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    };
    if (clamp && parentViewBox) {
      _result2.width = Math.max(_result2.x - parentViewBox.x, 0);
      _result2.height = height;
    }
    return _result2;
  }
  if (position === "right") {
    var _result3 = {
      x: middleX + midHeightWidth + horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    };
    if (clamp && parentViewBox) {
      _result3.width = Math.max(parentViewBox.x + parentViewBox.width - _result3.x, 0);
      _result3.height = height;
    }
    return _result3;
  }
  var sizeAttrs = clamp && parentViewBox ? {
    width: midHeightWidth,
    height
  } : {};
  if (position === "insideLeft") {
    return _objectSpread$J({
      x: middleX + horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideRight") {
    return _objectSpread$J({
      x: middleX + midHeightWidth - horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideTop") {
    return _objectSpread$J({
      x: upperX + upperWidth / 2,
      y: y + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottom") {
    return _objectSpread$J({
      x: lowerX + lowerWidth / 2,
      y: y + height - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideTopLeft") {
    return _objectSpread$J({
      x: upperX + horizontalOffset,
      y: y + verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideTopRight") {
    return _objectSpread$J({
      x: upperX + upperWidth - horizontalOffset,
      y: y + verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottomLeft") {
    return _objectSpread$J({
      x: lowerX + horizontalOffset,
      y: y + height - verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideBottomRight") {
    return _objectSpread$J({
      x: lowerX + lowerWidth - horizontalOffset,
      y: y + height - verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) {
    return _objectSpread$J({
      x: x + getPercentValue(position.x, midHeightWidth),
      y: y + getPercentValue(position.y, height),
      horizontalAnchor: "end",
      verticalAnchor: "end"
    }, sizeAttrs);
  }
  return _objectSpread$J({
    x: centerX,
    y: y + height / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, sizeAttrs);
};
var absolutePositions = ["top", "left", "right", "bottom"];
function isOutsidePosition(position) {
  if (position == null) {
    return false;
  }
  if (typeof position === "object") {
    return true;
  }
  return absolutePositions.includes(position);
}
var LegendPortalContext = /* @__PURE__ */ reactExports.createContext(null);
var useLegendPortal = () => reactExports.useContext(LegendPortalContext);
var _excluded$q = ["type", "size", "sizeType"];
function _extends$u() {
  return _extends$u = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$u.apply(null, arguments);
}
function ownKeys$I(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$I(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$I(Object(t), true).forEach(function(r2) {
      _defineProperty$L(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$I(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$L(e, r, t) {
  return (r = _toPropertyKey$L(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$L(t) {
  var i = _toPrimitive$L(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$L(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$q(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$q(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$q(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};
var RADIAN$1 = Math.PI / 180;
var getSymbolFactory = (type) => {
  var name = "symbol".concat(upperFirst(type));
  return symbolFactories[name] || symbolCircle;
};
var calculateAreaSize = (size, sizeType, type) => {
  if (sizeType === "area") {
    return size;
  }
  switch (type) {
    case "cross":
      return 5 * size * size / 9;
    case "diamond":
      return 0.5 * size * size / Math.sqrt(3);
    case "square":
      return size * size;
    case "star": {
      var angle = 18 * RADIAN$1;
      return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * size * size / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var registerSymbol = (key, factory) => {
  symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
var Symbols = (_ref2) => {
  var _ref$type = _ref2.type, type = _ref$type === void 0 ? "circle" : _ref$type, _ref$size = _ref2.size, size = _ref$size === void 0 ? 64 : _ref$size, _ref$sizeType = _ref2.sizeType, sizeType = _ref$sizeType === void 0 ? "area" : _ref$sizeType, rest = _objectWithoutProperties$q(_ref2, _excluded$q);
  var props = _objectSpread$I(_objectSpread$I({}, rest), {}, {
    type,
    size,
    sizeType
  });
  var realType = "circle";
  if (typeof type === "string") {
    realType = type;
  }
  var getPath2 = () => {
    var symbolFactory = getSymbolFactory(realType);
    var symbol = Symbol$1().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType));
    var s = symbol();
    if (s === null) {
      return void 0;
    }
    return s;
  };
  var className = props.className, cx = props.cx, cy = props.cy;
  var filteredProps = svgPropertiesAndEvents(props);
  if (isNumber(cx) && isNumber(cy) && isNumber(size)) {
    return /* @__PURE__ */ reactExports.createElement("path", _extends$u({}, filteredProps, {
      className: clsx("recharts-symbols", className),
      transform: "translate(".concat(cx, ", ").concat(cy, ")"),
      d: getPath2()
    }));
  }
  return null;
};
Symbols.registerSymbol = registerSymbol;
var isPolarCoordinate = (c) => {
  return "radius" in c && "startAngle" in c && "endAngle" in c;
};
var adaptEventHandlers = (props, newHandler) => {
  if (!props || typeof props === "function" || typeof props === "boolean") {
    return null;
  }
  var inputProps = props;
  if (/* @__PURE__ */ reactExports.isValidElement(props)) {
    inputProps = props.props;
  }
  if (typeof inputProps !== "object" && typeof inputProps !== "function") {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach((key) => {
    if (isEventKey(key) && typeof inputProps[key] === "function") {
      out[key] = ((e) => inputProps[key](inputProps, e));
    }
  });
  return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
  originalHandler(data, index, e);
  return null;
};
var adaptEventsOfChild = (props, data, index) => {
  if (props === null || typeof props !== "object" && typeof props !== "function") {
    return null;
  }
  var out = null;
  Object.keys(props).forEach((key) => {
    var item = props[key];
    if (isEventKey(key) && typeof item === "function") {
      if (!out) out = {};
      out[key] = getEventHandlerOfChild(item, data, index);
    }
  });
  return out;
};
function ownKeys$H(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$H(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$H(Object(t), true).forEach(function(r2) {
      _defineProperty$K(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$H(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$K(e, r, t) {
  return (r = _toPropertyKey$K(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$K(t) {
  var i = _toPrimitive$K(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$K(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function resolveDefaultProps(realProps, defaultProps) {
  var resolvedProps = _objectSpread$H({}, realProps);
  var dp = defaultProps;
  var keys = Object.keys(defaultProps);
  var withDefaults = keys.reduce((acc, key) => {
    if (acc[key] === void 0 && dp[key] !== void 0) {
      acc[key] = dp[key];
    }
    return acc;
  }, resolvedProps);
  return withDefaults;
}
function _extends$t() {
  return _extends$t = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$t.apply(null, arguments);
}
function ownKeys$G(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$G(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$G(Object(t), true).forEach(function(r2) {
      _defineProperty$J(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$G(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$J(e, r, t) {
  return (r = _toPropertyKey$J(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$J(t) {
  var i = _toPrimitive$J(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$J(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var SIZE = 32;
var defaultLegendContentDefaultProps = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function getStrokeDasharray$1(input) {
  if (typeof input === "object" && input !== null && "strokeDasharray" in input) {
    return String(input.strokeDasharray);
  }
  return void 0;
}
function Icon(_ref2) {
  var data = _ref2.data, iconType = _ref2.iconType, inactiveColor = _ref2.inactiveColor;
  var halfSize = SIZE / 2;
  var sixthSize = SIZE / 6;
  var thirdSize = SIZE / 3;
  var color = data.inactive ? inactiveColor : data.color;
  var preferredIcon = iconType !== null && iconType !== void 0 ? iconType : data.type;
  if (preferredIcon === "none") {
    return null;
  }
  if (preferredIcon === "plainline") {
    return /* @__PURE__ */ reactExports.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: color,
      strokeDasharray: getStrokeDasharray$1(data.payload),
      x1: 0,
      y1: halfSize,
      x2: SIZE,
      y2: halfSize,
      className: "recharts-legend-icon"
    });
  }
  if (preferredIcon === "line") {
    return /* @__PURE__ */ reactExports.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: color,
      d: "M0,".concat(halfSize, "h").concat(thirdSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(2 * thirdSize, ",").concat(halfSize, "\n            H").concat(SIZE, "M").concat(2 * thirdSize, ",").concat(halfSize, "\n            A").concat(sixthSize, ",").concat(sixthSize, ",0,1,1,").concat(thirdSize, ",").concat(halfSize),
      className: "recharts-legend-icon"
    });
  }
  if (preferredIcon === "rect") {
    return /* @__PURE__ */ reactExports.createElement("path", {
      stroke: "none",
      fill: color,
      d: "M0,".concat(SIZE / 8, "h").concat(SIZE, "v").concat(SIZE * 3 / 4, "h").concat(-SIZE, "z"),
      className: "recharts-legend-icon"
    });
  }
  if (/* @__PURE__ */ reactExports.isValidElement(data.legendIcon)) {
    var iconProps = _objectSpread$G({}, data);
    delete iconProps.legendIcon;
    return /* @__PURE__ */ reactExports.cloneElement(data.legendIcon, iconProps);
  }
  return /* @__PURE__ */ reactExports.createElement(Symbols, {
    fill: color,
    cx: halfSize,
    cy: halfSize,
    size: SIZE,
    sizeType: "diameter",
    type: preferredIcon
  });
}
function Items(props) {
  var payload = props.payload, iconSize = props.iconSize, layout = props.layout, formatter = props.formatter, inactiveColor = props.inactiveColor, iconType = props.iconType, labelStyle = props.labelStyle;
  var viewBox = {
    x: 0,
    y: 0,
    width: SIZE,
    height: SIZE
  };
  var itemStyle = {
    display: layout === "horizontal" ? "inline-block" : "block",
    marginRight: 10,
    whiteSpace: "nowrap"
  };
  var svgStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return payload.map((entry, i) => {
    var _finalLabelStyle$whit, _finalLabelStyle$over;
    var finalFormatter = entry.formatter || formatter;
    var className = clsx({
      "recharts-legend-item": true,
      ["legend-item-".concat(i)]: true,
      inactive: entry.inactive
    });
    if (entry.type === "none") {
      return null;
    }
    var finalLabelStyle = typeof labelStyle === "object" ? _objectSpread$G({}, labelStyle) : {};
    finalLabelStyle.color = entry.inactive ? inactiveColor : finalLabelStyle.color || entry.color;
    (_finalLabelStyle$whit = finalLabelStyle.whiteSpace) !== null && _finalLabelStyle$whit !== void 0 ? _finalLabelStyle$whit : finalLabelStyle.whiteSpace = "normal";
    (_finalLabelStyle$over = finalLabelStyle.overflowWrap) !== null && _finalLabelStyle$over !== void 0 ? _finalLabelStyle$over : finalLabelStyle.overflowWrap = "break-word";
    var finalValue = finalFormatter ? finalFormatter(entry.value, entry, i) : entry.value;
    return /* @__PURE__ */ reactExports.createElement("li", _extends$t({
      className,
      style: itemStyle,
      key: "legend-item-".concat(i)
    }, adaptEventsOfChild(props, entry, i)), /* @__PURE__ */ reactExports.createElement(Surface, {
      width: iconSize,
      height: iconSize,
      viewBox,
      style: svgStyle,
      "aria-label": entry.value == null ? "legend icon" : "".concat(entry.value, " legend icon")
    }, /* @__PURE__ */ reactExports.createElement(Icon, {
      data: entry,
      iconType,
      inactiveColor
    })), /* @__PURE__ */ reactExports.createElement("span", {
      className: "recharts-legend-item-text",
      style: finalLabelStyle
    }, finalValue));
  });
}
var DefaultLegendContent = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, defaultLegendContentDefaultProps);
  var payload = props.payload, layout = props.layout, align = props.align;
  if (!payload || !payload.length) {
    return null;
  }
  var finalStyle = {
    padding: 0,
    margin: 0,
    textAlign: layout === "horizontal" ? align : "left"
  };
  return /* @__PURE__ */ reactExports.createElement("ul", {
    className: "recharts-default-legend",
    style: finalStyle
  }, /* @__PURE__ */ reactExports.createElement(Items, _extends$t({}, props, {
    payload
  })));
};
function getUniqPayload(payload, option, defaultUniqBy2) {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy2);
  }
  if (typeof option === "function") {
    return uniqBy(payload, option);
  }
  return payload;
}
var RechartsReduxContext = /* @__PURE__ */ reactExports.createContext(null);
var noopDispatch = (a) => a;
var useAppDispatch = () => {
  var context = reactExports.useContext(RechartsReduxContext);
  if (context) {
    return context.store.dispatch;
  }
  return noopDispatch;
};
var noop = () => {
};
var addNestedSubNoop = () => noop;
var refEquality = (a, b) => a === b;
function useAppSelector(selector) {
  var context = reactExports.useContext(RechartsReduxContext);
  var outOfContextSelector = reactExports.useMemo(() => {
    if (!context) {
      return noop;
    }
    return (state) => {
      if (state == null) {
        return void 0;
      }
      return selector(state);
    };
  }, [context, selector]);
  return withSelectorExports.useSyncExternalStoreWithSelector(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop, context ? context.store.getState : noop, outOfContextSelector, refEquality);
}
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
var selectLegendPayload = createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref2) => {
  var itemSorter = _ref2.itemSorter;
  var flat = payloads.flat(1);
  return itemSorter ? sortBy$1(flat, itemSorter) : flat;
});
function useLegendPayload() {
  return useAppSelector(selectLegendPayload);
}
function _slicedToArray$m(r, e) {
  return _arrayWithHoles$m(r) || _iterableToArrayLimit$m(r, e) || _unsupportedIterableToArray$m(r, e) || _nonIterableRest$m();
}
function _nonIterableRest$m() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$m(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$m(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$m(r, a) : void 0;
  }
}
function _arrayLikeToArray$m(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$m(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$m(r) {
  if (Array.isArray(r)) return r;
}
var EPS = 1;
function hasSignificantChange(a, b) {
  return Math.abs(a.height - b.height) > EPS || Math.abs(a.left - b.left) > EPS || Math.abs(a.top - b.top) > EPS || Math.abs(a.width - b.width) > EPS;
}
function readElementOffset(node) {
  var rect = node.getBoundingClientRect();
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width
  };
}
function useElementOffset() {
  var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var _useState = reactExports.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), _useState2 = _slicedToArray$m(_useState, 2), lastBoundingBox = _useState2[0], setLastBoundingBox = _useState2[1];
  var observerRef = reactExports.useRef(null);
  var lastBoundingBoxRef = reactExports.useRef(lastBoundingBox);
  lastBoundingBoxRef.current = lastBoundingBox;
  var updateBoundingBox = reactExports.useCallback(
    (node) => {
      if (observerRef.current != null) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (node != null) {
        var box = readElementOffset(node);
        if (hasSignificantChange(box, lastBoundingBoxRef.current)) {
          setLastBoundingBox(box);
        }
        if (typeof ResizeObserver !== "undefined") {
          var observer = new ResizeObserver(() => {
            var newBox = readElementOffset(node);
            if (hasSignificantChange(newBox, lastBoundingBoxRef.current)) {
              setLastBoundingBox(newBox);
            }
          });
          observer.observe(node);
          observerRef.current = observer;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...extraDependencies]
  );
  reactExports.useEffect(() => {
    return () => {
      var _observerRef$current;
      (_observerRef$current = observerRef.current) === null || _observerRef$current === void 0 || _observerRef$current.disconnect();
    };
  }, []);
  return [lastBoundingBox, updateBoundingBox];
}
var initialState$d = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
};
var chartLayoutSlice = createSlice({
  name: "chartLayout",
  initialState: initialState$d,
  reducers: {
    setLayout(state, action) {
      state.layoutType = action.payload;
    },
    setChartSize(state, action) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setMargin(state, action) {
      var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
      state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
      state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
      state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
      state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
    },
    setScale(state, action) {
      state.scale = action.payload;
    }
  }
});
var _chartLayoutSlice$act = chartLayoutSlice.actions, setMargin = _chartLayoutSlice$act.setMargin, setLayout = _chartLayoutSlice$act.setLayout, setChartSize = _chartLayoutSlice$act.setChartSize, setScale = _chartLayoutSlice$act.setScale;
var chartLayoutReducer = chartLayoutSlice.reducer;
function getSliced(arr, startIndex, endIndex) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (arr && startIndex + endIndex !== 0) {
    return arr.slice(startIndex, endIndex + 1);
  }
  return arr;
}
function isWellBehavedNumber(n) {
  return Number.isFinite(n);
}
function isPositiveNumber(n) {
  return typeof n === "number" && n > 0 && Number.isFinite(n);
}
function ownKeys$F(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$F(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$F(Object(t), true).forEach(function(r2) {
      _defineProperty$I(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$F(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$I(e, r, t) {
  return (r = _toPropertyKey$I(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$I(t) {
  var i = _toPrimitive$I(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$I(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
  if (isNullish(obj) || isNullish(dataKey)) {
    return defaultValue;
  }
  if (isNumOrStr(dataKey)) {
    return get(obj, dataKey, defaultValue);
  }
  if (typeof dataKey === "function") {
    return dataKey(obj);
  }
  return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
  if (legendSettings && legendSize) {
    var boxWidth = legendSize.width, boxHeight = legendSize.height;
    var align = legendSettings.align, verticalAlign = legendSettings.verticalAlign, layout = legendSettings.layout, position = legendSettings.position, _legendSettings$offse = legendSettings.offset, legendOffset = _legendSettings$offse === void 0 ? 0 : _legendSettings$offse;
    if (position != null) {
      if (isOutsidePosition(position)) {
        if (position === "top" && isNumber(offset.top)) {
          return _objectSpread$F(_objectSpread$F({}, offset), {}, {
            top: offset.top + (boxHeight || 0) + legendOffset
          });
        }
        if (position === "bottom" && isNumber(offset.bottom)) {
          return _objectSpread$F(_objectSpread$F({}, offset), {}, {
            bottom: offset.bottom + (boxHeight || 0) + legendOffset
          });
        }
        if (position === "left" && isNumber(offset.left)) {
          return _objectSpread$F(_objectSpread$F({}, offset), {}, {
            left: offset.left + (boxWidth || 0) + legendOffset
          });
        }
        if (position === "right" && isNumber(offset.right)) {
          return _objectSpread$F(_objectSpread$F({}, offset), {}, {
            right: offset.right + (boxWidth || 0) + legendOffset
          });
        }
      }
      return offset;
    }
    if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) {
      return _objectSpread$F(_objectSpread$F({}, offset), {}, {
        [align]: offset[align] + (boxWidth || 0)
      });
    }
    if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) {
      return _objectSpread$F(_objectSpread$F({}, offset), {}, {
        [verticalAlign]: offset[verticalAlign] + (boxHeight || 0)
      });
    }
  }
  return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
var getCoordinatesOfGrid = (ticks, minValue, maxValue, syncWithTicks) => {
  if (syncWithTicks) {
    return ticks.map((entry) => entry.coordinate);
  }
  var hasMin, hasMax;
  var values = ticks.map((entry) => {
    if (entry.coordinate === minValue) {
      hasMin = true;
    }
    if (entry.coordinate === maxValue) {
      hasMax = true;
    }
    return entry.coordinate;
  });
  if (!hasMin) {
    values.push(minValue);
  }
  if (!hasMax) {
    values.push(maxValue);
  }
  return values;
};
var getTicksOfAxis = (axis, isGrid, isAll) => {
  if (!axis) {
    return null;
  }
  var duplicateDomain = axis.duplicateDomain, type = axis.type, range2 = axis.range, scale = axis.scale, realScaleType = axis.realScaleType, isCategorical = axis.isCategorical, categoricalDomain = axis.categoricalDomain, tickCount = axis.tickCount, ticks = axis.ticks, niceTicks = axis.niceTicks, axisType = axis.axisType;
  if (!scale) {
    return null;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 && range2.length >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (ticks || niceTicks) {
    var result = (ticks || niceTicks || []).map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scaled + offset,
        value: entry,
        offset,
        index
      };
    }).filter(isNotNil);
    return result;
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks && true && tickCount != null) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var truncateByDomain = (value, domain) => {
  if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) {
    return value;
  }
  var minValue = Math.min(domain[0], domain[1]);
  var maxValue = Math.max(domain[0], domain[1]);
  var result = [value[0], value[1]];
  if (!isNumber(value[0]) || value[0] < minValue) {
    result[0] = minValue;
  }
  if (!isNumber(value[1]) || value[1] > maxValue) {
    result[1] = maxValue;
  }
  if (result[0] > maxValue) {
    result[0] = maxValue;
  }
  if (result[1] < minValue) {
    result[1] = minValue;
  }
  return result;
};
var offsetSign = (series) => {
  var _series$;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var series1 = col[1];
      var series0 = col[0];
      var value = isNan(series1) ? series0 : series1;
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = negative;
        negative += value;
        col[1] = negative;
      }
    }
  }
};
var offsetPositive = (series) => {
  var _series$2;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$2 = series[0]) === null || _series$2 === void 0 ? void 0 : _series$2.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var value = isNan(col[1]) ? col[0] : col[1];
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = 0;
        col[1] = 0;
      }
    }
  }
};
var STACK_OFFSET_MAP = {
  sign: offsetSign,
  // @ts-expect-error definitelytyped types are incorrect
  expand: stackOffsetExpand,
  // @ts-expect-error definitelytyped types are incorrect
  none: stackOffsetNone,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: stackOffsetSilhouette,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
  var _STACK_OFFSET_MAP$off;
  var offsetAccessor = (_STACK_OFFSET_MAP$off = STACK_OFFSET_MAP[offsetType]) !== null && _STACK_OFFSET_MAP$off !== void 0 ? _STACK_OFFSET_MAP$off : stackOffsetNone;
  var stack = shapeStack().keys(dataKeys).value((d, key) => Number(getValueByDataKey(d, key, 0))).order(stackOrderNone).offset(offsetAccessor);
  var result = stack(data);
  result.forEach((series, seriesIndex) => {
    series.forEach((point, pointIndex) => {
      var value = getValueByDataKey(data[pointIndex], dataKeys[seriesIndex], 0);
      if (Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1])) {
        point[0] = value[0];
        point[1] = value[1];
      }
    });
  });
  return result;
};
function getNormalizedStackId(publicStackId) {
  return publicStackId == null ? void 0 : String(publicStackId);
}
function getCateCoordinateOfLine(_ref2) {
  var axis = _ref2.axis, ticks = _ref2.ticks, bandSize = _ref2.bandSize, entry = _ref2.entry, index = _ref2.index, dataKey = _ref2.dataKey;
  if (axis.type === "category") {
    if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullish(entry[axis.dataKey])) {
      var matchedTick = findEntryInArray(ticks, "value", entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks !== null && ticks !== void 0 && ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
  }
  var value = getValueByDataKey(entry, !isNullish(dataKey) ? dataKey : axis.dataKey);
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled;
}
var getCateCoordinateOfBar = (_ref2) => {
  var axis = _ref2.axis, ticks = _ref2.ticks, offset = _ref2.offset, bandSize = _ref2.bandSize, entry = _ref2.entry, index = _ref2.index;
  if (axis.type === "category") {
    return ticks[index] ? ticks[index].coordinate + offset : null;
  }
  var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
  if (isNullish(value)) {
    return null;
  }
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled - bandSize / 2 + offset;
};
var getBaseValueOfBar = (_ref3) => {
  var numericAxis = _ref3.numericAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var minValue = Math.min(domain[0], domain[1]);
    var maxValue = Math.max(domain[0], domain[1]);
    if (minValue <= 0 && maxValue >= 0) {
      return 0;
    }
    if (maxValue < 0) {
      return maxValue;
    }
    return minValue;
  }
  return domain[0];
};
var getDomainOfSingle = (data) => {
  var flat = data.flat(2).filter(isNumber);
  return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
  return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
  if (stackGroups == null || Object.keys(stackGroups).length === 0) {
    return void 0;
  }
  return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
    var group = stackGroups[stackId];
    if (!group) {
      return result;
    }
    var stackedData = group.stackedData;
    var domain = stackedData.reduce((res, entry) => {
      var sliced = getSliced(entry, startIndex, endIndex);
      var s = getDomainOfSingle(sliced);
      if (!isWellBehavedNumber(s[0]) || !isWellBehavedNumber(s[1])) {
        return res;
      }
      return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
    }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks, isBar) => {
  if (axis && axis.scale && axis.scale.bandwidth) {
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks && ticks.length >= 2) {
    var orderedTicks = sortBy$1(ticks, (o) => o.coordinate);
    var gaps = [];
    var maxGap = 0;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var _orderedTicks$i, _orderedTicks;
      var gap = (((_orderedTicks$i = orderedTicks[i]) === null || _orderedTicks$i === void 0 ? void 0 : _orderedTicks$i.coordinate) || 0) - (((_orderedTicks = orderedTicks[i - 1]) === null || _orderedTicks === void 0 ? void 0 : _orderedTicks.coordinate) || 0);
      gaps.push(gap);
      maxGap = Math.max(gap, maxGap);
    }
    var minMeaningfulGap = maxGap * 1e-4;
    var bandSize = Infinity;
    for (var _gap of gaps) {
      if (_gap > minMeaningfulGap) {
        bandSize = Math.min(_gap, bandSize);
      }
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
  var tooltipEntrySettings = _ref4.tooltipEntrySettings, dataKey = _ref4.dataKey, payload = _ref4.payload, value = _ref4.value, name = _ref4.name;
  return _objectSpread$F(_objectSpread$F({}, tooltipEntrySettings), {}, {
    dataKey,
    payload,
    value,
    name
  });
}
function getTooltipNameProp(nameFromItem, dataKey) {
  if (nameFromItem != null) {
    return String(nameFromItem);
  }
  if (typeof dataKey === "string") {
    return dataKey;
  }
  return void 0;
}
var calculateCartesianTooltipPos = (coordinate, layout) => {
  if (layout === "horizontal") {
    return coordinate.relativeX;
  }
  if (layout === "vertical") {
    return coordinate.relativeY;
  }
  return void 0;
};
var calculatePolarTooltipPos = (rangeObj, layout) => {
  if (layout === "centric") {
    return rangeObj.angle;
  }
  return rangeObj.radius;
};
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
  return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
  return Object.values(yAxisMap);
});
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
var DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME = "data-recharts-item-id";
var DEFAULT_Y_AXIS_WIDTH = 60;
var DEFAULT_X_AXIS_HEIGHT = 30;
function ownKeys$E(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$E(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$E(Object(t), true).forEach(function(r2) {
      _defineProperty$H(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$E(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$H(e, r, t) {
  return (r = _toPropertyKey$H(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$H(t) {
  var i = _toPrimitive$H(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$H(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "left" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectRightAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "right" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectTopAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "top" && !entry.mirror && !entry.hide) {
      var height = typeof entry.height === "number" ? entry.height : DEFAULT_X_AXIS_HEIGHT;
      return result + height;
    }
    return result;
  }, 0);
}
function selectBottomAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) {
      var height = typeof entry.height === "number" ? entry.height : DEFAULT_X_AXIS_HEIGHT;
      return result + height;
    }
    return result;
  }, 0);
}
var selectChartOffsetInternal = createSelector([selectChartWidth, selectChartHeight, selectMargin, selectBrushHeight, selectLeftAxesOffset, selectRightAxesOffset, selectTopAxesOffset, selectBottomAxesOffset, selectLegendSettings, selectLegendSize], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
  var offsetH = {
    left: (margin.left || 0) + leftAxesOffset,
    right: (margin.right || 0) + rightAxesOffset
  };
  var offsetV = {
    top: (margin.top || 0) + topAxesOffset,
    bottom: (margin.bottom || 0) + bottomAxesOffset
  };
  var offset = _objectSpread$E(_objectSpread$E({}, offsetV), offsetH);
  var brushBottom = offset.bottom;
  offset.bottom += brushHeight;
  offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
  var offsetWidth = chartWidth - offset.left - offset.right;
  var offsetHeight = chartHeight - offset.top - offset.bottom;
  return _objectSpread$E(_objectSpread$E({
    brushBottom
  }, offset), {}, {
    // never return negative values for height and width
    width: Math.max(offsetWidth, 0),
    height: Math.max(offsetHeight, 0)
  });
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
  x: offset.left,
  y: offset.top,
  width: offset.width,
  height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
  x: 0,
  y: 0,
  width,
  height
}));
var PanoramaContext = /* @__PURE__ */ reactExports.createContext(null);
var useIsPanorama = () => reactExports.useContext(PanoramaContext) != null;
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([selectBrushSettings, selectChartOffsetInternal, selectMargin], (brushSettings, offset, margin) => ({
  height: brushSettings.height,
  x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
  y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
  width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
var warn = function warn2(condition, format) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  if (typeof console !== "undefined" && console.warn) {
    if (format === void 0) {
      console.warn("LogUtils requires an error message argument");
    }
    if (!condition) {
      if (format === void 0) {
        console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var argIndex = 0;
        console.warn(format.replace(/%s/g, () => args[argIndex++]));
      }
    }
  }
};
var defaultResponsiveContainerProps = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
};
var calculateChartDimensions = (containerWidth, containerHeight, props) => {
  var _props$width = props.width, width = _props$width === void 0 ? defaultResponsiveContainerProps.width : _props$width, _props$height = props.height, height = _props$height === void 0 ? defaultResponsiveContainerProps.height : _props$height, aspect = props.aspect, maxHeight = props.maxHeight;
  var calculatedWidth = isPercent(width) ? containerWidth : Number(width);
  var calculatedHeight = isPercent(height) ? containerHeight : Number(height);
  if (aspect && aspect > 0) {
    if (calculatedWidth) {
      calculatedHeight = calculatedWidth / aspect;
    } else if (calculatedHeight) {
      calculatedWidth = calculatedHeight * aspect;
    }
    if (maxHeight && calculatedHeight != null && calculatedHeight > maxHeight) {
      calculatedHeight = maxHeight;
    }
  }
  return {
    calculatedWidth,
    calculatedHeight
  };
};
var bothOverflow = {
  width: 0,
  height: 0,
  overflow: "visible"
};
var overflowX = {
  width: 0,
  overflowX: "visible"
};
var overflowY = {
  height: 0,
  overflowY: "visible"
};
var noStyle = {};
var getInnerDivStyle = (props) => {
  var width = props.width, height = props.height;
  var isWidthPercent = isPercent(width);
  var isHeightPercent = isPercent(height);
  if (isWidthPercent && isHeightPercent) {
    return bothOverflow;
  }
  if (isWidthPercent) {
    return overflowX;
  }
  if (isHeightPercent) {
    return overflowY;
  }
  return noStyle;
};
function getDefaultWidthAndHeight(_ref2) {
  var width = _ref2.width, height = _ref2.height, aspect = _ref2.aspect;
  var calculatedWidth = width;
  var calculatedHeight = height;
  if (calculatedWidth === void 0 && calculatedHeight === void 0) {
    calculatedWidth = defaultResponsiveContainerProps.width;
    calculatedHeight = defaultResponsiveContainerProps.height;
  } else if (calculatedWidth === void 0) {
    calculatedWidth = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.width;
  } else if (calculatedHeight === void 0) {
    calculatedHeight = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.height;
  }
  return {
    width: calculatedWidth,
    height: calculatedHeight
  };
}
var _excluded$p = ["aspect", "initialDimension", "width", "height", "minWidth", "minHeight", "maxHeight", "children", "debounce", "id", "className", "onResize", "style"];
function _extends$s() {
  return _extends$s = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$s.apply(null, arguments);
}
function ownKeys$D(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$D(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$D(Object(t), true).forEach(function(r2) {
      _defineProperty$G(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$D(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$G(e, r, t) {
  return (r = _toPropertyKey$G(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$G(t) {
  var i = _toPrimitive$G(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$G(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$l(r, e) {
  return _arrayWithHoles$l(r) || _iterableToArrayLimit$l(r, e) || _unsupportedIterableToArray$l(r, e) || _nonIterableRest$l();
}
function _nonIterableRest$l() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$l(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$l(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$l(r, a) : void 0;
  }
}
function _arrayLikeToArray$l(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$l(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$l(r) {
  if (Array.isArray(r)) return r;
}
function _objectWithoutProperties$p(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$p(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$p(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var ResponsiveContainerContext = /* @__PURE__ */ reactExports.createContext(defaultResponsiveContainerProps.initialDimension);
function isAcceptableSize(size) {
  return isPositiveNumber(size.width) && isPositiveNumber(size.height);
}
function ResponsiveContainerContextProvider(_ref2) {
  var children = _ref2.children, width = _ref2.width, height = _ref2.height;
  var size = reactExports.useMemo(() => ({
    width,
    height
  }), [width, height]);
  if (!isAcceptableSize(size)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContext.Provider, {
    value: size
  }, children);
}
var useResponsiveContainerContext = () => reactExports.useContext(ResponsiveContainerContext);
var SizeDetectorContainer = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var aspect = _ref2.aspect, _ref2$initialDimensio = _ref2.initialDimension, initialDimension = _ref2$initialDimensio === void 0 ? defaultResponsiveContainerProps.initialDimension : _ref2$initialDimensio, width = _ref2.width, height = _ref2.height, _ref2$minWidth = _ref2.minWidth, minWidth = _ref2$minWidth === void 0 ? defaultResponsiveContainerProps.minWidth : _ref2$minWidth, minHeight = _ref2.minHeight, maxHeight = _ref2.maxHeight, children = _ref2.children, _ref2$debounce = _ref2.debounce, debounce = _ref2$debounce === void 0 ? defaultResponsiveContainerProps.debounce : _ref2$debounce, id = _ref2.id, className = _ref2.className, onResize = _ref2.onResize, _ref2$style = _ref2.style, style = _ref2$style === void 0 ? {} : _ref2$style, others = _objectWithoutProperties$p(_ref2, _excluded$p);
  var containerRef = reactExports.useRef(null);
  var onResizeRef = reactExports.useRef();
  onResizeRef.current = onResize;
  reactExports.useImperativeHandle(ref, () => containerRef.current);
  var _useState = reactExports.useState({
    containerWidth: initialDimension.width,
    containerHeight: initialDimension.height
  }), _useState2 = _slicedToArray$l(_useState, 2), sizes = _useState2[0], setSizes = _useState2[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  reactExports.useEffect(() => {
    if (containerRef.current == null || typeof ResizeObserver === "undefined") {
      return noop$1;
    }
    var callback = (entries) => {
      var _onResizeRef$current;
      var entry = entries[0];
      if (entry == null) {
        return;
      }
      var _entry$contentRect = entry.contentRect, containerWidth3 = _entry$contentRect.width, containerHeight3 = _entry$contentRect.height;
      setContainerSize(containerWidth3, containerHeight3);
      (_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth3, containerHeight3);
    };
    if (debounce > 0) {
      callback = throttle(callback, debounce, {
        trailing: true,
        leading: false
      });
    }
    var observer = new ResizeObserver(callback);
    var _containerRef$current = containerRef.current.getBoundingClientRect(), containerWidth2 = _containerRef$current.width, containerHeight2 = _containerRef$current.height;
    setContainerSize(containerWidth2, containerHeight2);
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce]);
  var containerWidth = sizes.containerWidth, containerHeight = sizes.containerHeight;
  warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
  var _calculateChartDimens = calculateChartDimensions(containerWidth, containerHeight, {
    width,
    height,
    aspect,
    maxHeight
  }), calculatedWidth = _calculateChartDimens.calculatedWidth, calculatedHeight = _calculateChartDimens.calculatedHeight;
  warn(containerWidth < 0 || containerHeight < 0 || calculatedWidth != null && calculatedWidth > 0 || calculatedHeight != null && calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
  return /* @__PURE__ */ reactExports.createElement("div", _extends$s({
    id: id ? "".concat(id) : void 0,
    className: clsx("recharts-responsive-container", className),
    style: _objectSpread$D(_objectSpread$D({}, style), {}, {
      width,
      height,
      minWidth,
      minHeight,
      maxHeight
    }),
    ref: containerRef
  }, others), /* @__PURE__ */ reactExports.createElement("div", {
    style: getInnerDivStyle({
      width,
      height
    })
  }, /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContextProvider, {
    width: calculatedWidth,
    height: calculatedHeight
  }, children)));
});
var ResponsiveContainer = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var responsiveContainerContext = useResponsiveContainerContext();
  if (isPositiveNumber(responsiveContainerContext.width) && isPositiveNumber(responsiveContainerContext.height)) {
    return props.children;
  }
  var _getDefaultWidthAndHe = getDefaultWidthAndHeight({
    width: props.width,
    height: props.height,
    aspect: props.aspect
  }), width = _getDefaultWidthAndHe.width, height = _getDefaultWidthAndHe.height;
  var _calculateChartDimens2 = calculateChartDimensions(void 0, void 0, {
    width,
    height,
    aspect: props.aspect,
    maxHeight: props.maxHeight
  }), calculatedWidth = _calculateChartDimens2.calculatedWidth, calculatedHeight = _calculateChartDimens2.calculatedHeight;
  if (isNumber(calculatedWidth) && isNumber(calculatedHeight)) {
    return /* @__PURE__ */ reactExports.createElement(ResponsiveContainerContextProvider, {
      width: calculatedWidth,
      height: calculatedHeight
    }, props.children);
  }
  return /* @__PURE__ */ reactExports.createElement(SizeDetectorContainer, _extends$s({}, props, {
    width,
    height,
    ref
  }));
});
var useViewBox = () => {
  var _useAppSelector;
  var panorama = useIsPanorama();
  var rootViewBox = useAppSelector(selectChartViewBox);
  var brushDimensions = useAppSelector(selectBrushDimensions);
  var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
  if (!panorama || !brushDimensions || !brushPadding) {
    return rootViewBox;
  }
  return {
    width: brushDimensions.width - brushPadding.left - brushPadding.right,
    height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
    x: brushPadding.left,
    y: brushPadding.top
  };
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
};
var useOffsetInternal = () => {
  var _useAppSelector2;
  return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = () => {
  return useAppSelector(selectChartWidth);
};
var useChartHeight = () => {
  return useAppSelector(selectChartHeight);
};
var useMargin = () => {
  return useAppSelector((state) => state.layout.margin);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var useCartesianChartLayout = () => {
  var layout = useChartLayout();
  if (layout === "horizontal" || layout === "vertical") {
    return layout;
  }
  return void 0;
};
var selectPolarChartLayout = (state) => {
  var layout = state.layout.layoutType;
  if (layout === "centric" || layout === "radial") {
    return layout;
  }
  return void 0;
};
var usePolarChartLayout = () => {
  return useAppSelector(selectPolarChartLayout);
};
var useIsInChartContext = () => {
  var layout = useChartLayout();
  return layout !== void 0;
};
var ReportChartSize = (props) => {
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var widthFromProps = props.width, heightFromProps = props.height;
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = widthFromProps;
  var height = heightFromProps;
  if (responsiveContainerCalculations) {
    width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
    height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
  }
  reactExports.useEffect(() => {
    if (!isPanorama && isPositiveNumber(width) && isPositiveNumber(height)) {
      dispatch(setChartSize({
        width,
        height
      }));
    }
  }, [dispatch, isPanorama, width, height]);
  return null;
};
var initialState$c = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
    itemSorter: "value",
    position: void 0,
    offset: 0
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
};
var legendSlice = createSlice({
  name: "legend",
  initialState: initialState$c,
  reducers: {
    setLegendSize(state, action) {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setLegendSettings(state, action) {
      state.settings.align = action.payload.align;
      state.settings.layout = action.payload.layout;
      state.settings.verticalAlign = action.payload.verticalAlign;
      state.settings.itemSorter = action.payload.itemSorter;
      state.settings.position = action.payload.position;
      state.settings.offset = action.payload.offset;
    },
    addLegendPayload: {
      reducer(state, action) {
        state.payload.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceLegendPayload: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).payload.indexOf(castDraft(prev));
        if (index > -1) {
          state.payload[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeLegendPayload: {
      reducer(state, action) {
        var index = current(state).payload.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.payload.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _legendSlice$actions = legendSlice.actions, setLegendSize = _legendSlice$actions.setLegendSize, setLegendSettings = _legendSlice$actions.setLegendSettings, addLegendPayload = _legendSlice$actions.addLegendPayload, replaceLegendPayload = _legendSlice$actions.replaceLegendPayload, removeLegendPayload = _legendSlice$actions.removeLegendPayload;
var legendReducer = legendSlice.reducer;
var propsToShallowCompare = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function sameValueZero(x, y) {
  if (x == null && y == null) {
    return true;
  }
  if (typeof x === "number" && typeof y === "number") {
    return x === y || x !== x && y !== y;
  }
  return x === y;
}
function propsAreEqual(prevProps, nextProps) {
  var allKeys = /* @__PURE__ */ new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (var key of allKeys) {
    if (propsToShallowCompare.has(key)) {
      if (prevProps[key] == null && nextProps[key] == null) {
        continue;
      }
      if (!shallowEqual(prevProps[key], nextProps[key])) {
        return false;
      }
    } else if (!sameValueZero(prevProps[key], nextProps[key])) {
      return false;
    }
  }
  return true;
}
var selectLegendArea = createSelector([selectChartWidth, selectChartHeight, selectMargin], (chartWidth, chartHeight, margin) => {
  return {
    x: margin.left || 0,
    y: margin.top || 0,
    width: Math.max(chartWidth - (margin.left || 0) - (margin.right || 0), 0),
    height: Math.max(chartHeight - (margin.top || 0) - (margin.bottom || 0), 0)
  };
});
function cartesianPositionToCSSTranslate(horizontalPosition, verticalPosition) {
  var _verticalValues$verti;
  if (horizontalPosition === "start" && verticalPosition === "start") {
    return "";
  }
  var horizontalValues = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  };
  var verticalValues = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  };
  var x = horizontalPosition === "inherit" ? "0" : horizontalValues[horizontalPosition];
  var y = (_verticalValues$verti = verticalValues[verticalPosition]) !== null && _verticalValues$verti !== void 0 ? _verticalValues$verti : "0";
  return "translate(".concat(x, ", ").concat(y, ")");
}
var _excluded$o = ["contextPayload"];
function _extends$r() {
  return _extends$r = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$r.apply(null, arguments);
}
function _slicedToArray$k(r, e) {
  return _arrayWithHoles$k(r) || _iterableToArrayLimit$k(r, e) || _unsupportedIterableToArray$k(r, e) || _nonIterableRest$k();
}
function _nonIterableRest$k() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$k(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$k(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$k(r, a) : void 0;
  }
}
function _arrayLikeToArray$k(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$k(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$k(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$C(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$C(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$C(Object(t), true).forEach(function(r2) {
      _defineProperty$F(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$C(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$F(e, r, t) {
  return (r = _toPropertyKey$F(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$F(t) {
  var i = _toPrimitive$F(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$F(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$o(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$o(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$o(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function defaultUniqBy$1(entry) {
  return entry.value;
}
function LegendContent(props) {
  var contextPayload = props.contextPayload, otherProps = _objectWithoutProperties$o(props, _excluded$o);
  var finalPayload = getUniqPayload(contextPayload, props.payloadUniqBy, defaultUniqBy$1);
  var contentProps = _objectSpread$C(_objectSpread$C({}, otherProps), {}, {
    payload: finalPayload
  });
  if (/* @__PURE__ */ reactExports.isValidElement(props.content)) {
    return /* @__PURE__ */ reactExports.cloneElement(props.content, contentProps);
  }
  if (typeof props.content === "function") {
    return /* @__PURE__ */ reactExports.createElement(props.content, contentProps);
  }
  return /* @__PURE__ */ reactExports.createElement(DefaultLegendContent, contentProps);
}
function getLayoutForPosition(position) {
  if (position === "left" || position === "right" || position === "insideLeft" || position === "insideRight") {
    return "vertical";
  }
  return "horizontal";
}
function selectPositionViewBox(state, position) {
  if (position == null) {
    return null;
  }
  return isOutsidePosition(position) ? selectLegendArea(state) : selectChartViewBox(state);
}
function getOutsidePositionOffset(position, offset, box) {
  if (position === "top") {
    return {
      top: box.height + offset
    };
  }
  if (position === "bottom") {
    return {
      top: -box.height - offset
    };
  }
  if (position === "left") {
    return {
      left: box.width + offset
    };
  }
  if (position === "right") {
    return {
      left: -box.width - offset
    };
  }
  return {};
}
function getDefaultPosition(style, props, margin, chartWidth, chartHeight, box) {
  var layout = props.layout, align = props.align, verticalAlign = props.verticalAlign;
  var hPos, vPos;
  if (!style || (style.left === void 0 || style.left === null) && (style.right === void 0 || style.right === null)) {
    if (align === "center" && layout === "vertical") {
      hPos = {
        left: ((chartWidth || 0) - box.width) / 2
      };
    } else {
      hPos = align === "right" ? {
        right: margin && margin.right || 0
      } : {
        left: margin && margin.left || 0
      };
    }
  }
  if (!style || (style.top === void 0 || style.top === null) && (style.bottom === void 0 || style.bottom === null)) {
    if (verticalAlign === "middle") {
      vPos = {
        top: ((chartHeight || 0) - box.height) / 2
      };
    } else {
      vPos = verticalAlign === "bottom" ? {
        bottom: margin && margin.bottom || 0
      } : {
        top: margin && margin.top || 0
      };
    }
  }
  return _objectSpread$C(_objectSpread$C({}, hPos), vPos);
}
function LegendSettingsDispatcher(_ref2) {
  var align = _ref2.align, layout = _ref2.layout, verticalAlign = _ref2.verticalAlign, itemSorter = _ref2.itemSorter, position = _ref2.position, offset = _ref2.offset;
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    dispatch(setLegendSettings({
      align,
      layout,
      verticalAlign,
      itemSorter,
      position,
      offset
    }));
  }, [dispatch, align, layout, verticalAlign, itemSorter, position, offset]);
  return null;
}
function LegendSizeDispatcher(_ref2) {
  var width = _ref2.width, height = _ref2.height;
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    dispatch(setLegendSize({
      width,
      height
    }));
  }, [dispatch, width, height]);
  reactExports.useLayoutEffect(() => {
    return () => {
      dispatch(setLegendSize({
        width: 0,
        height: 0
      }));
    };
  }, [dispatch]);
  return null;
}
function getWidthOrHeight(layout, height, width, maxWidth) {
  if (layout === "vertical" && height != null) {
    return {
      height
    };
  }
  if (layout === "horizontal") {
    return {
      width: width || maxWidth
    };
  }
  return null;
}
var legendDefaultProps = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  labelStyle: {},
  layout: "auto",
  verticalAlign: "bottom",
  offset: 0
};
function LegendImpl(outsideProps) {
  var _props$offset, _props$offset2, _positionViewBox$widt, _positionViewBox$widt2, _positionViewBox$heig, _positionViewBox$heig2, _outsidePositionOffse, _outsidePositionOffse2;
  var props = resolveDefaultProps(outsideProps, legendDefaultProps);
  var layout = outsideProps.layout && outsideProps.layout !== "auto" ? outsideProps.layout : getLayoutForPosition(props.position);
  var contextPayload = useLegendPayload();
  var legendPortalFromContext = useLegendPortal();
  var margin = useMargin();
  var positionViewBox = useAppSelector((state) => selectPositionViewBox(state, props.position));
  var widthFromProps = props.width, heightFromProps = props.height, wrapperStyle = props.wrapperStyle, portalFromProps = props.portal;
  var shouldReportDimensions = portalFromProps == null && (props.position == null || isOutsidePosition(props.position));
  var _useElementOffset = useElementOffset([contextPayload]), _useElementOffset2 = _slicedToArray$k(_useElementOffset, 2), lastBoundingBox = _useElementOffset2[0], updateBoundingBox = _useElementOffset2[1];
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  if (chartWidth == null || chartHeight == null || props.position != null && positionViewBox == null) {
    return null;
  }
  var maxWidth = chartWidth - ((margin === null || margin === void 0 ? void 0 : margin.left) || 0) - ((margin === null || margin === void 0 ? void 0 : margin.right) || 0);
  var widthOrHeight = getWidthOrHeight(layout, heightFromProps, widthFromProps, maxWidth);
  var positionResult = props.position == null ? null : getCartesianPosition({
    /*
     * When calculating the position we use two different view boxes.
     * Inside positions use the plot area; outside positions use the margin-inset
     * chart area, placing the Legend beyond any axes.
     */
    viewBox: positionViewBox !== null && positionViewBox !== void 0 ? positionViewBox : {
      x: 0,
      y: 0,
      width: chartWidth,
      height: chartHeight
    },
    position: props.position,
    offset: (_props$offset = props.offset) !== null && _props$offset !== void 0 ? _props$offset : 0
  });
  var outsidePositionOffset = getOutsidePositionOffset(props.position, (_props$offset2 = props.offset) !== null && _props$offset2 !== void 0 ? _props$offset2 : 0, lastBoundingBox);
  var positionMaxWidth = layout === "vertical" ? ((_positionViewBox$widt = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.width) !== null && _positionViewBox$widt !== void 0 ? _positionViewBox$widt : 0) / 2 : (_positionViewBox$widt2 = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.width) !== null && _positionViewBox$widt2 !== void 0 ? _positionViewBox$widt2 : 0;
  var positionMaxHeight = layout === "horizontal" ? ((_positionViewBox$heig = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.height) !== null && _positionViewBox$heig !== void 0 ? _positionViewBox$heig : 0) / 2 : (_positionViewBox$heig2 = positionViewBox === null || positionViewBox === void 0 ? void 0 : positionViewBox.height) !== null && _positionViewBox$heig2 !== void 0 ? _positionViewBox$heig2 : 0;
  var positionStyle = positionResult ? {
    width: "max-content",
    height: "max-content",
    maxWidth: positionMaxWidth,
    maxHeight: positionMaxHeight,
    overflowY: "auto",
    top: positionResult.y + ((_outsidePositionOffse = outsidePositionOffset.top) !== null && _outsidePositionOffse !== void 0 ? _outsidePositionOffse : 0),
    left: positionResult.x + ((_outsidePositionOffse2 = outsidePositionOffset.left) !== null && _outsidePositionOffse2 !== void 0 ? _outsidePositionOffse2 : 0),
    transform: cartesianPositionToCSSTranslate(positionResult.horizontalAnchor, positionResult.verticalAnchor)
  } : getDefaultPosition(wrapperStyle, props, margin, chartWidth, chartHeight, lastBoundingBox);
  var outerStyle = portalFromProps ? wrapperStyle : _objectSpread$C(_objectSpread$C({
    position: "absolute",
    width: (widthOrHeight === null || widthOrHeight === void 0 ? void 0 : widthOrHeight.width) || widthFromProps || "auto",
    height: (widthOrHeight === null || widthOrHeight === void 0 ? void 0 : widthOrHeight.height) || heightFromProps || "auto"
  }, positionStyle), wrapperStyle);
  var legendPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : legendPortalFromContext;
  if (legendPortal == null || contextPayload == null) {
    return null;
  }
  var legendElement = /* @__PURE__ */ reactExports.createElement("div", {
    className: "recharts-legend-wrapper",
    style: outerStyle,
    ref: updateBoundingBox
  }, /* @__PURE__ */ reactExports.createElement(LegendSettingsDispatcher, {
    layout,
    align: props.align,
    verticalAlign: props.verticalAlign,
    itemSorter: props.itemSorter,
    position: props.position,
    offset: props.offset
  }), shouldReportDimensions && /* @__PURE__ */ reactExports.createElement(LegendSizeDispatcher, lastBoundingBox), /* @__PURE__ */ reactExports.createElement(LegendContent, _extends$r({}, props, {
    layout
  }, widthOrHeight, {
    margin,
    chartWidth,
    chartHeight,
    contextPayload
  })));
  return /* @__PURE__ */ reactDomExports.createPortal(legendElement, legendPortal);
}
var Legend = /* @__PURE__ */ reactExports.memo(LegendImpl, propsAreEqual);
Legend.displayName = "Legend";
function _extends$q() {
  return _extends$q = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$q.apply(null, arguments);
}
function ownKeys$B(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$B(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$B(Object(t), true).forEach(function(r2) {
      _defineProperty$E(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$B(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$E(e, r, t) {
  return (r = _toPropertyKey$E(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$E(t) {
  var i = _toPrimitive$E(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$E(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$j(r, e) {
  return _arrayWithHoles$j(r) || _iterableToArrayLimit$j(r, e) || _unsupportedIterableToArray$j(r, e) || _nonIterableRest$j();
}
function _nonIterableRest$j() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$j(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$j(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$j(r, a) : void 0;
  }
}
function _arrayLikeToArray$j(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$j(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$j(r) {
  if (Array.isArray(r)) return r;
}
function defaultFormatter(value) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var defaultDefaultTooltipContentProps = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: false
};
function lodashLikeSortBy(array, itemSorter) {
  if (itemSorter == null) {
    return array;
  }
  return sortBy$1(array, itemSorter);
}
var DefaultTooltipContent = (props) => {
  var _props$separator = props.separator, separator = _props$separator === void 0 ? defaultDefaultTooltipContentProps.separator : _props$separator, contentStyle = props.contentStyle, itemStyle = props.itemStyle, _props$labelStyle = props.labelStyle, labelStyle = _props$labelStyle === void 0 ? defaultDefaultTooltipContentProps.labelStyle : _props$labelStyle, payload = props.payload, formatter = props.formatter, itemSorter = props.itemSorter, wrapperClassName = props.wrapperClassName, labelClassName = props.labelClassName, label = props.label, labelFormatter = props.labelFormatter, _props$accessibilityL = props.accessibilityLayer, accessibilityLayer = _props$accessibilityL === void 0 ? defaultDefaultTooltipContentProps.accessibilityLayer : _props$accessibilityL;
  var renderContent2 = () => {
    if (payload && payload.length) {
      var listStyle = {
        padding: 0,
        margin: 0
      };
      var sortedPayload = lodashLikeSortBy(payload, itemSorter);
      var items = sortedPayload.map((entry, i) => {
        if (!entry || entry.type === "none") {
          return null;
        }
        var finalFormatter = entry.formatter || formatter || defaultFormatter;
        var value = entry.value, name = entry.name;
        var finalValue = value;
        var finalName = name;
        if (finalFormatter) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if (Array.isArray(formatted)) {
            var _formatted = _slicedToArray$j(formatted, 2);
            finalValue = _formatted[0];
            finalName = _formatted[1];
          } else if (formatted != null) {
            finalValue = formatted;
          } else {
            return null;
          }
        }
        var finalItemStyle = _objectSpread$B(_objectSpread$B({}, defaultDefaultTooltipContentProps.itemStyle), {}, {
          color: entry.color || defaultDefaultTooltipContentProps.itemStyle.color
        }, itemStyle);
        return /* @__PURE__ */ reactExports.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(i),
          style: finalItemStyle
        }, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, separator) : null, /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, finalValue), /* @__PURE__ */ reactExports.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, entry.unit || ""));
      });
      return /* @__PURE__ */ reactExports.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: listStyle
      }, items);
    }
    return null;
  };
  var finalStyle = _objectSpread$B(_objectSpread$B({}, defaultDefaultTooltipContentProps.contentStyle), contentStyle);
  var finalLabelStyle = _objectSpread$B({
    margin: 0
  }, labelStyle);
  var hasLabel = !isNullish(label);
  var finalLabel = hasLabel ? label : "";
  var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
  var labelCN = clsx("recharts-tooltip-label", labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  var accessibilityAttributes = accessibilityLayer ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ reactExports.createElement("div", _extends$q({
    className: wrapperCN,
    style: finalStyle
  }, accessibilityAttributes), /* @__PURE__ */ reactExports.createElement("p", {
    className: labelCN,
    style: finalLabelStyle
  }, /* @__PURE__ */ reactExports.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent2());
};
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = {
  visibility: "hidden"
};
function getTooltipCSSClassName(_ref2) {
  var coordinate = _ref2.coordinate, translateX = _ref2.translateX, translateY = _ref2.translateY;
  return clsx(CSS_CLASS_PREFIX, {
    ["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
    ["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
  });
}
function getTooltipTranslateXY(_ref2) {
  var allowEscapeViewBox = _ref2.allowEscapeViewBox, coordinate = _ref2.coordinate, key = _ref2.key, offset = _ref2.offset, position = _ref2.position, reverseDirection = _ref2.reverseDirection, tooltipDimension = _ref2.tooltipDimension, viewBox = _ref2.viewBox, viewBoxDimension = _ref2.viewBoxDimension;
  if (position && isNumber(position[key])) {
    return position[key];
  }
  var negative = coordinate[key] - tooltipDimension - (offset > 0 ? offset : 0);
  var positive = coordinate[key] + offset;
  if (allowEscapeViewBox[key]) {
    return reverseDirection[key] ? negative : positive;
  }
  var viewBoxKey = viewBox[key];
  if (viewBoxKey == null) {
    return 0;
  }
  if (reverseDirection[key]) {
    var _tooltipBoundary = negative;
    var _viewBoxBoundary = viewBoxKey;
    if (_tooltipBoundary < _viewBoxBoundary) {
      return Math.max(positive, viewBoxKey);
    }
    return Math.max(negative, viewBoxKey);
  }
  if (viewBoxDimension == null) {
    return 0;
  }
  var tooltipBoundary = positive + tooltipDimension;
  var viewBoxBoundary = viewBoxKey + viewBoxDimension;
  if (tooltipBoundary > viewBoxBoundary) {
    return Math.max(negative, viewBoxKey);
  }
  return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
  var translateX = _ref3.translateX, translateY = _ref3.translateY, useTranslate3d = _ref3.useTranslate3d;
  return {
    transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
  };
}
function getTooltipTranslate(_ref4) {
  var allowEscapeViewBox = _ref4.allowEscapeViewBox, coordinate = _ref4.coordinate, offsetTop = _ref4.offsetTop, offsetLeft = _ref4.offsetLeft, position = _ref4.position, reverseDirection = _ref4.reverseDirection, tooltipBox = _ref4.tooltipBox, useTranslate3d = _ref4.useTranslate3d, viewBox = _ref4.viewBox;
  var cssProperties, translateX, translateY;
  if (tooltipBox && tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
    translateX = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "x",
      offset: offsetLeft,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.width,
      viewBox,
      viewBoxDimension: viewBox.width
    });
    translateY = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "y",
      offset: offsetTop,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.height,
      viewBox,
      viewBoxDimension: viewBox.height
    });
    cssProperties = getTransformStyle({
      translateX,
      translateY,
      useTranslate3d
    });
  } else {
    cssProperties = TOOLTIP_HIDDEN;
  }
  return {
    cssProperties,
    cssClasses: getTooltipCSSClassName({
      translateX,
      translateY,
      coordinate
    })
  };
}
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
  isSsr: parseIsSsrByDefault()
};
function _slicedToArray$i(r, e) {
  return _arrayWithHoles$i(r) || _iterableToArrayLimit$i(r, e) || _unsupportedIterableToArray$i(r, e) || _nonIterableRest$i();
}
function _nonIterableRest$i() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$i(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$i(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$i(r, a) : void 0;
  }
}
function _arrayLikeToArray$i(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$i(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$i(r) {
  if (Array.isArray(r)) return r;
}
function usePrefersReducedMotion() {
  var _useState = reactExports.useState(() => {
    if (Global.isSsr) {
      return false;
    }
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }), _useState2 = _slicedToArray$i(_useState, 2), prefersReducedMotion = _useState2[0], setPrefersReducedMotion = _useState2[1];
  reactExports.useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return prefersReducedMotion;
}
function ownKeys$A(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$A(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$A(Object(t), true).forEach(function(r2) {
      _defineProperty$D(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$A(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$D(e, r, t) {
  return (r = _toPropertyKey$D(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$D(t) {
  var i = _toPrimitive$D(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$D(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$h(r, e) {
  return _arrayWithHoles$h(r) || _iterableToArrayLimit$h(r, e) || _unsupportedIterableToArray$h(r, e) || _nonIterableRest$h();
}
function _nonIterableRest$h() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$h(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$h(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$h(r, a) : void 0;
  }
}
function _arrayLikeToArray$h(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$h(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$h(r) {
  if (Array.isArray(r)) return r;
}
function resolveTransitionProperty(args) {
  if (args.prefersReducedMotion && args.isAnimationActive === "auto") {
    return void 0;
  }
  if (args.isAnimationActive && args.active) {
    var easing = typeof args.animationEasing === "string" ? args.animationEasing : "ease";
    return "transform ".concat(args.animationDuration, "ms ").concat(easing);
  }
  return void 0;
}
function TooltipBoundingBoxImpl(props) {
  var _props$coordinate3, _props$coordinate4, _props$coordinate$x2, _props$coordinate5, _props$coordinate$y2, _props$coordinate6;
  var prefersReducedMotion = usePrefersReducedMotion();
  var _React$useState = reactExports.useState(() => ({
    dismissed: false,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  })), _React$useState2 = _slicedToArray$h(_React$useState, 2), state = _React$useState2[0], setState = _React$useState2[1];
  reactExports.useEffect(() => {
    var handleKeyDown = (event) => {
      if (event.key === "Escape") {
        var _props$coordinate$x, _props$coordinate, _props$coordinate$y, _props$coordinate2;
        setState({
          dismissed: true,
          dismissedAtCoordinate: {
            x: (_props$coordinate$x = (_props$coordinate = props.coordinate) === null || _props$coordinate === void 0 ? void 0 : _props$coordinate.x) !== null && _props$coordinate$x !== void 0 ? _props$coordinate$x : 0,
            y: (_props$coordinate$y = (_props$coordinate2 = props.coordinate) === null || _props$coordinate2 === void 0 ? void 0 : _props$coordinate2.y) !== null && _props$coordinate$y !== void 0 ? _props$coordinate$y : 0
          }
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [(_props$coordinate3 = props.coordinate) === null || _props$coordinate3 === void 0 ? void 0 : _props$coordinate3.x, (_props$coordinate4 = props.coordinate) === null || _props$coordinate4 === void 0 ? void 0 : _props$coordinate4.y]);
  if (state.dismissed && (((_props$coordinate$x2 = (_props$coordinate5 = props.coordinate) === null || _props$coordinate5 === void 0 ? void 0 : _props$coordinate5.x) !== null && _props$coordinate$x2 !== void 0 ? _props$coordinate$x2 : 0) !== state.dismissedAtCoordinate.x || ((_props$coordinate$y2 = (_props$coordinate6 = props.coordinate) === null || _props$coordinate6 === void 0 ? void 0 : _props$coordinate6.y) !== null && _props$coordinate$y2 !== void 0 ? _props$coordinate$y2 : 0) !== state.dismissedAtCoordinate.y)) {
    setState(_objectSpread$A(_objectSpread$A({}, state), {}, {
      dismissed: false
    }));
  }
  var _getTooltipTranslate = getTooltipTranslate({
    allowEscapeViewBox: props.allowEscapeViewBox,
    coordinate: props.coordinate,
    offsetLeft: typeof props.offset === "number" ? props.offset : props.offset.x,
    offsetTop: typeof props.offset === "number" ? props.offset : props.offset.y,
    position: props.position,
    reverseDirection: props.reverseDirection,
    tooltipBox: props.lastBoundingBox,
    useTranslate3d: props.useTranslate3d,
    viewBox: props.viewBox
  }), cssClasses = _getTooltipTranslate.cssClasses, cssProperties = _getTooltipTranslate.cssProperties;
  var positionStyle = props.hasPortalFromProps ? {} : _objectSpread$A(_objectSpread$A({
    transition: resolveTransitionProperty({
      prefersReducedMotion,
      isAnimationActive: props.isAnimationActive,
      active: props.active,
      animationDuration: props.animationDuration,
      animationEasing: props.animationEasing
    })
  }, cssProperties), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  });
  var outerStyle = _objectSpread$A(_objectSpread$A({}, positionStyle), {}, {
    visibility: !state.dismissed && props.active && props.hasPayload ? "visible" : "hidden"
  }, props.wrapperStyle);
  return /* @__PURE__ */ reactExports.createElement("div", {
    // @ts-expect-error TypeScript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: cssClasses,
    style: outerStyle,
    ref: props.innerRef
  }, props.children);
}
var TooltipBoundingBox = /* @__PURE__ */ reactExports.memo(TooltipBoundingBoxImpl);
var useAccessibilityLayer = () => {
  var _useAppSelector;
  return (_useAppSelector = useAppSelector((state) => state.rootProps.accessibilityLayer)) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
function _extends$p() {
  return _extends$p = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$p.apply(null, arguments);
}
function ownKeys$z(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$z(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$z(Object(t), true).forEach(function(r2) {
      _defineProperty$C(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$z(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$C(e, r, t) {
  return (r = _toPropertyKey$C(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$C(t) {
  var i = _toPrimitive$C(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$C(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES = {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural,
  curveStep,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var defined = (p) => isWellBehavedNumber(p.x) && isWellBehavedNumber(p.y);
var areaDefined = (d) => d.base != null && defined(d.base) && defined(d);
var getX = (p) => p.x;
var getY = (p) => p.y;
var getCurveFactory = (type, layout) => {
  if (typeof type === "function") {
    return type;
  }
  var name = "curve".concat(upperFirst(type));
  if ((name === "curveMonotone" || name === "curveBump") && layout) {
    var factory = CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
    if (factory) {
      return factory;
    }
  }
  return CURVE_FACTORIES[name] || curveLinear;
};
var defaultCurveProps = {
  connectNulls: false,
  type: "linear"
};
var getPath$1 = (_ref2) => {
  var _ref$type = _ref2.type, type = _ref$type === void 0 ? defaultCurveProps.type : _ref$type, _ref$points = _ref2.points, points = _ref$points === void 0 ? [] : _ref$points, baseLine = _ref2.baseLine, layout = _ref2.layout, _ref$connectNulls = _ref2.connectNulls, connectNulls = _ref$connectNulls === void 0 ? defaultCurveProps.connectNulls : _ref$connectNulls;
  var curveFactory = getCurveFactory(type, layout);
  var formatPoints = connectNulls ? points.filter(defined) : points;
  if (Array.isArray(baseLine)) {
    var _lineFunction;
    var areaPoints = points.map((entry, index) => _objectSpread$z(_objectSpread$z({}, entry), {}, {
      base: baseLine[index]
    }));
    if (layout === "vertical") {
      _lineFunction = shapeArea().y(getY).x1(getX).x0((d) => d.base.x);
    } else {
      _lineFunction = shapeArea().x(getX).y1(getY).y0((d) => d.base.y);
    }
    var _nullableLineFunction = _lineFunction.defined(areaDefined).curve(curveFactory);
    var finalPoints = connectNulls ? areaPoints.filter(areaDefined) : areaPoints;
    return _nullableLineFunction(finalPoints);
  }
  var lineFunction;
  if (layout === "vertical" && isNumber(baseLine)) {
    lineFunction = shapeArea().y(getY).x1(getX).x0(baseLine);
  } else if (isNumber(baseLine)) {
    lineFunction = shapeArea().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = shapeLine().x(getX).y(getY);
  }
  var nullableLineFunction = lineFunction.defined(defined).curve(curveFactory);
  return nullableLineFunction(formatPoints);
};
var Curve = (props) => {
  var className = props.className, points = props.points, path = props.path, pathRef = props.pathRef;
  var layout = useChartLayout();
  if ((!points || !points.length) && !path) {
    return null;
  }
  var getPathInput = {
    type: props.type,
    points: props.points,
    baseLine: props.baseLine,
    layout: props.layout || layout,
    connectNulls: props.connectNulls
  };
  var realPath = points && points.length ? getPath$1(getPathInput) : path;
  return /* @__PURE__ */ reactExports.createElement("path", _extends$p({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
    className: clsx("recharts-curve", className),
    d: realPath === null ? void 0 : realPath,
    ref: pathRef
  }));
};
var _excluded$n = ["x", "y", "top", "left", "width", "height", "className"];
function _extends$o() {
  return _extends$o = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$o.apply(null, arguments);
}
function ownKeys$y(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$y(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$y(Object(t), true).forEach(function(r2) {
      _defineProperty$B(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$y(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$B(e, r, t) {
  return (r = _toPropertyKey$B(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$B(t) {
  var i = _toPrimitive$B(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$B(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$n(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$n(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$n(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var getPath = (x, y, width, height, top, left) => {
  return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = (_ref2) => {
  var _ref$x = _ref2.x, x = _ref$x === void 0 ? 0 : _ref$x, _ref$y = _ref2.y, y = _ref$y === void 0 ? 0 : _ref$y, _ref$top = _ref2.top, top = _ref$top === void 0 ? 0 : _ref$top, _ref$left = _ref2.left, left = _ref$left === void 0 ? 0 : _ref$left, _ref$width = _ref2.width, width = _ref$width === void 0 ? 0 : _ref$width, _ref$height = _ref2.height, height = _ref$height === void 0 ? 0 : _ref$height, className = _ref2.className, rest = _objectWithoutProperties$n(_ref2, _excluded$n);
  var props = _objectSpread$y({
    x,
    y,
    top,
    left,
    width,
    height
  }, rest);
  if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$o({}, svgPropertiesAndEvents(props), {
    className: clsx("recharts-cross", className),
    d: getPath(x, y, width, height, top, left)
  }));
};
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
  var halfSize = tooltipAxisBandSize / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + 0.5,
    y: layout === "horizontal" ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
    height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
  };
}
var ACCURACY = 1e-4;
var cubicBezierFactor = (c1, c2) => [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
var evaluatePolynomial = (params, animationElapsedTime) => params.map((param, i) => param * animationElapsedTime ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (animationElapsedTime) => {
  var params = cubicBezierFactor(c1, c2);
  return evaluatePolynomial(params, animationElapsedTime);
};
var derivativeCubicBezier = (c1, c2) => (animationElapsedTime) => {
  var params = cubicBezierFactor(c1, c2);
  var newParams = [...params.map((param, i) => param * i).slice(1), 0];
  return evaluatePolynomial(newParams, animationElapsedTime);
};
var parseCubicBezier = (easing) => {
  var _easingParts$;
  var easingParts = easing.split("(");
  if (easingParts.length !== 2 || easingParts[0] !== "cubic-bezier") {
    return null;
  }
  var numbers = (_easingParts$ = easingParts[1]) === null || _easingParts$ === void 0 || (_easingParts$ = _easingParts$.split(")")[0]) === null || _easingParts$ === void 0 ? void 0 : _easingParts$.split(",");
  if (numbers == null || numbers.length !== 4) {
    return null;
  }
  var coords = numbers.map((x) => parseFloat(x));
  return [coords[0], coords[1], coords[2], coords[3]];
};
var getBezierCoordinates = function getBezierCoordinates2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    switch (args[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var easing = parseCubicBezier(args[0]);
        if (easing) {
          return easing;
        }
      }
    }
  }
  if (args.length === 4) {
    return args;
  }
  return [0, 0, 1, 1];
};
var createBezierEasing = (x1, y1, x2, y2) => {
  var curveX = cubicBezier(x1, x2);
  var curveY = cubicBezier(y1, y2);
  var derCurveX = derivativeCubicBezier(x1, x2);
  var rangeValue = (value) => {
    if (value > 1) {
      return 1;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };
  var bezier = (_animationElapsedTime) => {
    var animationElapsedTime = _animationElapsedTime > 1 ? 1 : _animationElapsedTime;
    var x = animationElapsedTime;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x) - animationElapsedTime;
      var derVal = derCurveX(x);
      if (Math.abs(evalT - animationElapsedTime) < ACCURACY || derVal < ACCURACY) {
        return curveY(x);
      }
      x = rangeValue(x - evalT / derVal);
    }
    return curveY(x);
  };
  bezier.isStepper = false;
  return bezier;
};
var configBezier = function configBezier2() {
  return createBezierEasing(...getBezierCoordinates(...arguments));
};
var createSpringEasing = function createSpringEasing2() {
  var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _config$stiff = config.stiff, stiff = _config$stiff === void 0 ? 100 : _config$stiff, _config$damping = config.damping, damping = _config$damping === void 0 ? 8 : _config$damping, _config$dt = config.dt, dt = _config$dt === void 0 ? 16.67 : _config$dt;
  var destX = 1;
  var positions = [0];
  var currX = 0;
  var currV = 0;
  var maxIterations = 1e4;
  var iterations = 0;
  while (iterations < maxIterations) {
    var FSpring = -(currX - destX) * stiff;
    var FDamping = currV * damping;
    currV += (FSpring - FDamping) * dt / 1e3;
    currX += currV * dt / 1e3;
    positions.push(currX);
    if (Math.abs(currX - destX) < ACCURACY && Math.abs(currV) < ACCURACY) {
      break;
    }
    iterations++;
  }
  positions[positions.length - 1] = destX;
  var maxIndex = positions.length - 1;
  return (t) => {
    var _positions$index, _positions, _positions$index2;
    if (t <= 0) return 0;
    if (t >= 1) return destX;
    var exactFrame = t * maxIndex;
    var index = Math.floor(exactFrame);
    var fraction = exactFrame - index;
    return ((_positions$index = positions[index]) !== null && _positions$index !== void 0 ? _positions$index : 0) + (((_positions = positions[index + 1]) !== null && _positions !== void 0 ? _positions : 0) - ((_positions$index2 = positions[index]) !== null && _positions$index2 !== void 0 ? _positions$index2 : 0)) * fraction;
  };
};
var createEasingFunction = (easing) => {
  if (typeof easing === "string") {
    switch (easing) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return configBezier(easing);
      case "spring":
        return createSpringEasing();
      default:
        if (easing.split("(")[0] === "cubic-bezier") {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === "function") {
    return easing;
  }
  return null;
};
var animationControllerImpl = (timeoutController, animationHandle, listener) => {
  var cancellable;
  var nextUpdate = (now) => {
    var timeRemaining = animationHandle.tick(now);
    if (animationHandle.getState() === "active") {
      listener(animationHandle.getInterpolated());
      if (animationHandle.getProgress() === 1) {
        animationHandle.complete();
        cancellable = void 0;
        return;
      }
      cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
      return;
    }
    cancellable = timeoutController.setTimeout(nextUpdate, timeRemaining);
  };
  cancellable = timeoutController.setTimeout(nextUpdate, 0);
  return () => {
    var _cancellable;
    return (_cancellable = cancellable) === null || _cancellable === void 0 ? void 0 : _cancellable();
  };
};
var AnimationControllerContext = /* @__PURE__ */ reactExports.createContext(animationControllerImpl);
AnimationControllerContext.Provider;
function useAnimationController(animationControllerFromProps) {
  var animationControllerFromContext = reactExports.useContext(AnimationControllerContext);
  return reactExports.useMemo(() => animationControllerFromProps !== null && animationControllerFromProps !== void 0 ? animationControllerFromProps : animationControllerFromContext, [animationControllerFromProps, animationControllerFromContext]);
}
function _defineProperty$A(e, r, t) {
  return (r = _toPropertyKey$A(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$A(t) {
  var i = _toPrimitive$A(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$A(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var INIT = "init";
var PENDING = "pending";
var ACTIVE = "active";
var COMPLETED = "completed";
function duration(time) {
  return Math.max(0, time);
}
class RechartsAnimation {
  /**
   * Returns the absolute time after the animationBegin delay has been completed,
   * and when the animationDuration started ticking.
   */
  getAnimationStartedTime() {
    return this.animationStartedTime;
  }
  /**
   * Returns the absolute time of when the animation began - now it will wait for {animationBegin} ms before the transition starts
   */
  getBeginStartedTime() {
    return this.beginStartedTime;
  }
  constructor(param) {
    var _param$onAnimationSta;
    _defineProperty$A(this, "state", INIT);
    this.animationId = param.animationId;
    this.onAnimationEnd = param.onAnimationEnd;
    this.animationDuration = duration(param.animationDuration);
    this.animationBegin = duration(param.animationBegin);
    this.progress = 0;
    this.from = param.from;
    this.to = param.to;
    this.easing = param.easing;
    (_param$onAnimationSta = param.onAnimationStart) === null || _param$onAnimationSta === void 0 || _param$onAnimationSta.call(param);
  }
  /**
   * Returns the state machine current state
   * - `init`:       animation had just been created. It immediately calls `onAnimationStart`
   * - `pending`:    animation is now paused for `animationBegin` milliseconds until the transition begins
   * - `active`:     animation is transitioning items on screen
   * - `completed`:  animation has completed its transition and executed `onAnimationEnd`.
   *                 This state is final and the animation is no longer allowed to transition to other states.
   */
  getState() {
    return this.state;
  }
  /**
   * Returns the easing input or function
   */
  getEasing() {
    return this.easing;
  }
  /**
   * Returns the configuration - the duration of the transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationDuration() {
    return this.animationDuration;
  }
  /**
   * Sets the current time of the animation. The animation sets its internal state and progress accordingly.
   * This is current, absolute time; not additive!
   * This allows you to essentially "travel back in time" based on the value you pass in here.
   *
   * Returns the (relative) time remaining until the current activity is over.
   * Meaning: if the state is in a middle of a delay, returns the time left until the delay is finished.
   * If the state is in the middle of a transition, returns time left until that transition is complete.
   * This is useful because it's the same number you can take and put into setTimeout(fn, X)
   * as that's how much time we need to wait until the next state transition happens.
   */
  tick(now) {
    if (this.getState() === INIT) {
      this.state = PENDING;
      this.beginStartedTime = now;
      return this.animationBegin;
    }
    if (this.getState() === PENDING) {
      if (this.beginStartedTime == null) {
        throw new Error();
      }
      var _timeElapsed = now - this.beginStartedTime;
      if (_timeElapsed >= this.animationBegin) {
        this.state = ACTIVE;
        this.animationStartedTime = now;
        return this.nextAnimationUpdate(0);
      }
      return duration(this.animationBegin - _timeElapsed);
    }
    if (this.getState() === ACTIVE) {
      if (this.animationStartedTime == null) {
        throw new Error();
      }
      var _timeElapsed2 = now - this.animationStartedTime;
      this.setProgress(_timeElapsed2 / this.animationDuration);
      return this.nextAnimationUpdate(_timeElapsed2);
    }
    return 0;
  }
  setProgress(newProgress) {
    this.progress = Math.min(1, Math.max(0, newProgress));
  }
  /**
   * Returns an abstract "progress" which is number between 0 and 1 which shows the distance of transition.
   * This progress depends on the animation state:
   * - `init`: 0
   * - `pending`: 0
   * - `active`: transitioning between [0, 1] based on the time elapsed
   * - `completed`: 1
   *
   * The progress is hard-capped to be between 0 and 1 (inclusive) to avoid overshooting caused by coarse timers.
   * For this reason, the easing function must be applied _after_ this animation state,
   * so that one has a chance to construct dynamic "overshoot" animations.
   *
   * The progress is linear with time.
   * If you wish for easing, use `getInterpolated()` instead.
   */
  getProgress() {
    return this.progress;
  }
  /**
   * Completes the animation. Completed animation:
   * - cannot be manipulated anymore
   * - its progress is set to 1
   * - tick function doesn't do anything
   * - getState() always returns 'completed'
   */
  complete() {
    this.progress = 1;
    if (this.state === "active") {
      var _this$onAnimationEnd;
      (_this$onAnimationEnd = this.onAnimationEnd) === null || _this$onAnimationEnd === void 0 || _this$onAnimationEnd.call(this);
    }
    this.state = COMPLETED;
  }
  /**
   * Returns the starting value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static starting value
   */
  getFrom() {
    return this.from;
  }
  /**
   * Returns the end value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static end value
   */
  getTo() {
    return this.to;
  }
  /**
   * Unique identifier of an animation
   */
  getAnimationId() {
    return this.animationId;
  }
  /**
   * Returns the configuration - the duration of delay in between animation initialization, and transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationBegin() {
    return this.animationBegin;
  }
  /**
   * Returns value of the transition at the current time.
   * The exact details differ based on the animation type
   */
  /**
   * Returns the duration of time of when the controller should ask for the next update
   */
}
class JavascriptAnimation extends RechartsAnimation {
  // eslint-disable-next-line class-methods-use-this
  nextAnimationUpdate() {
    return 0;
  }
  /**
   * Returns value of the animation after its easing function had been applied.
   * This value, unlike getProgress(), can escape the [0..1] range
   * because this is entirely within the easing function control. Spring typically does this.
   */
  getInterpolated() {
    return this.easing(interpolate(this.getFrom(), this.getTo(), this.getProgress()));
  }
}
class RequestAnimationFrameTimeoutController {
  setTimeout(callback) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var startTime = performance.now();
    var requestId = null;
    var executeCallback = (now) => {
      if (now - startTime >= delay) {
        callback(now);
      } else {
        requestId = requestAnimationFrame(executeCallback);
      }
    };
    requestId = requestAnimationFrame(executeCallback);
    return () => {
      if (requestId != null) {
        cancelAnimationFrame(requestId);
      }
    };
  }
}
function _slicedToArray$g(r, e) {
  return _arrayWithHoles$g(r) || _iterableToArrayLimit$g(r, e) || _unsupportedIterableToArray$g(r, e) || _nonIterableRest$g();
}
function _nonIterableRest$g() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$g(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$g(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$g(r, a) : void 0;
  }
}
function _arrayLikeToArray$g(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$g(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$g(r) {
  if (Array.isArray(r)) return r;
}
var defaultJavascriptAnimateProps = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
};
var from = 0;
var to = 1;
function JavascriptAnimate(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
  var animationId = props.animationId, isActiveProp = props.isActive, canBegin = props.canBegin, duration2 = props.duration, easing = props.easing, begin = props.begin, onAnimationEnd = props.onAnimationEnd, onAnimationStart = props.onAnimationStart, children = props.children;
  var prefersReducedMotion = usePrefersReducedMotion();
  var isActive = isActiveProp === "auto" ? !Global.isSsr && !prefersReducedMotion : isActiveProp;
  var animationController = useAnimationController(props.animationController);
  var _useState = reactExports.useState(isActive ? from : to), _useState2 = _slicedToArray$g(_useState, 2), style = _useState2[0], setStyle = _useState2[1];
  reactExports.useEffect(() => {
    if (!isActive) {
      setStyle(to);
    }
  }, [isActive]);
  reactExports.useEffect(() => {
    var easingFunction = createEasingFunction(easing);
    if (!isActive || !canBegin || easingFunction == null) {
      return noop$1;
    }
    var timeoutController = new RequestAnimationFrameTimeoutController();
    var animation = new JavascriptAnimation({
      animationId,
      easing: easingFunction,
      animationDuration: duration2,
      animationBegin: begin,
      onAnimationStart,
      onAnimationEnd,
      from,
      to
    });
    return animationController(timeoutController, animation, setStyle);
  }, [animationController, animationId, isActive, canBegin, duration2, easing, begin, onAnimationStart, onAnimationEnd]);
  return children(Number(style));
}
function useAnimationId(input) {
  var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
  var animationId = reactExports.useRef(uniqueId(prefix));
  var prevProps = reactExports.useRef(input);
  if (prevProps.current !== input) {
    animationId.current = uniqueId(prefix);
    prevProps.current = input;
  }
  return animationId.current;
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v) => "-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration2, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration2, "ms ").concat(easing)).join(",");
var _excluded$m = ["radius"], _excluded2$c = ["radius"];
var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6$1, _templateObject7$1, _templateObject8, _templateObject9, _templateObject0;
function ownKeys$x(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$x(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$x(Object(t), true).forEach(function(r2) {
      _defineProperty$z(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$x(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$z(e, r, t) {
  return (r = _toPropertyKey$z(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$z(t) {
  var i = _toPrimitive$z(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$z(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$n() {
  return _extends$n = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$n.apply(null, arguments);
}
function _objectWithoutProperties$m(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$m(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$m(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray$f(r, e) {
  return _arrayWithHoles$f(r) || _iterableToArrayLimit$f(r, e) || _unsupportedIterableToArray$f(r, e) || _nonIterableRest$f();
}
function _nonIterableRest$f() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$f(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$f(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$f(r, a) : void 0;
  }
}
function _arrayLikeToArray$f(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$f(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$f(r) {
  if (Array.isArray(r)) return r;
}
function _taggedTemplateLiteral$1(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getRectanglePath = (x, y, width, height, radius) => {
  var roundedWidth = round(width);
  var roundedHeight = round(height);
  var maxRadius = Math.min(Math.abs(roundedWidth) / 2, Math.abs(roundedHeight) / 2);
  var ySign = roundedHeight >= 0 ? 1 : -1;
  var xSign = roundedWidth >= 0 ? 1 : -1;
  var clockWise = roundedHeight >= 0 && roundedWidth >= 0 || roundedHeight < 0 && roundedWidth < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && Array.isArray(radius)) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      var _radius$i;
      var r = (_radius$i = radius[i]) !== null && _radius$i !== void 0 ? _radius$i : 0;
      newRadius[i] = r > maxRadius ? maxRadius : r;
    }
    path = roundTemplateLiteral(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["M", ",", ""])), x, y + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += roundTemplateLiteral(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",", ",", ""])), newRadius[0], newRadius[0], clockWise, x + xSign * newRadius[0], y);
    }
    path += roundTemplateLiteral(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x + width - xSign * newRadius[1], y);
    if (newRadius[1] > 0) {
      path += roundTemplateLiteral(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[1], newRadius[1], clockWise, x + width, y + ySign * newRadius[1]);
    }
    path += roundTemplateLiteral(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x + width, y + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += roundTemplateLiteral(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[2], newRadius[2], clockWise, x + width - xSign * newRadius[2], y + height);
    }
    path += roundTemplateLiteral(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral$1(["L ", ",", ""])), x + xSign * newRadius[3], y + height);
    if (newRadius[3] > 0) {
      path += roundTemplateLiteral(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral$1(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[3], newRadius[3], clockWise, x, y + height - ySign * newRadius[3]);
    }
    path += "Z";
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = roundTemplateLiteral(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral$1(["M ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", " Z"])), x, y + ySign * _newRadius, _newRadius, _newRadius, clockWise, x + xSign * _newRadius, y, x + width - xSign * _newRadius, y, _newRadius, _newRadius, clockWise, x + width, y + ySign * _newRadius, x + width, y + height - ySign * _newRadius, _newRadius, _newRadius, clockWise, x + width - xSign * _newRadius, y + height, x + xSign * _newRadius, y + height, _newRadius, _newRadius, clockWise, x, y + height - ySign * _newRadius);
  } else {
    path = roundTemplateLiteral(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral$1(["M ", ",", " h ", " v ", " h ", " Z"])), x, y, width, height, -width);
  }
  return path;
};
var defaultRectangleProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Rectangle = (rectangleProps) => {
  var props = resolveDefaultProps(rectangleProps, defaultRectangleProps);
  var pathRef = reactExports.useRef(null);
  var _useState = reactExports.useState(-1), _useState2 = _slicedToArray$f(_useState, 2), totalLength = _useState2[0], setTotalLength = _useState2[1];
  reactExports.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  var x = props.x, y = props.y, width = props.width, height = props.height, radius = props.radius, className = props.className;
  var animationEasing = props.animationEasing, animationDuration = props.animationDuration, animationBegin = props.animationBegin, isAnimationActive = props.isAnimationActive, isUpdateAnimationActive = props.isUpdateAnimationActive;
  var prevWidthRef = reactExports.useRef(width);
  var prevHeightRef = reactExports.useRef(height);
  var prevXRef = reactExports.useRef(x);
  var prevYRef = reactExports.useRef(y);
  var animationIdInput = reactExports.useMemo(() => ({
    x,
    y,
    width,
    height,
    radius
  }), [x, y, width, height, radius]);
  var animationId = useAnimationId(animationIdInput, "rectangle-");
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-rectangle", className);
  if (!isUpdateAnimationActive) {
    var _svgPropertiesAndEven = svgPropertiesAndEvents(props);
    _svgPropertiesAndEven.radius;
    var otherPathProps = _objectWithoutProperties$m(_svgPropertiesAndEven, _excluded$m);
    return /* @__PURE__ */ reactExports.createElement("path", _extends$n({}, otherPathProps, {
      x: round(x),
      y: round(y),
      width: round(width),
      height: round(height),
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(x, y, width, height, radius)
    }));
  }
  var prevWidth = prevWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px ").concat(totalLength, "px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : defaultRectangleProps.animationEasing);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (animationElapsedTime) => {
    var currWidth = interpolate(prevWidth, width, animationElapsedTime);
    var currHeight = interpolate(prevHeight, height, animationElapsedTime);
    var currX = interpolate(prevX, x, animationElapsedTime);
    var currY = interpolate(prevY, y, animationElapsedTime);
    if (pathRef.current) {
      prevWidthRef.current = currWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle;
    if (!isAnimationActive) {
      animationStyle = {
        strokeDasharray: to2
      };
    } else if (animationElapsedTime > 0) {
      animationStyle = {
        transition,
        strokeDasharray: to2
      };
    } else {
      animationStyle = {
        strokeDasharray: from2
      };
    }
    var _svgPropertiesAndEven2 = svgPropertiesAndEvents(props);
    _svgPropertiesAndEven2.radius;
    var otherPathProps2 = _objectWithoutProperties$m(_svgPropertiesAndEven2, _excluded2$c);
    return /* @__PURE__ */ reactExports.createElement("path", _extends$n({}, otherPathProps2, {
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
      ref: pathRef,
      style: _objectSpread$x(_objectSpread$x({}, animationStyle), props.style)
    }));
  });
};
function ownKeys$w(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$w(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$w(Object(t), true).forEach(function(r2) {
      _defineProperty$y(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$w(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$y(e, r, t) {
  return (r = _toPropertyKey$y(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$y(t) {
  var i = _toPrimitive$y(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$y(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius2(width, height) {
  var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point, anotherPoint) => {
  var x1 = point.x, y1 = point.y;
  var x2 = anotherPoint.x, y2 = anotherPoint.y;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref2, _ref22) => {
  var x = _ref2.x, y = _ref2.y;
  var cx = _ref22.cx, cy = _ref22.cy;
  var radius = distanceBetweenPoints({
    x,
    y
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius,
      angle: 0
    };
  }
  var cos = (x - cx) / radius;
  var angleInRadian = Math.acos(cos);
  if (y > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian
  };
};
var formatAngleOfSector = (_ref3) => {
  var startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min * 360,
    endAngle: endAngle - min * 360
  };
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
  var startAngle = _ref4.startAngle, endAngle = _ref4.endAngle;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return angle + min * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
  var x = _ref5.relativeX, y = _ref5.relativeY;
  var _getAngleOfPoint = getAngleOfPoint({
    x,
    y
  }, viewBox), radius = _getAngleOfPoint.radius, angle = _getAngleOfPoint.angle;
  var innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius;
  if (radius < innerRadius || radius > outerRadius) {
    return null;
  }
  if (radius === 0) {
    return null;
  }
  var _formatAngleOfSector = formatAngleOfSector(viewBox), startAngle = _formatAngleOfSector.startAngle, endAngle = _formatAngleOfSector.endAngle;
  var formatAngle = angle;
  var inRange;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  if (inRange) {
    return _objectSpread$w(_objectSpread$w({}, viewBox), {}, {
      radius,
      angle: reverseFormatAngleOfSector(formatAngle, viewBox)
    });
  }
  return null;
};
function getRadialCursorPoints(activeCoordinate) {
  var cx = activeCoordinate.cx, cy = activeCoordinate.cy, radius = activeCoordinate.radius, startAngle = activeCoordinate.startAngle, endAngle = activeCoordinate.endAngle;
  var startPoint = polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  };
}
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _extends$m() {
  return _extends$m = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$m.apply(null, arguments);
}
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign * deltaAngle;
};
var getTangentCircle = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, radius = _ref2.radius, angle = _ref2.angle, sign = _ref2.sign, isExternal = _ref2.isExternal, cornerRadius = _ref2.cornerRadius, cornerIsExternal = _ref2.cornerIsExternal;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
  var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
  var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
  var lineTangency = polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle);
  return {
    center,
    circleTangency,
    lineTangency,
    theta
  };
};
var getSectorPath = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle;
  var angle = getDeltaAngle$1(startAngle, endAngle);
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
  var path = roundTemplateLiteral(_templateObject || (_templateObject = _taggedTemplateLiteral(["M ", ",", "\n    A ", ",", ",0,\n    ", ",", ",\n    ", ",", "\n  "])), outerStartPoint.x, outerStartPoint.y, outerRadius, outerRadius, +(Math.abs(angle) > 180), +(startAngle > tempEndAngle), outerEndPoint.x, outerEndPoint.y);
  if (innerRadius > 0) {
    var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += roundTemplateLiteral(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["L ", ",", "\n            A ", ",", ",0,\n            ", ",", ",\n            ", ",", " Z"])), innerEndPoint.x, innerEndPoint.y, innerRadius, innerRadius, +(Math.abs(angle) > 180), +(startAngle <= tempEndAngle), innerStartPoint.x, innerStartPoint.y);
  } else {
    path += roundTemplateLiteral(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["L ", ",", " Z"])), cx, cy);
  }
  return path;
};
var getSectorWithCorner = (_ref3) => {
  var cx = _ref3.cx, cy = _ref3.cy, innerRadius = _ref3.innerRadius, outerRadius = _ref3.outerRadius, cornerRadius = _ref3.cornerRadius, forceCornerRadius = _ref3.forceCornerRadius, cornerIsExternal = _ref3.cornerIsExternal, startAngle = _ref3.startAngle, endAngle = _ref3.endAngle;
  var sign = mathSign(endAngle - startAngle);
  var _getTangentCircle = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: startAngle,
    sign,
    cornerRadius,
    cornerIsExternal
  }), soct = _getTangentCircle.circleTangency, solt = _getTangentCircle.lineTangency, sot = _getTangentCircle.theta;
  var _getTangentCircle2 = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: endAngle,
    sign: -sign,
    cornerRadius,
    cornerIsExternal
  }), eoct = _getTangentCircle2.circleTangency, eolt = _getTangentCircle2.lineTangency, eot = _getTangentCircle2.theta;
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return roundTemplateLiteral(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["M ", ",", "\n        a", ",", ",0,0,1,", ",0\n        a", ",", ",0,0,1,", ",0\n      "])), solt.x, solt.y, cornerRadius, cornerRadius, cornerRadius * 2, cornerRadius, cornerRadius, -cornerRadius * 2);
    }
    return getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  var path = roundTemplateLiteral(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["M ", ",", "\n    A", ",", ",0,0,", ",", ",", "\n    A", ",", ",0,", ",", ",", ",", "\n    A", ",", ",0,0,", ",", ",", "\n  "])), solt.x, solt.y, cornerRadius, cornerRadius, +(sign < 0), soct.x, soct.y, outerRadius, outerRadius, +(outerArcAngle > 180), +(sign < 0), eoct.x, eoct.y, cornerRadius, cornerRadius, +(sign < 0), eolt.x, eolt.y);
  if (innerRadius > 0) {
    var _getTangentCircle3 = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: startAngle,
      sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    }), sict = _getTangentCircle3.circleTangency, silt = _getTangentCircle3.lineTangency, sit = _getTangentCircle3.theta;
    var _getTangentCircle4 = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: endAngle,
      sign: -sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    }), eict = _getTangentCircle4.circleTangency, eilt = _getTangentCircle4.lineTangency, eit = _getTangentCircle4.theta;
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
    }
    path += roundTemplateLiteral(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["L", ",", "\n      A", ",", ",0,0,", ",", ",", "\n      A", ",", ",0,", ",", ",", ",", "\n      A", ",", ",0,0,", ",", ",", "Z"])), eilt.x, eilt.y, cornerRadius, cornerRadius, +(sign < 0), eict.x, eict.y, innerRadius, innerRadius, +(innerArcAngle > 180), +(sign > 0), sict.x, sict.y, cornerRadius, cornerRadius, +(sign < 0), silt.x, silt.y);
  } else {
    path += roundTemplateLiteral(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["L", ",", "Z"])), cx, cy);
  }
  return path;
};
var defaultSectorProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
var Sector = (sectorProps) => {
  var props = resolveDefaultProps(sectorProps, defaultSectorProps);
  var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, cornerRadius = props.cornerRadius, forceCornerRadius = props.forceCornerRadius, cornerIsExternal = props.cornerIsExternal, startAngle = props.startAngle, endAngle = props.endAngle, className = props.className;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = clsx("recharts-sector", className);
  var deltaRadius = outerRadius - innerRadius;
  var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
  var path;
  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx,
      cy,
      innerRadius,
      outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius,
      cornerIsExternal,
      startAngle,
      endAngle
    });
  } else {
    path = getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$m({}, svgPropertiesAndEvents(props), {
    className: layerClass,
    d: path
  }));
};
function getCursorPoints(layout, activeCoordinate, offset) {
  if (layout === "horizontal") {
    return [{
      x: activeCoordinate.x,
      y: offset.top
    }, {
      x: activeCoordinate.x,
      y: offset.top + offset.height
    }];
  }
  if (layout === "vertical") {
    return [{
      x: offset.left,
      y: activeCoordinate.y
    }, {
      x: offset.left + offset.width,
      y: activeCoordinate.y
    }];
  }
  if (isPolarCoordinate(activeCoordinate)) {
    if (layout === "centric") {
      var cx = activeCoordinate.cx, cy = activeCoordinate.cy, innerRadius = activeCoordinate.innerRadius, outerRadius = activeCoordinate.outerRadius, angle = activeCoordinate.angle;
      var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
      var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
      return [{
        x: innerPoint.x,
        y: innerPoint.y
      }, {
        x: outerPoint.x,
        y: outerPoint.y
      }];
    }
    return getRadialCursorPoints(activeCoordinate);
  }
  return void 0;
}
var selectChartDataWithIndexes = (state) => state.chartData;
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
  var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
  return {
    chartData: dataState.chartData,
    computedData: dataState.computedData,
    dataEndIndex,
    dataStartIndex: 0
  };
});
var selectChartDataWithIndexesIfNotInPanoramaPosition4 = (state, _unused1, _unused2, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataWithIndexesIfNotInPanoramaPosition3 = (state, _unused1, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataSliceIfNotInPanorama = createSelector([selectChartDataWithIndexesIfNotInPanoramaPosition4], (_ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceIgnoringIndexes = createSelector([selectChartDataAndAlwaysIgnoreIndexes], (_ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceWithIndexes = createSelector([selectChartDataWithIndexes], (_ref3) => {
  var chartData = _ref3.chartData, dataStartIndex = _ref3.dataStartIndex, dataEndIndex = _ref3.dataEndIndex;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
function _slicedToArray$e(r, e) {
  return _arrayWithHoles$e(r) || _iterableToArrayLimit$e(r, e) || _unsupportedIterableToArray$e(r, e) || _nonIterableRest$e();
}
function _nonIterableRest$e() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$e(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$e(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$e(r, a) : void 0;
  }
}
function _arrayLikeToArray$e(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$e(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$e(r) {
  if (Array.isArray(r)) return r;
}
function isWellFormedNumberDomain(v) {
  if (Array.isArray(v) && v.length === 2) {
    var _v = _slicedToArray$e(v, 2), min = _v[0], max = _v[1];
    if (isWellBehavedNumber(min) && isWellBehavedNumber(max)) {
      return true;
    }
  }
  return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
  if (allowDataOverflow) {
    return providedDomain;
  }
  return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
  if (!allowDataOverflow) {
    return void 0;
  }
  if (typeof userDomain === "function") {
    return void 0;
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var _userDomain = _slicedToArray$e(userDomain, 2), providedMin = _userDomain[0], providedMax = _userDomain[1];
    var finalMin, finalMax;
    if (isWellBehavedNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      return void 0;
    }
    if (isWellBehavedNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      return void 0;
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      return candidate;
    }
  }
  return void 0;
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
  if (!allowDataOverflow && dataDomain == null) {
    return void 0;
  }
  if (typeof userDomain === "function" && dataDomain != null) {
    try {
      var result = userDomain(dataDomain, allowDataOverflow);
      if (isWellFormedNumberDomain(result)) {
        return extendDomain(result, dataDomain, allowDataOverflow);
      }
    } catch (_unused) {
    }
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var _userDomain2 = _slicedToArray$e(userDomain, 2), providedMin = _userDomain2[0], providedMax = _userDomain2[1];
    var finalMin, finalMax;
    if (providedMin === "auto") {
      if (dataDomain != null) {
        finalMin = Math.min(...dataDomain);
      }
    } else if (isNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      try {
        if (dataDomain != null) {
          finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
        }
      } catch (_unused2) {
      }
    } else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
      var match = MIN_VALUE_REG.exec(providedMin);
      if (match == null || match[1] == null || dataDomain == null) {
        finalMin = void 0;
      } else {
        var value = +match[1];
        finalMin = dataDomain[0] - value;
      }
    } else {
      finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
    }
    if (providedMax === "auto") {
      if (dataDomain != null) {
        finalMax = Math.max(...dataDomain);
      }
    } else if (isNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      try {
        if (dataDomain != null) {
          finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
        }
      } catch (_unused3) {
      }
    } else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
      var _match = MAX_VALUE_REG.exec(providedMax);
      if (_match == null || _match[1] == null || dataDomain == null) {
        finalMax = void 0;
      } else {
        var _value = +_match[1];
        finalMax = dataDomain[1] + _value;
      }
    } else {
      finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      if (dataDomain == null) {
        return candidate;
      }
      return extendDomain(candidate, dataDomain, allowDataOverflow);
    }
  }
  return void 0;
}
function getDigitCount(value) {
  var result;
  if (value === 0) {
    result = 1;
  } else {
    result = Math.floor(new Decimal(value).abs().log(10).toNumber()) + 1;
  }
  return result;
}
function rangeStep(start, end, step) {
  var num = new Decimal(start);
  var i = 0;
  var result = [];
  while (num.lt(end) && i < 1e5) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }
  return result;
}
function _slicedToArray$d(r, e) {
  return _arrayWithHoles$d(r) || _iterableToArrayLimit$d(r, e) || _unsupportedIterableToArray$d(r, e) || _nonIterableRest$d();
}
function _nonIterableRest$d() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$d(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$d(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$d(r, a) : void 0;
  }
}
function _arrayLikeToArray$d(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$d(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$d(r) {
  if (Array.isArray(r)) return r;
}
var getValidInterval = (_ref2) => {
  var _ref22 = _slicedToArray$d(_ref2, 2), min = _ref22[0], max = _ref22[1];
  var validMin = min, validMax = max;
  if (min > max) {
    validMin = max;
    validMax = min;
  }
  return [validMin, validMax];
};
var getAdaptiveStep = (roughStep, allowDecimals, correctionFactor) => {
  if (roughStep.lte(0)) {
    return new Decimal(0);
  }
  var digitCount = getDigitCount(roughStep.toNumber());
  var digitCountValue = new Decimal(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue);
  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new Decimal(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? new Decimal(formatStep.toNumber()) : new Decimal(Math.ceil(formatStep.toNumber()));
};
var getSnap125Step = (roughStep, allowDecimals, correctionFactor) => {
  var _NICE_STEPS$niceIdx;
  if (roughStep.lte(0)) {
    return new Decimal(0);
  }
  var NICE_STEPS = [1, 2, 2.5, 5];
  var roughNum = roughStep.toNumber();
  var exponent = Math.floor(new Decimal(roughNum).abs().log(10).toNumber());
  var magnitude = new Decimal(10).pow(exponent);
  var normalized = roughStep.div(magnitude).toNumber();
  var niceIdx = NICE_STEPS.findIndex((s) => s >= normalized - 1e-10);
  if (niceIdx === -1) {
    magnitude = magnitude.mul(10);
    niceIdx = 0;
  }
  niceIdx += correctionFactor;
  if (niceIdx >= NICE_STEPS.length) {
    var extraMag = Math.floor(niceIdx / NICE_STEPS.length);
    niceIdx %= NICE_STEPS.length;
    magnitude = magnitude.mul(new Decimal(10).pow(extraMag));
  }
  var niceStep = (_NICE_STEPS$niceIdx = NICE_STEPS[niceIdx]) !== null && _NICE_STEPS$niceIdx !== void 0 ? _NICE_STEPS$niceIdx : 1;
  var formatStep = new Decimal(niceStep).mul(magnitude);
  return allowDecimals ? formatStep : new Decimal(Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
  var step = new Decimal(1);
  var middle = new Decimal(value);
  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);
    if (absVal < 1) {
      step = new Decimal(10).pow(getDigitCount(value) - 1);
      middle = new Decimal(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      middle = new Decimal(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new Decimal(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal(Math.floor(value));
  }
  var middleIndex = Math.floor((tickCount - 1) / 2);
  var ticks = [];
  for (var i = 0; i < tickCount; i++) {
    ticks.push(middle.add(new Decimal(i - middleIndex).mul(step)).toNumber());
  }
  return ticks;
};
var _calculateStep = function calculateStep(min, max, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var stepFn = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : getAdaptiveStep;
  if (!Number.isFinite((max - min) / (tickCount - 1))) {
    return {
      step: new Decimal(0),
      tickMin: new Decimal(0),
      tickMax: new Decimal(0)
    };
  }
  var step = stepFn(new Decimal(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
  var middle;
  if (min <= 0 && max >= 0) {
    middle = new Decimal(0);
  } else {
    middle = new Decimal(min).add(max).div(2);
    middle = middle.sub(new Decimal(middle).mod(step));
  }
  var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
  var upCount = Math.ceil(new Decimal(max).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;
  if (scaleCount > tickCount) {
    return _calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1, stepFn);
  }
  if (scaleCount < tickCount) {
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }
  return {
    step,
    tickMin: middle.sub(new Decimal(belowCount).mul(step)),
    tickMax: middle.add(new Decimal(upCount).mul(step))
  };
};
var getNiceTickValues = function getNiceTickValues2(_ref3) {
  var _ref4 = _slicedToArray$d(_ref3, 2), min = _ref4[0], max = _ref4[1];
  var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var count = Math.max(tickCount, 2);
  var _getValidInterval = getValidInterval([min, max]), _getValidInterval2 = _slicedToArray$d(_getValidInterval, 2), cormin = _getValidInterval2[0], cormax = _getValidInterval2[1];
  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin, ...Array(tickCount - 1).fill(Infinity)] : [...Array(tickCount - 1).fill(-Infinity), cormax];
    return min > max ? _values.reverse() : _values;
  }
  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var _calculateStep2 = _calculateStep(cormin, cormax, count, allowDecimals, 0, stepFn), step = _calculateStep2.step, tickMin = _calculateStep2.tickMin, tickMax = _calculateStep2.tickMax;
  var values = rangeStep(tickMin, tickMax.add(new Decimal(0.1).mul(step)), step);
  return min > max ? values.reverse() : values;
};
var getTickValuesFixedDomain = function getTickValuesFixedDomain2(_ref5, tickCount) {
  var _ref6 = _slicedToArray$d(_ref5, 2), min = _ref6[0], max = _ref6[1];
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var _getValidInterval3 = getValidInterval([min, max]), _getValidInterval4 = _slicedToArray$d(_getValidInterval3, 2), cormin = _getValidInterval4[0], cormax = _getValidInterval4[1];
  if (cormin === -Infinity || cormax === Infinity) {
    return [min, max];
  }
  if (cormin === cormax) {
    return [cormin];
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var count = Math.max(tickCount, 2);
  var step = stepFn(new Decimal(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [...rangeStep(new Decimal(cormin), new Decimal(cormax), step), cormax];
  if (allowDecimals === false) {
    values = values.map((value) => Math.round(value));
    var last = values.length - 1;
    if (last > 0 && values[last] === values[last - 1]) {
      values = values.slice(0, last);
    }
  }
  return min > max ? values.reverse() : values;
};
var selectRootMaxBarSize = (state) => state.rootProps.maxBarSize;
var selectBarGap = (state) => state.rootProps.barGap;
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectRootBarSize = (state) => state.rootProps.barSize;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectReverseStackOrder = (state) => state.rootProps.reverseStackOrder;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
var selectChartBaseValue = (state) => state.rootProps.baseValue;
var DefaultZIndexes = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
};
var defaultPolarAngleAxisProps = {
  allowDecimals: false,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: false,
  angleAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  type: "auto"
};
var defaultPolarRadiusAxisProps = {
  allowDataOverflow: false,
  allowDecimals: false,
  allowDuplicatedCategory: true,
  includeHidden: false,
  radiusAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  type: "auto"
};
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
  if (!axisSettings || !axisRange) {
    return void 0;
  }
  if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) {
    return [axisRange[1], axisRange[0]];
  }
  return axisRange;
};
function getAxisTypeBasedOnLayout(layout, axisType, axisDomainType) {
  if (axisDomainType !== "auto") {
    return axisDomainType;
  }
  if (layout == null) {
    return void 0;
  }
  return isCategoricalAxis(layout, axisType) ? "category" : "number";
}
function ownKeys$v(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$v(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$v(Object(t), true).forEach(function(r2) {
      _defineProperty$x(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$v(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$x(e, r, t) {
  return (r = _toPropertyKey$x(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$x(t) {
  var i = _toPrimitive$x(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$x(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var implicitAngleAxis = {
  allowDataOverflow: defaultPolarAngleAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarAngleAxisProps.allowDecimals,
  allowDuplicatedCategory: false,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarAngleAxisProps.angleAxisId,
  includeHidden: false,
  name: void 0,
  reversed: defaultPolarAngleAxisProps.reversed,
  scale: defaultPolarAngleAxisProps.scale,
  tick: defaultPolarAngleAxisProps.tick,
  tickCount: void 0,
  ticks: void 0,
  type: defaultPolarAngleAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var implicitRadiusAxis = {
  allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarRadiusAxisProps.allowDecimals,
  allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarRadiusAxisProps.radiusAxisId,
  includeHidden: defaultPolarRadiusAxisProps.includeHidden,
  name: void 0,
  reversed: defaultPolarRadiusAxisProps.reversed,
  scale: defaultPolarRadiusAxisProps.scale,
  tick: defaultPolarRadiusAxisProps.tick,
  tickCount: defaultPolarRadiusAxisProps.tickCount,
  ticks: void 0,
  type: defaultPolarRadiusAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var selectAngleAxisNoDefaults = (state, angleAxisId) => {
  if (angleAxisId == null) {
    return void 0;
  }
  return state.polarAxis.angleAxis[angleAxisId];
};
var selectAngleAxis = createSelector([selectAngleAxisNoDefaults, selectPolarChartLayout], (angleAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa;
  if (angleAxisSettings != null) {
    return angleAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa = getAxisTypeBasedOnLayout(layout, "angleAxis", implicitAngleAxis.type)) !== null && _getAxisTypeBasedOnLa !== void 0 ? _getAxisTypeBasedOnLa : "category";
  return _objectSpread$v(_objectSpread$v({}, implicitAngleAxis), {}, {
    type: evaluatedType
  });
});
var selectRadiusAxisNoDefaults = (state, radiusAxisId) => {
  return state.polarAxis.radiusAxis[radiusAxisId];
};
var selectRadiusAxis = createSelector([selectRadiusAxisNoDefaults, selectPolarChartLayout], (radiusAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa2;
  if (radiusAxisSettings != null) {
    return radiusAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa2 = getAxisTypeBasedOnLayout(layout, "radiusAxis", implicitRadiusAxis.type)) !== null && _getAxisTypeBasedOnLa2 !== void 0 ? _getAxisTypeBasedOnLa2 : "category";
  return _objectSpread$v(_objectSpread$v({}, implicitRadiusAxis), {}, {
    type: evaluatedType
  });
});
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([selectChartWidth, selectChartHeight, selectChartOffsetInternal], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * 0.8);
});
var combineAngleAxisRange = (polarOptions) => {
  if (polarOptions == null) {
    return [0, 0];
  }
  var startAngle = polarOptions.startAngle, endAngle = polarOptions.endAngle;
  return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([selectMaxRadius, selectInnerRadius, selectOuterRadius], (maxRadius, innerRadius, outerRadius) => {
  if (maxRadius == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([selectChartLayout, selectPolarOptions, selectInnerRadius, selectOuterRadius, selectChartWidth, selectChartHeight], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
  if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  var cx = polarOptions.cx, cy = polarOptions.cy, startAngle = polarOptions.startAngle, endAngle = polarOptions.endAngle;
  return {
    cx: getPercentValue(cx, width, width / 2),
    cy: getPercentValue(cy, height, height / 2),
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise: false
    // this property look useful, why not use it?
  };
});
var pickAxisType = (_state, axisType) => axisType;
var pickAxisId = (_state, _axisType, axisId) => axisId;
function getStackSeriesIdentifier(graphicalItem) {
  return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
function combineDisplayedStackedData(stackedGraphicalItems, _ref2, tooltipAxisSettings) {
  var _ref$chartData = _ref2.chartData, chartData = _ref$chartData === void 0 ? [] : _ref$chartData;
  var allowDuplicatedCategory = tooltipAxisSettings.allowDuplicatedCategory, tooltipDataKey = tooltipAxisSettings.dataKey;
  var knownItemsByDataKey = /* @__PURE__ */ new Map();
  stackedGraphicalItems.forEach((item) => {
    var _item$data;
    var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
    if (resolvedData == null || resolvedData.length === 0) {
      return;
    }
    var stackIdentifier = getStackSeriesIdentifier(item);
    resolvedData.forEach((entry, index) => {
      var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
      var numericValue = getValueByDataKey(entry, item.dataKey, 0);
      var curr;
      if (knownItemsByDataKey.has(tooltipValue)) {
        curr = knownItemsByDataKey.get(tooltipValue);
      } else {
        curr = {};
      }
      Object.assign(curr, {
        [stackIdentifier]: numericValue
      });
      knownItemsByDataKey.set(tooltipValue, curr);
    });
  });
  return Array.from(knownItemsByDataKey.values());
}
function isStacked(graphicalItem) {
  return "stackId" in graphicalItem && graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
var numberDomainEqualityCheck = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  return a[0] === b[0] && a[1] === b[1];
};
function emptyArraysAreEqualCheck(a, b) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === 0 && b.length === 0) {
    return true;
  }
  return a === b;
}
function arrayContentsAreEqualCheck(a, b) {
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var selectTooltipAxisType = (state) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return "xAxis";
  }
  if (layout === "vertical") {
    return "yAxis";
  }
  if (layout === "centric") {
    return "angleAxis";
  }
  return "radiusAxis";
};
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
function rechartsScaleFactory(d3Scale) {
  if (d3Scale == null) {
    return void 0;
  }
  var ticksFn = d3Scale.ticks;
  var bandwidthFn = d3Scale.bandwidth;
  var d3Range = d3Scale.range();
  var range2 = [Math.min(...d3Range), Math.max(...d3Range)];
  return {
    domain: () => d3Scale.domain(),
    range: (function(_range) {
      function range3() {
        return _range.apply(this, arguments);
      }
      range3.toString = function() {
        return _range.toString();
      };
      return range3;
    })(() => range2),
    rangeMin: () => range2[0],
    rangeMax: () => range2[1],
    isInRange(value) {
      var first = range2[0];
      var last = range2[1];
      return first <= last ? value >= first && value <= last : value >= last && value <= first;
    },
    bandwidth: bandwidthFn ? () => bandwidthFn.call(d3Scale) : void 0,
    ticks: ticksFn ? (count) => ticksFn.call(d3Scale, count) : void 0,
    map: (input, options) => {
      var baseValue = d3Scale(input);
      if (baseValue == null) {
        return void 0;
      }
      if (d3Scale.bandwidth && options !== null && options !== void 0 && options.position) {
        var bandWidth = d3Scale.bandwidth();
        switch (options.position) {
          case "middle":
            baseValue += bandWidth / 2;
            break;
          case "end":
            baseValue += bandWidth;
            break;
        }
      }
      return baseValue;
    }
  };
}
var combineCheckedDomain = (realScaleType, axisDomain) => {
  if (axisDomain == null) {
    return void 0;
  }
  switch (realScaleType) {
    case "linear": {
      if (!isWellFormedNumberDomain(axisDomain)) {
        var min, max;
        for (var i = 0; i < axisDomain.length; i++) {
          var value = axisDomain[i];
          if (!isWellBehavedNumber(value)) {
            continue;
          }
          if (min === void 0 || value < min) {
            min = value;
          }
          if (max === void 0 || value > max) {
            max = value;
          }
        }
        if (min !== void 0 && max !== void 0) {
          return [min, max];
        }
        return void 0;
      }
      return axisDomain;
    }
    default:
      return axisDomain;
  }
};
function getD3ScaleFromType(realScaleType) {
  var scales = d3Scales;
  if (realScaleType in scales && typeof scales[realScaleType] === "function") {
    return scales[realScaleType]();
  }
  var name = "scale".concat(upperFirst(realScaleType));
  if (name in scales && typeof scales[name] === "function") {
    return scales[name]();
  }
  return void 0;
}
function combineConfiguredScaleInternal(scale, axisDomain, axisRange) {
  if (typeof scale === "function") {
    return scale.copy().domain(axisDomain).range(axisRange);
  }
  if (scale == null) {
    return void 0;
  }
  var d3ScaleFunction = getD3ScaleFromType(scale);
  if (d3ScaleFunction == null) {
    return void 0;
  }
  d3ScaleFunction.domain(axisDomain).range(axisRange);
  return d3ScaleFunction;
}
function combineConfiguredScale(axis, realScaleType, axisDomain, axisRange) {
  if (axisDomain == null || axisRange == null) {
    return void 0;
  }
  if (typeof axis.scale === "function") {
    return combineConfiguredScaleInternal(axis.scale, axisDomain, axisRange);
  }
  return combineConfiguredScaleInternal(realScaleType, axisDomain, axisRange);
}
function getD3ScaleName(name) {
  return "scale".concat(upperFirst(name));
}
function isSupportedScaleName(name) {
  return getD3ScaleName(name) in d3Scales;
}
var combineRealScaleType = (axisConfig, hasBar, chartType) => {
  if (axisConfig == null) {
    return void 0;
  }
  var scale = axisConfig.scale, type = axisConfig.type;
  if (scale === "auto") {
    if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) {
      return "point";
    }
    if (type === "category") {
      return "band";
    }
    return "linear";
  }
  if (typeof scale === "string") {
    return isSupportedScaleName(scale) ? scale : "point";
  }
  return void 0;
};
function bisect(haystack, needle) {
  var lo = 0;
  var hi = haystack.length;
  var ascending = haystack[0] < haystack[haystack.length - 1];
  while (lo < hi) {
    var mid = Math.floor((lo + hi) / 2);
    if (ascending ? haystack[mid] < needle : haystack[mid] > needle) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
function createCategoricalInverse(scale, allDataPointsOnAxis) {
  if (!scale) {
    return void 0;
  }
  var domain = allDataPointsOnAxis !== null && allDataPointsOnAxis !== void 0 ? allDataPointsOnAxis : scale.domain();
  var pixelPositions = domain.map((d) => {
    var _scale;
    return (_scale = scale(d)) !== null && _scale !== void 0 ? _scale : 0;
  });
  var range2 = scale.range();
  if (domain.length === 0 || range2.length < 2) {
    return void 0;
  }
  return (pixelValue) => {
    var _pixelPositions, _pixelPositions$index;
    var index = bisect(pixelPositions, pixelValue);
    if (index <= 0) {
      return domain[0];
    }
    if (index >= domain.length) {
      return domain[domain.length - 1];
    }
    var leftPixel = (_pixelPositions = pixelPositions[index - 1]) !== null && _pixelPositions !== void 0 ? _pixelPositions : 0;
    var rightPixel = (_pixelPositions$index = pixelPositions[index]) !== null && _pixelPositions$index !== void 0 ? _pixelPositions$index : 0;
    if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) {
      return domain[index - 1];
    }
    return domain[index];
  };
}
function combineInverseScaleFunction(configuredScale) {
  if (configuredScale == null) {
    return void 0;
  }
  if ("invert" in configuredScale && typeof configuredScale.invert === "function") {
    return configuredScale.invert.bind(configuredScale);
  }
  return createCategoricalInverse(configuredScale, void 0);
}
function ownKeys$u(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$u(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$u(Object(t), true).forEach(function(r2) {
      _defineProperty$w(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$u(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$w(e, r, t) {
  return (r = _toPropertyKey$w(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$w(t) {
  var i = _toPrimitive$w(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$w(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$c(r, e) {
  return _arrayWithHoles$c(r) || _iterableToArrayLimit$c(r, e) || _unsupportedIterableToArray$c(r, e) || _nonIterableRest$c();
}
function _nonIterableRest$c() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$c(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$c(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$c(r, a) : void 0;
  }
}
function _arrayLikeToArray$c(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$c(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$c(r) {
  if (Array.isArray(r)) return r;
}
var defaultNumericDomain = [0, "auto"];
var implicitXAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
  var axis = selectXAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitXAxis;
  }
  return axis;
};
var implicitYAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: defaultNumericDomain,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: DEFAULT_Y_AXIS_WIDTH
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
  var axis = selectYAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitYAxis;
  }
  return axis;
};
var implicitZAxis = {
  domain: [0, "auto"],
  includeHidden: false,
  reversed: false,
  allowDataOverflow: false,
  allowDuplicatedCategory: false,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
};
var selectZAxisSettings = (state, axisId) => {
  var axis = state.cartesianAxis.zAxis[axisId];
  if (axis == null) {
    return implicitZAxis;
  }
  return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "zAxis": {
      return selectZAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectRenderableAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
function itemAxisPredicate(axisType, axisId) {
  return (item) => {
    switch (axisType) {
      case "xAxis":
        return "xAxisId" in item && item.xAxisId === axisId;
      case "yAxis":
        return "yAxisId" in item && item.yAxisId === axisId;
      case "zAxis":
        return "zAxisId" in item && item.zAxisId === axisId;
      case "angleAxis":
        return "angleAxisId" in item && item.angleAxisId === axisId;
      case "radiusAxis":
        return "radiusAxisId" in item && item.radiusAxisId === axisId;
      default:
        return false;
    }
  };
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate$1 = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) {
    return true;
  }
  return !item.hide;
});
var selectCartesianItemsSettings = createSelector([selectUnfilteredCartesianItems, selectBaseAxis, selectAxisPredicate$1], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
  return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
var selectAnyCartesianItemsUsesChartData = createSelector([selectCartesianItemsSettings], (items) => items.some((item) => !item.data));
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var combineDisplayedData = (graphicalItemsData, _ref2) => {
  var _ref$chartData = _ref2.chartData, chartData = _ref$chartData === void 0 ? [] : _ref$chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (graphicalItemsData.length > 0) {
    return graphicalItemsData;
  }
  return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
var selectDisplayedData$1 = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanoramaPosition4], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    }));
  }
  if (items.length > 0) {
    return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({
      value: getValueByDataKey(entry, dataKey)
    })));
  }
  return data.map((entry) => ({
    value: entry
  }));
};
var combineAllAppliedValues = (displayedData, axisSettings, items, _ref2, anyItemUsesChartData, graphicalItemsData) => {
  var _ref2$chartData = _ref2.chartData, chartData = _ref2$chartData === void 0 ? [] : _ref2$chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  var appliedValues = combineAppliedValues(displayedData, axisSettings, items);
  if (anyItemUsesChartData && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && graphicalItemsData.length > 0) {
    var chartDataSlice2 = chartData.slice(dataStartIndex, dataEndIndex + 1);
    var chartAppliedValues = chartDataSlice2.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    })).filter((av) => av.value != null);
    return [...chartAppliedValues, ...appliedValues];
  }
  return appliedValues;
};
var selectAllAppliedValues = createSelector([selectDisplayedData$1, selectBaseAxis, selectCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectAnyCartesianItemsUsesChartData, selectCartesianGraphicalItemsData], combineAllAppliedValues);
function makeNumber(val) {
  if (isNumOrStr(val) || val instanceof Date) {
    var n = Number(val);
    if (isWellBehavedNumber(n)) {
      return n;
    }
  }
  return void 0;
}
function makeDomain(val) {
  if (Array.isArray(val)) {
    var attempt = [makeNumber(val[0]), makeNumber(val[1])];
    if (isWellFormedNumberDomain(attempt)) {
      return attempt;
    }
    return void 0;
  }
  var n = makeNumber(val);
  if (n == null) {
    return void 0;
  }
  return [n, n];
}
function onlyAllowNumbers(data) {
  return data.map(makeNumber).filter(isNotNil);
}
function sortBy(a, b) {
  var aNum = makeNumber(a);
  var bNum = makeNumber(b);
  if (aNum == null && bNum == null) {
    return 0;
  }
  if (aNum == null) {
    return -1;
  }
  if (bNum == null) {
    return 1;
  }
  return aNum - bNum;
}
var selectSortedDataPoints = createSelector([selectAllAppliedValues], (appliedData) => {
  return appliedData === null || appliedData === void 0 ? void 0 : appliedData.map((item) => item.value).sort(sortBy);
});
function isErrorBarRelevantForAxisType(axisType, errorBar) {
  switch (axisType) {
    case "xAxis":
      return errorBar.direction === "x";
    case "yAxis":
      return errorBar.direction === "y";
    default:
      return false;
  }
}
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
  if (!relevantErrorBars) {
    return [];
  }
  if (!relevantErrorBars.length) {
    return [];
  }
  var appliedNumericValue;
  if (typeof appliedValue === "number" && !isNan(appliedValue)) {
    appliedNumericValue = appliedValue;
  } else if (Array.isArray(appliedValue)) {
    var numericRangeValues = onlyAllowNumbers(appliedValue);
    if (numericRangeValues.length > 0) {
      appliedNumericValue = Math.max(...numericRangeValues);
    }
  }
  if (appliedNumericValue == null) {
    return [];
  }
  return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
    var errorValue = getValueByDataKey(entry, eb.dataKey);
    var lowBound, highBound;
    if (Array.isArray(errorValue)) {
      var _errorValue = _slicedToArray$c(errorValue, 2);
      lowBound = _errorValue[0];
      highBound = _errorValue[1];
    } else {
      lowBound = highBound = errorValue;
    }
    if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) {
      return void 0;
    }
    return [appliedNumericValue - lowBound, appliedNumericValue + highBound];
  }));
}
var selectTooltipAxis = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  return selectRenderableAxisSettings(state, axisType, axisId);
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
var selectDisplayedStackedData = createSelector([selectStackedCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectTooltipAxis], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType, reverseStackOrder) => {
  var initialItemsGroups = {};
  var itemsGroup = items.reduce((acc, item) => {
    if (item.stackId == null) {
      return acc;
    }
    var stack = acc[item.stackId];
    if (stack == null) {
      stack = [];
    }
    stack.push(item);
    acc[item.stackId] = stack;
    return acc;
  }, initialItemsGroups);
  return Object.fromEntries(Object.entries(itemsGroup).map((_ref3) => {
    var _ref4 = _slicedToArray$c(_ref3, 2), stackId = _ref4[0], graphicalItems = _ref4[1];
    var orderedGraphicalItems = reverseStackOrder ? [...graphicalItems].reverse() : graphicalItems;
    var dataKeys = orderedGraphicalItems.map(getStackSeriesIdentifier);
    return [stackId, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: getStackedData(displayedData, dataKeys, stackOffsetType),
      graphicalItems: orderedGraphicalItems
    }];
  }));
};
var selectStackGroups = createSelector([selectDisplayedStackedData, selectStackedCartesianItemsSettings, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref5, axisType, domainFromUserPreference) => {
  var dataStartIndex = _ref5.dataStartIndex, dataEndIndex = _ref5.dataEndIndex;
  if (domainFromUserPreference != null) {
    return void 0;
  }
  if (axisType === "zAxis") {
    return void 0;
  }
  return getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
};
var selectAllowsDataOverflow = createSelector([selectBaseAxis], (axisSettings) => axisSettings.allowDataOverflow);
var getDomainDefinition = (axisSettings) => {
  var _axisSettings$domain;
  if (axisSettings == null || !("domain" in axisSettings)) {
    return defaultNumericDomain;
  }
  if (axisSettings.domain != null) {
    return axisSettings.domain;
  }
  if ("ticks" in axisSettings && axisSettings.ticks != null) {
    if (axisSettings.type === "number") {
      var allValues = onlyAllowNumbers(axisSettings.ticks);
      return [Math.min(...allValues), Math.max(...allValues)];
    }
    if (axisSettings.type === "category") {
      return axisSettings.ticks.map(String);
    }
  }
  return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
var selectDomainFromUserPreference = createSelector([selectDomainDefinition, selectAllowsDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectDomainOfStackGroups = createSelector([selectStackGroups, selectChartDataWithIndexes, pickAxisType, selectDomainFromUserPreference], combineDomainOfStackGroups, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
  return cartesianItemsSettings.flatMap((item) => {
    return allErrorBarSettings[item.id];
  }).filter(Boolean).filter((e) => {
    return isErrorBarRelevantForAxisType(axisType, e);
  });
};
var mergeDomains = function mergeDomains2() {
  for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) {
    domains[_key] = arguments[_key];
  }
  var allDomains = domains.filter(Boolean);
  if (allDomains.length === 0) {
    return void 0;
  }
  var allValues = allDomains.flat();
  var min = Math.min(...allValues);
  var max = Math.max(...allValues);
  return [min, max];
};
var combineDomainOfAllAppliedNumericalValuesIncludingErrorValues = function combineDomainOfAllAppliedNumericalValuesIncludingErrorValues2(displayedData, axisSettings, items, errorBars, axisType) {
  var chartDataSlice2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
  var lowerEnd, upperEnd;
  if (items.length > 0) {
    items.forEach((item) => {
      var _errorBars$item$id;
      var itemData = item.data != null ? [...item.data] : chartDataSlice2;
      var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
      itemData.forEach((entry) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        var errorDomain = getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars);
        if (errorDomain.length >= 2) {
          var localLower = Math.min(...errorDomain);
          var localUpper = Math.max(...errorDomain);
          if (lowerEnd == null || localLower < lowerEnd) {
            lowerEnd = localLower;
          }
          if (upperEnd == null || localUpper > upperEnd) {
            upperEnd = localUpper;
          }
        }
        var dataValueDomain = makeDomain(valueByDataKey);
        if (dataValueDomain != null) {
          lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
          upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
        }
      });
    });
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && items.length === 0) {
    displayedData.forEach((item) => {
      var dataValueDomain = makeDomain(getValueByDataKey(item, axisSettings.dataKey));
      if (dataValueDomain != null) {
        lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
        upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
      }
    });
  }
  if (isWellBehavedNumber(lowerEnd) && isWellBehavedNumber(upperEnd)) {
    return [lowerEnd, upperEnd];
  }
  return void 0;
};
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1 = createSelector([selectDisplayedData$1, selectBaseAxis, selectCartesianItemsSettingsExceptStacked, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIfNotInPanorama], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
function onlyAllowNumbersAndStringsAndDates(item) {
  var value = item.value;
  if (isNumOrStr(value) || value instanceof Date) {
    return value;
  }
  return void 0;
}
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
  var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v) => v != null);
  if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) {
    return range(0, allDataSquished.length);
  }
  if (axisSettings.allowDuplicatedCategory) {
    return categoricalDomain;
  }
  return Array.from(new Set(categoricalDomain));
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
  return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
    if (axisType === "xAxis") {
      return el.xAxisId === axisId;
    }
    return el.yAxisId === axisId;
  });
};
var selectReferenceDotsByAxis = createSelector([selectReferenceDots, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([selectReferenceAreas, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([selectReferenceLines, pickAxisType, pickAxisId], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
  if (dots == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
  if (areas == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(areas.flatMap((area) => [axisType === "xAxis" ? area.x1 : area.y1, axisType === "xAxis" ? area.x2 : area.y2]));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
function extractXCoordinates(line) {
  var _line$segment;
  if (line.x != null) {
    return onlyAllowNumbers([line.x]);
  }
  var segmentCoordinates = (_line$segment = line.segment) === null || _line$segment === void 0 ? void 0 : _line$segment.map((s) => s.x);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
function extractYCoordinates(line) {
  var _line$segment2;
  if (line.y != null) {
    return onlyAllowNumbers([line.y]);
  }
  var segmentCoordinates = (_line$segment2 = line.segment) === null || _line$segment2 === void 0 ? void 0 : _line$segment2.map((s) => s.y);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
var combineLinesDomain = (lines, axisType) => {
  if (lines == null) {
    return void 0;
  }
  var allCoords = lines.flatMap((line) => axisType === "xAxis" ? extractXCoordinates(line) : extractYCoordinates(line));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceLinesDomain = createSelector([selectReferenceLinesByAxis, pickAxisType], combineLinesDomain);
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, selectReferenceLinesDomain, selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
  return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var combineNumericalDomain = (axisSettings, domainDefinition, domainFromUserPreference, domainOfStackGroups, dataAndErrorBarsDomain, referenceElementsDomain, layout, axisType, numericTicksDomain) => {
  if (domainFromUserPreference != null) {
    return domainFromUserPreference;
  }
  var shouldIncludeDomainOfStackGroups = layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis";
  var mergedDomains = shouldIncludeDomainOfStackGroups ? mergeDomains(domainOfStackGroups, referenceElementsDomain, dataAndErrorBarsDomain) : mergeDomains(referenceElementsDomain, dataAndErrorBarsDomain);
  var parsedDomain = parseNumericalUserDomain(domainDefinition, mergedDomains, axisSettings.allowDataOverflow);
  if (parsedDomain != null) {
    return parsedDomain;
  }
  if (axisSettings.allowDataOverflow && mergedDomains == null && numericTicksDomain != null) {
    return numericTicksDomain;
  }
  return parsedDomain;
};
var combineNumericTicksDomain = (axisSettings) => {
  if (axisSettings == null || axisSettings.type !== "number" || !("ticks" in axisSettings) || axisSettings.ticks == null) {
    return void 0;
  }
  var numericTicks = onlyAllowNumbers(axisSettings.ticks);
  if (numericTicks.length === 0) {
    return void 0;
  }
  return [Math.min(...numericTicks), Math.max(...numericTicks)];
};
var selectNumericTicksDomain = createSelector([selectBaseAxis], combineNumericTicksDomain, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, selectDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1, selectReferenceElementsDomain, selectChartLayout, pickAxisType, selectNumericTicksDomain], combineNumericalDomain, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
  if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) {
    return void 0;
  }
  var dataKey = axisSettings.dataKey, type = axisSettings.type;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && dataKey == null) {
    var _displayedData$length;
    return range(0, (_displayedData$length = displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) !== null && _displayedData$length !== void 0 ? _displayedData$length : 0);
  }
  if (type === "category") {
    return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
  }
  if (stackOffsetType === "expand" && !isCategorical) {
    return expandDomain;
  }
  return numericalDomain;
};
var selectAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectDisplayedData$1, selectAllAppliedValues, selectStackOffsetType, pickAxisType, selectNumericalDomain], combineAxisDomain);
var selectRealScaleType = createSelector([selectBaseAxis, selectHasBar, selectChartName], combineRealScaleType);
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
  var niceTicks = axisSettings.niceTicks;
  if (niceTicks === "none") {
    return void 0;
  }
  var domainDefinition = getDomainDefinition(axisSettings);
  var hasDomainAutoKeyword = Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto");
  if ((niceTicks === "snap125" || niceTicks === "adaptive") && axisSettings != null && axisSettings.tickCount && isWellFormedNumberDomain(axisDomain)) {
    if (hasDomainAutoKeyword) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
    if (axisSettings.type === "number") {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
  }
  if (niceTicks === "auto" && realScaleType === "linear" && axisSettings != null && axisSettings.tickCount) {
    if (hasDomainAutoKeyword && isWellFormedNumberDomain(axisDomain)) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
    if (axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
  }
  return void 0;
};
var selectNiceTicks = createSelector([selectAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0
  ) {
    var _niceTicks$, _niceTicks;
    var minFromDomain = domain[0];
    var minFromTicks = (_niceTicks$ = niceTicks[0]) !== null && _niceTicks$ !== void 0 ? _niceTicks$ : 0;
    var maxFromDomain = domain[1];
    var maxFromTicks = (_niceTicks = niceTicks[niceTicks.length - 1]) !== null && _niceTicks !== void 0 ? _niceTicks : 0;
    return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
  }
  return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectAxisDomain, selectNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
var selectSmallestDistanceBetweenValues = createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
  if (!axisSettings || axisSettings.type !== "number") {
    return void 0;
  }
  var smallestDistanceBetweenValues = Infinity;
  var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d) => d.value))).sort((a, b) => a - b);
  var first = sortedValues[0];
  var last = sortedValues[sortedValues.length - 1];
  if (first == null || last == null) {
    return Infinity;
  }
  var diff = last - first;
  if (diff === 0) {
    return Infinity;
  }
  for (var i = 0; i < sortedValues.length - 1; i++) {
    var curr = sortedValues[i];
    var next = sortedValues[i + 1];
    if (curr == null || next == null) {
      continue;
    }
    var distance = next - curr;
    smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
  }
  return smallestDistanceBetweenValues / diff;
});
var selectCalculatedPadding = createSelector(selectSmallestDistanceBetweenValues, selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, _4, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
  if (!isWellBehavedNumber(smallestDistanceInPercent)) {
    return 0;
  }
  var rangeWidth = layout === "vertical" ? offset.height : offset.width;
  if (padding === "gap") {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (padding === "no-gap") {
    var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
    var halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
  return 0;
});
var selectCalculatedXAxisPadding = (state, axisId, isPanorama) => {
  var xAxisSettings = selectXAxisSettings(state, axisId);
  if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "xAxis", axisId, isPanorama, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId, isPanorama) => {
  var yAxisSettings = selectYAxisSettings(state, axisId);
  if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "yAxis", axisId, isPanorama, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
  var _padding$left, _padding$right;
  if (xAxisSettings == null) {
    return {
      left: 0,
      right: 0
    };
  }
  var padding = xAxisSettings.padding;
  if (typeof padding === "string") {
    return {
      left: calculated,
      right: calculated
    };
  }
  return {
    left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
    right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
  };
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
  var _padding$top, _padding$bottom;
  if (yAxisSettings == null) {
    return {
      top: 0,
      bottom: 0
    };
  }
  var padding = yAxisSettings.padding;
  if (typeof padding === "string") {
    return {
      top: calculated,
      bottom: calculated
    };
  }
  return {
    top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
    bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
  };
});
var selectXAxisRange = createSelector([selectChartOffsetInternal, selectXAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, padding, brushDimensions, _ref6, isPanorama) => {
  var brushPadding = _ref6.padding;
  if (isPanorama) {
    return [brushPadding.left, brushDimensions.width - brushPadding.right];
  }
  return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var selectYAxisRange = createSelector([selectChartOffsetInternal, selectChartLayout, selectYAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, layout, padding, brushDimensions, _ref7, isPanorama) => {
  var brushPadding = _ref7.padding;
  if (isPanorama) {
    return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
  }
  if (layout === "horizontal") {
    return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
  }
  return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
  var _selectZAxisSettings;
  switch (axisType) {
    case "xAxis":
      return selectXAxisRange(state, axisId, isPanorama);
    case "yAxis":
      return selectYAxisRange(state, axisId, isPanorama);
    case "zAxis":
      return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
    case "angleAxis":
      return selectAngleAxisRange(state);
    case "radiusAxis":
      return selectRadiusAxisRange(state, axisId);
    default:
      return void 0;
  }
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectCheckedAxisDomain = createSelector([selectRealScaleType, selectAxisDomainIncludingNiceTicks], combineCheckedDomain);
var selectConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectCheckedAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
  if (axis == null || axis.dataKey == null) {
    return void 0;
  }
  var type = axis.type, scale = axis.scale;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && (type === "number" || scale !== "auto")) {
    return appliedValues.map((d) => d.value);
  }
  return void 0;
};
var selectCategoricalDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectRenderableAxisSettings, pickAxisType], combineCategoricalDomain);
var selectAxisScale = createSelector([selectConfiguredScale], rechartsScaleFactory);
createSelector([selectConfiguredScale], combineInverseScaleFunction);
createSelector([selectConfiguredScale, selectSortedDataPoints], createCategoricalInverse);
createSelector([selectCartesianItemsSettings, selectAllErrorBarSettings, pickAxisType], combineRelevantErrorBarSettings);
function compareIds(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
  var height = typeof axisSettings.height === "number" ? axisSettings.height : DEFAULT_X_AXIS_HEIGHT;
  return {
    width: offset.width,
    height
  };
};
var getYAxisSize = (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
  switch (orientation) {
    case "top":
      return offset.top;
    case "bottom":
      return chartHeight - offset.bottom;
    default:
      return 0;
  }
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
  switch (orientation) {
    case "left":
      return offset.left;
    case "right":
      return chartWidth - offset.right;
    default:
      return 0;
  }
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getXAxisSize(offset, axis);
    if (position == null) {
      position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
    }
    var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.height;
    position += (needSpace ? -1 : 1) * axisSize.height;
  });
  return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getYAxisSize(offset, axis);
    if (position == null) {
      position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
    }
    var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.width;
    position += (needSpace ? -1 : 1) * axisSize.width;
  });
  return steps;
});
var selectXAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectXAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectXAxisPosition = createSelector([selectChartOffsetInternal, selectXAxisSettings, selectXAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: offset.left,
      y: 0
    };
  }
  return {
    x: offset.left,
    y: stepOfThisAxis
  };
});
var selectYAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectYAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectYAxisPosition = createSelector([selectChartOffsetInternal, selectYAxisSettings, selectYAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: 0,
      y: offset.top
    };
  }
  return {
    x: stepOfThisAxis,
    y: offset.top
  };
});
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
});
var selectCartesianAxisSize = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSize(state, axisId).width;
    }
    case "yAxis": {
      return selectYAxisSize(state, axisId).height;
    }
    default: {
      return void 0;
    }
  }
};
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var allowDuplicatedCategory = axis.allowDuplicatedCategory, type = axis.type, dataKey = axis.dataKey;
  var isCategorical = isCategoricalAxis(chartLayout, axisType);
  var allData = appliedValues.map((av) => av.value);
  var validData = allData.filter((v) => v != null);
  if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(validData)) {
    return allData;
  }
  return void 0;
};
var selectDuplicateDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectBaseAxis, pickAxisType], combineDuplicateDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([selectChartLayout, selectCartesianAxisSettings, selectRealScaleType, selectAxisScale, selectDuplicateDomain, selectCategoricalDomain, selectAxisRange, selectNiceTicks, pickAxisType], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  return {
    angle: axis.angle,
    interval: axis.interval,
    minTickGap: axis.minTickGap,
    orientation: axis.orientation,
    tick: axis.tick,
    tickCount: axis.tickCount,
    tickFormatter: axis.tickFormatter,
    ticks: axis.ticks,
    type: axis.type,
    unit: axis.unit,
    axisType,
    categoricalDomain,
    duplicateDomain,
    isCategorical,
    niceTicks,
    range: axisRange,
    realScaleType,
    scale
  };
});
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var type = axis.type, ticks = axis.ticks, tickCount = axis.tickCount;
  var offsetForBand = (
    // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
    realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2
  );
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  var ticksOrNiceTicks = ticks || niceTicks;
  if (ticksOrNiceTicks) {
    return ticksOrNiceTicks.map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        index,
        coordinate: scaled + offset,
        value: entry,
        offset
      };
    }).filter(isNotNil);
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfAxis = createSelector([selectChartLayout, selectRenderableAxisSettings, selectRealScaleType, selectAxisScale, selectNiceTicks, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineAxisTicks);
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var tickCount = axis.tickCount;
  var offset = 0;
  offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use unknown as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfGraphicalItem = createSelector([selectChartLayout, selectRenderableAxisSettings, selectAxisScale, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineGraphicalItemTicks);
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$u(_objectSpread$u({}, axis), {}, {
    scale
  });
});
var selectZAxisConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var selectZAxisScale = createSelector([selectZAxisConfiguredScale], rechartsScaleFactory);
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), selectZAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$u(_objectSpread$u({}, axis), {}, {
    scale
  });
});
var selectChartDirection = createSelector([selectChartLayout, selectAllXAxes, selectAllYAxes], (layout, allXAxes, allYAxes) => {
  switch (layout) {
    case "horizontal": {
      return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
    }
    case "vertical": {
      return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
    }
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial": {
      return "left-to-right";
    }
    default: {
      return void 0;
    }
  }
});
var selectRenderedTicksOfAxis = (state, axisType, axisId) => {
  var _state$renderedTicks$;
  return (_state$renderedTicks$ = state.renderedTicks[axisType]) === null || _state$renderedTicks$ === void 0 ? void 0 : _state$renderedTicks$[axisId];
};
createSelector([selectRenderedTicksOfAxis], (ticks) => {
  if (!ticks || ticks.length === 0) {
    return void 0;
  }
  return (pixelValue) => {
    var _closestTick;
    var minDistance = Infinity;
    var closestTick = ticks[0];
    for (var tick of ticks) {
      var distance = Math.abs(tick.coordinate - pixelValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestTick = tick;
      }
    }
    return (_closestTick = closestTick) === null || _closestTick === void 0 ? void 0 : _closestTick.value;
  };
});
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
  if (shared == null) {
    return defaultTooltipEventType;
  }
  var eventType = shared ? "axis" : "item";
  if (validateTooltipEventTypes == null) {
    return defaultTooltipEventType;
  }
  return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType$1(state, shared) {
  var defaultTooltipEventType = selectDefaultTooltipEventType(state);
  var validateTooltipEventTypes = selectValidateTooltipEventTypes(state);
  return combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes);
}
function useTooltipEventType(shared) {
  return useAppSelector((state) => selectTooltipEventType$1(state, shared));
}
var combineActiveLabel = (tooltipTicks, activeIndex) => {
  var _tooltipTicks$n;
  var n = Number(activeIndex);
  if (isNan(n) || activeIndex == null) {
    return void 0;
  }
  return n >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
var selectTooltipSettings = (state) => state.tooltip.settings;
var noInteraction = {
  active: false,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
};
var initialState$b = {
  itemInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  axisInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  keyboardInteraction: noInteraction,
  syncInteraction: {
    active: false,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: false,
    defaultIndex: void 0
  }
};
var tooltipSlice = createSlice({
  name: "tooltip",
  initialState: initialState$b,
  reducers: {
    addTooltipEntrySettings: {
      reducer(state, action) {
        state.tooltipItemPayloads.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceTooltipEntrySettings: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(prev));
        if (index > -1) {
          state.tooltipItemPayloads[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeTooltipEntrySettings: {
      reducer(state, action) {
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.tooltipItemPayloads.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    setTooltipSettingsState(state, action) {
      state.settings = action.payload;
    },
    setActiveMouseOverItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.itemInteraction.hover.active = true;
      state.itemInteraction.hover.index = action.payload.activeIndex;
      state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
      state.itemInteraction.hover.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    mouseLeaveChart(state) {
      state.itemInteraction.hover.active = false;
      state.axisInteraction.hover.active = false;
    },
    mouseLeaveItem(state) {
      state.itemInteraction.hover.active = false;
    },
    setActiveClickItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.itemInteraction.click.active = true;
      state.keyboardInteraction.active = false;
      state.itemInteraction.click.index = action.payload.activeIndex;
      state.itemInteraction.click.dataKey = action.payload.activeDataKey;
      state.itemInteraction.click.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.axisInteraction.hover.active = true;
      state.keyboardInteraction.active = false;
      state.axisInteraction.hover.index = action.payload.activeIndex;
      state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
      state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.axisInteraction.click.active = true;
      state.axisInteraction.click.index = action.payload.activeIndex;
      state.axisInteraction.click.dataKey = action.payload.activeDataKey;
      state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setSyncInteraction(state, action) {
      state.syncInteraction = action.payload;
    },
    setKeyboardInteraction(state, action) {
      state.keyboardInteraction.active = action.payload.active;
      state.keyboardInteraction.index = action.payload.activeIndex;
      state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
    }
  }
});
var _tooltipSlice$actions = tooltipSlice.actions, addTooltipEntrySettings = _tooltipSlice$actions.addTooltipEntrySettings, replaceTooltipEntrySettings = _tooltipSlice$actions.replaceTooltipEntrySettings, removeTooltipEntrySettings = _tooltipSlice$actions.removeTooltipEntrySettings, setTooltipSettingsState = _tooltipSlice$actions.setTooltipSettingsState, setActiveMouseOverItemIndex = _tooltipSlice$actions.setActiveMouseOverItemIndex, mouseLeaveItem = _tooltipSlice$actions.mouseLeaveItem, mouseLeaveChart = _tooltipSlice$actions.mouseLeaveChart, setActiveClickItemIndex = _tooltipSlice$actions.setActiveClickItemIndex, setMouseOverAxisIndex = _tooltipSlice$actions.setMouseOverAxisIndex, setMouseClickAxisIndex = _tooltipSlice$actions.setMouseClickAxisIndex, setSyncInteraction = _tooltipSlice$actions.setSyncInteraction, setKeyboardInteraction = _tooltipSlice$actions.setKeyboardInteraction;
var tooltipReducer = tooltipSlice.reducer;
function ownKeys$t(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$t(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$t(Object(t), true).forEach(function(r2) {
      _defineProperty$v(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$t(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$v(e, r, t) {
  return (r = _toPropertyKey$v(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$v(t) {
  var i = _toPrimitive$v(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$v(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
  if (tooltipEventType === "axis") {
    if (trigger === "click") {
      return tooltipState.axisInteraction.click;
    }
    return tooltipState.axisInteraction.hover;
  }
  if (trigger === "click") {
    return tooltipState.itemInteraction.click;
  }
  return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
  return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType == null) {
    return noInteraction;
  }
  var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
  if (appropriateMouseInteraction == null) {
    return noInteraction;
  }
  if (appropriateMouseInteraction.active) {
    return appropriateMouseInteraction;
  }
  if (tooltipState.keyboardInteraction.active) {
    return tooltipState.keyboardInteraction;
  }
  if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) {
    return tooltipState.syncInteraction;
  }
  var activeFromProps = tooltipState.settings.active === true;
  if (hasBeenActivePreviously(appropriateMouseInteraction)) {
    if (activeFromProps) {
      return _objectSpread$t(_objectSpread$t({}, appropriateMouseInteraction), {}, {
        active: true
      });
    }
  } else if (defaultIndex != null) {
    return {
      active: true,
      coordinate: void 0,
      dataKey: void 0,
      index: defaultIndex,
      graphicalItemId: void 0
    };
  }
  return _objectSpread$t(_objectSpread$t({}, noInteraction), {}, {
    coordinate: appropriateMouseInteraction.coordinate
  });
};
function toFiniteNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : void 0;
  }
  if (value instanceof Date) {
    var numericValue = value.valueOf();
    return Number.isFinite(numericValue) ? numericValue : void 0;
  }
  var parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function isValueWithinNumberDomain(value, domain) {
  var numericValue = toFiniteNumber(value);
  var lowerBound = domain[0];
  var upperBound = domain[1];
  if (numericValue === void 0) {
    return false;
  }
  var min = Math.min(lowerBound, upperBound);
  var max = Math.max(lowerBound, upperBound);
  return numericValue >= min && numericValue <= max;
}
function isValueWithinDomain(entry, axisDataKey, domain) {
  if (domain == null || axisDataKey == null) {
    return true;
  }
  var value = getValueByDataKey(entry, axisDataKey);
  if (value == null) {
    return true;
  }
  if (!isWellFormedNumberDomain(domain)) {
    return true;
  }
  return isValueWithinNumberDomain(value, domain);
}
var combineActiveTooltipIndex = (tooltipInteraction, chartData, axisDataKey, domain) => {
  var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
  if (desiredIndex == null) {
    return null;
  }
  var indexAsNumber = Number(desiredIndex);
  if (!isWellBehavedNumber(indexAsNumber)) {
    return desiredIndex;
  }
  var lowerLimit = 0;
  var upperLimit = Infinity;
  if (chartData.length > 0) {
    upperLimit = chartData.length - 1;
  }
  var clampedIndex = Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit));
  var entry = chartData[clampedIndex];
  if (entry == null) {
    return String(clampedIndex);
  }
  if (!isValueWithinDomain(entry, axisDataKey, domain)) {
    return null;
  }
  return String(clampedIndex);
};
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations) => {
  if (defaultIndex == null) {
    return void 0;
  }
  var firstConfiguration = tooltipConfigurations[0];
  var maybePosition = firstConfiguration === null || firstConfiguration === void 0 ? void 0 : firstConfiguration.getPosition(defaultIndex);
  if (maybePosition != null) {
    return maybePosition;
  }
  var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
  if (!tick) {
    return void 0;
  }
  switch (layout) {
    case "horizontal": {
      return {
        x: tick.coordinate,
        y: (offset.top + height) / 2
      };
    }
    default: {
      return {
        x: (offset.left + width) / 2,
        y: tick.coordinate
      };
    }
  }
};
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType === "axis") {
    return tooltipState.tooltipItemPayloads;
  }
  if (tooltipState.tooltipItemPayloads.length === 0) {
    return [];
  }
  var filterByGraphicalItemId;
  if (trigger === "hover") {
    filterByGraphicalItemId = tooltipState.itemInteraction.hover.graphicalItemId;
  } else {
    filterByGraphicalItemId = tooltipState.itemInteraction.click.graphicalItemId;
  }
  if (tooltipState.syncInteraction.active && filterByGraphicalItemId == null) {
    return tooltipState.tooltipItemPayloads;
  }
  if (filterByGraphicalItemId == null && (defaultIndex != null || tooltipState.keyboardInteraction.active)) {
    var firstItemPayload = tooltipState.tooltipItemPayloads[0];
    if (firstItemPayload != null) {
      return [firstItemPayload];
    }
    return [];
  }
  return tooltipState.tooltipItemPayloads.filter((tpc) => {
    var _tpc$settings;
    return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.graphicalItemId) === filterByGraphicalItemId;
  });
};
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
var selectTooltipState = (state) => state.tooltip;
function ownKeys$s(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$s(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$s(Object(t), true).forEach(function(r2) {
      _defineProperty$u(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$s(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$u(e, r, t) {
  return (r = _toPropertyKey$u(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$u(t) {
  var i = _toPrimitive$u(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$u(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parseName(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return void 0;
}
function parseUnit(value) {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return void 0;
}
function parseDataKey(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (typeof value === "function") {
    return (obj) => value(obj);
  }
  return void 0;
}
function parseColor(value) {
  if (typeof value === "string") {
    return value;
  }
  return void 0;
}
function parseTooltipPayloadItem(item) {
  if (item == null || typeof item !== "object") {
    return void 0;
  }
  var name = "name" in item ? parseName(item.name) : void 0;
  var unit = "unit" in item ? parseUnit(item.unit) : void 0;
  var dataKey = "dataKey" in item ? parseDataKey(item.dataKey) : void 0;
  var payload = "payload" in item ? item.payload : void 0;
  var color = "color" in item ? parseColor(item.color) : void 0;
  var fill = "fill" in item ? parseColor(item.fill) : void 0;
  return {
    name,
    unit,
    dataKey,
    payload,
    color,
    fill
  };
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
  if (dataDefinedOnItem != null) {
    return dataDefinedOnItem;
  }
  return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
  if (activeIndex == null || tooltipPayloadSearcher == null) {
    return void 0;
  }
  var chartData = chartDataState.chartData, computedData = chartDataState.computedData, dataStartIndex = chartDataState.dataStartIndex, dataEndIndex = chartDataState.dataEndIndex;
  var init = [];
  return tooltipPayloadConfigurations.reduce((agg, _ref2) => {
    var _settings$dataKey;
    var dataDefinedOnItem = _ref2.dataDefinedOnItem, settings = _ref2.settings;
    var finalData = selectFinalData(dataDefinedOnItem, chartData);
    var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
    var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
    var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
    var tooltipPayload;
    if (tooltipAxisDataKey && Array.isArray(sliced) && /*
     * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
     * as tooltip payloads and findEntryInArray is not prepared to handle that.
     * Sad but also ScatterChart only allows 'item' tooltipEventType
     * and also this is only a problem if there are multiple Scatters and each has its own data array
     * so let's fix that some other time.
     */
    !Array.isArray(sliced[0]) && /*
     * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
     * because thanks to allowDuplicatedCategory=false, the order of elements in the array
     * no longer matches the order of elements in the original data
     * and so we need to search by the active dataKey + label rather than by index.
     *
     * The same happens if multiple graphical items are present in the chart
     * and each of them has its own data array. Those arrays get concatenated
     * and again the tooltip index no longer matches the original data.
     *
     * On the other hand the tooltipEventType 'item' should always search by index
     * because we get the index from interacting over the individual elements
     * which is always accurate, irrespective of the allowDuplicatedCategory setting.
     */
    tooltipEventType === "axis") {
      tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
      if (tooltipPayload == null) {
        tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
      }
    } else {
      tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
    }
    if (Array.isArray(tooltipPayload)) {
      tooltipPayload.forEach((item) => {
        var _parsedItem$color, _parsedItem$fill;
        var parsedItem = parseTooltipPayloadItem(item);
        var itemName = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.name;
        var itemDataKey = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.dataKey;
        var itemPayload = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.payload;
        var newSettings = _objectSpread$s(_objectSpread$s({}, settings), {}, {
          name: itemName,
          unit: parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.unit,
          // Preserve item-level color/fill from graphical items.
          color: (_parsedItem$color = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.color) !== null && _parsedItem$color !== void 0 ? _parsedItem$color : settings === null || settings === void 0 ? void 0 : settings.color,
          fill: (_parsedItem$fill = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.fill) !== null && _parsedItem$fill !== void 0 ? _parsedItem$fill : settings === null || settings === void 0 ? void 0 : settings.fill
        });
        agg.push(getTooltipEntry({
          tooltipEntrySettings: newSettings,
          dataKey: itemDataKey,
          payload: itemPayload,
          value: getValueByDataKey(itemPayload, itemDataKey),
          name: itemName == null ? void 0 : String(itemName)
        }));
      });
    } else {
      var _getValueByDataKey;
      agg.push(getTooltipEntry({
        tooltipEntrySettings: settings,
        dataKey: finalDataKey,
        payload: tooltipPayload,
        // getValueByDataKey does not validate the output type
        value: getValueByDataKey(tooltipPayload, finalDataKey),
        // getValueByDataKey does not validate the output type
        name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
      }));
    }
    return agg;
  }, init);
};
var selectTooltipAxisRealScaleType = createSelector([selectTooltipAxis, selectHasBar, selectChartName], combineRealScaleType);
var selectAllUnfilteredGraphicalItems = createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]);
var selectTooltipAxisPredicate = createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate);
var selectAllGraphicalItemsSettings = createSelector([selectAllUnfilteredGraphicalItems, selectTooltipAxis, selectTooltipAxisPredicate], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipGraphicalItemsData = createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAnyTooltipItemUsesChartData = createSelector([selectAllGraphicalItemsSettings], (items) => items.some((item) => !item.data));
var selectTooltipDisplayedData = createSelector([selectTooltipGraphicalItemsData, selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([selectAllStackedGraphicalItemsSettings, selectChartDataWithIndexes, selectTooltipAxis], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectAllGraphicalItemsSettings, selectChartDataWithIndexes, selectAnyTooltipItemUsesChartData, selectTooltipGraphicalItemsData], combineAllAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectTooltipDataOverflow = createSelector([selectTooltipAxis], (axisSettings) => axisSettings.allowDataOverflow);
var selectTooltipDomainFromUserPreferences = createSelector([selectTooltipAxisDomainDefinition, selectTooltipDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectAllStackedGraphicalItems = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipStackGroups = createSelector([selectTooltipStackedData, selectAllStackedGraphicalItems, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var selectTooltipDomainOfStackGroups = createSelector([selectTooltipStackGroups, selectChartDataWithIndexes, selectTooltipAxisType, selectTooltipDomainFromUserPreferences], combineDomainOfStackGroups);
var selectTooltipItemsSettingsExceptStacked = createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems);
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectTooltipItemsSettingsExceptStacked, selectAllErrorBarSettings, selectTooltipAxisType, selectChartDataSliceWithIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectReferenceDotsByTooltipAxis = createSelector([selectReferenceDots, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceDotsDomain = createSelector([selectReferenceDotsByTooltipAxis, selectTooltipAxisType], combineDotsDomain);
var selectReferenceAreasByTooltipAxis = createSelector([selectReferenceAreas, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceAreasDomain = createSelector([selectReferenceAreasByTooltipAxis, selectTooltipAxisType], combineAreasDomain);
var selectReferenceLinesByTooltipAxis = createSelector([selectReferenceLines, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceLinesDomain = createSelector([selectReferenceLinesByTooltipAxis, selectTooltipAxisType], combineLinesDomain);
var selectTooltipReferenceElementsDomain = createSelector([selectTooltipReferenceDotsDomain, selectTooltipReferenceLinesDomain, selectTooltipReferenceAreasDomain], mergeDomains);
var selectTooltipNumericalDomain = createSelector([selectTooltipAxis, selectTooltipAxisDomainDefinition, selectTooltipDomainFromUserPreferences, selectTooltipDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues, selectTooltipReferenceElementsDomain, selectChartLayout, selectTooltipAxisType], combineNumericalDomain);
var selectTooltipAxisDomain = createSelector([selectTooltipAxis, selectChartLayout, selectTooltipDisplayedData, selectAllTooltipAppliedValues, selectStackOffsetType, selectTooltipAxisType, selectTooltipNumericalDomain], combineAxisDomain);
var selectTooltipNiceTicks = createSelector([selectTooltipAxisDomain, selectTooltipAxis, selectTooltipAxisRealScaleType], combineNiceTicks);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([selectTooltipAxis, selectTooltipAxisDomain, selectTooltipNiceTicks, selectTooltipAxisType], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  var isPanorama = false;
  return selectAxisRange(state, axisType, axisId, isPanorama);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipConfiguredScale = createSelector([selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisDomainIncludingNiceTicks, selectTooltipAxisRangeWithReverse], combineConfiguredScale);
var selectTooltipAxisScale = createSelector([selectTooltipConfiguredScale], rechartsScaleFactory);
var selectTooltipDuplicateDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range2, duplicateDomain, categoricalDomain, axisType) => {
  if (!axis) {
    return void 0;
  }
  var type = axis.type;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (!scale) {
    return void 0;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 != null && (range2 === null || range2 === void 0 ? void 0 : range2.length) >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTooltipAxisTicks = createSelector([selectChartLayout, selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisScale, selectTooltipAxisRange, selectTooltipDuplicateDomain, selectTooltipCategoricalDomain, selectTooltipAxisType], combineTicksOfTooltipAxis);
var selectTooltipEventType = createSelector([selectDefaultTooltipEventType, selectValidateTooltipEventTypes, selectTooltipSettings], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([selectTooltipInteractionState$1, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.dataKey;
});
var selectActiveTooltipGraphicalItemId = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.graphicalItemId;
});
var selectTooltipPayloadConfigurations$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipPayloadConfigurations);
var selectTooltipCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, selectDefaultIndex, selectTooltipPayloadConfigurations$1], combineCoordinateForDefaultIndex);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, selectTooltipCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) {
    return tooltipInteractionState.coordinate;
  }
  return defaultIndexCoordinate;
});
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState === null || tooltipInteractionState === void 0 ? void 0 : tooltipInteractionState.active) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : false;
});
var selectActiveTooltipPayload = createSelector([selectTooltipPayloadConfigurations$1, selectActiveTooltipIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel$1, selectTooltipPayloadSearcher, selectTooltipEventType], combineTooltipPayload);
var selectActiveTooltipDataPoints = createSelector([selectActiveTooltipPayload], (payload) => {
  if (payload == null) {
    return void 0;
  }
  var dataPoints = payload.map((p) => p.payload).filter((p) => p != null);
  return Array.from(new Set(dataPoints));
});
function ownKeys$r(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$r(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$r(Object(t), true).forEach(function(r2) {
      _defineProperty$t(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$r(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$t(e, r, t) {
  return (r = _toPropertyKey$t(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$t(t) {
  var i = _toPrimitive$t(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$t(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
  var tooltipAxis = useTooltipAxis();
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
  if (!tooltipAxis || !tooltipAxisScale) {
    return getBandSizeOfAxis(void 0, tooltipTicks);
  }
  return getBandSizeOfAxis(_objectSpread$r(_objectSpread$r({}, tooltipAxis), {}, {
    scale: tooltipAxisScale
  }), tooltipTicks);
};
function ownKeys$q(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$q(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$q(Object(t), true).forEach(function(r2) {
      _defineProperty$s(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$q(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$s(e, r, t) {
  return (r = _toPropertyKey$s(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$s(t) {
  var i = _toPrimitive$s(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$s(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "horizontal") {
      return {
        x: entry.coordinate,
        y: pointer.relativeY
      };
    }
    if (layout === "vertical") {
      return {
        x: pointer.relativeX,
        y: entry.coordinate
      };
    }
  }
  return {
    x: 0,
    y: 0
  };
};
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "centric") {
      var _angle = entry.coordinate;
      var _radius = rangeObj.radius;
      return _objectSpread$q(_objectSpread$q(_objectSpread$q({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
        angle: _angle,
        radius: _radius
      });
    }
    var radius = entry.coordinate;
    var angle = rangeObj.angle;
    return _objectSpread$q(_objectSpread$q(_objectSpread$q({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
      angle,
      radius
    });
  }
  return {
    angle: 0,
    clockWise: false,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function isInCartesianRange(pointer, offset) {
  var x = pointer.relativeX, y = pointer.relativeY;
  return x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks, unsortedTicks, axisType, range2) => {
  var _ticks$length;
  var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
  if (len <= 1 || coordinate == null) {
    return 0;
  }
  if (axisType === "angleAxis" && range2 != null && Math.abs(Math.abs(range2[1] - range2[0]) - 360) <= 1e-6) {
    var span = range2[1] - range2[0];
    var isInside = (lowerLimit, upperLimit, inclusiveLower) => [coordinate, coordinate + span, coordinate - span].some((c) => (inclusiveLower ? c >= lowerLimit : c > lowerLimit) && c <= upperLimit);
    for (var i = 0; i < len; i++) {
      var _unsortedTicks, _unsortedTicks2, _unsortedTicks$i, _unsortedTicks$, _unsortedTicks3;
      var before = i > 0 ? (_unsortedTicks = unsortedTicks[i - 1]) === null || _unsortedTicks === void 0 ? void 0 : _unsortedTicks.coordinate : (_unsortedTicks2 = unsortedTicks[len - 1]) === null || _unsortedTicks2 === void 0 ? void 0 : _unsortedTicks2.coordinate;
      var cur = (_unsortedTicks$i = unsortedTicks[i]) === null || _unsortedTicks$i === void 0 ? void 0 : _unsortedTicks$i.coordinate;
      var after = i >= len - 1 ? (_unsortedTicks$ = unsortedTicks[0]) === null || _unsortedTicks$ === void 0 ? void 0 : _unsortedTicks$.coordinate : (_unsortedTicks3 = unsortedTicks[i + 1]) === null || _unsortedTicks3 === void 0 ? void 0 : _unsortedTicks3.coordinate;
      var sameDirectionCoord = void 0;
      if (before == null || cur == null || after == null) {
        continue;
      }
      if (mathSign(cur - before) !== mathSign(after - cur)) {
        var diffInterval = [];
        if (mathSign(after - cur) === mathSign(range2[1] - range2[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range2[1] - range2[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range2[1] - range2[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (isInside(sameInterval[0], sameInterval[1], false) || isInside(diffInterval[0], diffInterval[1], true)) {
          var _unsortedTicks$i2;
          return (_unsortedTicks$i2 = unsortedTicks[i]) === null || _unsortedTicks$i2 === void 0 ? void 0 : _unsortedTicks$i2.index;
        }
      } else {
        var minValue = Math.min(before, after);
        var maxValue = Math.max(before, after);
        if (isInside((minValue + cur) / 2, (maxValue + cur) / 2, false)) {
          var _unsortedTicks$i3;
          return (_unsortedTicks$i3 = unsortedTicks[i]) === null || _unsortedTicks$i3 === void 0 ? void 0 : _unsortedTicks$i3.index;
        }
      }
    }
  } else if (ticks) {
    for (var _i = 0; _i < len; _i++) {
      var curr = ticks[_i];
      if (curr == null) {
        continue;
      }
      var next = ticks[_i + 1];
      var prev = ticks[_i - 1];
      if (_i === 0 && next != null && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
      if (_i === len - 1 && prev != null && coordinate > (curr.coordinate + prev.coordinate) / 2) {
        return curr.index;
      }
      if (_i > 0 && _i < len - 1 && prev != null && next != null && coordinate > (curr.coordinate + prev.coordinate) / 2 && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
    }
  }
  return -1;
};
var useChartName = () => {
  return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks) => sortBy$1(ticks, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipInteractionState);
var selectActiveIndex = createSelector([selectTooltipInteractionState, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
  if (tooltipEventType == null) {
    return void 0;
  }
  var tooltipState = selectTooltipState(state);
  if (tooltipEventType === "axis") {
    if (trigger === "hover") {
      return tooltipState.axisInteraction.hover.dataKey;
    }
    return tooltipState.axisInteraction.click.dataKey;
  }
  if (trigger === "hover") {
    return tooltipState.itemInteraction.hover.dataKey;
  }
  return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, pickDefaultIndex, selectTooltipPayloadConfigurations], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel = createSelector([selectTooltipAxisTicks, selectActiveIndex], combineActiveLabel);
var selectTooltipPayload = createSelector([selectTooltipPayloadConfigurations, selectActiveIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel, selectTooltipPayloadSearcher, pickTooltipEventType], combineTooltipPayload);
var selectIsTooltipActive = createSelector([selectTooltipInteractionState, selectActiveIndex], (tooltipInteractionState, activeIndex) => {
  return {
    isActive: tooltipInteractionState.active && activeIndex != null,
    activeIndex
  };
});
var combineActiveCartesianProps = (chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (!isInCartesianRange(chartEvent, offset)) {
    return void 0;
  }
  var pos = calculateCartesianTooltipPos(chartEvent, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActiveCartesianCoordinate(layout, tooltipTicks, activeIndex, chartEvent);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActivePolarProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks || !polarViewBox) {
    return void 0;
  }
  var rangeObj = inRangeOfSector(chartEvent, polarViewBox);
  if (!rangeObj) {
    return void 0;
  }
  var pos = calculatePolarTooltipPos(rangeObj, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActivePolarCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (layout === "horizontal" || layout === "vertical") {
    return combineActiveCartesianProps(chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset);
  }
  return combineActivePolarProps(chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks);
};
var selectZIndexPortalElement = createSelector((state) => state.zIndex.zIndexMap, (_, zIndex) => zIndex, (_, _zIndex, isPanorama) => isPanorama, (zIndexMap, zIndex, isPanorama) => {
  if (zIndex == null) {
    return void 0;
  }
  var entry = zIndexMap[zIndex];
  if (entry == null) {
    return void 0;
  }
  if (isPanorama) {
    return entry.panoramaElement;
  }
  return entry.element;
});
var selectAllRegisteredZIndexes = createSelector((state) => state.zIndex.zIndexMap, (zIndexMap) => {
  var allNumbers = Object.keys(zIndexMap).map((zIndexStr) => parseInt(zIndexStr, 10)).concat(Object.values(DefaultZIndexes));
  var uniqueNumbers = Array.from(new Set(allNumbers));
  return uniqueNumbers.sort((a, b) => a - b);
}, {
  memoizeOptions: {
    resultEqualityCheck: arrayContentsAreEqualCheck
  }
});
function ownKeys$p(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$p(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$p(Object(t), true).forEach(function(r2) {
      _defineProperty$r(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$p(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$r(e, r, t) {
  return (r = _toPropertyKey$r(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$r(t) {
  var i = _toPrimitive$r(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$r(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var seed = {};
var initialState$a = {
  zIndexMap: Object.values(DefaultZIndexes).reduce((acc, current2) => _objectSpread$p(_objectSpread$p({}, acc), {}, {
    [current2]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), seed)
};
var defaultZIndexSet = new Set(Object.values(DefaultZIndexes));
function isDefaultZIndex(zIndex) {
  return defaultZIndexSet.has(zIndex);
}
var zIndexSlice = createSlice({
  name: "zIndex",
  initialState: initialState$a,
  reducers: {
    registerZIndexPortal: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers += 1;
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 1,
            element: void 0,
            panoramaElement: void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortal: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers -= 1;
          if (state.zIndexMap[zIndex].consumers <= 0 && !isDefaultZIndex(zIndex)) {
            delete state.zIndexMap[zIndex];
          }
        }
      },
      prepare: prepareAutoBatched()
    },
    registerZIndexPortalElement: {
      reducer: (state, action) => {
        var _action$payload = action.payload, zIndex = _action$payload.zIndex, element = _action$payload.element, isPanorama = _action$payload.isPanorama;
        if (state.zIndexMap[zIndex]) {
          if (isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = castDraft(element);
          } else {
            state.zIndexMap[zIndex].element = castDraft(element);
          }
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 0,
            element: isPanorama ? void 0 : castDraft(element),
            panoramaElement: isPanorama ? castDraft(element) : void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortalElement: {
      reducer: (state, action) => {
        var zIndex = action.payload.zIndex;
        if (state.zIndexMap[zIndex]) {
          if (action.payload.isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = void 0;
          } else {
            state.zIndexMap[zIndex].element = void 0;
          }
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _zIndexSlice$actions = zIndexSlice.actions, registerZIndexPortal = _zIndexSlice$actions.registerZIndexPortal, unregisterZIndexPortal = _zIndexSlice$actions.unregisterZIndexPortal, registerZIndexPortalElement = _zIndexSlice$actions.registerZIndexPortalElement, unregisterZIndexPortalElement = _zIndexSlice$actions.unregisterZIndexPortalElement;
var zIndexReducer = zIndexSlice.reducer;
function ZIndexLayer(_ref2) {
  var zIndex = _ref2.zIndex, children = _ref2.children;
  var isInChartContext = useIsInChartContext();
  var shouldRenderInPortal = isInChartContext && zIndex !== void 0 && zIndex !== 0;
  var isPanorama = useIsPanorama();
  var lastPortalElementRef = reactExports.useRef(void 0);
  var registeredZIndexesRef = reactExports.useRef(/* @__PURE__ */ new Set());
  var dispatch = useAppDispatch();
  var portalElement = useAppSelector((state) => selectZIndexPortalElement(state, zIndex, isPanorama));
  reactExports.useLayoutEffect(() => {
    if (!shouldRenderInPortal) {
      var registered = registeredZIndexesRef.current;
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
      lastPortalElementRef.current = void 0;
      return;
    }
    if (!registeredZIndexesRef.current.has(zIndex)) {
      dispatch(registerZIndexPortal({
        zIndex
      }));
      registeredZIndexesRef.current.add(zIndex);
    }
    if (portalElement) {
      lastPortalElementRef.current = portalElement;
      var _registered = registeredZIndexesRef.current;
      _registered.forEach((z) => {
        if (z !== zIndex) {
          dispatch(unregisterZIndexPortal({
            zIndex: z
          }));
          _registered.delete(z);
        }
      });
    }
  }, [dispatch, zIndex, shouldRenderInPortal, portalElement]);
  reactExports.useLayoutEffect(() => {
    var registered = registeredZIndexesRef.current;
    return () => {
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
    };
  }, [dispatch]);
  if (!shouldRenderInPortal) {
    return children;
  }
  var targetElement = portalElement !== null && portalElement !== void 0 ? portalElement : lastPortalElementRef.current;
  if (!targetElement) {
    return null;
  }
  return /* @__PURE__ */ reactDomExports.createPortal(children, targetElement);
}
function _extends$l() {
  return _extends$l = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$l.apply(null, arguments);
}
function ownKeys$o(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$o(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$o(Object(t), true).forEach(function(r2) {
      _defineProperty$q(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$o(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$q(e, r, t) {
  return (r = _toPropertyKey$q(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$q(t) {
  var i = _toPrimitive$q(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$q(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function RenderCursor(_ref2) {
  var cursor = _ref2.cursor, cursorComp = _ref2.cursorComp, cursorProps = _ref2.cursorProps;
  if (/* @__PURE__ */ reactExports.isValidElement(cursor)) {
    return /* @__PURE__ */ reactExports.cloneElement(cursor, cursorProps);
  }
  return /* @__PURE__ */ reactExports.createElement(cursorComp, cursorProps);
}
function CursorInternal(props) {
  var _props$zIndex;
  var coordinate = props.coordinate, payload = props.payload, index = props.index, offset = props.offset, tooltipAxisBandSize = props.tooltipAxisBandSize, layout = props.layout, cursor = props.cursor, tooltipEventType = props.tooltipEventType, chartName = props.chartName;
  var activeCoordinate = coordinate;
  var activePayload = payload;
  var activeTooltipIndex = index;
  if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") {
    return null;
  }
  var restProps, cursorComp, preferredZIndex;
  if (chartName === "ScatterChart") {
    restProps = activeCoordinate;
    cursorComp = Cross;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else if (chartName === "BarChart") {
    restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
    cursorComp = Rectangle;
    preferredZIndex = DefaultZIndexes.cursorRectangle;
  } else if (layout === "radial" && isPolarCoordinate(activeCoordinate)) {
    var _getRadialCursorPoint = getRadialCursorPoints(activeCoordinate), cx = _getRadialCursorPoint.cx, cy = _getRadialCursorPoint.cy, radius = _getRadialCursorPoint.radius, startAngle = _getRadialCursorPoint.startAngle, endAngle = _getRadialCursorPoint.endAngle;
    restProps = {
      cx,
      cy,
      startAngle,
      endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = Sector;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else {
    restProps = {
      points: getCursorPoints(layout, activeCoordinate, offset)
    };
    cursorComp = Curve;
    preferredZIndex = DefaultZIndexes.cursorLine;
  }
  var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
  var cursorProps = _objectSpread$o(_objectSpread$o(_objectSpread$o(_objectSpread$o({
    stroke: "#ccc",
    pointerEvents: "none"
  }, offset), restProps), svgPropertiesNoEventsFromUnknown(cursor)), {}, {
    payload: activePayload,
    payloadIndex: activeTooltipIndex,
    className: clsx("recharts-tooltip-cursor", extraClassName)
  });
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : preferredZIndex
  }, /* @__PURE__ */ reactExports.createElement(RenderCursor, {
    cursor,
    cursorComp,
    cursorProps
  }));
}
function Cursor(props) {
  var tooltipAxisBandSize = useTooltipAxisBandSize();
  var offset = useOffsetInternal();
  var layout = useChartLayout();
  var chartName = useChartName();
  if (tooltipAxisBandSize == null || offset == null || layout == null || chartName == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(CursorInternal, _extends$l({}, props, {
    offset,
    layout,
    tooltipAxisBandSize,
    chartName
  }));
}
var TooltipPortalContext = /* @__PURE__ */ reactExports.createContext(null);
var useTooltipPortal = () => reactExports.useContext(TooltipPortalContext);
var eventCenter = new EventEmitter();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
var arrayTooltipSearcher = (data, strIndex) => {
  if (!strIndex) return void 0;
  if (!Array.isArray(data)) return void 0;
  var numIndex = Number.parseInt(strIndex, 10);
  if (isNan(numIndex)) {
    return void 0;
  }
  return data[numIndex];
};
var initialState$9 = {
  chartName: "",
  tooltipPayloadSearcher: () => void 0,
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
};
var optionsSlice = createSlice({
  name: "options",
  initialState: initialState$9,
  reducers: {
    createEventEmitter: (state) => {
      if (state.eventEmitter == null) {
        state.eventEmitter = /* @__PURE__ */ Symbol("rechartsEventEmitter");
      }
    }
  }
});
var optionsReducer = optionsSlice.reducer;
var createEventEmitter = optionsSlice.actions.createEventEmitter;
function selectSynchronisedTooltipState(state) {
  return state.tooltip.syncInteraction;
}
var initialChartDataState = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
};
var chartDataSlice = createSlice({
  name: "chartData",
  initialState: initialChartDataState,
  reducers: {
    setChartData(state, action) {
      state.chartData = castDraft(action.payload);
      if (action.payload == null) {
        state.dataStartIndex = 0;
        state.dataEndIndex = 0;
        return;
      }
      if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) {
        state.dataEndIndex = action.payload.length - 1;
      }
    },
    setComputedData(state, action) {
      state.computedData = action.payload;
    },
    setDataStartEndIndexes(state, action) {
      var _action$payload = action.payload, startIndex = _action$payload.startIndex, endIndex = _action$payload.endIndex;
      if (startIndex != null) {
        state.dataStartIndex = startIndex;
      }
      if (endIndex != null) {
        state.dataEndIndex = endIndex;
      }
    }
  }
});
var _chartDataSlice$actio = chartDataSlice.actions, setChartData = _chartDataSlice$actio.setChartData, setDataStartEndIndexes = _chartDataSlice$actio.setDataStartEndIndexes;
_chartDataSlice$actio.setComputedData;
var chartDataReducer = chartDataSlice.reducer;
var _excluded$l = ["x", "y"];
function ownKeys$n(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$n(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$n(Object(t), true).forEach(function(r2) {
      _defineProperty$p(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$n(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$p(e, r, t) {
  return (r = _toPropertyKey$p(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$p(t) {
  var i = _toPrimitive$p(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$p(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$l(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$l(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$l(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function useTooltipSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var layout = useChartLayout();
  var viewBox = useViewBox();
  var className = useAppSelector((state) => state.rootProps.className);
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId !== incomingSyncId) {
        return;
      }
      if (action.payload.active === false) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (syncMethod === "index") {
        var _action$payload;
        if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
          var _action$payload$coord = action.payload.coordinate, _x = _action$payload$coord.x, _y = _action$payload$coord.y, otherCoordinateProps = _objectWithoutProperties$l(_action$payload$coord, _excluded$l);
          var _action$payload$sourc = action.payload.sourceViewBox, sourceX = _action$payload$sourc.x, sourceY = _action$payload$sourc.y, sourceWidth = _action$payload$sourc.width, sourceHeight = _action$payload$sourc.height;
          var scaledCoordinate = _objectSpread$n(_objectSpread$n({}, otherCoordinateProps), {}, {
            x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
            y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
          });
          dispatch(_objectSpread$n(_objectSpread$n({}, action), {}, {
            payload: _objectSpread$n(_objectSpread$n({}, action.payload), {}, {
              coordinate: scaledCoordinate
            })
          }));
        } else {
          dispatch(action);
        }
        return;
      }
      if (tooltipTicks == null) {
        return;
      }
      var activeTick;
      if (typeof syncMethod === "function") {
        var syncMethodParam = {
          activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          isTooltipActive: action.payload.active,
          activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          activeLabel: action.payload.label,
          activeDataKey: action.payload.dataKey,
          activeCoordinate: action.payload.coordinate
        };
        var activeTooltipIndex = syncMethod(tooltipTicks, syncMethodParam);
        activeTick = tooltipTicks[activeTooltipIndex];
      } else if (syncMethod === "value") {
        activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
      }
      var coordinate = action.payload.coordinate;
      if (coordinate == null || viewBox == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (activeTick == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: action.payload.sourceViewBox,
          graphicalItemId: void 0
        }));
        return;
      }
      var x = coordinate.x, y = coordinate.y;
      var validateChartX = Math.min(x, viewBox.x + viewBox.width);
      var validateChartY = Math.min(y, viewBox.y + viewBox.height);
      var activeCoordinate = {
        x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
        y: layout === "horizontal" ? validateChartY : activeTick.coordinate
      };
      var syncAction = setSyncInteraction({
        active: action.payload.active,
        coordinate: activeCoordinate,
        dataKey: action.payload.dataKey,
        index: String(activeTick.index),
        label: action.payload.label,
        sourceViewBox: action.payload.sourceViewBox,
        graphicalItemId: action.payload.graphicalItemId
      });
      dispatch(syncAction);
    };
    eventCenter.on(TOOLTIP_SYNC_EVENT, listener);
    return () => {
      eventCenter.off(TOOLTIP_SYNC_EVENT, listener);
    };
  }, [className, dispatch, myEventEmitter, mySyncId, syncMethod, tooltipTicks, layout, viewBox]);
}
function useBrushSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId === incomingSyncId) {
        dispatch(setDataStartEndIndexes(action));
      }
    };
    eventCenter.on(BRUSH_SYNC_EVENT, listener);
    return () => {
      eventCenter.off(BRUSH_SYNC_EVENT, listener);
    };
  }, [dispatch, myEventEmitter, mySyncId]);
}
function useSynchronisedEventsFromOtherCharts() {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(createEventEmitter());
  }, [dispatch]);
  useTooltipSyncEventsListener();
  useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
  var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var eventEmitterSymbol = useAppSelector(selectEventEmitter);
  var syncId = useAppSelector(selectSyncId);
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipState = useAppSelector(selectSynchronisedTooltipState);
  var isReceivingSynchronisation = (tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.sourceViewBox) != null;
  var viewBox = useViewBox();
  reactExports.useEffect(() => {
    if (isReceivingSynchronisation) {
      return;
    }
    if (syncId == null) {
      return;
    }
    if (eventEmitterSymbol == null) {
      return;
    }
    var syncAction = setSyncInteraction({
      active: isTooltipActive,
      coordinate: activeCoordinate,
      dataKey: activeDataKey,
      index: activeIndex,
      label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel,
      sourceViewBox: viewBox,
      graphicalItemId: activeGraphicalItemId
    });
    eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
  }, [isReceivingSynchronisation, activeCoordinate, activeDataKey, activeGraphicalItemId, activeIndex, activeLabel, eventEmitterSymbol, syncId, syncMethod, isTooltipActive, viewBox]);
}
function ownKeys$m(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$m(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$m(Object(t), true).forEach(function(r2) {
      _defineProperty$o(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$m(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$o(e, r, t) {
  return (r = _toPropertyKey$o(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$o(t) {
  var i = _toPrimitive$o(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$o(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray$b(r, e) {
  return _arrayWithHoles$b(r) || _iterableToArrayLimit$b(r, e) || _unsupportedIterableToArray$b(r, e) || _nonIterableRest$b();
}
function _nonIterableRest$b() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$b(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$b(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$b(r, a) : void 0;
  }
}
function _arrayLikeToArray$b(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$b(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$b(r) {
  if (Array.isArray(r)) return r;
}
function defaultUniqBy(entry) {
  return entry.dataKey;
}
function renderContent(content, props) {
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    return /* @__PURE__ */ reactExports.cloneElement(content, props);
  }
  if (typeof content === "function") {
    return /* @__PURE__ */ reactExports.createElement(content, props);
  }
  return /* @__PURE__ */ reactExports.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: true,
  filterNull: true,
  includeHidden: false,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: false,
    y: false
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: false,
  wrapperStyle: {}
};
function Tooltip(outsideProps) {
  var _useAppSelector, _ref2;
  var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
  var activeFromProps = props.active, allowEscapeViewBox = props.allowEscapeViewBox, animationDuration = props.animationDuration, animationEasing = props.animationEasing, content = props.content, filterNull = props.filterNull, isAnimationActive = props.isAnimationActive, offset = props.offset, payloadUniqBy = props.payloadUniqBy, position = props.position, reverseDirection = props.reverseDirection, useTranslate3d = props.useTranslate3d, wrapperStyle = props.wrapperStyle, cursor = props.cursor, shared = props.shared, trigger = props.trigger, defaultIndex = props.defaultIndex, portalFromProps = props.portal, axisId = props.axisId;
  var dispatch = useAppDispatch();
  var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
  reactExports.useEffect(() => {
    dispatch(setTooltipSettingsState({
      shared,
      trigger,
      axisId,
      active: activeFromProps,
      defaultIndex: defaultIndexAsString
    }));
  }, [dispatch, shared, trigger, axisId, activeFromProps, defaultIndexAsString]);
  var viewBox = useViewBox();
  var accessibilityLayer = useAccessibilityLayer();
  var tooltipEventType = useTooltipEventType(shared);
  var _ref3 = (_useAppSelector = useAppSelector((state) => selectIsTooltipActive(state, tooltipEventType, trigger, defaultIndexAsString))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, activeIndex = _ref3.activeIndex, isActive = _ref3.isActive;
  var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
  var labelFromRedux = useAppSelector((state) => selectActiveLabel(state, tooltipEventType, trigger, defaultIndexAsString));
  var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
  var payload = payloadFromRedux;
  var tooltipPortalFromContext = useTooltipPortal();
  var finalIsActive = (_ref2 = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive) !== null && _ref2 !== void 0 ? _ref2 : false;
  var _useElementOffset = useElementOffset([payload, finalIsActive]), _useElementOffset2 = _slicedToArray$b(_useElementOffset, 2), lastBoundingBox = _useElementOffset2[0], updateBoundingBox = _useElementOffset2[1];
  var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
  useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
  var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
  if (tooltipPortal == null || viewBox == null || tooltipEventType == null) {
    return null;
  }
  var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
  if (!finalIsActive) {
    finalPayload = emptyPayload;
  }
  if (filterNull && finalPayload.length) {
    finalPayload = getUniqPayload(finalPayload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
  }
  var hasPayload = finalPayload.length > 0;
  var tooltipContentProps = _objectSpread$m(_objectSpread$m({}, props), {}, {
    payload: finalPayload,
    label: finalLabel,
    active: finalIsActive,
    activeIndex,
    coordinate,
    accessibilityLayer
  });
  var tooltipElement = /* @__PURE__ */ reactExports.createElement(TooltipBoundingBox, {
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    isAnimationActive,
    active: finalIsActive,
    coordinate,
    hasPayload,
    offset,
    position,
    reverseDirection,
    useTranslate3d,
    viewBox,
    wrapperStyle,
    lastBoundingBox,
    innerRef: updateBoundingBox,
    hasPortalFromProps: Boolean(portalFromProps)
  }, renderContent(content, tooltipContentProps));
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactDomExports.createPortal(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ reactExports.createElement(Cursor, {
    cursor,
    tooltipEventType,
    coordinate,
    payload: finalPayload,
    index: activeIndex
  }));
}
var Cell = (_props) => null;
Cell.displayName = "Cell";
function _defineProperty$n(e, r, t) {
  return (r = _toPropertyKey$n(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$n(t) {
  var i = _toPrimitive$n(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$n(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
class LRUCache {
  constructor(maxSize) {
    _defineProperty$n(this, "cache", /* @__PURE__ */ new Map());
    this.maxSize = maxSize;
  }
  get(key) {
    var value = this.cache.get(key);
    if (value !== void 0) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      var firstKey = this.cache.keys().next().value;
      if (firstKey != null) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function ownKeys$l(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$l(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$l(Object(t), true).forEach(function(r2) {
      _defineProperty$m(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$l(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$m(e, r, t) {
  return (r = _toPropertyKey$m(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$m(t) {
  var i = _toPrimitive$m(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$m(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultConfig = {
  cacheSize: 2e3,
  enableCache: true
};
var currentConfig = _objectSpread$l({}, defaultConfig);
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
  var fontSize = style.fontSize || "";
  var fontFamily = style.fontFamily || "";
  var fontWeight = style.fontWeight || "";
  var fontStyle = style.fontStyle || "";
  var letterSpacing = style.letterSpacing || "";
  var textTransform = style.textTransform || "";
  return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
var measureTextWithDOM = (text, style) => {
  try {
    var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    Object.assign(measurementSpan.style, SPAN_STYLE, style);
    measurementSpan.textContent = "".concat(text);
    var rect = measurementSpan.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  } catch (_unused) {
    return {
      width: 0,
      height: 0
    };
  }
};
var getStringSize = function getStringSize2(text) {
  var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (text === void 0 || text === null || Global.isSsr) {
    return {
      width: 0,
      height: 0
    };
  }
  if (!currentConfig.enableCache) {
    return measureTextWithDOM(text, style);
  }
  var cacheKey = createCacheKey(text, style);
  var cachedResult = stringCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  var result = measureTextWithDOM(text, style);
  stringCache.set(cacheKey, result);
  return result;
};
var _DecimalCSS;
function _slicedToArray$a(r, e) {
  return _arrayWithHoles$a(r) || _iterableToArrayLimit$a(r, e) || _unsupportedIterableToArray$a(r, e) || _nonIterableRest$a();
}
function _nonIterableRest$a() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$a(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$a(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$a(r, a) : void 0;
  }
}
function _arrayLikeToArray$a(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$a(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$a(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty$l(e, r, t) {
  return (r = _toPropertyKey$l(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$l(t) {
  var i = _toPrimitive$l(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$l(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
};
var FIXED_CSS_LENGTH_UNITS = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function isSupportedUnit(unit) {
  return FIXED_CSS_LENGTH_UNITS.includes(unit);
}
var STR_NAN = "NaN";
function convertToPx(value, unit) {
  return value * CONVERSION_RATES[unit];
}
class DecimalCSS {
  static parse(str) {
    var _NUM_SPLIT_REGEX$exec;
    var _ref2 = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [], _ref22 = _slicedToArray$a(_ref2, 3), numStr = _ref22[1], unit = _ref22[2];
    if (numStr == null) {
      return DecimalCSS.NaN;
    }
    return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : "");
  }
  constructor(num, unit) {
    this.num = num;
    this.unit = unit;
    this.num = num;
    this.unit = unit;
    if (isNan(num)) {
      this.unit = "";
    }
    if (unit !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
      this.num = NaN;
      this.unit = "";
    }
    if (isSupportedUnit(unit)) {
      this.num = convertToPx(num, unit);
      this.unit = "px";
    }
  }
  add(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num + other.num, this.unit);
  }
  subtract(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num - other.num, this.unit);
  }
  multiply(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num * other.num, this.unit || other.unit);
  }
  divide(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num / other.num, this.unit || other.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return isNan(this.num);
  }
}
_DecimalCSS = DecimalCSS;
_defineProperty$l(DecimalCSS, "NaN", new _DecimalCSS(NaN, ""));
function calculateArithmetic(expr) {
  if (expr == null || expr.includes(STR_NAN)) {
    return STR_NAN;
  }
  var newExpr = expr;
  while (newExpr.includes("*") || newExpr.includes("/")) {
    var _MULTIPLY_OR_DIVIDE_R;
    var _ref3 = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [], _ref4 = _slicedToArray$a(_ref3, 4), leftOperand = _ref4[1], operator = _ref4[2], rightOperand = _ref4[3];
    var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
    var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
    var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
    if (result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
  }
  while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
    var _ADD_OR_SUBTRACT_REGE;
    var _ref5 = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [], _ref6 = _slicedToArray$a(_ref5, 4), _leftOperand = _ref6[1], _operator = _ref6[2], _rightOperand = _ref6[3];
    var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
    var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
    var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
    if (_result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
  }
  return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
  var newExpr = expr;
  var match;
  while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
    var _match = match, _match2 = _slicedToArray$a(_match, 2), parentheticalExpression = _match2[1];
    newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
  }
  return newExpr;
}
function evaluateExpression(expression) {
  var newExpr = expression.replace(/\s+/g, "");
  newExpr = calculateParentheses(newExpr);
  newExpr = calculateArithmetic(newExpr);
  return newExpr;
}
function safeEvaluateExpression(expression) {
  try {
    return evaluateExpression(expression);
  } catch (_unused) {
    return STR_NAN;
  }
}
function reduceCSSCalc(expression) {
  var result = safeEvaluateExpression(expression.slice(5, -1));
  if (result === STR_NAN) {
    return "";
  }
  return result;
}
var _excluded$k = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], _excluded2$b = ["dx", "dy", "angle", "className", "breakAll"];
function _extends$k() {
  return _extends$k = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$k.apply(null, arguments);
}
function _objectWithoutProperties$k(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$k(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$k(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray$9(r, e) {
  return _arrayWithHoles$9(r) || _iterableToArrayLimit$9(r, e) || _unsupportedIterableToArray$9(r, e) || _nonIterableRest$9();
}
function _nonIterableRest$9() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$9(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$9(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$9(r, a) : void 0;
  }
}
function _arrayLikeToArray$9(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$9(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = false;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$9(r) {
  if (Array.isArray(r)) return r;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref2) => {
  var children = _ref2.children, breakAll = _ref2.breakAll, style = _ref2.style;
  try {
    var words = [];
    if (!isNullish(children)) {
      if (breakAll) {
        words = children.toString().split("");
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map((word) => ({
      word,
      width: getStringSize(word, style).width
    }));
    var spaceWidth = breakAll ? 0 : getStringSize(" ", style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  } catch (_unused) {
    return null;
  }
};
function isValidTextAnchor(value) {
  return value === "start" || value === "middle" || value === "end" || value === "inherit";
}
function isRenderableText(val) {
  return isNullish(val) || typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
var calculate = (words, lineWidth, spaceWidth, scaleToFit) => words.reduce((result, _ref2) => {
  var word = _ref2.word, width = _ref2.width;
  var currentLine = result[result.length - 1];
  if (currentLine && width != null && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
    currentLine.words.push(word);
    currentLine.width += width + spaceWidth;
  } else {
    var newLine = {
      words: [word],
      width
    };
    result.push(newLine);
  }
  return result;
}, []);
var findLongestLine = (words) => words.reduce((a, b) => a.width > b.width ? a : b);
var suffix = "…";
var checkOverflow = (text, index, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit) => {
  var tempText = text.slice(0, index);
  var words = calculateWordWidths({
    breakAll,
    style,
    children: tempText + suffix
  });
  if (!words) {
    return [false, []];
  }
  var result = calculate(words.wordsWithComputedWidth, lineWidth, spaceWidth, scaleToFit);
  var doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
  return [doesOverflow, result];
};
var calculateWordsByLines = (_ref3, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
  var maxLines = _ref3.maxLines, children = _ref3.children, style = _ref3.style, breakAll = _ref3.breakAll;
  var shouldLimitLines = isNumber(maxLines);
  var text = String(children);
  var originalResult = calculate(initialWordsWithComputedWith, lineWidth, spaceWidth, scaleToFit);
  if (!shouldLimitLines || scaleToFit) {
    return originalResult;
  }
  var overflows = originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth);
  if (!overflows) {
    return originalResult;
  }
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2);
    var prev = middle - 1;
    var _checkOverflow = checkOverflow(text, prev, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit), _checkOverflow2 = _slicedToArray$9(_checkOverflow, 2), doesPrevOverflow = _checkOverflow2[0], result = _checkOverflow2[1];
    var _checkOverflow3 = checkOverflow(text, middle, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit), _checkOverflow4 = _slicedToArray$9(_checkOverflow3, 1), doesMiddleOverflow = _checkOverflow4[0];
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }
  return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
  var words = !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words,
    width: void 0
  }];
};
var getWordsByLines = (_ref4) => {
  var width = _ref4.width, scaleToFit = _ref4.scaleToFit, children = _ref4.children, style = _ref4.style, breakAll = _ref4.breakAll, maxLines = _ref4.maxLines;
  if ((width || scaleToFit) && !Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll,
      children,
      style
    });
    if (wordWidths) {
      var wcw = wordWidths.wordsWithComputedWidth, sw = wordWidths.spaceWidth;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll,
      children,
      maxLines,
      style
    }, wordsWithComputedWidth, spaceWidth, width, Boolean(scaleToFit));
  }
  return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var textDefaultProps = {
  angle: 0,
  breakAll: false,
  // Magic number from d3
  capHeight: "0.71em",
  fill: DEFAULT_FILL,
  lineHeight: "1em",
  scaleToFit: false,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
};
var Text = /* @__PURE__ */ reactExports.forwardRef((outsideProps, ref) => {
  var _resolveDefaultProps = resolveDefaultProps(outsideProps, textDefaultProps), propsX = _resolveDefaultProps.x, propsY = _resolveDefaultProps.y, lineHeight = _resolveDefaultProps.lineHeight, capHeight = _resolveDefaultProps.capHeight, fill = _resolveDefaultProps.fill, scaleToFit = _resolveDefaultProps.scaleToFit, textAnchor = _resolveDefaultProps.textAnchor, verticalAnchor = _resolveDefaultProps.verticalAnchor, props = _objectWithoutProperties$k(_resolveDefaultProps, _excluded$k);
  var wordsByLines = reactExports.useMemo(() => {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
  var dx = props.dx, dy = props.dy, angle = props.angle, className = props.className, breakAll = props.breakAll, textProps = _objectWithoutProperties$k(props, _excluded2$b);
  if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) {
    return null;
  }
  var x = Number(propsX) + (isNumber(dx) ? dx : 0);
  var y = Number(propsY) + (isNumber(dy) ? dy : 0);
  if (!isWellBehavedNumber(x) || !isWellBehavedNumber(y)) {
    return null;
  }
  var startDy;
  switch (verticalAnchor) {
    case "start":
      startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
      break;
    case "middle":
      startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
      break;
    default:
      startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
      break;
  }
  var transforms = [];
  var firstLine = wordsByLines[0];
  if (scaleToFit && firstLine != null) {
    var lineWidth = firstLine.width;
    var width = props.width;
    transforms.push("scale(".concat(isNumber(width) && isNumber(lineWidth) ? width / lineWidth : 1, ")"));
  }
  if (angle) {
    transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
  }
  if (transforms.length) {
    textProps.transform = transforms.join(" ");
  }
  return /* @__PURE__ */ reactExports.createElement("text", _extends$k({}, svgPropertiesAndEvents(textProps), {
    ref,
    x,
    y,
    className: clsx("recharts-text", className),
    textAnchor,
    fill: fill.includes("url") ? DEFAULT_FILL : fill
  }), wordsByLines.map((line, index) => {
    var words = line.words.join(breakAll ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ reactExports.createElement("tspan", {
        x,
        dy: index === 0 ? startDy : lineHeight,
        key: "".concat(words, "-").concat(index)
      }, words)
    );
  }));
});
Text.displayName = "Text";
var _excluded$j = ["labelRef"], _excluded2$a = ["content"];
function _objectWithoutProperties$j(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$j(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$j(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$k(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$k(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$k(Object(t), true).forEach(function(r2) {
      _defineProperty$k(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$k(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$k(e, r, t) {
  return (r = _toPropertyKey$k(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$k(t) {
  var i = _toPrimitive$k(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$k(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$j() {
  return _extends$j = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$j.apply(null, arguments);
}
var CartesianLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var CartesianLabelContextProvider = (_ref2) => {
  var x = _ref2.x, y = _ref2.y, upperWidth = _ref2.upperWidth, lowerWidth = _ref2.lowerWidth, width = _ref2.width, height = _ref2.height, children = _ref2.children;
  var viewBox = reactExports.useMemo(() => ({
    x,
    y,
    upperWidth,
    lowerWidth,
    width,
    height
  }), [x, y, upperWidth, lowerWidth, width, height]);
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelContext.Provider, {
    value: viewBox
  }, children);
};
var useCartesianLabelContext = () => {
  var labelChildContext = reactExports.useContext(CartesianLabelContext);
  var chartContext = useViewBox();
  return labelChildContext || (chartContext ? cartesianViewBoxToTrapezoid(chartContext) : void 0);
};
var PolarLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var PolarLabelContextProvider = (_ref2) => {
  var cx = _ref2.cx, cy = _ref2.cy, innerRadius = _ref2.innerRadius, outerRadius = _ref2.outerRadius, startAngle = _ref2.startAngle, endAngle = _ref2.endAngle, clockWise = _ref2.clockWise, children = _ref2.children;
  var viewBox = reactExports.useMemo(() => ({
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise
  }), [cx, cy, innerRadius, outerRadius, startAngle, endAngle, clockWise]);
  return /* @__PURE__ */ reactExports.createElement(PolarLabelContext.Provider, {
    value: viewBox
  }, children);
};
var usePolarLabelContext = () => {
  var labelChildContext = reactExports.useContext(PolarLabelContext);
  var chartContext = useAppSelector(selectPolarViewBox);
  return labelChildContext || chartContext;
};
var getLabel = (props) => {
  var value = props.value, formatter = props.formatter;
  var label = isNullish(props.children) ? value : props.children;
  if (typeof formatter === "function") {
    return formatter(label);
  }
  return label;
};
var isLabelContentAFunction = (content) => {
  return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
  var offset = labelProps.offset, className = labelProps.className;
  var cx = viewBox.cx, cy = viewBox.cy, innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius, startAngle = viewBox.startAngle, endAngle = viewBox.endAngle, clockWise = viewBox.clockWise;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle(startAngle, endAngle);
  var sign = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  switch (position) {
    case "insideStart":
      labelAngle = startAngle + sign * offset;
      direction = clockWise;
      break;
    case "insideEnd":
      labelAngle = endAngle - sign * offset;
      direction = !clockWise;
      break;
    case "end":
      labelAngle = endAngle + sign * offset;
      direction = clockWise;
      break;
    default:
      throw new Error("Unsupported position ".concat(position));
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
  var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
  return /* @__PURE__ */ reactExports.createElement("text", _extends$j({}, attrs, {
    dominantBaseline: "central",
    className: clsx("recharts-radial-bar-label", className)
  }), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("path", {
    id,
    d: path
  })), /* @__PURE__ */ reactExports.createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
  var cx = viewBox.cx, cy = viewBox.cy, innerRadius = viewBox.innerRadius, outerRadius = viewBox.outerRadius, startAngle = viewBox.startAngle, endAngle = viewBox.endAngle;
  var midAngle = (startAngle + endAngle) / 2;
  if (position === "outside") {
    var _polarToCartesian = polarToCartesian(cx, cy, outerRadius + offset, midAngle), _x = _polarToCartesian.x, _y = _polarToCartesian.y;
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (position === "center") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  }
  if (position === "centerTop") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  }
  if (position === "centerBottom") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  }
  var r = (innerRadius + outerRadius) / 2;
  var _polarToCartesian2 = polarToCartesian(cx, cy, r, midAngle), x = _polarToCartesian2.x, y = _polarToCartesian2.y;
  return {
    x,
    y,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
};
var isPolar = (viewBox) => viewBox != null && "cx" in viewBox && isNumber(viewBox.cx);
var defaultLabelProps = {
  angle: 0,
  offset: 5,
  zIndex: DefaultZIndexes.label,
  position: "middle",
  textBreakAll: false
};
function polarViewBoxToTrapezoid(viewBox) {
  if (!isPolar(viewBox)) {
    return viewBox;
  }
  var cx = viewBox.cx, cy = viewBox.cy, outerRadius = viewBox.outerRadius;
  var diameter = outerRadius * 2;
  return {
    x: cx - outerRadius,
    y: cy - outerRadius,
    width: diameter,
    upperWidth: diameter,
    lowerWidth: diameter,
    height: diameter
  };
}
function Label(outerProps) {
  var _positionAttrs, _positionAttrs2;
  var props = resolveDefaultProps(outerProps, defaultLabelProps);
  var viewBoxFromProps = props.viewBox, parentViewBox = props.parentViewBox, position = props.position, value = props.value, children = props.children, content = props.content, _props$className = props.className, className = _props$className === void 0 ? "" : _props$className, textBreakAll = props.textBreakAll, labelRef = props.labelRef;
  var polarViewBox = usePolarLabelContext();
  var cartesianViewBox = useCartesianLabelContext();
  var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
  var viewBox, label, positionAttrs;
  if (viewBoxFromProps == null) {
    viewBox = resolvedViewBox;
  } else if (isPolar(viewBoxFromProps)) {
    viewBox = viewBoxFromProps;
  } else {
    viewBox = cartesianViewBoxToTrapezoid(viewBoxFromProps);
  }
  var cartesianBox = polarViewBoxToTrapezoid(viewBox);
  if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ reactExports.isValidElement(content) && typeof content !== "function") {
    return null;
  }
  var isRadialPolarLabel = isPolar(viewBox) && (position === "insideStart" || position === "insideEnd" || position === "end");
  if (isPolar(viewBox)) {
    if (!isRadialPolarLabel) {
      positionAttrs = getAttrsOfPolarLabel(viewBox, props.offset, props.position);
    }
  } else if (cartesianBox) {
    var cartesianResult = getCartesianPosition({
      viewBox: cartesianBox,
      position,
      offset: props.offset,
      parentViewBox: isPolar(parentViewBox) ? void 0 : parentViewBox,
      clamp: true
    });
    positionAttrs = _objectSpread$k(_objectSpread$k({
      x: cartesianResult.x,
      y: cartesianResult.y,
      textAnchor: cartesianResult.horizontalAnchor,
      verticalAnchor: cartesianResult.verticalAnchor
    }, cartesianResult.width !== void 0 ? {
      width: cartesianResult.width
    } : {}), cartesianResult.height !== void 0 ? {
      height: cartesianResult.height
    } : {});
  }
  var propsWithViewBox = _objectSpread$k(_objectSpread$k(_objectSpread$k(_objectSpread$k({}, ((_positionAttrs = positionAttrs) === null || _positionAttrs === void 0 ? void 0 : _positionAttrs.x) !== void 0 ? {
    x: positionAttrs.x
  } : {}), ((_positionAttrs2 = positionAttrs) === null || _positionAttrs2 === void 0 ? void 0 : _positionAttrs2.y) !== void 0 ? {
    y: positionAttrs.y
  } : {}), props), {}, {
    viewBox
  });
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    propsWithViewBox.labelRef;
    var propsWithoutLabelRef = _objectWithoutProperties$j(propsWithViewBox, _excluded$j);
    return /* @__PURE__ */ reactExports.cloneElement(content, propsWithoutLabelRef);
  }
  if (typeof content === "function") {
    propsWithViewBox.content;
    var propsForContent = _objectWithoutProperties$j(propsWithViewBox, _excluded2$a);
    label = /* @__PURE__ */ reactExports.createElement(content, propsForContent);
    if (/* @__PURE__ */ reactExports.isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var attrs = svgPropertiesAndEvents(props);
  if (isRadialPolarLabel && isPolar(viewBox)) {
    return renderRadialLabel(props, position, label, attrs, viewBox);
  }
  if (positionAttrs == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(Text, _extends$j({
    ref: labelRef,
    className: clsx("recharts-label", className)
  }, attrs, positionAttrs, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: isValidTextAnchor(attrs.textAnchor) ? attrs.textAnchor : positionAttrs.textAnchor,
    breakAll: textBreakAll
  }), label));
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
  if (!label) {
    return null;
  }
  var commonProps = {
    viewBox,
    labelRef
  };
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$j({
      key: "label-implicit"
    }, commonProps));
  }
  if (isNumOrStr(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$j({
      key: "label-implicit",
      value: label
    }, commonProps));
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label)) {
    if (label.type === Label) {
      return /* @__PURE__ */ reactExports.cloneElement(label, _objectSpread$k({
        key: "label-implicit"
      }, commonProps));
    }
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$j({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$j({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (label && typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$j({}, label, {
      key: "label-implicit"
    }, commonProps));
  }
  return null;
};
function CartesianLabelFromLabelProp(_ref3) {
  var label = _ref3.label, labelRef = _ref3.labelRef;
  var viewBox = useCartesianLabelContext();
  return parseLabel(label, viewBox, labelRef) || null;
}
var _excluded$i = ["valueAccessor"], _excluded2$9 = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function _extends$i() {
  return _extends$i = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$i.apply(null, arguments);
}
function _objectWithoutProperties$i(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$i(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$i(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var defaultAccessor = (entry) => {
  var val = Array.isArray(entry.value) ? entry.value[entry.value.length - 1] : entry.value;
  if (isRenderableText(val)) {
    return val;
  }
  return void 0;
};
var CartesianLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
var PolarLabelListContextProvider = PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
  return reactExports.useContext(CartesianLabelListContext);
}
function usePolarLabelListContext() {
  return reactExports.useContext(PolarLabelListContext);
}
function LabelList(_ref2) {
  var _ref$valueAccessor = _ref2.valueAccessor, valueAccessor = _ref$valueAccessor === void 0 ? defaultAccessor : _ref$valueAccessor, restProps = _objectWithoutProperties$i(_ref2, _excluded$i);
  var dataKey = restProps.dataKey;
  restProps.clockWise;
  var id = restProps.id, textBreakAll = restProps.textBreakAll, zIndex = restProps.zIndex, others = _objectWithoutProperties$i(restProps, _excluded2$9);
  var cartesianData = useCartesianLabelListContext();
  var polarData = usePolarLabelListContext();
  var data = cartesianData || polarData;
  if (!data || !data.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : DefaultZIndexes.label
  }, /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map((entry, index) => {
    var _restProps$fill;
    var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry.payload, dataKey);
    var idProps = isNullish(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$i({
      key: "label-".concat(index)
    }, svgPropertiesAndEvents(entry), others, idProps, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
      parentViewBox: entry.parentViewBox,
      value,
      textBreakAll,
      viewBox: entry.viewBox,
      index,
      zIndex: 0
    }));
  })));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
  var label = _ref2.label;
  if (!label) {
    return null;
  }
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit"
    });
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label) || isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit",
      content: label
    });
  }
  if (typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(LabelList, _extends$i({
      key: "labelList-implicit"
    }, label, {
      type: String(label.type)
    }));
  }
  return null;
}
function _extends$h() {
  return _extends$h = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$h.apply(null, arguments);
}
var Dot = (props) => {
  var cx = props.cx, cy = props.cy, r = props.r, className = props.className;
  var layerClass = clsx("recharts-dot", className);
  if (isNumber(cx) && isNumber(cy) && isNumber(r)) {
    return /* @__PURE__ */ reactExports.createElement("circle", _extends$h({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
      className: layerClass,
      cx,
      cy,
      r
    }));
  }
  return null;
};
var selectUnfilteredPolarItems = (state) => state.graphicalItems.polarItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var selectPolarItemsSettings = createSelector([selectUnfilteredPolarItems, selectBaseAxis, selectAxisPredicate], combineGraphicalItemsSettings);
var selectPolarGraphicalItemsData = createSelector([selectPolarItemsSettings], combineGraphicalItemsData);
var selectPolarDisplayedData = createSelector([selectPolarGraphicalItemsData, selectChartDataAndAlwaysIgnoreIndexes], combineDisplayedData);
var selectPolarAppliedValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], combineAppliedValues);
createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], (data, axisSettings, items) => {
  if (items.length > 0) {
    return data.flatMap((entry) => {
      return items.flatMap((item) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        return {
          value: valueByDataKey,
          errorDomain: []
          // polar charts do not have error bars
        };
      });
    }).filter(Boolean);
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey),
      errorDomain: []
    }));
  }
  return data.map((entry) => ({
    value: entry,
    errorDomain: []
  }));
});
var unsupportedInPolarChart = () => void 0;
var selectDomainOfAllPolarAppliedNumericalValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIgnoringIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues);
var selectPolarNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, unsupportedInPolarChart, selectDomainOfAllPolarAppliedNumericalValues, unsupportedInPolarChart, selectChartLayout, pickAxisType], combineNumericalDomain);
var selectPolarAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectPolarDisplayedData, selectPolarAppliedValues, selectStackOffsetType, pickAxisType, selectPolarNumericalDomain], combineAxisDomain);
var selectPolarNiceTicks = createSelector([selectPolarAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var selectPolarAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectPolarAxisDomain, selectPolarNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
createSelector([selectRealScaleType, selectPolarAxisDomainIncludingNiceTicks], combineCheckedDomain);
var initialState$8 = {
  radiusAxis: {},
  angleAxis: {}
};
var polarAxisSlice = createSlice({
  name: "polarAxis",
  initialState: initialState$8,
  reducers: {
    addRadiusAxis(state, action) {
      state.radiusAxis[action.payload.id] = castDraft(action.payload);
    },
    removeRadiusAxis(state, action) {
      delete state.radiusAxis[action.payload.id];
    },
    addAngleAxis(state, action) {
      state.angleAxis[action.payload.id] = castDraft(action.payload);
    },
    removeAngleAxis(state, action) {
      delete state.angleAxis[action.payload.id];
    }
  }
});
var _polarAxisSlice$actio = polarAxisSlice.actions;
_polarAxisSlice$actio.addRadiusAxis;
_polarAxisSlice$actio.removeRadiusAxis;
_polarAxisSlice$actio.addAngleAxis;
_polarAxisSlice$actio.removeAngleAxis;
var polarAxisReducer = polarAxisSlice.reducer;
function getClassNameFromUnknown(u) {
  if (u && typeof u === "object" && "className" in u && typeof u.className === "string") {
    return u.className;
  }
  return "";
}
function ownKeys$j(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$j(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$j(Object(t), true).forEach(function(r2) {
      _defineProperty$j(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$j(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$j(e, r, t) {
  return (r = _toPropertyKey$j(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$j(t) {
  var i = _toPrimitive$j(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$j(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var pickId = (_state, id) => id;
var selectSynchronisedPieSettings = createSelector([selectUnfilteredPolarItems, pickId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "pie").find((item) => item.id === id));
var emptyArray = [];
var pickCells$1 = (_state, _id, cells) => {
  if ((cells === null || cells === void 0 ? void 0 : cells.length) === 0) {
    return emptyArray;
  }
  return cells;
};
var selectDisplayedData = createSelector([selectChartDataAndAlwaysIgnoreIndexes, selectSynchronisedPieSettings, pickCells$1], (_ref2, pieSettings, cells) => {
  var chartData = _ref2.chartData;
  if (pieSettings == null) {
    return void 0;
  }
  var displayedData;
  if ((pieSettings === null || pieSettings === void 0 ? void 0 : pieSettings.data) != null && pieSettings.data.length > 0) {
    displayedData = pieSettings.data;
  } else {
    displayedData = chartData;
  }
  if ((!displayedData || !displayedData.length) && cells != null) {
    displayedData = cells.map((cell) => _objectSpread$j(_objectSpread$j({}, pieSettings.presentationProps), cell.props));
  }
  if (displayedData == null) {
    return void 0;
  }
  return displayedData;
});
var selectPieLegend = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells$1], (displayedData, pieSettings, cells) => {
  if (displayedData == null || pieSettings == null) {
    return void 0;
  }
  return displayedData.map((entry, i) => {
    var _cells$i;
    var name = getValueByDataKey(entry, pieSettings.nameKey, pieSettings.name);
    var color;
    if (cells !== null && cells !== void 0 && (_cells$i = cells[i]) !== null && _cells$i !== void 0 && (_cells$i = _cells$i.props) !== null && _cells$i !== void 0 && _cells$i.fill) {
      color = cells[i].props.fill;
    } else if (typeof entry === "object" && entry != null && "fill" in entry) {
      color = entry.fill;
    } else {
      color = pieSettings.fill;
    }
    return {
      value: getTooltipNameProp(name, pieSettings.dataKey),
      dataKey: pieSettings.dataKey,
      color,
      // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
      payload: entry,
      type: pieSettings.legendType
    };
  });
});
var selectPieSectors = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells$1, selectChartOffsetInternal], (displayedData, pieSettings, cells, offset) => {
  if (pieSettings == null || displayedData == null) {
    return void 0;
  }
  return computePieSectors({
    offset,
    pieSettings,
    displayedData,
    cells
  });
});
var getDisplayName = (Comp) => {
  if (typeof Comp === "string") {
    return Comp;
  }
  if (!Comp) {
    return "";
  }
  return Comp.displayName || Comp.name || "Component";
};
var lastChildren = null;
var lastResult = null;
var toArray = (children) => {
  if (children === lastChildren && Array.isArray(lastResult)) {
    return lastResult;
  }
  var result = [];
  reactExports.Children.forEach(children, (child) => {
    if (isNullish(child)) return;
    if (reactIsExports.isFragment(child)) {
      result = result.concat(toArray(child.props.children));
    } else {
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};
function findAllByType(children, type) {
  var result = [];
  var types = [];
  if (Array.isArray(type)) {
    types = type.map((t) => getDisplayName(t));
  } else {
    types = [getDisplayName(type)];
  }
  toArray(children).forEach((child) => {
    var childType = get(child, "type.displayName") || get(child, "type.name");
    if (childType && types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}
var isClipDot = (dot) => {
  if (dot && typeof dot === "object" && "clipDot" in dot) {
    return Boolean(dot.clipDot);
  }
  return true;
};
function ownKeys$i(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$i(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$i(Object(t), true).forEach(function(r2) {
      _defineProperty$i(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$i(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$i(e, r, t) {
  return (r = _toPropertyKey$i(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$i(t) {
  var i = _toPrimitive$i(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$i(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function mergeShapeProps(option, props) {
  return _objectSpread$i(_objectSpread$i({}, props), option);
}
function getPropsFromShapeOption(option) {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return option.props;
  }
  return option;
}
function renderWithShapeElement(option, props) {
  return /* @__PURE__ */ reactExports.cloneElement(option, mergeShapeProps(getPropsFromShapeOption(option), props));
}
function getShapeIndex(shapeProps) {
  if (!("index" in shapeProps)) {
    return void 0;
  }
  var index = shapeProps.index;
  return typeof index === "number" || typeof index === "string" ? index : void 0;
}
function isActiveShape(shapeProps) {
  return "isActive" in shapeProps && shapeProps.isActive === true;
}
function Shape(_ref2) {
  var option = _ref2.option, DefaultShape = _ref2.DefaultShape, shapeProps = _ref2.shapeProps, _ref$activeClassName = _ref2.activeClassName, activeClassName = _ref$activeClassName === void 0 ? "recharts-active-shape" : _ref$activeClassName, _ref$inActiveClassNam = _ref2.inActiveClassName, inActiveClassName = _ref$inActiveClassNam === void 0 ? "recharts-shape" : _ref$inActiveClassNam;
  var index = getShapeIndex(shapeProps);
  var shape;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    shape = renderWithShapeElement(option, shapeProps);
  } else if (option === DefaultShape) {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, shapeProps);
  } else if (typeof option === "function") {
    shape = option(shapeProps, index);
  } else if (typeof option === "object") {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, mergeShapeProps(option, shapeProps));
  } else {
    shape = /* @__PURE__ */ reactExports.createElement(DefaultShape, shapeProps);
  }
  if (isActiveShape(shapeProps)) {
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: activeClassName
    }, shape);
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: inActiveClassName
  }, shape);
}
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
    dispatch(setActiveMouseOverItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
    dispatch(mouseLeaveItem());
  };
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
    dispatch(setActiveClickItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
function SetTooltipEntrySettings(_ref2) {
  var tooltipEntrySettings = _ref2.tooltipEntrySettings;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevSettingsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addTooltipEntrySettings(tooltipEntrySettings));
    } else if (prevSettingsRef.current !== tooltipEntrySettings) {
      dispatch(replaceTooltipEntrySettings({
        prev: prevSettingsRef.current,
        next: tooltipEntrySettings
      }));
    }
    prevSettingsRef.current = tooltipEntrySettings;
  }, [tooltipEntrySettings, dispatch, isPanorama]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeTooltipEntrySettings(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetLegendPayload(_ref2) {
  var legendPayload = _ref2.legendPayload;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevPayloadRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, isPanorama, legendPayload]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetPolarLegendPayload(_ref2) {
  var legendPayload = _ref2.legendPayload;
  var dispatch = useAppDispatch();
  var layout = useAppSelector(selectChartLayout);
  var prevPayloadRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (layout !== "centric" && layout !== "radial") {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, layout, legendPayload]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function _slicedToArray$8(r, e) {
  return _arrayWithHoles$8(r) || _iterableToArrayLimit$8(r, e) || _unsupportedIterableToArray$8(r, e) || _nonIterableRest$8();
}
function _nonIterableRest$8() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$8(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$8(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$8(r, a) : void 0;
  }
}
function _arrayLikeToArray$8(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$8(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$8(r) {
  if (Array.isArray(r)) return r;
}
var matchByIndex = "index";
var matchAppend = "append";
function tagAlignedItems(alignedPrevItems, nextItems) {
  var removedPrevItems = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
  var tagged = [];
  for (var prev of removedPrevItems) {
    tagged.push({
      status: "removed",
      prev
    });
  }
  for (var i = 0; i < nextItems.length; i++) {
    var _prev = alignedPrevItems[i];
    var next = nextItems[i];
    if (_prev != null) {
      tagged.push({
        status: "matched",
        prev: _prev,
        next
      });
    } else {
      tagged.push({
        status: "added",
        next
      });
    }
  }
  return tagged;
}
function matchByIndexImpl(prevItems, nextItems) {
  var factor = prevItems.length / nextItems.length;
  var alignedPrevItems = nextItems.map((_, i) => prevItems[Math.floor(i * factor)]);
  return tagAlignedItems(alignedPrevItems, nextItems);
}
function matchAppendImpl(prevItems, nextItems) {
  var alignedPrevItems = nextItems.map((_, i) => prevItems[i]);
  return tagAlignedItems(alignedPrevItems, nextItems);
}
function buildPrevKeyMap(prevItems, matchBy) {
  var prevMap = /* @__PURE__ */ new Map();
  for (var i = 0; i < prevItems.length; i++) {
    var _item = prevItems[i];
    if (_item == null) continue;
    var key = matchBy(_item, i);
    if (key != null && !prevMap.has(key)) {
      prevMap.set(key, _item);
    }
  }
  return prevMap;
}
function matchByKey(prevItems, nextItems, matchBy) {
  var prevMap = buildPrevKeyMap(prevItems, matchBy);
  var matchedKeys = /* @__PURE__ */ new Set();
  var alignedPrevItems = nextItems.map((next, i) => {
    var key2 = matchBy(next, i);
    if (key2 != null) {
      var prev = prevMap.get(key2);
      if (prev !== void 0) {
        matchedKeys.add(key2);
        return prev;
      }
    }
    return void 0;
  });
  var removedPrevItems = [];
  for (var _ref3 of prevMap) {
    var _ref2 = _slicedToArray$8(_ref3, 2);
    var key = _ref2[0];
    var _item2 = _ref2[1];
    if (!matchedKeys.has(key)) {
      removedPrevItems.push(_item2);
    }
  }
  return tagAlignedItems(alignedPrevItems, nextItems, removedPrevItems);
}
function matchAnimationItems(prevItems, nextItems, matchBy) {
  if (nextItems == null) {
    return null;
  }
  if (prevItems == null) {
    return nextItems.map((next) => ({
      status: "added",
      next
    }));
  }
  if (matchBy === matchByIndex) {
    return matchByIndexImpl(prevItems, nextItems);
  }
  if (matchBy === matchAppend) {
    return matchAppendImpl(prevItems, nextItems);
  }
  return matchByKey(prevItems, nextItems, matchBy);
}
function useAnimationStartSnapshot(animationInput, previousValueRef) {
  var previousAnimationInputRef = reactExports.useRef(animationInput);
  var startValueRef = reactExports.useRef(previousValueRef.current);
  var isReadyToCommitRef = reactExports.useRef(true);
  if (previousAnimationInputRef.current !== animationInput) {
    previousAnimationInputRef.current = animationInput;
    startValueRef.current = previousValueRef.current;
    isReadyToCommitRef.current = false;
  }
  var syncStepValue = reactExports.useCallback(function(stepValue, animationElapsedTime) {
    var canCommit = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (animationElapsedTime === 0) {
      isReadyToCommitRef.current = true;
      return;
    }
    if (animationElapsedTime === 1) {
      startValueRef.current = stepValue;
    }
    if (animationElapsedTime > 0 && isReadyToCommitRef.current && canCommit) {
      previousValueRef.current = stepValue;
    }
  }, [previousValueRef]);
  return {
    startValue: startValueRef.current,
    syncStepValue
  };
}
function _slicedToArray$7(r, e) {
  return _arrayWithHoles$7(r) || _iterableToArrayLimit$7(r, e) || _unsupportedIterableToArray$7(r, e) || _nonIterableRest$7();
}
function _nonIterableRest$7() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$7(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$7(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$7(r, a) : void 0;
  }
}
function _arrayLikeToArray$7(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$7(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$7(r) {
  if (Array.isArray(r)) return r;
}
function useAnimationCallbacks(onAnimationStart, onAnimationEnd) {
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray$7(_useState, 2), isAnimating = _useState2[0], setIsAnimating = _useState2[1];
  var handleAnimationStart = reactExports.useCallback(() => {
    if (typeof onAnimationStart === "function") {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  var handleAnimationEnd = reactExports.useCallback(() => {
    if (typeof onAnimationEnd === "function") {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  return {
    isAnimating,
    handleAnimationStart,
    handleAnimationEnd
  };
}
function AnimatedItems(props) {
  var _animationStartItems$;
  var animationInput = props.animationInput, animationIdPrefix = props.animationIdPrefix, items = props.items, previousItemsRef = props.previousItemsRef, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, onAnimationStart = props.onAnimationStart, onAnimationEnd = props.onAnimationEnd, animationInterpolateFn = props.animationInterpolateFn, animationMatchBy = props.animationMatchBy, shouldUpdatePreviousRef = props.shouldUpdatePreviousRef, children = props.children, layout = props.layout;
  var animationId = useAnimationId(animationInput, animationIdPrefix);
  var animationStartItems = useAnimationStartSnapshot(animationId, previousItemsRef);
  var rawPrevItems = (_animationStartItems$ = animationStartItems.startValue) !== null && _animationStartItems$ !== void 0 ? _animationStartItems$ : null;
  var animationItems = matchAnimationItems(rawPrevItems, items, animationMatchBy !== null && animationMatchBy !== void 0 ? animationMatchBy : matchByIndex);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationEnd,
    onAnimationStart,
    key: animationId
  }, (animationElapsedTime) => {
    var isEntrance = rawPrevItems == null;
    var stepData = items == null ? items : animationInterpolateFn(animationItems, animationElapsedTime, layout);
    var canUpdate = shouldUpdatePreviousRef ? shouldUpdatePreviousRef(animationElapsedTime) : animationElapsedTime > 0;
    animationStartItems.syncStepValue(stepData, animationElapsedTime, canUpdate);
    if (stepData == null) {
      return null;
    }
    return children(stepData, animationElapsedTime, isEntrance);
  });
}
var _ref;
function _slicedToArray$6(r, e) {
  return _arrayWithHoles$6(r) || _iterableToArrayLimit$6(r, e) || _unsupportedIterableToArray$6(r, e) || _nonIterableRest$6();
}
function _nonIterableRest$6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$6(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$6(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$6(r, a) : void 0;
  }
}
function _arrayLikeToArray$6(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$6(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$6(r) {
  if (Array.isArray(r)) return r;
}
var useIdFallback = () => {
  var _React$useState = reactExports.useState(() => uniqueId("uid-")), _React$useState2 = _slicedToArray$6(_React$useState, 1), id = _React$useState2[0];
  return id;
};
var useId = (_ref = React["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
function useUniqueId(prefix, customId) {
  var generatedId = useId();
  if (customId) {
    return customId;
  }
  return prefix ? "".concat(prefix, "-").concat(generatedId) : generatedId;
}
var GraphicalItemIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var RegisterGraphicalItemId = (_ref2) => {
  var id = _ref2.id, type = _ref2.type, children = _ref2.children;
  var resolvedId = useUniqueId("recharts-".concat(type), id);
  return /* @__PURE__ */ reactExports.createElement(GraphicalItemIdContext.Provider, {
    value: resolvedId
  }, children(resolvedId));
};
var initialState$7 = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = createSlice({
  name: "graphicalItems",
  initialState: initialState$7,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(state, action) {
        state.cartesianItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceCartesianGraphicalItem: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        var index = current(state).cartesianItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.cartesianItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeCartesianGraphicalItem: {
      reducer(state, action) {
        var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.cartesianItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    addPolarGraphicalItem: {
      reducer(state, action) {
        state.polarItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    removePolarGraphicalItem: {
      reducer(state, action) {
        var index = current(state).polarItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.polarItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    replacePolarGraphicalItem: {
      reducer(state, action) {
        var _action$payload2 = action.payload, prev = _action$payload2.prev, next = _action$payload2.next;
        var index = current(state).polarItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.polarItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var _graphicalItemsSlice$ = graphicalItemsSlice.actions, addCartesianGraphicalItem = _graphicalItemsSlice$.addCartesianGraphicalItem, replaceCartesianGraphicalItem = _graphicalItemsSlice$.replaceCartesianGraphicalItem, removeCartesianGraphicalItem = _graphicalItemsSlice$.removeCartesianGraphicalItem, addPolarGraphicalItem = _graphicalItemsSlice$.addPolarGraphicalItem, removePolarGraphicalItem = _graphicalItemsSlice$.removePolarGraphicalItem, replacePolarGraphicalItem = _graphicalItemsSlice$.replacePolarGraphicalItem;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
var SetCartesianGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addCartesianGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replaceCartesianGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetCartesianGraphicalItem = /* @__PURE__ */ reactExports.memo(SetCartesianGraphicalItemImpl);
var SetPolarGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = reactExports.useRef(null);
  reactExports.useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addPolarGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replacePolarGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removePolarGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetPolarGraphicalItem = /* @__PURE__ */ reactExports.memo(SetPolarGraphicalItemImpl);
var _excluded$h = ["key"], _excluded2$8 = ["onMouseEnter", "onClick", "onMouseLeave"], _excluded3$5 = ["id"], _excluded4$2 = ["id"];
function _extends$g() {
  return _extends$g = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$g.apply(null, arguments);
}
function _objectWithoutProperties$h(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$h(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$h(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$h(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$h(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$h(Object(t), true).forEach(function(r2) {
      _defineProperty$h(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$h(e, r, t) {
  return (r = _toPropertyKey$h(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$h(t) {
  var i = _toPrimitive$h(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$h(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultPieSectorShape = Sector;
function SetPiePayloadLegend(props) {
  var cells = reactExports.useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var legendPayload = useAppSelector((state) => selectPieLegend(state, props.id, cells));
  if (legendPayload == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(SetPolarLegendPayload, {
    legendPayload
  });
}
function getActiveShapeFill(activeShape) {
  if (activeShape == null || typeof activeShape === "boolean" || typeof activeShape === "function") {
    return void 0;
  }
  if (/* @__PURE__ */ reactExports.isValidElement(activeShape)) {
    var _activeShape$props;
    var _fill = (_activeShape$props = activeShape.props) === null || _activeShape$props === void 0 ? void 0 : _activeShape$props.fill;
    return typeof _fill === "string" ? _fill : void 0;
  }
  var fill = activeShape.fill;
  return typeof fill === "string" ? fill : void 0;
}
var SetPieTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, nameKey = _ref2.nameKey, sectors = _ref2.sectors, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, tooltipType = _ref2.tooltipType, formatter = _ref2.formatter, id = _ref2.id, activeShape = _ref2.activeShape;
  var activeShapeFill = getActiveShapeFill(activeShape);
  var tooltipDataDefinedOnItem = sectors.map((sector) => {
    var sectorTooltipPayload = sector.tooltipPayload;
    if (activeShapeFill == null || sectorTooltipPayload == null) {
      return sectorTooltipPayload;
    }
    return sectorTooltipPayload.map((item) => _objectSpread$h(_objectSpread$h({}, item), {}, {
      color: activeShapeFill,
      fill: activeShapeFill
    }));
  });
  var tooltipEntrySettings = {
    dataDefinedOnItem: tooltipDataDefinedOnItem,
    getPosition: (index) => {
      var _sectors$Number;
      return (_sectors$Number = sectors[Number(index)]) === null || _sectors$Number === void 0 ? void 0 : _sectors$Number.tooltipPosition;
    },
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit: "",
      // why doesn't Pie support unit?
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
var getTextAnchor = (x, cx) => {
  if (x > cx) {
    return "start";
  }
  if (x < cx) {
    return "end";
  }
  return "middle";
};
var getOuterRadius = (dataPoint, outerRadius, maxPieRadius) => {
  if (typeof outerRadius === "function") {
    return getPercentValue(outerRadius(dataPoint), maxPieRadius, maxPieRadius * 0.8);
  }
  return getPercentValue(outerRadius, maxPieRadius, maxPieRadius * 0.8);
};
var parseCoordinateOfPie = (pieSettings, offset, dataPoint) => {
  var top = offset.top, left = offset.left, width = offset.width, height = offset.height;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(pieSettings.cx, width, width / 2);
  var cy = top + getPercentValue(pieSettings.cy, height, height / 2);
  var innerRadius = getPercentValue(pieSettings.innerRadius, maxPieRadius, 0);
  var outerRadius = getOuterRadius(dataPoint, pieSettings.outerRadius, maxPieRadius);
  var maxRadius = pieSettings.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
};
var parseDeltaAngle = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
var renderLabelLineItem = (option, props) => {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, props);
  }
  if (typeof option === "function") {
    return option(props);
  }
  var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
  props.key;
  var otherProps = _objectWithoutProperties$h(props, _excluded$h);
  return /* @__PURE__ */ reactExports.createElement(Curve, _extends$g({}, otherProps, {
    type: "linear",
    className
  }));
};
var renderLabelItem = (option, props, value) => {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, props);
  }
  var label = value;
  if (typeof option === "function") {
    label = option(props);
    if (/* @__PURE__ */ reactExports.isValidElement(label)) {
      return label;
    }
  }
  var className = clsx("recharts-pie-label-text", getClassNameFromUnknown(option));
  return /* @__PURE__ */ reactExports.createElement(Text, _extends$g({}, props, {
    alignmentBaseline: "middle",
    className
  }), label);
};
function PieLabels(_ref2) {
  var sectors = _ref2.sectors, props = _ref2.props, showLabels = _ref2.showLabels;
  var label = props.label, labelLine = props.labelLine, dataKey = props.dataKey;
  if (!showLabels || !label || !sectors) {
    return null;
  }
  var pieProps = svgPropertiesNoEvents(props);
  var customLabelProps = svgPropertiesNoEventsFromUnknown(label);
  var customLabelLineProps = svgPropertiesNoEventsFromUnknown(labelLine);
  var offsetRadius = typeof label === "object" && "offsetRadius" in label && typeof label.offsetRadius === "number" && label.offsetRadius || 20;
  var labels = sectors.map((entry, i) => {
    var midAngle = (entry.startAngle + entry.endAngle) / 2;
    var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
    var labelProps = _objectSpread$h(_objectSpread$h(_objectSpread$h(_objectSpread$h({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, customLabelProps), {}, {
      index: i,
      textAnchor: getTextAnchor(endPoint.x, entry.cx)
    }, endPoint);
    var lineProps = _objectSpread$h(_objectSpread$h(_objectSpread$h(_objectSpread$h({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: entry.fill
    }, customLabelLineProps), {}, {
      index: i,
      points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint],
      key: "line"
    });
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex: DefaultZIndexes.label,
      key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
    }, /* @__PURE__ */ reactExports.createElement(Layer, null, labelLine && renderLabelLineItem(labelLine, lineProps), renderLabelItem(label, labelProps, getValueByDataKey(entry, dataKey))));
  });
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-pie-labels"
  }, labels);
}
function PieLabelList(_ref3) {
  var sectors = _ref3.sectors, props = _ref3.props, showLabels = _ref3.showLabels;
  var label = props.label;
  if (typeof label === "object" && label != null && "position" in label) {
    return /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
      label
    });
  }
  return /* @__PURE__ */ reactExports.createElement(PieLabels, {
    sectors,
    props,
    showLabels
  });
}
function PieSectors(props) {
  var sectors = props.sectors, activeShape = props.activeShape, inactiveShapeProp = props.inactiveShape, allOtherPieProps = props.allOtherPieProps, shape = props.shape, id = props.id, animationElapsedTime = props.animationElapsedTime, isAnimating = props.isAnimating, isEntrance = props.isEntrance;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var onMouseEnterFromProps = allOtherPieProps.onMouseEnter, onItemClickFromProps = allOtherPieProps.onClick, onMouseLeaveFromProps = allOtherPieProps.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties$h(allOtherPieProps, _excluded2$8);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, allOtherPieProps.dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, allOtherPieProps.dataKey, id);
  if (sectors == null || sectors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, sectors.map((entry, i) => {
    if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
    var graphicalItemMatches = activeGraphicalItemId == null || activeGraphicalItemId === id;
    var isActive = String(i) === activeIndex && (activeDataKey == null || allOtherPieProps.dataKey === activeDataKey) && graphicalItemMatches;
    var inactiveShape = activeIndex ? inactiveShapeProp : null;
    var sectorOptions = activeShape && isActive ? activeShape : inactiveShape;
    var sectorProps = _objectSpread$h(_objectSpread$h({}, entry), {}, {
      stroke: entry.stroke,
      tabIndex: -1,
      index: i,
      isActive,
      animationElapsedTime,
      isAnimating,
      isEntrance,
      [DATA_ITEM_INDEX_ATTRIBUTE_NAME]: i,
      [DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME]: id
    });
    return /* @__PURE__ */ reactExports.createElement(Layer, _extends$g({
      key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i),
      tabIndex: -1,
      className: "recharts-pie-sector"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      onMouseEnter: onMouseEnterFromContext(entry, i),
      onMouseLeave: onMouseLeaveFromContext(entry, i),
      onClick: onClickFromContext(entry, i)
    }), /* @__PURE__ */ reactExports.createElement(Shape, {
      option: sectorOptions !== null && sectorOptions !== void 0 ? sectorOptions : shape,
      DefaultShape: defaultPieSectorShape,
      shapeProps: sectorProps
    }));
  }));
}
function computePieSectors(_ref4) {
  var _pieSettings$paddingA;
  var pieSettings = _ref4.pieSettings, displayedData = _ref4.displayedData, cells = _ref4.cells, offset = _ref4.offset;
  var cornerRadius = pieSettings.cornerRadius, startAngle = pieSettings.startAngle, endAngle = pieSettings.endAngle, dataKey = pieSettings.dataKey, nameKey = pieSettings.nameKey, tooltipType = pieSettings.tooltipType;
  var minAngle = Math.abs(pieSettings.minAngle);
  var deltaAngle = parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var paddingAngle = displayedData.length <= 1 ? 0 : (_pieSettings$paddingA = pieSettings.paddingAngle) !== null && _pieSettings$paddingA !== void 0 ? _pieSettings$paddingA : 0;
  var notZeroItemCount = displayedData.filter((entry) => getValueByDataKey(entry, dataKey, 0) !== 0).length;
  var totalPaddingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var sum = displayedData.reduce((result, entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var needsMinAngleAdjustment = minAngle > 0 && sum > 0 && displayedData.some((entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    var percent = (isNumber(val) ? val : 0) / sum;
    return val !== 0 && percent * absDeltaAngle < minAngle;
  });
  var effectiveMinAngle = needsMinAngleAdjustment ? minAngle : 0;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * effectiveMinAngle - totalPaddingAngle;
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = displayedData.map((entry, i) => {
      var val = getValueByDataKey(entry, dataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var coordinate = parseCoordinateOfPie(pieSettings, offset, entry);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      var entryWithCellInfo = _objectSpread$h(_objectSpread$h({}, entry), cells && cells[i] && cells[i].props);
      var sectorColor = entryWithCellInfo != null && "fill" in entryWithCellInfo && typeof entryWithCellInfo.fill === "string" ? entryWithCellInfo.fill : pieSettings.fill;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? effectiveMinAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entryWithCellInfo,
        dataKey,
        type: tooltipType,
        color: sectorColor,
        fill: sectorColor,
        graphicalItemId: pieSettings.id
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread$h(_objectSpread$h(_objectSpread$h(_objectSpread$h({}, pieSettings.presentationProps), {}, {
        percent,
        cornerRadius: typeof cornerRadius === "string" ? parseFloat(cornerRadius) : cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entryWithCellInfo), coordinate), {}, {
        value: val,
        dataKey,
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entryWithCellInfo,
        paddingAngle: val !== 0 ? mathSign(deltaAngle) * paddingAngle : 0
      });
      return prev;
    });
  }
  return sectors;
}
function PieLabelListProvider(_ref5) {
  var showLabels = _ref5.showLabels, sectors = _ref5.sectors, children = _ref5.children;
  var labelListEntries = reactExports.useMemo(() => {
    if (!showLabels || !sectors) {
      return [];
    }
    return sectors.map((entry) => ({
      value: entry.value,
      payload: entry.payload,
      clockWise: false,
      parentViewBox: void 0,
      viewBox: {
        cx: entry.cx,
        cy: entry.cy,
        innerRadius: entry.innerRadius,
        outerRadius: entry.outerRadius,
        startAngle: entry.startAngle,
        endAngle: entry.endAngle,
        clockWise: false
      },
      fill: entry.fill
    }));
  }, [sectors, showLabels]);
  return /* @__PURE__ */ reactExports.createElement(PolarLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
var defaultPieAnimateItems = (items, animationElapsedTime) => {
  if (items == null) return [];
  var stepData = [];
  var firstNonRemoved = items.find((item) => item.status !== "removed");
  var curAngle = firstNonRemoved ? firstNonRemoved.next.startAngle : 0;
  items.forEach((item, index) => {
    if (item.status === "removed") return;
    var paddingAngle = index > 0 ? get(item.next, "paddingAngle", 0) : 0;
    if (item.status === "matched") {
      var angle = interpolate(item.prev.endAngle - item.prev.startAngle, item.next.endAngle - item.next.startAngle, animationElapsedTime);
      var latest = _objectSpread$h(_objectSpread$h({}, item.next), {}, {
        startAngle: curAngle + paddingAngle,
        endAngle: curAngle + angle + paddingAngle
      });
      stepData.push(latest);
      curAngle = latest.endAngle;
    } else {
      var deltaAngle = interpolate(0, item.next.endAngle - item.next.startAngle, animationElapsedTime);
      var _latest = _objectSpread$h(_objectSpread$h({}, item.next), {}, {
        startAngle: curAngle + paddingAngle,
        endAngle: curAngle + deltaAngle + paddingAngle
      });
      stepData.push(_latest);
      curAngle = _latest.endAngle;
    }
  });
  return stepData;
};
function SectorsWithAnimation(_ref6) {
  var _firstSector$cx, _firstSector$cy, _firstSector$innerRad, _firstSector$outerRad;
  var props = _ref6.props, previousSectorsRef = _ref6.previousSectorsRef, id = _ref6.id;
  var sectors = props.sectors, activeShape = props.activeShape, inactiveShape = props.inactiveShape, animationInterpolateFn = props.animationInterpolateFn;
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var layout = usePolarChartLayout();
  if (layout == null) return null;
  var firstSector = sectors[0];
  return /* @__PURE__ */ reactExports.createElement(PieLabelListProvider, {
    showLabels: !isAnimating,
    sectors
  }, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: props,
    animationIdPrefix: "recharts-pie-",
    items: sectors,
    previousItemsRef: previousSectorsRef,
    isAnimationActive: props.isAnimationActive,
    animationBegin: props.animationBegin,
    animationDuration: props.animationDuration,
    animationEasing: props.animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy: props.animationMatchBy,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement(PieSectors, {
    sectors: stepData,
    activeShape,
    inactiveShape,
    allOtherPieProps: props,
    shape: props.shape,
    id,
    animationElapsedTime,
    isAnimating: isAnimating || animationElapsedTime < 1,
    isEntrance
  }))), /* @__PURE__ */ reactExports.createElement(PieLabelList, {
    showLabels: !isAnimating,
    sectors,
    props
  }), /* @__PURE__ */ reactExports.createElement(PolarLabelContextProvider, {
    cx: (_firstSector$cx = firstSector === null || firstSector === void 0 ? void 0 : firstSector.cx) !== null && _firstSector$cx !== void 0 ? _firstSector$cx : 0,
    cy: (_firstSector$cy = firstSector === null || firstSector === void 0 ? void 0 : firstSector.cy) !== null && _firstSector$cy !== void 0 ? _firstSector$cy : 0,
    innerRadius: (_firstSector$innerRad = firstSector === null || firstSector === void 0 ? void 0 : firstSector.innerRadius) !== null && _firstSector$innerRad !== void 0 ? _firstSector$innerRad : 0,
    outerRadius: (_firstSector$outerRad = firstSector === null || firstSector === void 0 ? void 0 : firstSector.outerRadius) !== null && _firstSector$outerRad !== void 0 ? _firstSector$outerRad : 0,
    startAngle: props.startAngle,
    endAngle: props.endAngle,
    clockWise: false
  }, props.children));
}
var defaultPieProps = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: defaultPieAnimateItems,
  animationMatchBy: matchAppend,
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: false,
  innerRadius: 0,
  isAnimationActive: "auto",
  label: false,
  labelLine: true,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  shape: defaultPieSectorShape,
  startAngle: 0,
  stroke: "#fff",
  zIndex: DefaultZIndexes.area
};
function PieImpl(props) {
  var id = props.id, propsWithoutId = _objectWithoutProperties$h(props, _excluded3$5);
  var hide = props.hide, className = props.className, rootTabIndex = props.rootTabIndex;
  var cells = reactExports.useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var sectors = useAppSelector((state) => selectPieSectors(state, id, cells));
  var previousSectorsRef = reactExports.useRef(null);
  var layerClass = clsx("recharts-pie", className);
  if (hide || sectors == null) {
    previousSectorsRef.current = null;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      tabIndex: rootTabIndex,
      className: layerClass
    });
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(SetPieTooltipEntrySettings, {
    dataKey: props.dataKey,
    nameKey: props.nameKey,
    sectors,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    tooltipType: props.tooltipType,
    formatter: props.formatter,
    id,
    activeShape: props.activeShape
  }), /* @__PURE__ */ reactExports.createElement(Layer, {
    tabIndex: rootTabIndex,
    className: layerClass
  }, /* @__PURE__ */ reactExports.createElement(SectorsWithAnimation, {
    props: _objectSpread$h(_objectSpread$h({}, propsWithoutId), {}, {
      sectors
    }),
    previousSectorsRef,
    id
  })));
}
function PieFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultPieProps);
  var externalId = props.id, propsWithoutId = _objectWithoutProperties$h(props, _excluded4$2);
  var presentationProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: externalId,
    type: "pie"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetPolarGraphicalItem, {
    type: "pie",
    id,
    data: propsWithoutId.data,
    dataKey: propsWithoutId.dataKey,
    hide: propsWithoutId.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: propsWithoutId.name,
    nameKey: propsWithoutId.nameKey,
    tooltipType: propsWithoutId.tooltipType,
    legendType: propsWithoutId.legendType,
    fill: propsWithoutId.fill,
    cx: propsWithoutId.cx,
    cy: propsWithoutId.cy,
    startAngle: propsWithoutId.startAngle,
    endAngle: propsWithoutId.endAngle,
    paddingAngle: propsWithoutId.paddingAngle,
    minAngle: propsWithoutId.minAngle,
    innerRadius: propsWithoutId.innerRadius,
    outerRadius: propsWithoutId.outerRadius,
    cornerRadius: propsWithoutId.cornerRadius,
    presentationProps,
    maxRadius: props.maxRadius
  }), /* @__PURE__ */ reactExports.createElement(SetPiePayloadLegend, _extends$g({}, propsWithoutId, {
    id
  })), /* @__PURE__ */ reactExports.createElement(PieImpl, _extends$g({}, propsWithoutId, {
    id
  }))));
}
var Pie = PieFn;
Pie.displayName = "Pie";
var _excluded$g = ["points"];
function ownKeys$g(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$g(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$g(Object(t), true).forEach(function(r2) {
      _defineProperty$g(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$g(e, r, t) {
  return (r = _toPropertyKey$g(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$g(t) {
  var i = _toPrimitive$g(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$g(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$f() {
  return _extends$f = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$f.apply(null, arguments);
}
function _objectWithoutProperties$g(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$g(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$g(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function DotItem(_ref2) {
  var option = _ref2.option, dotProps = _ref2.dotProps, className = _ref2.className;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return /* @__PURE__ */ reactExports.cloneElement(option, dotProps);
  }
  if (typeof option === "function") {
    return option(dotProps);
  }
  var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : "");
  var _ref22 = dotProps !== null && dotProps !== void 0 ? dotProps : {};
  _ref22.points;
  var props = _objectWithoutProperties$g(_ref22, _excluded$g);
  return /* @__PURE__ */ reactExports.createElement(Dot, _extends$f({}, props, {
    className: finalClassName
  }));
}
function shouldRenderDots(points, dot) {
  if (points == null) {
    return false;
  }
  if (dot) {
    return true;
  }
  return points.length === 1;
}
function Dots(_ref3) {
  var points = _ref3.points, dot = _ref3.dot, className = _ref3.className, dotClassName = _ref3.dotClassName, dataKey = _ref3.dataKey, baseProps = _ref3.baseProps, needClip = _ref3.needClip, clipPathId = _ref3.clipPathId, _ref3$zIndex = _ref3.zIndex, zIndex = _ref3$zIndex === void 0 ? DefaultZIndexes.scatter : _ref3$zIndex;
  if (!shouldRenderDots(points, dot)) {
    return null;
  }
  var clipDot = isClipDot(dot);
  var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
  var dots = points.map((entry, i) => {
    var _entry$x, _entry$y;
    var dotProps = _objectSpread$g(_objectSpread$g(_objectSpread$g({
      r: 3
    }, baseProps), customDotProps), {}, {
      index: i,
      cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
      cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
      dataKey,
      value: entry.value,
      payload: entry.payload,
      points
    });
    return /* @__PURE__ */ reactExports.createElement(DotItem, {
      key: "dot-".concat(i),
      option: dot,
      dotProps,
      className: dotClassName
    });
  });
  var layerProps = {};
  if (needClip && clipPathId != null) {
    layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ reactExports.createElement(Layer, _extends$f({
    className
  }, layerProps), dots));
}
function ownKeys$f(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$f(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$f(Object(t), true).forEach(function(r2) {
      _defineProperty$f(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$f(e, r, t) {
  return (r = _toPropertyKey$f(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$f(t) {
  var i = _toPrimitive$f(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$f(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultAxisId = 0;
var initialState$6 = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
};
var cartesianAxisSlice = createSlice({
  name: "cartesianAxis",
  initialState: initialState$6,
  reducers: {
    addXAxis: {
      reducer(state, action) {
        state.xAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceXAxis: {
      reducer(state, action) {
        var _action$payload = action.payload, prev = _action$payload.prev, next = _action$payload.next;
        if (state.xAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.xAxis[prev.id];
          }
          state.xAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeXAxis: {
      reducer(state, action) {
        delete state.xAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addYAxis: {
      reducer(state, action) {
        state.yAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceYAxis: {
      reducer(state, action) {
        var _action$payload2 = action.payload, prev = _action$payload2.prev, next = _action$payload2.next;
        if (state.yAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.yAxis[prev.id];
          }
          state.yAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeYAxis: {
      reducer(state, action) {
        delete state.yAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addZAxis: {
      reducer(state, action) {
        state.zAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceZAxis: {
      reducer(state, action) {
        var _action$payload3 = action.payload, prev = _action$payload3.prev, next = _action$payload3.next;
        if (state.zAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.zAxis[prev.id];
          }
          state.zAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeZAxis: {
      reducer(state, action) {
        delete state.zAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    updateYAxisWidth(state, action) {
      var _action$payload4 = action.payload, id = _action$payload4.id, width = _action$payload4.width;
      var axis = state.yAxis[id];
      if (axis) {
        var _history$;
        var history = axis.widthHistory || [];
        if (history.length === 3 && history[0] === history[2] && width === history[1] && width !== axis.width && Math.abs(width - ((_history$ = history[0]) !== null && _history$ !== void 0 ? _history$ : 0)) <= 1) {
          return;
        }
        var newHistory = [...history, width].slice(-3);
        state.yAxis[id] = _objectSpread$f(_objectSpread$f({}, axis), {}, {
          width,
          widthHistory: newHistory
        });
      }
    },
    updateXAxisHeight(state, action) {
      var _action$payload5 = action.payload, id = _action$payload5.id, height = _action$payload5.height;
      var axis = state.xAxis[id];
      if (axis) {
        var _history$2;
        var history = axis.heightHistory || [];
        if (history.length === 3 && history[0] === history[2] && height === history[1] && height !== axis.height && Math.abs(height - ((_history$2 = history[0]) !== null && _history$2 !== void 0 ? _history$2 : 0)) <= 1) {
          return;
        }
        var newHistory = [...history, height].slice(-3);
        state.xAxis[id] = _objectSpread$f(_objectSpread$f({}, axis), {}, {
          height,
          heightHistory: newHistory
        });
      }
    }
  }
});
var _cartesianAxisSlice$a = cartesianAxisSlice.actions, addXAxis = _cartesianAxisSlice$a.addXAxis, replaceXAxis = _cartesianAxisSlice$a.replaceXAxis, removeXAxis = _cartesianAxisSlice$a.removeXAxis, addYAxis = _cartesianAxisSlice$a.addYAxis, replaceYAxis = _cartesianAxisSlice$a.replaceYAxis, removeYAxis = _cartesianAxisSlice$a.removeYAxis;
_cartesianAxisSlice$a.addZAxis;
_cartesianAxisSlice$a.replaceZAxis;
_cartesianAxisSlice$a.removeZAxis;
var updateYAxisWidth = _cartesianAxisSlice$a.updateYAxisWidth, updateXAxisHeight = _cartesianAxisSlice$a.updateXAxisHeight;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
var selectChartOffset = createSelector([selectChartOffsetInternal], (offsetInternal) => {
  return {
    top: offsetInternal.top,
    bottom: offsetInternal.bottom,
    left: offsetInternal.left,
    right: offsetInternal.right
  };
});
var selectPlotArea = createSelector([selectChartOffset, selectChartWidth, selectChartHeight], (offset, chartWidth, chartHeight) => {
  if (!offset || chartWidth == null || chartHeight == null) {
    return void 0;
  }
  return {
    x: offset.left,
    y: offset.top,
    width: Math.max(0, chartWidth - offset.left - offset.right),
    height: Math.max(0, chartHeight - offset.top - offset.bottom)
  };
});
var usePlotArea = () => {
  return useAppSelector(selectPlotArea);
};
var useActiveTooltipDataPoints = () => {
  return useAppSelector(selectActiveTooltipDataPoints);
};
function ownKeys$e(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$e(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$e(Object(t), true).forEach(function(r2) {
      _defineProperty$e(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$e(e, r, t) {
  return (r = _toPropertyKey$e(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$e(t) {
  var i = _toPrimitive$e(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$e(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref2) => {
  var point = _ref2.point, childIndex = _ref2.childIndex, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, dataKey = _ref2.dataKey, clipPath = _ref2.clipPath;
  if (activeDot === false || point.x == null || point.y == null) {
    return null;
  }
  var dotPropsTyped = {
    index: childIndex,
    dataKey,
    cx: point.x,
    cy: point.y,
    r: 4,
    fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: point.payload,
    value: point.value
  };
  var dotProps = _objectSpread$e(_objectSpread$e(_objectSpread$e({}, dotPropsTyped), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
  var dot;
  if (/* @__PURE__ */ reactExports.isValidElement(activeDot)) {
    dot = /* @__PURE__ */ reactExports.cloneElement(activeDot, dotProps);
  } else if (typeof activeDot === "function") {
    dot = activeDot(dotProps);
  } else {
    dot = /* @__PURE__ */ reactExports.createElement(Dot, dotProps);
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-active-dot",
    clipPath
  }, dot);
};
function ActivePoints(_ref2) {
  var points = _ref2.points, mainColor = _ref2.mainColor, activeDot = _ref2.activeDot, itemDataKey = _ref2.itemDataKey, clipPath = _ref2.clipPath, _ref2$zIndex = _ref2.zIndex, zIndex = _ref2$zIndex === void 0 ? DefaultZIndexes.activeDot : _ref2$zIndex;
  var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataPoints = useActiveTooltipDataPoints();
  if (points == null || activeDataPoints == null) {
    return null;
  }
  var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
  if (isNullish(activePoint)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ reactExports.createElement(ActivePoint, {
    point: activePoint,
    childIndex: Number(activeTooltipIndex),
    mainColor,
    dataKey: itemDataKey,
    activeDot,
    clipPath
  }));
}
function _slicedToArray$5(r, e) {
  return _arrayWithHoles$5(r) || _iterableToArrayLimit$5(r, e) || _unsupportedIterableToArray$5(r, e) || _nonIterableRest$5();
}
function _nonIterableRest$5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$5(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$5(r, a) : void 0;
  }
}
function _arrayLikeToArray$5(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$5(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$5(r) {
  if (Array.isArray(r)) return r;
}
var getBarSize = (globalSize, totalSize, selfSize) => {
  var barSize = selfSize !== null && selfSize !== void 0 ? selfSize : globalSize;
  if (isNullish(barSize)) {
    return void 0;
  }
  return getPercentValue(barSize, totalSize, 0);
};
var combineBarSizeList = (allBars, globalSize, totalSize) => {
  var initialValue = {};
  var stackedBars = allBars.filter(isStacked);
  var unstackedBars = allBars.filter((b) => b.stackId == null);
  var groupByStack = stackedBars.reduce((acc, bar) => {
    var s = acc[bar.stackId];
    if (s == null) {
      s = [];
    }
    s.push(bar);
    acc[bar.stackId] = s;
    return acc;
  }, initialValue);
  var stackedSizeList = Object.entries(groupByStack).map((_ref2) => {
    var _bars$;
    var _ref22 = _slicedToArray$5(_ref2, 2), stackId = _ref22[0], bars = _ref22[1];
    var dataKeys = bars.map((b) => b.dataKey);
    var barSize = getBarSize(globalSize, totalSize, (_bars$ = bars[0]) === null || _bars$ === void 0 ? void 0 : _bars$.barSize);
    return {
      stackId,
      dataKeys,
      barSize
    };
  });
  var unstackedSizeList = unstackedBars.map((b) => {
    var dataKeys = [b.dataKey].filter((dk) => dk != null);
    var barSize = getBarSize(globalSize, totalSize, b.barSize);
    return {
      stackId: void 0,
      dataKeys,
      barSize
    };
  });
  return [...stackedSizeList, ...unstackedSizeList];
};
function ownKeys$d(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$d(Object(t), true).forEach(function(r2) {
      _defineProperty$d(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$d(e, r, t) {
  return (r = _toPropertyKey$d(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$d(t) {
  var i = _toPrimitive$d(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$d(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getBarPositions(barGap, barCategoryGap, bandSize, sizeList, maxBarSize) {
  var _sizeList$;
  var len = sizeList.length;
  if (len < 1) {
    return void 0;
  }
  var realBarGap = getPercentValue(barGap, bandSize, 0, true);
  var result;
  var initialValue = [];
  if (isWellBehavedNumber((_sizeList$ = sizeList[0]) === null || _sizeList$ === void 0 ? void 0 : _sizeList$.barSize)) {
    var useFull = false;
    var fullBarSize = bandSize / len;
    var sum = sizeList.reduce((res, entry) => res + (entry.barSize || 0), 0);
    sum += (len - 1) * realBarGap;
    if (sum >= bandSize) {
      sum -= (len - 1) * realBarGap;
      realBarGap = 0;
    }
    if (sum >= bandSize && fullBarSize > 0) {
      useFull = true;
      fullBarSize *= 0.9;
      sum = len * fullBarSize;
    }
    var offset = Math.round((bandSize - sum) / 2);
    var prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce((res, entry) => {
      var _entry$barSize;
      var newPosition = {
        stackId: entry.stackId,
        dataKeys: entry.dataKeys,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          size: useFull ? fullBarSize : (_entry$barSize = entry.barSize) !== null && _entry$barSize !== void 0 ? _entry$barSize : 0
        }
      };
      var newRes = [...res, newPosition];
      prev = newPosition.position;
      return newRes;
    }, initialValue);
  } else {
    var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize = Math.round(originalSize);
    }
    var size = isWellBehavedNumber(maxBarSize) ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce((res, entry, i) => [...res, {
      stackId: entry.stackId,
      dataKeys: entry.dataKeys,
      position: {
        offset: _offset + len * (originalSize - size) / 2 + (size + realBarGap) * i,
        size
      }
    }], initialValue);
  }
  return result;
}
var combineAllBarPositions = (sizeList, globalMaxBarSize, barGap, barCategoryGap, barBandSize, bandSize, childMaxBarSize) => {
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var allBarPositions = getBarPositions(barGap, barCategoryGap, barBandSize !== bandSize ? barBandSize : bandSize, sizeList, maxBarSize);
  if (barBandSize !== bandSize && allBarPositions != null) {
    allBarPositions = allBarPositions.map((pos) => _objectSpread$d(_objectSpread$d({}, pos), {}, {
      position: _objectSpread$d(_objectSpread$d({}, pos.position), {}, {
        offset: pos.position.offset - barBandSize / 2
      })
    }));
  }
  return allBarPositions;
};
var combineStackedData = (stackGroups, barSettings) => {
  var stackSeriesIdentifier = getStackSeriesIdentifier(barSettings);
  if (!stackGroups || stackSeriesIdentifier == null || barSettings == null) {
    return void 0;
  }
  var stackId = barSettings.stackId;
  if (stackId == null) {
    return void 0;
  }
  var stackGroup = stackGroups[stackId];
  if (!stackGroup) {
    return void 0;
  }
  var stackedData = stackGroup.stackedData;
  if (!stackedData) {
    return void 0;
  }
  return stackedData.find((sd) => sd.key === stackSeriesIdentifier);
};
var combineBarPosition = (allBarPositions, barSettings) => {
  if (allBarPositions == null || barSettings == null) {
    return void 0;
  }
  var position = allBarPositions.find((p) => p.stackId === barSettings.stackId && barSettings.dataKey != null && p.dataKeys.includes(barSettings.dataKey));
  if (position == null) {
    return void 0;
  }
  return position.position;
};
function getZIndexFromUnknown(input, defaultZIndex) {
  if (input && typeof input === "object" && "zIndex" in input && typeof input.zIndex === "number" && isWellBehavedNumber(input.zIndex)) {
    return input.zIndex;
  }
  return defaultZIndex;
}
var ChartDataContextProvider = (props) => {
  var chartData = props.chartData;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (isPanorama) {
      return () => {
      };
    }
    dispatch(setChartData(chartData));
    return () => {
      dispatch(setChartData(void 0));
    };
  }, [chartData, dispatch, isPanorama]);
  return null;
};
var initialState$5 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};
var brushSlice = createSlice({
  name: "brush",
  initialState: initialState$5,
  reducers: {
    setBrushSettings(_state, action) {
      if (action.payload == null) {
        return initialState$5;
      }
      return action.payload;
    }
  }
});
brushSlice.actions.setBrushSettings;
var brushReducer = brushSlice.reducer;
var rectWithPoints = (_ref2, _ref22) => {
  var x1 = _ref2.x, y1 = _ref2.y;
  var x2 = _ref22.x, y2 = _ref22.y;
  return {
    x: Math.min(x1, x2),
    y: Math.min(y1, y2),
    width: Math.abs(x2 - x1),
    height: Math.abs(y2 - y1)
  };
};
var rectWithCoords = (_ref3) => {
  var x1 = _ref3.x1, y1 = _ref3.y1, x2 = _ref3.x2, y2 = _ref3.y2;
  return rectWithPoints({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  });
};
function normalizeAngle(angle) {
  return (angle % 180 + 180) % 180;
}
var getAngledRectangleWidth = function getAngledRectangleWidth2(_ref4) {
  var width = _ref4.width, height = _ref4.height;
  var angle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var normalizedAngle = normalizeAngle(angle);
  var angleRadians = normalizedAngle * Math.PI / 180;
  var angleThreshold = Math.atan(height / width);
  var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
  return Math.abs(angledWidth);
};
var initialState$4 = {
  dots: [],
  areas: [],
  lines: []
};
var referenceElementsSlice = createSlice({
  name: "referenceElements",
  initialState: initialState$4,
  reducers: {
    addDot: (state, action) => {
      state.dots.push(action.payload);
    },
    removeDot: (state, action) => {
      var index = current(state).dots.findIndex((dot) => dot === action.payload);
      if (index !== -1) {
        state.dots.splice(index, 1);
      }
    },
    addArea: (state, action) => {
      state.areas.push(action.payload);
    },
    removeArea: (state, action) => {
      var index = current(state).areas.findIndex((area) => area === action.payload);
      if (index !== -1) {
        state.areas.splice(index, 1);
      }
    },
    addLine: (state, action) => {
      state.lines.push(castDraft(action.payload));
    },
    removeLine: (state, action) => {
      var index = current(state).lines.findIndex((line) => line === action.payload);
      if (index !== -1) {
        state.lines.splice(index, 1);
      }
    }
  }
});
var _referenceElementsSli = referenceElementsSlice.actions;
_referenceElementsSli.addDot;
_referenceElementsSli.removeDot;
_referenceElementsSli.addArea;
_referenceElementsSli.removeArea;
var addLine = _referenceElementsSli.addLine, removeLine = _referenceElementsSli.removeLine;
var referenceElementsReducer = referenceElementsSlice.reducer;
function _slicedToArray$4(r, e) {
  return _arrayWithHoles$4(r) || _iterableToArrayLimit$4(r, e) || _unsupportedIterableToArray$4(r, e) || _nonIterableRest$4();
}
function _nonIterableRest$4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$4(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$4(r, a) : void 0;
  }
}
function _arrayLikeToArray$4(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$4(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$4(r) {
  if (Array.isArray(r)) return r;
}
var ClipPathIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var ClipPathProvider = (_ref2) => {
  var children = _ref2.children;
  var _useState = reactExports.useState("".concat(uniqueId("recharts"), "-clip")), _useState2 = _slicedToArray$4(_useState, 1), clipPathId = _useState2[0];
  var plotArea = usePlotArea();
  if (plotArea == null) {
    return null;
  }
  var x = plotArea.x, y = plotArea.y, width = plotArea.width, height = plotArea.height;
  return /* @__PURE__ */ reactExports.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x,
    y,
    height,
    width
  }))), children);
};
var useClipPathId = () => {
  return reactExports.useContext(ClipPathIdContext);
};
class CartesianScaleHelperImpl {
  constructor(_ref2) {
    var x = _ref2.x, y = _ref2.y;
    this.xAxisScale = x;
    this.yAxisScale = y;
  }
  map(value, _ref2) {
    var _this$xAxisScale$map, _this$yAxisScale$map;
    var position = _ref2.position;
    return {
      x: (_this$xAxisScale$map = this.xAxisScale.map(value.x, {
        position
      })) !== null && _this$xAxisScale$map !== void 0 ? _this$xAxisScale$map : 0,
      y: (_this$yAxisScale$map = this.yAxisScale.map(value.y, {
        position
      })) !== null && _this$yAxisScale$map !== void 0 ? _this$yAxisScale$map : 0
    };
  }
  mapWithFallback(value, _ref3) {
    var _this$xAxisScale$map2, _this$yAxisScale$map2;
    var position = _ref3.position, fallback = _ref3.fallback;
    var fallbackY, fallbackX;
    if (fallback === "rangeMin") {
      fallbackY = this.yAxisScale.rangeMin();
    } else if (fallback === "rangeMax") {
      fallbackY = this.yAxisScale.rangeMax();
    } else {
      fallbackY = 0;
    }
    if (fallback === "rangeMin") {
      fallbackX = this.xAxisScale.rangeMin();
    } else if (fallback === "rangeMax") {
      fallbackX = this.xAxisScale.rangeMax();
    } else {
      fallbackX = 0;
    }
    return {
      x: (_this$xAxisScale$map2 = this.xAxisScale.map(value.x, {
        position
      })) !== null && _this$xAxisScale$map2 !== void 0 ? _this$xAxisScale$map2 : fallbackX,
      y: (_this$yAxisScale$map2 = this.yAxisScale.map(value.y, {
        position
      })) !== null && _this$yAxisScale$map2 !== void 0 ? _this$yAxisScale$map2 : fallbackY
    };
  }
  isInRange(_ref4) {
    var x = _ref4.x, y = _ref4.y;
    var xInRange = x == null || this.xAxisScale.isInRange(x);
    var yInRange = y == null || this.yAxisScale.isInRange(y);
    return xInRange && yInRange;
  }
}
function ownKeys$c(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$c(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$c(Object(t), true).forEach(function(r2) {
      _defineProperty$c(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$c(e, r, t) {
  return (r = _toPropertyKey$c(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$c(t) {
  var i = _toPrimitive$c(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$c(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$e() {
  return _extends$e = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$e.apply(null, arguments);
}
var renderLine = (option, props) => {
  var line;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    line = /* @__PURE__ */ reactExports.cloneElement(option, props);
  } else if (typeof option === "function") {
    line = option(props);
  } else {
    if (!isWellBehavedNumber(props.x1) || !isWellBehavedNumber(props.y1) || !isWellBehavedNumber(props.x2) || !isWellBehavedNumber(props.y2)) {
      return null;
    }
    line = /* @__PURE__ */ reactExports.createElement("line", _extends$e({}, props, {
      className: "recharts-reference-line-line"
    }));
  }
  return line;
};
var getHorizontalLineEndPoints = (yCoord, ifOverflow, position, yAxisOrientation, yAxisScale, viewBox) => {
  var x = viewBox.x, width = viewBox.width;
  var coord = yAxisScale.map(yCoord, {
    position
  });
  if (!isWellBehavedNumber(coord)) {
    return null;
  }
  if (ifOverflow === "discard" && !yAxisScale.isInRange(coord)) {
    return null;
  }
  var points = [{
    x: x + width,
    y: coord
  }, {
    x,
    y: coord
  }];
  return yAxisOrientation === "left" ? points.reverse() : points;
};
var getVerticalLineEndPoints = (xCoord, ifOverflow, position, xAxisOrientation, xAxisScale, viewBox) => {
  var y = viewBox.y, height = viewBox.height;
  var coord = xAxisScale.map(xCoord, {
    position
  });
  if (!isWellBehavedNumber(coord)) {
    return null;
  }
  if (ifOverflow === "discard" && !xAxisScale.isInRange(coord)) {
    return null;
  }
  var points = [{
    x: coord,
    y: y + height
  }, {
    x: coord,
    y
  }];
  return xAxisOrientation === "top" ? points.reverse() : points;
};
var getSegmentLineEndPoints = (segment, ifOverflow, position, scales) => {
  var points = [scales.mapWithFallback(segment[0], {
    position,
    fallback: "rangeMin"
  }), scales.mapWithFallback(segment[1], {
    position,
    fallback: "rangeMax"
  })];
  if (ifOverflow === "discard" && points.some((p) => !scales.isInRange(p))) {
    return null;
  }
  return points;
};
var getEndPoints = (xAxisScale, yAxisScale, viewBox, position, xAxisOrientation, yAxisOrientation, props) => {
  var xCoord = props.x, yCoord = props.y, segment = props.segment, ifOverflow = props.ifOverflow;
  var isFixedX = isNumOrStr(xCoord);
  var isFixedY = isNumOrStr(yCoord);
  if (isFixedY) {
    return getHorizontalLineEndPoints(yCoord, ifOverflow, position, yAxisOrientation, yAxisScale, viewBox);
  }
  if (isFixedX) {
    return getVerticalLineEndPoints(xCoord, ifOverflow, position, xAxisOrientation, xAxisScale, viewBox);
  }
  if (segment != null && segment.length === 2) {
    return getSegmentLineEndPoints(segment, ifOverflow, position, new CartesianScaleHelperImpl({
      x: xAxisScale,
      y: yAxisScale
    }));
  }
  return null;
};
function ReportReferenceLine(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(addLine(props));
    return () => {
      dispatch(removeLine(props));
    };
  });
  return null;
}
function ReferenceLineImpl(props) {
  var xAxisId = props.xAxisId, yAxisId = props.yAxisId, shape = props.shape, className = props.className, ifOverflow = props.ifOverflow;
  var isPanorama = useIsPanorama();
  var clipPathId = useClipPathId();
  var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
  var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
  var xAxisScale = useAppSelector((state) => selectAxisScale(state, "xAxis", xAxisId, isPanorama));
  var yAxisScale = useAppSelector((state) => selectAxisScale(state, "yAxis", yAxisId, isPanorama));
  var viewBox = useViewBox();
  if (!clipPathId || !viewBox || xAxis == null || yAxis == null || xAxisScale == null || yAxisScale == null) {
    return null;
  }
  var endPoints = getEndPoints(xAxisScale, yAxisScale, viewBox, props.position, xAxis.orientation, yAxis.orientation, props);
  if (!endPoints) {
    return null;
  }
  var point1 = endPoints[0];
  var point2 = endPoints[1];
  if (point1 == null || point2 == null) {
    return null;
  }
  var x1 = point1.x, y1 = point1.y;
  var x2 = point2.x, y2 = point2.y;
  var clipPath = ifOverflow === "hidden" ? "url(#".concat(clipPathId, ")") : void 0;
  var lineProps = _objectSpread$c(_objectSpread$c({
    clipPath
  }, svgPropertiesAndEvents(props)), {}, {
    x1,
    y1,
    x2,
    y2
  });
  var rect = rectWithCoords({
    x1,
    y1,
    x2,
    y2
  });
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(Layer, {
    className: clsx("recharts-reference-line", className)
  }, renderLine(shape, lineProps), /* @__PURE__ */ reactExports.createElement(CartesianLabelContextProvider, _extends$e({}, rect, {
    lowerWidth: rect.width,
    upperWidth: rect.width
  }), /* @__PURE__ */ reactExports.createElement(CartesianLabelFromLabelProp, {
    label: props.label
  }), props.children)));
}
var referenceLineDefaultProps = {
  ifOverflow: "discard",
  xAxisId: 0,
  yAxisId: 0,
  fill: "none",
  label: false,
  stroke: "#ccc",
  fillOpacity: 1,
  strokeWidth: 1,
  position: "middle",
  zIndex: DefaultZIndexes.line
};
function ReferenceLine(outsideProps) {
  var props = resolveDefaultProps(outsideProps, referenceLineDefaultProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportReferenceLine, {
    yAxisId: props.yAxisId,
    xAxisId: props.xAxisId,
    ifOverflow: props.ifOverflow,
    x: props.x,
    y: props.y,
    segment: props.segment
  }), /* @__PURE__ */ reactExports.createElement(ReferenceLineImpl, props));
}
ReferenceLine.displayName = "ReferenceLine";
function getEveryNth(array, n) {
  if (n < 1) {
    return [];
  }
  if (n === 1) {
    return array;
  }
  var result = [];
  for (var i = 0; i < array.length; i += n) {
    var item = array[i];
    if (item !== void 0) {
      result.push(item);
    }
  }
  return result;
}
function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return getAngledRectangleWidth(size, angle);
}
function getTickBoundaries(viewBox, sign, sizeKey) {
  var isWidth = sizeKey === "width";
  var x = viewBox.x, y = viewBox.y, width = viewBox.width, height = viewBox.height;
  if (sign === 1) {
    return {
      start: isWidth ? x : y,
      end: isWidth ? x + width : y + height
    };
  }
  return {
    start: isWidth ? x + width : y + height,
    end: isWidth ? x : y
  };
}
function isVisible(sign, tickPosition, getSize, start, end) {
  if (sign * tickPosition < sign * start || sign * tickPosition > sign * end) {
    return false;
  }
  var size = getSize();
  return sign * (tickPosition - sign * size / 2 - start) >= 0 && sign * (tickPosition + sign * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks, interval) {
  return getEveryNth(ticks, interval + 1);
}
function getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var initialStart = boundaries.start, end = boundaries.end;
  var index = 0;
  var stepsize = 1;
  var start = initialStart;
  var _loop = function _loop2() {
    var entry = ticks === null || ticks === void 0 ? void 0 : ticks[index];
    if (entry === void 0) {
      return {
        v: getEveryNth(ticks, stepsize)
      };
    }
    var i = index;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(entry, i);
      }
      return size;
    };
    var tickCoord = entry.coordinate;
    var isShow = index === 0 || isVisible(sign, tickCoord, getSize, start, end);
    if (!isShow) {
      index = 0;
      start = initialStart;
      stepsize += 1;
    }
    if (isShow) {
      start = tickCoord + sign * (getSize() / 2 + minTickGap);
      index += stepsize;
    }
  }, _ret;
  while (stepsize <= result.length) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  return [];
}
function getEquidistantPreserveEndTicks(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var len = result.length;
  if (len === 0) {
    return [];
  }
  var initialStart = boundaries.start, end = boundaries.end;
  for (var stepsize = 1; stepsize <= len; stepsize++) {
    var offset = (len - 1) % stepsize;
    var start = initialStart;
    var ok = true;
    var _loop2 = function _loop22() {
      var entry = ticks[index];
      if (entry == null) {
        return 0;
      }
      var i = index;
      var size;
      var getSize = () => {
        if (size === void 0) {
          size = getTickSize(entry, i);
        }
        return size;
      };
      var tickCoord = entry.coordinate;
      var isShow = index === offset || isVisible(sign, tickCoord, getSize, start, end);
      if (!isShow) {
        ok = false;
        return 1;
      }
      if (isShow) {
        start = tickCoord + sign * (getSize() / 2 + minTickGap);
      }
    }, _ret2;
    for (var index = offset; index < len; index += stepsize) {
      _ret2 = _loop2();
      if (_ret2 === 0) continue;
      if (_ret2 === 1) break;
    }
    if (ok) {
      var finalTicks = [];
      for (var _index = offset; _index < len; _index += stepsize) {
        var tick = ticks[_index];
        if (tick != null) {
          finalTicks.push(tick);
        }
      }
      return finalTicks;
    }
  }
  return [];
}
function ownKeys$b(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$b(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$b(Object(t), true).forEach(function(r2) {
      _defineProperty$b(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$b(e, r, t) {
  return (r = _toPropertyKey$b(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$b(t) {
  var i = _toPrimitive$b(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$b(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start;
  var end = boundaries.end;
  var _loop = function _loop2(i2) {
    var initialEntry = result[i2];
    if (initialEntry == null) {
      return 1;
    }
    var entry = initialEntry;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(initialEntry, i2);
      }
      return size;
    };
    if (i2 === len - 1) {
      var gap = sign * (entry.coordinate + sign * getSize() / 2 - end);
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    if (entry.tickCoord != null) {
      var isShow = isVisible(sign, entry.tickCoord, getSize, start, end);
      if (isShow) {
        end = entry.tickCoord - sign * (getSize() / 2 + minTickGap);
        result[i2] = _objectSpread$b(_objectSpread$b({}, entry), {}, {
          isShow: true
        });
      }
    }
  };
  for (var i = len - 1; i >= 0; i--) {
    if (_loop(i)) continue;
  }
  return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start, end = boundaries.end;
  if (preserveEnd) {
    var tail = ticks[len - 1];
    if (tail != null) {
      var tailSize = getTickSize(tail, len - 1);
      var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
      result[len - 1] = tail = _objectSpread$b(_objectSpread$b({}, tail), {}, {
        tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
      });
      if (tail.tickCoord != null) {
        var isTailShow = isVisible(sign, tail.tickCoord, () => tailSize, start, end);
        if (isTailShow) {
          end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
          result[len - 1] = _objectSpread$b(_objectSpread$b({}, tail), {}, {
            isShow: true
          });
        }
      }
    }
  }
  var count = preserveEnd ? len - 1 : len;
  var _loop2 = function _loop22(i2) {
    var initialEntry = result[i2];
    if (initialEntry == null) {
      return 1;
    }
    var entry = initialEntry;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(initialEntry, i2);
      }
      return size;
    };
    if (i2 === 0) {
      var gap = sign * (entry.coordinate - sign * getSize() / 2 - start);
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$b(_objectSpread$b({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    if (entry.tickCoord != null) {
      var isShow = isVisible(sign, entry.tickCoord, getSize, start, end);
      if (isShow) {
        start = entry.tickCoord + sign * (getSize() / 2 + minTickGap);
        result[i2] = _objectSpread$b(_objectSpread$b({}, entry), {}, {
          isShow: true
        });
      }
    }
  };
  for (var i = 0; i < count; i++) {
    if (_loop2(i)) continue;
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick, ticks = props.ticks, viewBox = props.viewBox, minTickGap = props.minTickGap, orientation = props.orientation, interval = props.interval, tickFormatter = props.tickFormatter, unit = props.unit, angle = props.angle;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if (isNumber(interval) || Global.isSsr) {
    var _getNumberIntervalTic;
    return (_getNumberIntervalTic = getNumberIntervalTicks(ticks, isNumber(interval) ? interval : 0)) !== null && _getNumberIntervalTic !== void 0 ? _getNumberIntervalTic : [];
  }
  var candidates = [];
  var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
  var unitSize = unit && sizeKey === "width" ? getStringSize(unit, {
    fontSize,
    letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var getTickSize = (content, index) => {
    var value = typeof tickFormatter === "function" ? tickFormatter(content.value, index) : content.value;
    return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
      fontSize,
      letterSpacing
    }), unitSize, angle) : getStringSize(value, {
      fontSize,
      letterSpacing
    })[sizeKey];
  };
  var tick0 = ticks[0];
  var tick1 = ticks[1];
  var sign = ticks.length >= 2 && tick0 != null && tick1 != null ? mathSign(tick1.coordinate - tick0.coordinate) : 1;
  var boundaries = getTickBoundaries(viewBox, sign, sizeKey);
  if (interval === "equidistantPreserveStart") {
    return getEquidistantTicks(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  if (interval === "equidistantPreserveEnd") {
    return getEquidistantPreserveEndTicks(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  if (interval === "preserveStart" || interval === "preserveStartEnd") {
    candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === "preserveStartEnd");
  } else {
    candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  return candidates.filter((entry) => entry.isShow);
}
var getCalculatedYAxisWidth = (_ref2) => {
  var ticks = _ref2.ticks, label = _ref2.label, _ref$labelGapWithTick = _ref2.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick, _ref$tickSize = _ref2.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref2.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
  var maxTickWidth = 0;
  if (ticks) {
    Array.from(ticks).forEach((tickNode) => {
      if (tickNode) {
        var bbox = tickNode.getBoundingClientRect();
        if (bbox.width > maxTickWidth) {
          maxTickWidth = bbox.width;
        }
      }
    });
    var labelWidth = label ? label.getBoundingClientRect().width : 0;
    var tickWidth = tickSize + tickMargin;
    var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
    return Math.round(updatedYAxisWidth);
  }
  return 0;
};
var getCalculatedXAxisHeight = (_ref2) => {
  var ticks = _ref2.ticks, label = _ref2.label, _ref$labelGapWithTick = _ref2.labelGapWithTick, labelGapWithTick = _ref$labelGapWithTick, _ref$tickSize = _ref2.tickSize, tickSize = _ref$tickSize === void 0 ? 0 : _ref$tickSize, _ref$tickMargin = _ref2.tickMargin, tickMargin = _ref$tickMargin === void 0 ? 0 : _ref$tickMargin;
  var maxTickHeight = 0;
  if (ticks) {
    Array.from(ticks).forEach((tickNode) => {
      if (tickNode) {
        var bbox = tickNode.getBoundingClientRect();
        if (bbox.height > maxTickHeight) {
          maxTickHeight = bbox.height;
        }
      }
    });
    var labelHeight = label ? label.getBoundingClientRect().height : 0;
    var tickHeight = tickSize + tickMargin;
    var updatedXAxisHeight = maxTickHeight + tickHeight + labelHeight + (label ? labelGapWithTick : 0);
    return Math.round(updatedXAxisHeight);
  }
  return 0;
};
var initialState$3 = {
  xAxis: {},
  yAxis: {}
};
var renderedTicksSlice = createSlice({
  name: "renderedTicks",
  initialState: initialState$3,
  reducers: {
    setRenderedTicks: (state, action) => {
      var _action$payload = action.payload, axisType = _action$payload.axisType, axisId = _action$payload.axisId, ticks = _action$payload.ticks;
      state[axisType][axisId] = castDraft(ticks);
    },
    removeRenderedTicks: (state, action) => {
      var _action$payload2 = action.payload, axisType = _action$payload2.axisType, axisId = _action$payload2.axisId;
      delete state[axisType][axisId];
    }
  }
});
var _renderedTicksSlice$a = renderedTicksSlice.actions, setRenderedTicks = _renderedTicksSlice$a.setRenderedTicks, removeRenderedTicks = _renderedTicksSlice$a.removeRenderedTicks;
var renderedTicksReducer = renderedTicksSlice.reducer;
var _excluded$f = ["axisLine", "width", "height", "className", "hide", "ticks", "axisType", "axisId"];
function _slicedToArray$3(r, e) {
  return _arrayWithHoles$3(r) || _iterableToArrayLimit$3(r, e) || _unsupportedIterableToArray$3(r, e) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$3(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$3(r, a) : void 0;
  }
}
function _arrayLikeToArray$3(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$3(r) {
  if (Array.isArray(r)) return r;
}
function _objectWithoutProperties$f(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$f(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$f(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends$d() {
  return _extends$d = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$d.apply(null, arguments);
}
function ownKeys$a(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$a(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$a(Object(t), true).forEach(function(r2) {
      _defineProperty$a(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$a(e, r, t) {
  return (r = _toPropertyKey$a(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$a(t) {
  var i = _toPrimitive$a(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$a(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultCartesianAxisProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd",
  zIndex: DefaultZIndexes.axis
};
function AxisLine(axisLineProps) {
  var x = axisLineProps.x, y = axisLineProps.y, width = axisLineProps.width, height = axisLineProps.height, orientation = axisLineProps.orientation, mirror = axisLineProps.mirror, axisLine = axisLineProps.axisLine, otherSvgProps = axisLineProps.otherSvgProps;
  if (!axisLine) {
    return null;
  }
  var props = _objectSpread$a(_objectSpread$a(_objectSpread$a({}, otherSvgProps), svgPropertiesNoEvents(axisLine)), {}, {
    fill: "none"
  });
  if (orientation === "top" || orientation === "bottom") {
    var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
    props = _objectSpread$a(_objectSpread$a({}, props), {}, {
      x1: x,
      y1: y + needHeight * height,
      x2: x + width,
      y2: y + needHeight * height
    });
  } else {
    var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
    props = _objectSpread$a(_objectSpread$a({}, props), {}, {
      x1: x + needWidth * width,
      y1: y,
      x2: x + needWidth * width,
      y2: y + height
    });
  }
  return /* @__PURE__ */ reactExports.createElement("line", _extends$d({}, props, {
    className: clsx("recharts-cartesian-axis-line", get(axisLine, "className"))
  }));
}
function getTickLineCoord(data, x, y, width, height, orientation, tickSize, mirror, tickMargin) {
  var x1, x2, y1, y2, tx, ty;
  var sign = mirror ? -1 : 1;
  var finalTickSize = data.tickSize || tickSize;
  var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
  switch (orientation) {
    case "top":
      x1 = x2 = data.coordinate;
      y2 = y + +!mirror * height;
      y1 = y2 - sign * finalTickSize;
      ty = y1 - sign * tickMargin;
      tx = tickCoord;
      break;
    case "left":
      y1 = y2 = data.coordinate;
      x2 = x + +!mirror * width;
      x1 = x2 - sign * finalTickSize;
      tx = x1 - sign * tickMargin;
      ty = tickCoord;
      break;
    case "right":
      y1 = y2 = data.coordinate;
      x2 = x + +mirror * width;
      x1 = x2 + sign * finalTickSize;
      tx = x1 + sign * tickMargin;
      ty = tickCoord;
      break;
    default:
      x1 = x2 = data.coordinate;
      y2 = y + +mirror * height;
      y1 = y2 + sign * finalTickSize;
      ty = y1 + sign * tickMargin;
      tx = tickCoord;
      break;
  }
  return {
    line: {
      x1,
      y1,
      x2,
      y2
    },
    tick: {
      x: tx,
      y: ty
    }
  };
}
function getTickTextAnchor(orientation, mirror) {
  switch (orientation) {
    case "left":
      return mirror ? "start" : "end";
    case "right":
      return mirror ? "end" : "start";
    default:
      return "middle";
  }
}
function getTickVerticalAnchor(orientation, mirror) {
  switch (orientation) {
    case "left":
    case "right":
      return "middle";
    case "top":
      return mirror ? "start" : "end";
    default:
      return mirror ? "end" : "start";
  }
}
function TickItem(props) {
  var option = props.option, tickProps = props.tickProps, value = props.value;
  var tickItem;
  var combinedClassName = clsx(tickProps.className, "recharts-cartesian-axis-tick-value");
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    tickItem = /* @__PURE__ */ reactExports.cloneElement(option, _objectSpread$a(_objectSpread$a({}, tickProps), {}, {
      className: combinedClassName
    }));
  } else if (typeof option === "function") {
    tickItem = option(_objectSpread$a(_objectSpread$a({}, tickProps), {}, {
      className: combinedClassName
    }));
  } else {
    var className = "recharts-cartesian-axis-tick-value";
    if (typeof option !== "boolean") {
      className = clsx(className, getClassNameFromUnknown(option));
    }
    tickItem = /* @__PURE__ */ reactExports.createElement(Text, _extends$d({}, tickProps, {
      className
    }), value);
  }
  return tickItem;
}
function RenderedTicksReporter(_ref2) {
  var ticks = _ref2.ticks, axisType = _ref2.axisType, axisId = _ref2.axisId;
  var dispatch = useAppDispatch();
  var lastDispatchedTicksRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (axisId == null || axisType == null) {
      return;
    }
    var tickItems = ticks.map((tick) => ({
      value: tick.value,
      coordinate: tick.coordinate,
      offset: tick.offset,
      index: tick.index
    }));
    var last = lastDispatchedTicksRef.current;
    if (last != null && last.axisId === axisId && last.axisType === axisType && isEqual(last.ticks, tickItems)) {
      return;
    }
    lastDispatchedTicksRef.current = {
      ticks: tickItems,
      axisId,
      axisType
    };
    dispatch(setRenderedTicks({
      ticks: tickItems,
      axisId,
      axisType
    }));
  }, [dispatch, ticks, axisId, axisType]);
  reactExports.useEffect(() => {
    if (axisId == null || axisType == null) {
      return noop$1;
    }
    return () => {
      dispatch(removeRenderedTicks({
        axisId,
        axisType
      }));
    };
  }, [dispatch, axisId, axisType]);
  return null;
}
var Ticks = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _props$ticks = props.ticks, ticks = _props$ticks === void 0 ? [] : _props$ticks, tick = props.tick, tickLine = props.tickLine, stroke = props.stroke, tickFormatter = props.tickFormatter, unit = props.unit, padding = props.padding, tickTextProps = props.tickTextProps, orientation = props.orientation, mirror = props.mirror, x = props.x, y = props.y, width = props.width, height = props.height, tickSize = props.tickSize, tickMargin = props.tickMargin, fontSize = props.fontSize, letterSpacing = props.letterSpacing, getTicksConfig = props.getTicksConfig, events = props.events, axisType = props.axisType, axisId = props.axisId;
  var finalTicks = getTicks(_objectSpread$a(_objectSpread$a({}, getTicksConfig), {}, {
    ticks
  }), fontSize, letterSpacing);
  var axisProps = svgPropertiesNoEvents(getTicksConfig);
  var customTickProps = svgPropertiesNoEventsFromUnknown(tick);
  var textAnchor = isValidTextAnchor(axisProps.textAnchor) ? axisProps.textAnchor : getTickTextAnchor(orientation, mirror);
  var verticalAnchor = getTickVerticalAnchor(orientation, mirror);
  var tickLinePropsObject = {};
  if (typeof tickLine === "object") {
    tickLinePropsObject = tickLine;
  }
  var tickLineProps = _objectSpread$a(_objectSpread$a({}, axisProps), {}, {
    fill: "none"
  }, tickLinePropsObject);
  var tickLineCoords = finalTicks.map((entry) => _objectSpread$a({
    entry
  }, getTickLineCoord(entry, x, y, width, height, orientation, tickSize, mirror, tickMargin)));
  var tickLines = tickLineCoords.map((_ref2) => {
    var entry = _ref2.entry, lineCoord = _ref2.line;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: "recharts-cartesian-axis-tick",
      key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
    }, tickLine && /* @__PURE__ */ reactExports.createElement("line", _extends$d({}, tickLineProps, lineCoord, {
      className: clsx("recharts-cartesian-axis-tick-line", get(tickLine, "className"))
    })));
  });
  var tickLabels = tickLineCoords.map((_ref3, i) => {
    var _ref4, _tickTextProps$angle;
    var entry = _ref3.entry, tickCoord = _ref3.tick;
    var tickProps = _objectSpread$a(_objectSpread$a(_objectSpread$a(_objectSpread$a({
      verticalAnchor
    }, axisProps), {}, {
      textAnchor,
      stroke: "none",
      fill: stroke
    }, tickCoord), {}, {
      index: i,
      payload: entry,
      visibleTicksCount: finalTicks.length,
      tickFormatter,
      padding
    }, tickTextProps), {}, {
      angle: (_ref4 = (_tickTextProps$angle = tickTextProps === null || tickTextProps === void 0 ? void 0 : tickTextProps.angle) !== null && _tickTextProps$angle !== void 0 ? _tickTextProps$angle : axisProps.angle) !== null && _ref4 !== void 0 ? _ref4 : 0
    });
    var finalTickProps = _objectSpread$a(_objectSpread$a({}, tickProps), customTickProps);
    return /* @__PURE__ */ reactExports.createElement(Layer, _extends$d({
      className: "recharts-cartesian-axis-tick-label",
      key: "tick-label-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
    }, adaptEventsOfChild(events, entry, i)), tick && /* @__PURE__ */ reactExports.createElement(TickItem, {
      option: tick,
      tickProps: finalTickProps,
      value: "".concat(typeof tickFormatter === "function" ? tickFormatter(entry.value, i) : entry.value).concat(unit || "")
    }));
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-ticks recharts-".concat(axisType, "-ticks")
  }, /* @__PURE__ */ reactExports.createElement(RenderedTicksReporter, {
    ticks: finalTicks,
    axisId,
    axisType
  }), tickLabels.length > 0 && /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: DefaultZIndexes.label
  }, /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-tick-labels recharts-".concat(axisType, "-tick-labels"),
    ref
  }, tickLabels)), tickLines.length > 0 && /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-axis-tick-lines recharts-".concat(axisType, "-tick-lines")
  }, tickLines));
});
var CartesianAxisComponent = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var axisLine = props.axisLine, width = props.width, height = props.height, className = props.className, hide = props.hide, ticks = props.ticks, axisType = props.axisType, axisId = props.axisId, rest = _objectWithoutProperties$f(props, _excluded$f);
  var _useState = reactExports.useState(""), _useState2 = _slicedToArray$3(_useState, 2), fontSize = _useState2[0], setFontSize = _useState2[1];
  var _useState3 = reactExports.useState(""), _useState4 = _slicedToArray$3(_useState3, 2), letterSpacing = _useState4[0], setLetterSpacing = _useState4[1];
  var tickRefs = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => ({
    getCalculatedWidth: () => {
      var _props$labelRef;
      return getCalculatedYAxisWidth({
        ticks: tickRefs.current,
        label: (_props$labelRef = props.labelRef) === null || _props$labelRef === void 0 ? void 0 : _props$labelRef.current,
        labelGapWithTick: 5,
        tickSize: props.tickSize,
        tickMargin: props.tickMargin
      });
    },
    getCalculatedHeight: () => {
      var _props$labelRef2;
      return getCalculatedXAxisHeight({
        ticks: tickRefs.current,
        label: (_props$labelRef2 = props.labelRef) === null || _props$labelRef2 === void 0 ? void 0 : _props$labelRef2.current,
        labelGapWithTick: 5,
        tickSize: props.tickSize,
        tickMargin: props.tickMargin
      });
    }
  }));
  var layerRef = reactExports.useCallback((el) => {
    if (el) {
      var tickNodes = el.getElementsByClassName("recharts-cartesian-axis-tick-value");
      tickRefs.current = tickNodes;
      var tick = tickNodes[0];
      if (tick) {
        var computedStyle = window.getComputedStyle(tick);
        var calculatedFontSize = computedStyle.fontSize;
        var calculatedLetterSpacing = computedStyle.letterSpacing;
        if (calculatedFontSize !== fontSize || calculatedLetterSpacing !== letterSpacing) {
          setFontSize(calculatedFontSize);
          setLetterSpacing(calculatedLetterSpacing);
        }
      }
    }
  }, [fontSize, letterSpacing]);
  if (hide) {
    return null;
  }
  if (width != null && width <= 0 || height != null && height <= 0) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(Layer, {
    className: clsx("recharts-cartesian-axis", className)
  }, /* @__PURE__ */ reactExports.createElement(AxisLine, {
    x: props.x,
    y: props.y,
    width,
    height,
    orientation: props.orientation,
    mirror: props.mirror,
    axisLine,
    otherSvgProps: svgPropertiesNoEvents(props)
  }), /* @__PURE__ */ reactExports.createElement(Ticks, {
    ref: layerRef,
    axisType,
    events: rest,
    fontSize,
    getTicksConfig: props,
    height: props.height,
    letterSpacing,
    mirror: props.mirror,
    orientation: props.orientation,
    padding: props.padding,
    stroke: props.stroke,
    tick: props.tick,
    tickFormatter: props.tickFormatter,
    tickLine: props.tickLine,
    tickMargin: props.tickMargin,
    tickSize: props.tickSize,
    tickTextProps: props.tickTextProps,
    ticks,
    unit: props.unit,
    width: props.width,
    x: props.x,
    y: props.y,
    axisId
  }), /* @__PURE__ */ reactExports.createElement(CartesianLabelContextProvider, {
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    lowerWidth: props.width,
    upperWidth: props.width
  }, /* @__PURE__ */ reactExports.createElement(CartesianLabelFromLabelProp, {
    label: props.label,
    labelRef: props.labelRef
  }), props.children)));
});
var CartesianAxis = /* @__PURE__ */ reactExports.forwardRef((outsideProps, ref) => {
  var props = resolveDefaultProps(outsideProps, defaultCartesianAxisProps);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxisComponent, _extends$d({}, props, {
    ref
  }));
});
CartesianAxis.displayName = "CartesianAxis";
var legacyTheme = {
  grid: {
    stroke: "#ccc",
    fill: "none"
  }
};
var RechartsThemeContext = /* @__PURE__ */ reactExports.createContext(legacyTheme);
RechartsThemeContext.Provider;
var useRechartsTheme = () => reactExports.useContext(RechartsThemeContext);
var _excluded$e = ["x1", "y1", "x2", "y2", "key"], _excluded2$7 = ["offset"], _excluded3$4 = ["xAxisId", "yAxisId"], _excluded4$1 = ["xAxisId", "yAxisId"];
function ownKeys$9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$9(Object(t), true).forEach(function(r2) {
      _defineProperty$9(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$9(e, r, t) {
  return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
  var i = _toPrimitive$9(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$c() {
  return _extends$c = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$c.apply(null, arguments);
}
function _objectWithoutProperties$e(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$e(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$e(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Background = (props) => {
  var fill = props.fill;
  if (!fill || fill === "none") {
    return null;
  }
  var fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, ry = props.ry;
  return /* @__PURE__ */ reactExports.createElement("rect", {
    x,
    y,
    ry,
    width,
    height,
    stroke: "none",
    fill,
    fillOpacity,
    className: "recharts-cartesian-grid-bg"
  });
};
function LineItem(_ref2) {
  var option = _ref2.option, lineItemProps = _ref2.lineItemProps;
  var lineItem;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    lineItem = /* @__PURE__ */ reactExports.cloneElement(option, lineItemProps);
  } else if (typeof option === "function") {
    lineItem = option(lineItemProps);
  } else {
    var _svgPropertiesNoEvent;
    var x1 = lineItemProps.x1, y1 = lineItemProps.y1, x2 = lineItemProps.x2, y2 = lineItemProps.y2, key = lineItemProps.key, others = _objectWithoutProperties$e(lineItemProps, _excluded$e);
    var _ref22 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(others)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {};
    _ref22.offset;
    var restOfFilteredProps = _objectWithoutProperties$e(_ref22, _excluded2$7);
    var strokeDasharray = Array.isArray(restOfFilteredProps.strokeDasharray) ? restOfFilteredProps.strokeDasharray.join(",") : restOfFilteredProps.strokeDasharray;
    lineItem = /* @__PURE__ */ reactExports.createElement("line", _extends$c({}, restOfFilteredProps, {
      strokeDasharray,
      x1,
      y1,
      x2,
      y2,
      fill: "none",
      key
    }));
  }
  return lineItem;
}
function HorizontalGridLines(props) {
  var x = props.x, width = props.width, _props$horizontal = props.horizontal, horizontal = _props$horizontal === void 0 ? true : _props$horizontal, horizontalPoints = props.horizontalPoints;
  if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  props.xAxisId;
  props.yAxisId;
  var otherLineItemProps = _objectWithoutProperties$e(props, _excluded3$4);
  var items = horizontalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$9(_objectSpread$9({}, otherLineItemProps), {}, {
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ reactExports.createElement(LineItem, {
      key: "line-".concat(i),
      option: horizontal,
      lineItemProps
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, items);
}
function VerticalGridLines(props) {
  var y = props.y, height = props.height, _props$vertical = props.vertical, vertical = _props$vertical === void 0 ? true : _props$vertical, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalPoints || !verticalPoints.length) {
    return null;
  }
  props.xAxisId;
  props.yAxisId;
  var otherLineItemProps = _objectWithoutProperties$e(props, _excluded4$1);
  var items = verticalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$9(_objectSpread$9({}, otherLineItemProps), {}, {
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ reactExports.createElement(LineItem, {
      option: vertical,
      lineItemProps,
      key: "line-".concat(i)
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, items);
}
function HorizontalStripes(props) {
  var horizontalFill = props.horizontalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, horizontalPoints = props.horizontalPoints, _props$horizontal2 = props.horizontal, horizontal = _props$horizontal2 === void 0 ? true : _props$horizontal2;
  if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) {
    return null;
  }
  var roundedSortedHorizontalPoints = horizontalPoints.map((e) => Math.round(e + y - y)).sort((a, b) => a - b);
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map((entry, i) => {
    var nextPoint = roundedSortedHorizontalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineHeight = lastStripe ? y + height - entry : nextPoint - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      y: entry,
      x,
      height: lineHeight,
      width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, items);
}
function VerticalStripes(props) {
  var _props$vertical2 = props.vertical, vertical = _props$vertical2 === void 0 ? true : _props$vertical2, verticalFill = props.verticalFill, fillOpacity = props.fillOpacity, x = props.x, y = props.y, width = props.width, height = props.height, verticalPoints = props.verticalPoints;
  if (!vertical || !verticalFill || !verticalFill.length) {
    return null;
  }
  var roundedSortedVerticalPoints = verticalPoints.map((e) => Math.round(e + x - x)).sort((a, b) => a - b);
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map((entry, i) => {
    var nextPoint = roundedSortedVerticalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineWidth = lastStripe ? x + width - entry : nextPoint - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      x: entry,
      y,
      width: lineWidth,
      height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks) => {
  var xAxis = _ref3.xAxis, width = _ref3.width, height = _ref3.height, offset = _ref3.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, defaultCartesianAxisProps), xAxis), {}, {
    ticks: getTicksOfAxis(xAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks) => {
  var yAxis = _ref4.yAxis, width = _ref4.width, height = _ref4.height, offset = _ref4.offset;
  return getCoordinatesOfGrid(getTicks(_objectSpread$9(_objectSpread$9(_objectSpread$9({}, defaultCartesianAxisProps), yAxis), {}, {
    ticks: getTicksOfAxis(yAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: false,
  zIndex: DefaultZIndexes.grid
};
function CartesianGrid(props) {
  var _propsIncludingDefaul, _propsIncludingDefaul2, _propsIncludingDefaul3, _propsIncludingDefaul4, _propsIncludingDefaul5, _propsIncludingDefaul6;
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  var offset = useOffsetInternal();
  var propsIncludingDefaults = _objectSpread$9(_objectSpread$9({}, resolveDefaultProps(props, defaultCartesianGridProps)), {}, {
    x: isNumber(props.x) ? props.x : offset.left,
    y: isNumber(props.y) ? props.y : offset.top,
    width: isNumber(props.width) ? props.width : offset.width,
    height: isNumber(props.height) ? props.height : offset.height
  });
  var xAxisId = propsIncludingDefaults.xAxisId, yAxisId = propsIncludingDefaults.yAxisId, x = propsIncludingDefaults.x, y = propsIncludingDefaults.y, width = propsIncludingDefaults.width, height = propsIncludingDefaults.height, syncWithTicks = propsIncludingDefaults.syncWithTicks, horizontalValues = propsIncludingDefaults.horizontalValues, verticalValues = propsIncludingDefaults.verticalValues;
  var isPanorama = useIsPanorama();
  var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
  var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
  var theme = useRechartsTheme();
  var themeProps = {
    stroke: (_propsIncludingDefaul = propsIncludingDefaults.stroke) !== null && _propsIncludingDefaul !== void 0 ? _propsIncludingDefaul : theme.grid.stroke,
    strokeWidth: (_propsIncludingDefaul2 = propsIncludingDefaults.strokeWidth) !== null && _propsIncludingDefaul2 !== void 0 ? _propsIncludingDefaul2 : theme.grid.strokeWidth,
    strokeOpacity: (_propsIncludingDefaul3 = propsIncludingDefaults.strokeOpacity) !== null && _propsIncludingDefaul3 !== void 0 ? _propsIncludingDefaul3 : theme.grid.strokeOpacity,
    strokeDasharray: (_propsIncludingDefaul4 = propsIncludingDefaults.strokeDasharray) !== null && _propsIncludingDefaul4 !== void 0 ? _propsIncludingDefaul4 : theme.grid.strokeDasharray
  };
  if (!isPositiveNumber(width) || !isPositiveNumber(height) || !isNumber(x) || !isNumber(y)) {
    return null;
  }
  var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
  var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
  var horizontalPoints = propsIncludingDefaults.horizontalPoints, verticalPoints = propsIncludingDefaults.verticalPoints;
  if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
    var isHorizontalValues = horizontalValues && horizontalValues.length;
    var generatorResult = horizontalCoordinatesGenerator({
      yAxis: yAxis ? _objectSpread$9(_objectSpread$9({}, yAxis), {}, {
        ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isHorizontalValues ? true : syncWithTicks);
    warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
    if (Array.isArray(generatorResult)) {
      horizontalPoints = generatorResult;
    }
  }
  if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
    var isVerticalValues = verticalValues && verticalValues.length;
    var _generatorResult = verticalCoordinatesGenerator({
      xAxis: xAxis ? _objectSpread$9(_objectSpread$9({}, xAxis), {}, {
        ticks: isVerticalValues ? verticalValues : xAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isVerticalValues ? true : syncWithTicks);
    warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
    if (Array.isArray(_generatorResult)) {
      verticalPoints = _generatorResult;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: propsIncludingDefaults.zIndex
  }, /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ reactExports.createElement(Background, {
    fill: (_propsIncludingDefaul5 = propsIncludingDefaults.fill) !== null && _propsIncludingDefaul5 !== void 0 ? _propsIncludingDefaul5 : theme.grid.fill,
    fillOpacity: (_propsIncludingDefaul6 = propsIncludingDefaults.fillOpacity) !== null && _propsIncludingDefaul6 !== void 0 ? _propsIncludingDefaul6 : theme.grid.fillOpacity,
    x: propsIncludingDefaults.x,
    y: propsIncludingDefaults.y,
    width: propsIncludingDefaults.width,
    height: propsIncludingDefaults.height,
    ry: propsIncludingDefaults.ry
  }), /* @__PURE__ */ reactExports.createElement(HorizontalStripes, _extends$c({}, propsIncludingDefaults, {
    horizontalPoints
  })), /* @__PURE__ */ reactExports.createElement(VerticalStripes, _extends$c({}, propsIncludingDefaults, {
    verticalPoints
  })), /* @__PURE__ */ reactExports.createElement(HorizontalGridLines, _extends$c({}, propsIncludingDefaults, themeProps, {
    offset,
    horizontalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ reactExports.createElement(VerticalGridLines, _extends$c({}, propsIncludingDefaults, themeProps, {
    offset,
    verticalPoints,
    xAxis,
    yAxis
  }))));
}
CartesianGrid.displayName = "CartesianGrid";
var _excluded$d = ["animationElapsedTime", "isAnimating", "isEntrance", "visibleLength", "strokeDasharray", "connectNulls"];
function _extends$b() {
  return _extends$b = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$b.apply(null, arguments);
}
function _objectWithoutProperties$d(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$d(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$d(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function getTotalLength$1(path) {
  try {
    return path && path.getTotalLength && path.getTotalLength() || 0;
  } catch (_unused) {
    return 0;
  }
}
function generateSimpleStrokeDasharray(totalLength, length) {
  return "".concat(length, "px ").concat(totalLength, "px");
}
function normalizeDashPattern(lines) {
  return lines.length % 2 !== 0 ? [...lines, ...lines] : lines;
}
function repeat(lines, count) {
  var result = [];
  for (var i = 0; i < count; ++i) {
    result.push(...lines);
  }
  return result;
}
function getStrokeDasharray(length, totalLength, lines) {
  var normalizedLines = normalizeDashPattern(lines);
  var lineLength = normalizedLines.reduce((pre, next) => pre + next, 0);
  if (!lineLength) {
    return generateSimpleStrokeDasharray(totalLength, length);
  }
  var count = Math.floor(length / lineLength);
  var remainLength = length % lineLength;
  var remainLines = [];
  for (var i = 0, sum = 0; i < normalizedLines.length; sum += (_normalizedLines$i = normalizedLines[i]) !== null && _normalizedLines$i !== void 0 ? _normalizedLines$i : 0, ++i) {
    var _normalizedLines$i;
    var lineValue = normalizedLines[i];
    if (lineValue != null && sum + lineValue > remainLength) {
      remainLines = [...normalizedLines.slice(0, i), remainLength - sum];
      break;
    }
  }
  var emptyLines = remainLines.length % 2 === 0 ? [0, totalLength] : [totalLength];
  return [...repeat(normalizedLines, count), ...remainLines, ...emptyLines].map((line) => "".concat(line, "px")).join(", ");
}
function computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength) {
  if (userStrokeDasharray) {
    var lines = "".concat(userStrokeDasharray).split(/[,\s]+/gim).map((num) => parseFloat(num));
    return getStrokeDasharray(visibleLength, totalLength, lines);
  }
  return generateSimpleStrokeDasharray(totalLength, visibleLength);
}
function LineDrawShape(props) {
  props.animationElapsedTime;
  props.isAnimating;
  props.isEntrance;
  var visibleLength = props.visibleLength, userStrokeDasharray = props.strokeDasharray, connectNulls = props.connectNulls, curveProps = _objectWithoutProperties$d(props, _excluded$d);
  var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
  var strokeDasharray;
  if (visibleLength != null) {
    var _pathRef$current;
    var pathRef = curveProps.pathRef;
    var totalLength = getTotalLength$1((_pathRef$current = pathRef === null || pathRef === void 0 ? void 0 : pathRef.current) !== null && _pathRef$current !== void 0 ? _pathRef$current : null);
    strokeDasharray = computeAnimatedStrokeDasharray(userStrokeDasharray, totalLength, visibleLength);
  } else if (userStrokeDasharray != null) {
    strokeDasharray = String(userStrokeDasharray);
  }
  return /* @__PURE__ */ reactExports.createElement(Curve, _extends$b({}, curveProps, {
    connectNulls: finalConnectNulls,
    strokeDasharray
  }));
}
function useAnimatedLineLength(points) {
  var startingLengthRef = reactExports.useRef(0);
  var maxAnimatedLengthRef = reactExports.useRef(0);
  var reachedFullRef = reactExports.useRef(false);
  var prevPointsRef = reactExports.useRef(points);
  if (prevPointsRef.current !== points) {
    startingLengthRef.current = maxAnimatedLengthRef.current;
    prevPointsRef.current = points;
  }
  return reactExports.useCallback((animationElapsedTime, totalLength) => {
    if (reachedFullRef.current) {
      return null;
    }
    var visibleLength = Math.min(round(startingLengthRef.current + animationElapsedTime * totalLength), totalLength);
    if (animationElapsedTime > 0 && totalLength > 0) {
      maxAnimatedLengthRef.current = Math.max(maxAnimatedLengthRef.current, visibleLength);
      if (visibleLength >= totalLength) {
        reachedFullRef.current = true;
        return null;
      }
    }
    return visibleLength;
  }, []);
}
var initialState$2 = {};
var errorBarSlice = createSlice({
  name: "errorBars",
  initialState: initialState$2,
  reducers: {
    addErrorBar: (state, action) => {
      var _action$payload = action.payload, itemId = _action$payload.itemId, errorBar = _action$payload.errorBar;
      if (!state[itemId]) {
        state[itemId] = [];
      }
      state[itemId].push(errorBar);
    },
    replaceErrorBar: (state, action) => {
      var _action$payload2 = action.payload, itemId = _action$payload2.itemId, prev = _action$payload2.prev, next = _action$payload2.next;
      if (state[itemId]) {
        state[itemId] = state[itemId].map((e) => e.dataKey === prev.dataKey && e.direction === prev.direction ? next : e);
      }
    },
    removeErrorBar: (state, action) => {
      var _action$payload3 = action.payload, itemId = _action$payload3.itemId, errorBar = _action$payload3.errorBar;
      if (state[itemId]) {
        state[itemId] = state[itemId].filter((e) => e.dataKey !== errorBar.dataKey || e.direction !== errorBar.direction);
      }
    }
  }
});
var _errorBarSlice$action = errorBarSlice.actions;
_errorBarSlice$action.addErrorBar;
_errorBarSlice$action.replaceErrorBar;
_errorBarSlice$action.removeErrorBar;
var errorBarReducer = errorBarSlice.reducer;
var _excluded$c = ["children"];
function _objectWithoutProperties$c(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$c(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$c(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var initialContextState = {
  data: [],
  xAxisId: "xAxis-0",
  yAxisId: "yAxis-0",
  dataPointFormatter: () => ({
    x: 0,
    y: 0,
    value: 0
  }),
  errorBarOffset: 0
};
var ErrorBarContext = /* @__PURE__ */ reactExports.createContext(initialContextState);
function SetErrorBarContext(props) {
  var children = props.children, rest = _objectWithoutProperties$c(props, _excluded$c);
  return /* @__PURE__ */ reactExports.createElement(ErrorBarContext.Provider, {
    value: rest
  }, children);
}
function useNeedsClip(xAxisId, yAxisId) {
  var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
  var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
  var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
  var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
  var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
  var needClip = needClipX || needClipY;
  return {
    needClip,
    needClipX,
    needClipY
  };
}
function GraphicalItemClipPath(_ref2) {
  var xAxisId = _ref2.xAxisId, yAxisId = _ref2.yAxisId, clipPathId = _ref2.clipPathId;
  var plotArea = usePlotArea();
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClipX = _useNeedsClip.needClipX, needClipY = _useNeedsClip.needClipY, needClip = _useNeedsClip.needClip;
  var xAxisRange = useAppSelector((state) => selectXAxisRange(state, xAxisId, false));
  var yAxisRange = useAppSelector((state) => selectYAxisRange(state, yAxisId, false));
  if (!needClip || !plotArea) {
    return null;
  }
  var x = plotArea.x, y = plotArea.y, width = plotArea.width, height = plotArea.height;
  var clipX = needClipX && xAxisRange ? Math.min(xAxisRange[0], xAxisRange[1]) : x - width / 2;
  var clipY = needClipY && yAxisRange ? Math.min(yAxisRange[0], yAxisRange[1]) : y - height / 2;
  var clipWidth = needClipX && xAxisRange ? Math.abs(xAxisRange[1] - xAxisRange[0]) : width * 2;
  var clipHeight = needClipY && yAxisRange ? Math.abs(yAxisRange[1] - yAxisRange[0]) : height * 2;
  return /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: "clipPath-".concat(clipPathId)
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x: clipX,
    y: clipY,
    width: clipWidth,
    height: clipHeight
  }));
}
var selectXAxisWithScale$2 = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks$2 = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale$2 = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks$2 = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize$1 = createSelector([selectChartLayout, selectXAxisWithScale$2, selectYAxisWithScale$2, selectXAxisTicks$2, selectYAxisTicks$2], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickLineId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
function isLineSettings(item) {
  return item.type === "line";
}
var selectSynchronisedLineSettings = createSelector([selectUnfilteredCartesianItems, pickLineId], (graphicalItems, id) => graphicalItems.filter(isLineSettings).find((x) => x.id === id));
var selectLinePoints = createSelector([selectChartLayout, selectXAxisWithScale$2, selectYAxisWithScale$2, selectXAxisTicks$2, selectYAxisTicks$2, selectSynchronisedLineSettings, selectBandSize$1, selectChartDataWithIndexesIfNotInPanoramaPosition4], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, lineSettings, bandSize, _ref2) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (lineSettings == null || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null || layout !== "horizontal" && layout !== "vertical") {
    return void 0;
  }
  var dataKey = lineSettings.dataKey, data = lineSettings.data;
  var displayedData;
  if (data != null && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeLinePoints({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataKey,
    bandSize,
    displayedData
  });
});
function getRadiusAndStrokeWidthFromDot(dot) {
  var props = svgPropertiesNoEventsFromUnknown(dot);
  var defaultR = 3;
  var defaultStrokeWidth = 2;
  if (props != null) {
    var r = props.r, strokeWidth = props.strokeWidth;
    var realR = Number(r);
    var realStrokeWidth = Number(strokeWidth);
    if (Number.isNaN(realR) || realR < 0) {
      realR = defaultR;
    }
    if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) {
      realStrokeWidth = defaultStrokeWidth;
    }
    return {
      r: realR,
      strokeWidth: realStrokeWidth
    };
  }
  return {
    r: defaultR,
    strokeWidth: defaultStrokeWidth
  };
}
var _excluded$b = ["id"], _excluded2$6 = ["type", "layout", "connectNulls", "needClip", "shape", "strokeDasharray"], _excluded3$3 = ["activeDot", "animateNewValues", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "hide", "isAnimationActive", "label", "legendType", "xAxisId", "yAxisId", "id"];
function _extends$a() {
  return _extends$a = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$a.apply(null, arguments);
}
function _objectWithoutProperties$b(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$b(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$b(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$8(Object(t), true).forEach(function(r2) {
      _defineProperty$8(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$8(e, r, t) {
  return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
  var i = _toPrimitive$8(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getTotalLength(mainCurve) {
  try {
    return mainCurve && mainCurve.getTotalLength && mainCurve.getTotalLength() || 0;
  } catch (_unused) {
    return 0;
  }
}
function averageShift(items) {
  var total = 0;
  var count = 0;
  for (var item of items) {
    if (item.status === "matched" && item.prev.x != null && item.next.x != null) {
      total += item.next.x - item.prev.x;
      count++;
    }
  }
  return count > 0 ? total / count : 0;
}
var defaultLineAnimateItems = (items, animationElapsedTime) => {
  if (items == null) {
    return [];
  }
  if (animationElapsedTime === 1) return items.flatMap((item2) => item2.status === "removed" ? [] : [item2.next]);
  var shift = averageShift(items);
  var result = [];
  for (var item of items) {
    if (item.status === "matched") {
      result.push(_objectSpread$8(_objectSpread$8({}, item.next), {}, {
        x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
      }));
    } else if (item.status === "added") {
      if (item.next.x != null) {
        var entryX = item.next.x - shift;
        result.push(_objectSpread$8(_objectSpread$8({}, item.next), {}, {
          x: interpolate(entryX, item.next.x, animationElapsedTime),
          y: item.next.y
        }));
      } else {
        result.push(item.next);
      }
    } else if (item.status === "removed") {
      if (item.prev.x != null) {
        var exitX = item.prev.x + shift;
        result.push(_objectSpread$8(_objectSpread$8({}, item.prev), {}, {
          x: interpolate(item.prev.x, exitX, animationElapsedTime),
          y: item.prev.y
        }));
      }
    }
  }
  return result;
};
var defaultLineProps = {
  activeDot: true,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: defaultLineAnimateItems,
  animationMatchBy: matchByIndex,
  connectNulls: false,
  dot: true,
  fill: "#fff",
  hide: false,
  isAnimationActive: "auto",
  label: false,
  legendType: "line",
  shape: LineDrawShape,
  stroke: "#3182bd",
  strokeWidth: 1,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.line,
  type: "linear"
};
var computeLegendPayloadFromAreaData$1 = (props) => {
  var dataKey = props.dataKey, name = props.name, stroke = props.stroke, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: stroke,
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetLineTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, data = _ref2.data, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: data,
    getPosition: noop$1,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: stroke,
      unit,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function LineDotsWrapper(_ref2) {
  var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
  var dot = props.dot, dataKey = props.dataKey, needClip = props.needClip;
  props.id;
  var propsWithoutId = _objectWithoutProperties$b(props, _excluded$b);
  var lineProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ reactExports.createElement(Dots, {
    points,
    dot,
    className: "recharts-line-dots",
    dotClassName: "recharts-line-dot",
    dataKey,
    baseProps: lineProps,
    needClip,
    clipPathId
  });
}
function LineLabelListProvider(_ref3) {
  var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
  var labelListEntries = reactExports.useMemo(() => {
    return points === null || points === void 0 ? void 0 : points.map((point) => {
      var _point$x, _point$y;
      var viewBox = {
        x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
        y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
        width: 0,
        lowerWidth: 0,
        upperWidth: 0,
        height: 0
      };
      return _objectSpread$8(_objectSpread$8({}, viewBox), {}, {
        value: point.value,
        payload: point.payload,
        viewBox,
        /*
         * Line is not passing parentViewBox to the LabelList so the labels can escape - looks like a bug, should we pass parentViewBox?
         * Or should this just be the root chart viewBox?
         */
        parentViewBox: void 0,
        fill: void 0
      });
    });
  }, [points]);
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function StaticCurve(_ref4) {
  var clipPathId = _ref4.clipPathId, pathRef = _ref4.pathRef, points = _ref4.points, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance, visibleLength = _ref4.visibleLength;
  var type = props.type, layout = props.layout, connectNulls = props.connectNulls, needClip = props.needClip, shape = props.shape, strokeDasharray = props.strokeDasharray, others = _objectWithoutProperties$b(props, _excluded2$6);
  var curveProps = _objectSpread$8(_objectSpread$8({}, svgPropertiesAndEvents(others)), {}, {
    fill: "none",
    className: "recharts-line-curve",
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0,
    points,
    type,
    layout,
    connectNulls,
    strokeDasharray: strokeDasharray !== null && strokeDasharray !== void 0 ? strokeDasharray : props.strokeDasharray,
    pathRef,
    animationElapsedTime,
    isAnimating,
    isEntrance: props.animateNewValues ? isEntrance : false,
    visibleLength
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ reactExports.createElement(Shape, {
    option: shape,
    DefaultShape: defaultLineProps.shape,
    shapeProps: curveProps
  }), /* @__PURE__ */ reactExports.createElement(LineDotsWrapper, {
    points,
    clipPathId,
    props
  }));
}
function CurveWithAnimation(_ref5) {
  var clipPathId = _ref5.clipPathId, props = _ref5.props, pathRef = _ref5.pathRef, previousPointsRef = _ref5.previousPointsRef;
  var points = props.points, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
  var totalLength = getTotalLength(pathRef.current);
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var showLabels = !isAnimating;
  var getVisibleLength = useAnimatedLineLength(points);
  var shouldUpdatePreviousRef = reactExports.useCallback((animationElapsedTime) => animationElapsedTime > 0 && totalLength > 0, [totalLength]);
  return /* @__PURE__ */ reactExports.createElement(LineLabelListProvider, {
    points,
    showLabels
  }, props.children, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: points,
    animationIdPrefix: "recharts-line-",
    items: points,
    previousItemsRef: previousPointsRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy,
    shouldUpdatePreviousRef,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => {
    var animationActive = isAnimating || animationElapsedTime < 1;
    var visibleLength = animationActive ? getVisibleLength(animationElapsedTime, totalLength) : null;
    return /* @__PURE__ */ reactExports.createElement(StaticCurve, {
      props,
      points: stepData,
      clipPathId,
      pathRef,
      animationElapsedTime,
      isAnimating: animationActive,
      isEntrance,
      visibleLength
    });
  }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }));
}
function RenderCurve(_ref6) {
  var clipPathId = _ref6.clipPathId, props = _ref6.props;
  var previousPointsRef = reactExports.useRef(null);
  var pathRef = reactExports.useRef(null);
  return /* @__PURE__ */ reactExports.createElement(CurveWithAnimation, {
    props,
    clipPathId,
    previousPointsRef,
    pathRef
  });
}
var errorBarDataPointFormatter$1 = (dataPoint, dataKey) => {
  var _dataPoint$x, _dataPoint$y;
  return {
    x: (_dataPoint$x = dataPoint.x) !== null && _dataPoint$x !== void 0 ? _dataPoint$x : void 0,
    y: (_dataPoint$y = dataPoint.y) !== null && _dataPoint$y !== void 0 ? _dataPoint$y : void 0,
    value: dataPoint.value,
    // getValueByDataKey does not validate the output type
    errorVal: getValueByDataKey(dataPoint.payload, dataKey)
  };
};
class LineWithState extends reactExports.Component {
  render() {
    var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, top = _this$props.top, left = _this$props.left, width = _this$props.width, height = _this$props.height, id = _this$props.id, needClip = _this$props.needClip, zIndex = _this$props.zIndex;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-line", className);
    var clipPathId = id;
    var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
    var clipDot = isClipDot(dot);
    var dotSize = r * 2 + strokeWidth;
    var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex
    }, /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ reactExports.createElement(SetErrorBarContext, {
      xAxisId,
      yAxisId,
      data: points,
      dataPointFormatter: errorBarDataPointFormatter$1,
      errorBarOffset: 0
    }, /* @__PURE__ */ reactExports.createElement(RenderCurve, {
      props: this.props,
      clipPathId
    }))), /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      activeDot: this.props.activeDot,
      points,
      mainColor: this.props.stroke,
      itemDataKey: this.props.dataKey,
      clipPath: activePointsClipPath
    }));
  }
}
function LineImpl(props) {
  var _resolveDefaultProps = resolveDefaultProps(props, defaultLineProps), activeDot = _resolveDefaultProps.activeDot, animateNewValues = _resolveDefaultProps.animateNewValues, animationBegin = _resolveDefaultProps.animationBegin, animationDuration = _resolveDefaultProps.animationDuration, animationEasing = _resolveDefaultProps.animationEasing, connectNulls = _resolveDefaultProps.connectNulls, dot = _resolveDefaultProps.dot, hide = _resolveDefaultProps.hide, isAnimationActive = _resolveDefaultProps.isAnimationActive, label = _resolveDefaultProps.label, legendType = _resolveDefaultProps.legendType, xAxisId = _resolveDefaultProps.xAxisId, yAxisId = _resolveDefaultProps.yAxisId, id = _resolveDefaultProps.id, everythingElse = _objectWithoutProperties$b(_resolveDefaultProps, _excluded3$3);
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var plotArea = usePlotArea();
  var layout = useChartLayout();
  var isPanorama = useIsPanorama();
  var points = useAppSelector((state) => selectLinePoints(state, xAxisId, yAxisId, isPanorama, id));
  if (layout !== "horizontal" && layout !== "vertical" || points == null || plotArea == null) {
    return null;
  }
  var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
  return /* @__PURE__ */ reactExports.createElement(LineWithState, _extends$a({}, everythingElse, {
    id,
    connectNulls,
    dot,
    activeDot,
    animateNewValues,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive,
    hide,
    label,
    legendType,
    xAxisId,
    yAxisId,
    points,
    layout,
    height,
    width,
    left,
    top,
    needClip
  }));
}
function computeLinePoints(_ref7) {
  var layout = _ref7.layout, xAxis = _ref7.xAxis, yAxis = _ref7.yAxis, xAxisTicks = _ref7.xAxisTicks, yAxisTicks = _ref7.yAxisTicks, dataKey = _ref7.dataKey, bandSize = _ref7.bandSize, displayedData = _ref7.displayedData;
  return displayedData.map((entry, index) => {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      var _x = getCateCoordinateOfLine({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize,
        entry,
        index
      });
      var _y = isNullish(value) ? null : yAxis.scale.map(value);
      return {
        x: _x,
        y: _y !== null && _y !== void 0 ? _y : null,
        value,
        payload: entry
      };
    }
    var x = isNullish(value) ? null : xAxis.scale.map(value);
    var y = getCateCoordinateOfLine({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize,
      entry,
      index
    });
    if (x == null || y == null) {
      return null;
    }
    return {
      x,
      y,
      value,
      payload: entry
    };
  }).filter(Boolean);
}
function LineFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultLineProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "line"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData$1(props)
  }), /* @__PURE__ */ reactExports.createElement(SetLineTooltipEntrySettings, {
    dataKey: props.dataKey,
    data: props.data,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "line",
    id,
    data: props.data,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    dataKey: props.dataKey,
    hide: props.hide,
    isPanorama
  }), /* @__PURE__ */ reactExports.createElement(LineImpl, _extends$a({}, props, {
    id
  }))));
}
var Line = /* @__PURE__ */ reactExports.memo(LineFn, propsAreEqual);
Line.displayName = "Line";
function selectXAxisIdFromGraphicalItemId(state, id) {
  var _state$graphicalItems, _state$graphicalItems2;
  return (_state$graphicalItems = (_state$graphicalItems2 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems2 === void 0 ? void 0 : _state$graphicalItems2.xAxisId) !== null && _state$graphicalItems !== void 0 ? _state$graphicalItems : defaultAxisId;
}
function selectYAxisIdFromGraphicalItemId(state, id) {
  var _state$graphicalItems3, _state$graphicalItems4;
  return (_state$graphicalItems3 = (_state$graphicalItems4 = state.graphicalItems.cartesianItems.find((item) => item.id === id)) === null || _state$graphicalItems4 === void 0 ? void 0 : _state$graphicalItems4.yAxisId) !== null && _state$graphicalItems3 !== void 0 ? _state$graphicalItems3 : defaultAxisId;
}
var selectXAxisWithScale$1 = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectXAxisTicks$1 = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisWithScale$1 = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisTicks$1 = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectBandSize = createSelector([selectChartLayout, selectXAxisWithScale$1, selectYAxisWithScale$1, selectXAxisTicks$1, selectYAxisTicks$1], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectNumericalAxisType = (state) => {
  var layout = selectChartLayout(state);
  var isXAxisCategorical = isCategoricalAxis(layout, "xAxis");
  return isXAxisCategorical ? "yAxis" : "xAxis";
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId) => {
  var axisType = selectNumericalAxisType(state);
  if (axisType === "yAxis") {
    return selectYAxisIdFromGraphicalItemId(state, graphicalItemId);
  }
  return selectXAxisIdFromGraphicalItemId(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama) => selectStackGroups(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
  var _stackGroups$stackId;
  if (areaSettings == null || stackGroups == null) {
    return void 0;
  }
  var stackId = areaSettings.stackId;
  var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
  if (stackId == null || stackSeriesIdentifier == null) {
    return void 0;
  }
  var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
  var found = groups === null || groups === void 0 ? void 0 : groups.find((v) => v.key === stackSeriesIdentifier);
  if (found == null) {
    return void 0;
  }
  return found.map((item) => [item[0], item[1]]);
});
var selectStackDataKeys = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
  if (areaSettings == null || areaSettings.stackId == null || stackGroups == null) {
    return void 0;
  }
  var group = stackGroups[areaSettings.stackId];
  if (group == null) {
    return void 0;
  }
  return group.graphicalItems.map((item) => item.dataKey).filter(isNotNil);
});
var selectArea = createSelector([selectChartLayout, selectXAxisWithScale$1, selectYAxisWithScale$1, selectXAxisTicks$1, selectYAxisTicks$1, selectGraphicalItemStackedData, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectBandSize, selectSynchronisedAreaSettings, selectChartBaseValue, selectStackDataKeys], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref2, bandSize, areaSettings, chartBaseValue, stackDataKeys) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
    return void 0;
  }
  var data = areaSettings.data;
  var displayedData;
  if (data && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeArea({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataStartIndex,
    areaSettings,
    stackedData,
    displayedData,
    chartBaseValue,
    bandSize,
    stackDataKeys
  });
});
var _excluded$a = ["animationElapsedTime", "isAnimating", "isEntrance", "layout", "isRange", "stroke", "connectNulls"], _excluded2$5 = ["id", "baseLine"];
function _extends$9() {
  return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$9.apply(null, arguments);
}
function _objectWithoutProperties$a(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$a(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$a(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function HorizontalClipRect(_ref2) {
  var _points$, _points;
  var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
  var startX = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.x;
  var endX = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.x;
  if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) {
    return null;
  }
  var width = alpha * Math.abs(startX - endX);
  var maxY = Math.max(...points.map((entry) => entry.y || 0));
  if (isNumber(baseLine)) {
    maxY = Math.max(baseLine, maxY);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
  }
  if (isNumber(maxY)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: startX < endX ? startX : startX - width,
      y: 0,
      width,
      height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
    });
  }
  return null;
}
function VerticalClipRect(_ref2) {
  var _points$2, _points2;
  var alpha = _ref2.alpha, baseLine = _ref2.baseLine, points = _ref2.points, strokeWidth = _ref2.strokeWidth;
  var startY = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.y;
  var endY = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.y;
  if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) {
    return null;
  }
  var height = alpha * Math.abs(startY - endY);
  var maxX = Math.max(...points.map((entry) => entry.x || 0));
  if (isNumber(baseLine)) {
    maxX = Math.max(baseLine, maxX);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
  }
  if (isNumber(maxX)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: 0,
      y: startY < endY ? startY : startY - height,
      width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
      height: Math.floor(height)
    });
  }
  return null;
}
function RevealClipRect(_ref3) {
  var alpha = _ref3.alpha, layout = _ref3.layout, points = _ref3.points, baseLine = _ref3.baseLine, strokeWidth = _ref3.strokeWidth;
  if (layout === "vertical") {
    return /* @__PURE__ */ reactExports.createElement(VerticalClipRect, {
      alpha,
      points,
      baseLine,
      strokeWidth
    });
  }
  return /* @__PURE__ */ reactExports.createElement(HorizontalClipRect, {
    alpha,
    points,
    baseLine,
    strokeWidth
  });
}
function AreaRevealShape(props) {
  var _props$animationElaps = props.animationElapsedTime, animationElapsedTime = _props$animationElaps === void 0 ? 1 : _props$animationElaps, _props$isAnimating = props.isAnimating, isAnimating = _props$isAnimating === void 0 ? false : _props$isAnimating, _props$isEntrance = props.isEntrance, isEntrance = _props$isEntrance === void 0 ? false : _props$isEntrance, layoutProp = props.layout, isRange = props.isRange, stroke = props.stroke, connectNulls = props.connectNulls, restProps = _objectWithoutProperties$a(props, _excluded$a);
  var layout = layoutProp === "vertical" ? "vertical" : "horizontal";
  var finalConnectNulls = connectNulls !== null && connectNulls !== void 0 ? connectNulls : false;
  var clipId = useId();
  var id = restProps.id, baseLine = restProps.baseLine, propsWithoutIdBaseline = _objectWithoutProperties$a(restProps, _excluded2$5);
  var strokeSvgProps = svgPropertiesNoEvents(propsWithoutIdBaseline);
  var fillCurve = /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, restProps, {
    id,
    baseLine,
    connectNulls: finalConnectNulls,
    stroke: "none",
    className: "recharts-area-area",
    layout
  }));
  var strokeCurve = stroke !== "none" && /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, strokeSvgProps, {
    className: "recharts-area-curve",
    layout,
    type: restProps.type,
    connectNulls: finalConnectNulls,
    fill: "none",
    stroke,
    points: restProps.points
  }));
  var baselineCurve = stroke !== "none" && isRange && Array.isArray(baseLine) && /* @__PURE__ */ reactExports.createElement(Curve, _extends$9({}, strokeSvgProps, {
    className: "recharts-area-curve",
    layout,
    type: restProps.type,
    connectNulls: finalConnectNulls,
    fill: "none",
    stroke,
    points: baseLine
  }));
  if (isEntrance && (isAnimating || animationElapsedTime < 1)) {
    var _restProps$points;
    return /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: clipId
    }, /* @__PURE__ */ reactExports.createElement(RevealClipRect, {
      alpha: animationElapsedTime,
      points: (_restProps$points = restProps.points) !== null && _restProps$points !== void 0 ? _restProps$points : [],
      baseLine,
      layout,
      strokeWidth: restProps.strokeWidth
    }))), /* @__PURE__ */ reactExports.createElement(Layer, {
      clipPath: "url(#".concat(clipId, ")")
    }, fillCurve, strokeCurve, baselineCurve));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, fillCurve, strokeCurve, baselineCurve);
}
var _excluded$9 = ["id"], _excluded2$4 = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function _extends$8() {
  return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$8.apply(null, arguments);
}
function _objectWithoutProperties$9(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$7(Object(t), true).forEach(function(r2) {
      _defineProperty$7(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$7(e, r, t) {
  return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultAreaAnimateItems = (items, animationElapsedTime) => {
  if (items == null) {
    return [];
  }
  if (animationElapsedTime === 1) {
    return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
  }
  return items.flatMap((item) => {
    if (item.status === "matched") {
      return [_objectSpread$7(_objectSpread$7({}, item.next), {}, {
        x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate(item.prev.y, item.next.y, animationElapsedTime)
      })];
    }
    if (item.status === "added") {
      return [item.next];
    }
    return [];
  });
};
var defaultAreaProps = {
  activeDot: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  animationMatchBy: matchByIndex,
  animationInterpolateFn: defaultAreaAnimateItems,
  connectNulls: false,
  dot: false,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: false,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: false,
  shape: AreaRevealShape,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.area
};
function getLegendItemColor(stroke, fill) {
  return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
  var dataKey = props.dataKey, name = props.name, stroke = props.stroke, fill = props.fill, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: getLegendItemColor(stroke, fill),
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetAreaTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, data = _ref2.data, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: data,
    getPosition: noop$1,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: getLegendItemColor(stroke, fill),
      unit,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function AreaDotsWrapper(_ref2) {
  var clipPathId = _ref2.clipPathId, points = _ref2.points, props = _ref2.props;
  var needClip = props.needClip, dot = props.dot, dataKey = props.dataKey;
  var areaProps = svgPropertiesNoEvents(props);
  return /* @__PURE__ */ reactExports.createElement(Dots, {
    points,
    dot,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey,
    baseProps: areaProps,
    needClip,
    clipPathId
  });
}
function AreaLabelListProvider(_ref3) {
  var showLabels = _ref3.showLabels, children = _ref3.children, points = _ref3.points;
  var labelListEntries = points.map((point) => {
    var _point$x, _point$y;
    var viewBox = {
      x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
      y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return _objectSpread$7(_objectSpread$7({}, viewBox), {}, {
      value: point.value,
      payload: point.payload,
      parentViewBox: void 0,
      viewBox,
      fill: void 0
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function StaticArea(_ref4) {
  var points = _ref4.points, baseLine = _ref4.baseLine, needClip = _ref4.needClip, clipPathId = _ref4.clipPathId, props = _ref4.props, animationElapsedTime = _ref4.animationElapsedTime, isAnimating = _ref4.isAnimating, isEntrance = _ref4.isEntrance;
  var layout = props.layout, type = props.type, stroke = props.stroke, connectNulls = props.connectNulls, isRange = props.isRange, shape = props.shape;
  var id = props.id, propsWithoutId = _objectWithoutProperties$9(props, _excluded$9);
  var propsWithEvents = svgPropertiesAndEvents(propsWithoutId);
  var curveProps = _objectSpread$7(_objectSpread$7({}, propsWithEvents), {}, {
    id,
    points,
    connectNulls,
    type,
    baseLine,
    layout,
    stroke,
    isRange,
    animationElapsedTime,
    isAnimating,
    isEntrance
  });
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ reactExports.createElement(Layer, {
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
  }, /* @__PURE__ */ reactExports.createElement(Shape, {
    option: shape,
    DefaultShape: defaultAreaProps.shape,
    shapeProps: curveProps
  })), /* @__PURE__ */ reactExports.createElement(AreaDotsWrapper, {
    points,
    props: propsWithoutId,
    clipPathId
  }));
}
function interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime) {
  if (isNumber(baseLine)) {
    var previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
    return interpolate(previousNumberBaseLine, baseLine, animationElapsedTime);
  }
  if (isNullish(baseLine) || isNan(baseLine)) {
    var _previousNumberBaseLine = isNumber(prevBaseLine) ? prevBaseLine : void 0;
    return interpolate(_previousNumberBaseLine, 0, animationElapsedTime);
  }
  return baseLine;
}
function AreaWithAnimation(_ref5) {
  var needClip = _ref5.needClip, clipPathId = _ref5.clipPathId, props = _ref5.props, previousPointsRef = _ref5.previousPointsRef, previousBaselineRef = _ref5.previousBaselineRef;
  var points = props.points, baseLine = props.baseLine, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationMatchBy = props.animationMatchBy, animationInterpolateFn = props.animationInterpolateFn;
  var animationInput = reactExports.useMemo(() => ({
    points,
    baseLine
  }), [points, baseLine]);
  var baseLineAnimationState = useAnimationStartSnapshot(animationInput, previousBaselineRef);
  var layout = useCartesianChartLayout();
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  var prevBaseLine = baseLineAnimationState.startValue;
  if (layout == null) {
    return null;
  }
  var baseLineAnimationItems;
  if (Array.isArray(baseLine) && Array.isArray(prevBaseLine)) {
    baseLineAnimationItems = matchAnimationItems(prevBaseLine, baseLine, animationMatchBy);
  } else if (Array.isArray(baseLine)) {
    baseLineAnimationItems = matchAnimationItems(null, baseLine, animationMatchBy);
  } else {
    baseLineAnimationItems = null;
  }
  return /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput,
    animationIdPrefix: "recharts-area-",
    items: points,
    previousItemsRef: previousPointsRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy,
    layout
  }, (stepPoints, animationElapsedTime, isEntrance) => {
    var stepBaseLine;
    if (animationElapsedTime === 1) {
      stepBaseLine = baseLine;
    } else if (Array.isArray(baseLine)) {
      stepBaseLine = animationInterpolateFn(baseLineAnimationItems, animationElapsedTime, layout);
    } else {
      stepBaseLine = isEntrance ? baseLine : interpolateScalarBaseLine(baseLine, prevBaseLine, animationElapsedTime);
    }
    baseLineAnimationState.syncStepValue(stepBaseLine, animationElapsedTime);
    return /* @__PURE__ */ reactExports.createElement(AreaLabelListProvider, {
      showLabels: !isAnimating,
      points
    }, props.children, /* @__PURE__ */ reactExports.createElement(StaticArea, {
      points: stepPoints,
      baseLine: stepBaseLine,
      needClip,
      clipPathId,
      props,
      animationElapsedTime,
      isAnimating: isAnimating || animationElapsedTime < 1,
      isEntrance
    }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
      label: props.label
    }));
  });
}
function RenderArea(_ref6) {
  var needClip = _ref6.needClip, clipPathId = _ref6.clipPathId, props = _ref6.props;
  var previousPointsRef = reactExports.useRef(null);
  var previousBaselineRef = reactExports.useRef();
  return /* @__PURE__ */ reactExports.createElement(AreaWithAnimation, {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  });
}
class AreaWithState extends reactExports.PureComponent {
  render() {
    var _this$props = this.props, hide = _this$props.hide, dot = _this$props.dot, points = _this$props.points, className = _this$props.className, top = _this$props.top, left = _this$props.left, needClip = _this$props.needClip, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, width = _this$props.width, height = _this$props.height, id = _this$props.id, baseLine = _this$props.baseLine, zIndex = _this$props.zIndex;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-area", className);
    var clipPathId = id;
    var _getRadiusAndStrokeWi = getRadiusAndStrokeWidthFromDot(dot), r = _getRadiusAndStrokeWi.r, strokeWidth = _getRadiusAndStrokeWi.strokeWidth;
    var clipDot = isClipDot(dot);
    var dotSize = r * 2 + strokeWidth;
    var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex
    }, /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ reactExports.createElement(RenderArea, {
      needClip,
      clipPathId,
      props: this.props
    })), /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }), this.props.isRange && Array.isArray(baseLine) && /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points: baseLine,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }));
  }
}
function AreaImpl(props) {
  var _useAppSelector;
  var activeDot = props.activeDot, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, connectNulls = props.connectNulls, dot = props.dot, fill = props.fill, fillOpacity = props.fillOpacity, hide = props.hide, isAnimationActive = props.isAnimationActive, legendType = props.legendType, stroke = props.stroke, xAxisId = props.xAxisId, yAxisId = props.yAxisId, everythingElse = _objectWithoutProperties$9(props, _excluded2$4);
  var layout = useChartLayout();
  var chartName = useChartName();
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var isPanorama = useIsPanorama();
  var _ref7 = (_useAppSelector = useAppSelector((state) => selectArea(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {}, points = _ref7.points, isRange = _ref7.isRange, baseLine = _ref7.baseLine;
  var plotArea = usePlotArea();
  if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) {
    return null;
  }
  if (chartName !== "AreaChart" && chartName !== "ComposedChart") {
    return null;
  }
  var height = plotArea.height, width = plotArea.width, left = plotArea.x, top = plotArea.y;
  if (!points || !points.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(AreaWithState, _extends$8({}, everythingElse, {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    baseLine,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    height,
    hide,
    layout,
    isAnimationActive,
    isRange,
    legendType,
    needClip,
    points,
    stroke,
    width,
    left,
    top,
    xAxisId,
    yAxisId
  }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue)) {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
};
function computeArea(_ref8) {
  var _ref8$areaSettings = _ref8.areaSettings, connectNulls = _ref8$areaSettings.connectNulls, itemBaseValue = _ref8$areaSettings.baseValue, dataKey = _ref8$areaSettings.dataKey, stackedData = _ref8.stackedData, layout = _ref8.layout, chartBaseValue = _ref8.chartBaseValue, xAxis = _ref8.xAxis, yAxis = _ref8.yAxis, displayedData = _ref8.displayedData, dataStartIndex = _ref8.dataStartIndex, xAxisTicks = _ref8.xAxisTicks, yAxisTicks = _ref8.yAxisTicks, bandSize = _ref8.bandSize, stackDataKeys = _ref8.stackDataKeys;
  var hasStack = stackedData && stackedData.length;
  var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map((entry, index) => {
    var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
    var valueAsArray;
    if (hasStack) {
      valueAsArray = stackedData[dataStartIndex + index];
    } else {
      var _rawValue = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(_rawValue)) {
        valueAsArray = [baseValue, _rawValue];
      } else {
        valueAsArray = _rawValue;
        isRange = true;
      }
    }
    var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
    var rawValue = getValueByDataKey(entry, dataKey);
    var wholeStackIsNull = hasStack && rawValue == null && stackDataKeys != null && stackDataKeys.length > 0 && stackDataKeys.every((key) => getValueByDataKey(entry, key) == null);
    var isBreakPoint = value1 == null || hasStack && !connectNulls && rawValue == null || wholeStackIsNull;
    if (isHorizontalLayout) {
      var _yAxis$scale$map;
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
        value: valueAsArray,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value: valueAsArray,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map((entry) => {
      var _xAxis$scale$map2;
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        var _yAxis$scale$map2;
        return {
          x: entry.x,
          y: x != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
          payload: entry.payload
        };
      }
      return {
        x: x != null ? (_xAxis$scale$map2 = xAxis.scale.map(x)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
        y: entry.y,
        payload: entry.payload
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
  }
  return {
    points,
    baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
    isRange
  };
}
function AreaFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultAreaProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "area"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetAreaTooltipEntrySettings, {
    dataKey: props.dataKey,
    data: props.data,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "area",
    id,
    data: props.data,
    dataKey: props.dataKey,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    stackId: getNormalizedStackId(props.stackId),
    hide: props.hide,
    barSize: void 0,
    baseValue: props.baseValue,
    isPanorama,
    connectNulls: props.connectNulls
  }), /* @__PURE__ */ reactExports.createElement(AreaImpl, _extends$8({}, props, {
    id
  }))));
}
var Area = /* @__PURE__ */ reactExports.memo(AreaFn, propsAreEqual);
Area.displayName = "Area";
var _excluded$8 = ["option"];
function _objectWithoutProperties$8(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var defaultBarShape = Rectangle;
function BarRectangle(_ref2) {
  var option = _ref2.option, shapeProps = _objectWithoutProperties$8(_ref2, _excluded$8);
  return /* @__PURE__ */ reactExports.createElement(Shape, {
    option,
    DefaultShape: defaultBarShape,
    shapeProps,
    activeClassName: "recharts-active-bar",
    inActiveClassName: "recharts-inactive-bar"
  });
}
var minPointSizeCallback = function minPointSizeCallback2(minPointSize) {
  var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (value, index) => {
    if (isNumber(minPointSize)) return minPointSize;
    var isValueNumberOrNil = isNumber(value) || isNullish(value);
    if (isValueNumberOrNil) {
      return minPointSize(value, index);
    }
    !isValueNumberOrNil ? invariant() : void 0;
    return defaultValue;
  };
};
var pickIsPanorama = (_state, _id, isPanorama) => isPanorama;
var pickBarId = (_state, id) => id;
var selectSynchronisedBarSettings = createSelector([selectUnfilteredCartesianItems, pickBarId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "bar").find((item) => item.id === id));
var selectMaxBarSize = createSelector([selectSynchronisedBarSettings], (barSettings) => barSettings === null || barSettings === void 0 ? void 0 : barSettings.maxBarSize);
var pickCells = (_state, _id, _isPanorama, cells) => cells;
var selectAllVisibleBars = createSelector([selectChartLayout, selectUnfilteredCartesianItems, selectXAxisIdFromGraphicalItemId, selectYAxisIdFromGraphicalItemId, pickIsPanorama], (layout, allItems, xAxisId, yAxisId, isPanorama) => allItems.filter((i) => {
  if (layout === "horizontal") {
    return i.xAxisId === xAxisId;
  }
  return i.yAxisId === yAxisId;
}).filter((i) => i.isPanorama === isPanorama).filter((i) => i.hide === false).filter((i) => i.type === "bar"));
var selectBarStackGroups = (state, id, isPanorama) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  if (layout === "horizontal") {
    return selectStackGroups(state, "yAxis", yAxisId, isPanorama);
  }
  return selectStackGroups(state, "xAxis", xAxisId, isPanorama);
};
var selectBarCartesianAxisSize = (state, id) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  if (layout === "horizontal") {
    return selectCartesianAxisSize(state, "xAxis", xAxisId);
  }
  return selectCartesianAxisSize(state, "yAxis", yAxisId);
};
var selectBarSizeList = createSelector([selectAllVisibleBars, selectRootBarSize, selectBarCartesianAxisSize], combineBarSizeList);
var selectBarBandSize = (state, id, isPanorama) => {
  var _ref2, _getBandSizeOfAxis;
  var barSettings = selectSynchronisedBarSettings(state, id);
  if (barSettings == null) {
    return 0;
  }
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return 0;
  }
  var layout = selectChartLayout(state);
  var globalMaxBarSize = selectRootMaxBarSize(state);
  var childMaxBarSize = barSettings.maxBarSize;
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var axis, ticks;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return (_ref2 = (_getBandSizeOfAxis = getBandSizeOfAxis(axis, ticks, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref2 !== void 0 ? _ref2 : 0;
};
var selectAxisBandSize = (state, id, isPanorama) => {
  var layout = selectChartLayout(state);
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null || yAxisId == null) {
    return void 0;
  }
  var axis, ticks;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return getBandSizeOfAxis(axis, ticks);
};
var selectAllBarPositions = createSelector([selectBarSizeList, selectRootMaxBarSize, selectBarGap, selectBarCategoryGap, selectBarBandSize, selectAxisBandSize, selectMaxBarSize], combineAllBarPositions);
var selectXAxisWithScale = (state, id, isPanorama) => {
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null) {
    return void 0;
  }
  return selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisWithScale = (state, id, isPanorama) => {
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (yAxisId == null) {
    return void 0;
  }
  return selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
};
var selectXAxisTicks = (state, id, isPanorama) => {
  var xAxisId = selectXAxisIdFromGraphicalItemId(state, id);
  if (xAxisId == null) {
    return void 0;
  }
  return selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
};
var selectYAxisTicks = (state, id, isPanorama) => {
  var yAxisId = selectYAxisIdFromGraphicalItemId(state, id);
  if (yAxisId == null) {
    return void 0;
  }
  return selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
};
var selectBarPosition = createSelector([selectAllBarPositions, selectSynchronisedBarSettings], combineBarPosition);
var selectStackedDataOfItem = createSelector([selectBarStackGroups, selectSynchronisedBarSettings], combineStackedData);
var selectBarRectangles = createSelector([selectChartOffsetInternal, selectAxisViewBox, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks, selectBarPosition, selectChartLayout, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectAxisBandSize, selectStackedDataOfItem, selectSynchronisedBarSettings, pickCells], (offset, axisViewBox, xAxis, yAxis, xAxisTicks, yAxisTicks, pos, layout, _ref2, bandSize, stackedData, barSettings, cells) => {
  var chartData = _ref2.chartData, dataStartIndex = _ref2.dataStartIndex, dataEndIndex = _ref2.dataEndIndex;
  if (barSettings == null || pos == null || axisViewBox == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || bandSize == null) {
    return void 0;
  }
  var data = barSettings.data;
  var displayedData;
  if (data != null && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeBarRectangles({
    layout,
    barSettings,
    pos,
    parentViewBox: axisViewBox,
    bandSize,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    stackedData,
    displayedData,
    offset,
    cells,
    dataStartIndex
  });
});
var _excluded$7 = ["index"];
function _extends$7() {
  return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$7.apply(null, arguments);
}
function _objectWithoutProperties$7(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var BarStackContext = /* @__PURE__ */ reactExports.createContext(void 0);
var useStackId = (childStackId) => {
  var stackSettings = reactExports.useContext(BarStackContext);
  if (stackSettings != null) {
    return stackSettings.stackId;
  }
  if (childStackId == null) {
    return void 0;
  }
  return getNormalizedStackId(childStackId);
};
var getClipPathId = (stackId, index) => {
  return "recharts-bar-stack-clip-path-".concat(stackId, "-").concat(index);
};
var useBarStackClipPathUrl = (index) => {
  var barStackContext = reactExports.useContext(BarStackContext);
  if (barStackContext == null) {
    return void 0;
  }
  var stackId = barStackContext.stackId;
  return "url(#".concat(getClipPathId(stackId, index), ")");
};
var BarStackClipLayer = (_ref2) => {
  var index = _ref2.index, rest = _objectWithoutProperties$7(_ref2, _excluded$7);
  var clipPathUrl = useBarStackClipPathUrl(index);
  return /* @__PURE__ */ reactExports.createElement(Layer, _extends$7({
    className: "recharts-bar-stack-layer",
    clipPath: clipPathUrl
  }, rest));
};
var _excluded$6 = ["onMouseEnter", "onMouseLeave", "onClick"], _excluded2$3 = ["value", "background", "tooltipPosition"], _excluded3$2 = ["id"], _excluded4 = ["onMouseEnter", "onClick", "onMouseLeave"];
function _slicedToArray$2(r, e) {
  return _arrayWithHoles$2(r) || _iterableToArrayLimit$2(r, e) || _unsupportedIterableToArray$2(r, e) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$2(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$2(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$2(r, a) : void 0;
  }
}
function _arrayLikeToArray$2(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$2(r) {
  if (Array.isArray(r)) return r;
}
function _extends$6() {
  return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$6.apply(null, arguments);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$6(e, r, t) {
  return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var computeLegendPayloadFromBarData = (props) => {
  var dataKey = props.dataKey, name = props.name, fill = props.fill, legendType = props.legendType, hide = props.hide;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: fill,
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetBarTooltipEntrySettings = /* @__PURE__ */ reactExports.memo((_ref2) => {
  var dataKey = _ref2.dataKey, stroke = _ref2.stroke, strokeWidth = _ref2.strokeWidth, fill = _ref2.fill, name = _ref2.name, hide = _ref2.hide, unit = _ref2.unit, formatter = _ref2.formatter, tooltipType = _ref2.tooltipType, id = _ref2.id;
  var tooltipEntrySettings = {
    dataDefinedOnItem: void 0,
    getPosition: noop$1,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit,
      formatter,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function BarBackground(props) {
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var data = props.data, dataKey = props.dataKey, backgroundFromProps = props.background, allOtherBarProps = props.allOtherBarProps;
  var onMouseEnterFromProps = allOtherBarProps.onMouseEnter, onMouseLeaveFromProps = allOtherBarProps.onMouseLeave, onItemClickFromProps = allOtherBarProps.onClick, restOfAllOtherProps = _objectWithoutProperties$6(allOtherBarProps, _excluded$6);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, allOtherBarProps.id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, allOtherBarProps.id);
  if (!backgroundFromProps || data == null) {
    return null;
  }
  var backgroundProps = svgPropertiesNoEventsFromUnknown(backgroundFromProps);
  return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: getZIndexFromUnknown(backgroundFromProps, DefaultZIndexes.barBackground)
  }, data.map((entry, i) => {
    entry.value;
    var backgroundFromDataEntry = entry.background;
    entry.tooltipPosition;
    var rest = _objectWithoutProperties$6(entry, _excluded2$3);
    if (!backgroundFromDataEntry) {
      return null;
    }
    var onMouseEnter = onMouseEnterFromContext(entry, entry.originalDataIndex);
    var onMouseLeave = onMouseLeaveFromContext(entry, entry.originalDataIndex);
    var onClick = onClickFromContext(entry, entry.originalDataIndex);
    var barRectangleProps = _objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6({
      option: backgroundFromProps,
      isActive: String(entry.originalDataIndex) === activeIndex
    }, rest), {}, {
      // @ts-expect-error backgroundProps is contributing unknown props
      fill: "#eee"
    }, backgroundFromDataEntry), backgroundProps), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
      onMouseEnter,
      onMouseLeave,
      onClick,
      dataKey,
      index: i,
      className: "recharts-bar-background-rectangle"
    });
    return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({
      key: "background-bar-".concat(i)
    }, barRectangleProps));
  }));
}
function BarLabelListProvider(_ref2) {
  var showLabels = _ref2.showLabels, children = _ref2.children, rects = _ref2.rects;
  var labelListEntries = rects === null || rects === void 0 ? void 0 : rects.map((entry) => {
    var viewBox = {
      x: entry.x,
      y: entry.y,
      width: entry.width,
      lowerWidth: entry.width,
      upperWidth: entry.width,
      height: entry.height
    };
    return _objectSpread$6(_objectSpread$6({}, viewBox), {}, {
      value: entry.value,
      payload: entry.payload,
      parentViewBox: entry.parentViewBox,
      viewBox,
      fill: entry.fill
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function BarRectangleWithActiveState(props) {
  var shape = props.shape, activeBar = props.activeBar, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var isActive = activeBar && String(entry.originalDataIndex) === activeIndex && (activeDataKey == null || dataKey === activeDataKey);
  var isAnotherBarActive = activeIndex != null && (String(entry.originalDataIndex) !== activeIndex || activeDataKey != null && dataKey !== activeDataKey);
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray$2(_useState, 2), stayInLayer = _useState2[0], setStayInLayer = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray$2(_useState3, 2), hasMountedActive = _useState4[0], setHasMountedActive = _useState4[1];
  reactExports.useEffect(() => {
    var rafId2;
    if (isActive) {
      setStayInLayer(true);
      rafId2 = requestAnimationFrame(() => {
        setHasMountedActive(true);
      });
    } else {
      setHasMountedActive(false);
      if (isAnotherBarActive) {
        setStayInLayer(false);
      }
    }
    return () => {
      cancelAnimationFrame(rafId2);
    };
  }, [isActive, isAnotherBarActive]);
  var handleTransitionEnd = reactExports.useCallback(() => {
    if (!isActive) {
      setStayInLayer(false);
    }
  }, [isActive]);
  var isVisuallyActive = isActive && hasMountedActive;
  var shouldRenderInLayer = isActive || stayInLayer;
  var option;
  if (isActive) {
    if (activeBar === true) {
      option = shape;
    } else {
      option = activeBar;
    }
  } else {
    option = shape;
  }
  var content = /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({}, baseProps, {
    name: String(baseProps.name)
  }, entry, {
    isActive: isVisuallyActive,
    option,
    index,
    dataKey,
    animationElapsedTime: props.animationElapsedTime,
    isAnimating: props.isAnimating,
    isEntrance: props.isEntrance,
    onTransitionEnd: handleTransitionEnd
  }));
  if (shouldRenderInLayer) {
    return /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
      zIndex: DefaultZIndexes.activeBar
    }, /* @__PURE__ */ reactExports.createElement(BarStackClipLayer, {
      index: entry.originalDataIndex
    }, content));
  }
  return content;
}
function BarRectangleNeverActive(props) {
  var shape = props.shape, baseProps = props.baseProps, entry = props.entry, index = props.index, dataKey = props.dataKey;
  return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$6({}, baseProps, {
    name: String(baseProps.name)
  }, entry, {
    isActive: false,
    option: shape,
    index,
    dataKey,
    animationElapsedTime: props.animationElapsedTime,
    isAnimating: props.isAnimating,
    isEntrance: props.isEntrance
  }));
}
function BarRectangles(_ref3) {
  var _svgPropertiesNoEvent;
  var data = _ref3.data, props = _ref3.props, animationElapsedTime = _ref3.animationElapsedTime, isAnimating = _ref3.isAnimating, isEntrance = _ref3.isEntrance;
  var _ref4 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(props)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, id = _ref4.id, baseProps = _objectWithoutProperties$6(_ref4, _excluded3$2);
  var shape = props.shape, dataKey = props.dataKey, activeBar = props.activeBar;
  var onMouseEnterFromProps = props.onMouseEnter, onItemClickFromProps = props.onClick, onMouseLeaveFromProps = props.onMouseLeave, restOfAllOtherProps = _objectWithoutProperties$6(props, _excluded4);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey, id);
  if (!data) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, data.map((entry, i) => {
    return /* @__PURE__ */ reactExports.createElement(BarStackClipLayer, _extends$6({
      index: entry.originalDataIndex,
      key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i),
      className: "recharts-bar-rectangle"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      onMouseEnter: onMouseEnterFromContext(entry, entry.originalDataIndex),
      onMouseLeave: onMouseLeaveFromContext(entry, entry.originalDataIndex),
      onClick: onClickFromContext(entry, entry.originalDataIndex)
    }), activeBar ? /* @__PURE__ */ reactExports.createElement(BarRectangleWithActiveState, {
      shape,
      activeBar,
      baseProps,
      entry,
      index: i,
      dataKey,
      animationElapsedTime,
      isAnimating,
      isEntrance
    }) : (
      /*
       * If the `activeBar` prop is falsy, then let's call the variant without hooks.
       * Using the `selectActiveTooltipIndex` selector is usually fast
       * but in charts with large-ish amount of data even the few nanoseconds add up to a noticeable jank.
       * If the activeBar is false then we don't need to know which index is active - because we won't use it anyway.
       * So let's just skip the hooks altogether. That way, React can skip rendering the component,
       * and can skip the tree reconciliation for its children too.
       * Because we can't call hooks conditionally, we need to have a separate component for that.
       */
      /* @__PURE__ */ reactExports.createElement(BarRectangleNeverActive, {
        shape,
        baseProps,
        entry,
        index: i,
        dataKey,
        animationElapsedTime,
        isAnimating,
        isEntrance
      })
    ));
  }));
}
var defaultBarAnimateItems = (items, animationElapsedTime, layout) => {
  if (items == null) return [];
  if (animationElapsedTime === 1) {
    return items.flatMap((item) => item.status === "removed" ? [] : [item.next]);
  }
  return items.flatMap((item) => {
    if (item.status === "removed") {
      if (layout === "horizontal") {
        return [_objectSpread$6(_objectSpread$6({}, item.prev), {}, {
          height: interpolate(item.prev.height, 0, animationElapsedTime),
          y: interpolate(item.prev.y, item.prev.y + item.prev.height, animationElapsedTime)
        })];
      }
      return [_objectSpread$6(_objectSpread$6({}, item.prev), {}, {
        width: interpolate(item.prev.width, 0, animationElapsedTime)
      })];
    }
    if (item.status === "matched") {
      return [_objectSpread$6(_objectSpread$6({}, item.next), {}, {
        x: interpolate(item.prev.x, item.next.x, animationElapsedTime),
        y: interpolate(item.prev.y, item.next.y, animationElapsedTime),
        width: interpolate(item.prev.width, item.next.width, animationElapsedTime),
        height: interpolate(item.prev.height, item.next.height, animationElapsedTime)
      })];
    }
    var next = item.next;
    if (layout === "horizontal") {
      return [_objectSpread$6(_objectSpread$6({}, next), {}, {
        height: interpolate(0, next.height, animationElapsedTime),
        y: interpolate(next.stackedBarStart, next.y, animationElapsedTime)
      })];
    }
    return [_objectSpread$6(_objectSpread$6({}, next), {}, {
      width: interpolate(0, next.width, animationElapsedTime),
      x: interpolate(next.stackedBarStart, next.x, animationElapsedTime)
    })];
  });
};
function RectanglesWithAnimation(_ref5) {
  var props = _ref5.props, previousRectanglesRef = _ref5.previousRectanglesRef;
  var data = props.data, isAnimationActive = props.isAnimationActive, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, animationInterpolateFn = props.animationInterpolateFn, layout = props.layout;
  var _useAnimationCallback = useAnimationCallbacks(props.onAnimationStart, props.onAnimationEnd), isAnimating = _useAnimationCallback.isAnimating, handleAnimationStart = _useAnimationCallback.handleAnimationStart, handleAnimationEnd = _useAnimationCallback.handleAnimationEnd;
  return /* @__PURE__ */ reactExports.createElement(BarLabelListProvider, {
    showLabels: !isAnimating,
    rects: data
  }, /* @__PURE__ */ reactExports.createElement(AnimatedItems, {
    animationInput: data,
    animationIdPrefix: "recharts-bar-",
    items: data,
    previousItemsRef: previousRectanglesRef,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    animationInterpolateFn,
    animationMatchBy: props.animationMatchBy,
    layout
  }, (stepData, animationElapsedTime, isEntrance) => /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement(BarRectangles, {
    props,
    data: stepData,
    animationElapsedTime,
    isAnimating: isAnimating || animationElapsedTime < 1,
    isEntrance
  }))), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }), props.children);
}
function RenderRectangles(props) {
  var previousRectanglesRef = reactExports.useRef(null);
  return /* @__PURE__ */ reactExports.createElement(RectanglesWithAnimation, {
    previousRectanglesRef,
    props
  });
}
var defaultMinPointSize = 0;
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
  var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
  return {
    x: dataPoint.x,
    y: dataPoint.y,
    value,
    // getValueByDataKey does not validate the output type
    errorVal: getValueByDataKey(dataPoint, dataKey)
  };
};
class BarWithState extends reactExports.PureComponent {
  render() {
    var _this$props = this.props, hide = _this$props.hide, data = _this$props.data, dataKey = _this$props.dataKey, className = _this$props.className, xAxisId = _this$props.xAxisId, yAxisId = _this$props.yAxisId, needClip = _this$props.needClip, background = _this$props.background, id = _this$props.id;
    if (hide || data == null) {
      return null;
    }
    var layerClass = clsx("recharts-bar", className);
    var clipPathId = id;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass,
      id
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    })), /* @__PURE__ */ reactExports.createElement(Layer, {
      className: "recharts-bar-rectangles",
      clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
    }, /* @__PURE__ */ reactExports.createElement(BarBackground, {
      data,
      dataKey,
      background,
      allOtherBarProps: this.props
    }), /* @__PURE__ */ reactExports.createElement(RenderRectangles, this.props)));
  }
}
var defaultBarProps = {
  activeBar: false,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
  animationInterpolateFn: defaultBarAnimateItems,
  animationMatchBy: matchAppend,
  background: false,
  hide: false,
  isAnimationActive: "auto",
  label: false,
  legendType: "rect",
  minPointSize: defaultMinPointSize,
  shape: defaultBarShape,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.bar
};
function BarImpl(props) {
  var xAxisId = props.xAxisId, yAxisId = props.yAxisId, hide = props.hide, legendType = props.legendType, minPointSize = props.minPointSize, activeBar = props.activeBar, animationBegin = props.animationBegin, animationDuration = props.animationDuration, animationEasing = props.animationEasing, isAnimationActive = props.isAnimationActive;
  var _useNeedsClip = useNeedsClip(xAxisId, yAxisId), needClip = _useNeedsClip.needClip;
  var layout = useChartLayout();
  var isPanorama = useIsPanorama();
  var cells = findAllByType(props.children, Cell);
  var rects = useAppSelector((state) => selectBarRectangles(state, props.id, isPanorama, cells));
  if (layout !== "vertical" && layout !== "horizontal") {
    return null;
  }
  var errorBarOffset;
  var firstDataPoint = rects === null || rects === void 0 ? void 0 : rects[0];
  if (firstDataPoint == null || firstDataPoint.height == null || firstDataPoint.width == null) {
    errorBarOffset = 0;
  } else {
    errorBarOffset = layout === "vertical" ? firstDataPoint.height / 2 : firstDataPoint.width / 2;
  }
  return /* @__PURE__ */ reactExports.createElement(SetErrorBarContext, {
    xAxisId,
    yAxisId,
    data: rects,
    dataPointFormatter: errorBarDataPointFormatter,
    errorBarOffset
  }, /* @__PURE__ */ reactExports.createElement(BarWithState, _extends$6({}, props, {
    layout,
    needClip,
    data: rects,
    xAxisId,
    yAxisId,
    hide,
    legendType,
    minPointSize,
    activeBar,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive
  })));
}
function computeBarRectangles(_ref6) {
  var layout = _ref6.layout, _ref6$barSettings = _ref6.barSettings, dataKey = _ref6$barSettings.dataKey, minPointSizeProp = _ref6$barSettings.minPointSize, hasCustomShape = _ref6$barSettings.hasCustomShape, pos = _ref6.pos, bandSize = _ref6.bandSize, xAxis = _ref6.xAxis, yAxis = _ref6.yAxis, xAxisTicks = _ref6.xAxisTicks, yAxisTicks = _ref6.yAxisTicks, stackedData = _ref6.stackedData, displayedData = _ref6.displayedData, offset = _ref6.offset, cells = _ref6.cells, parentViewBox = _ref6.parentViewBox, dataStartIndex = _ref6.dataStartIndex;
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    numericAxis
  });
  var stackedBarStart = numericAxis.scale.map(baseValue);
  return displayedData.map((entry, index) => {
    var value, x, y, width, height, background;
    if (stackedData) {
      var untruncatedValue = stackedData[index + dataStartIndex];
      if (untruncatedValue == null) {
        return null;
      }
      value = truncateByDomain(untruncatedValue, stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    var minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index);
    if (layout === "horizontal") {
      var _ref7;
      var baseValueScale = yAxis.scale.map(value[0]);
      var currentValueScale = yAxis.scale.map(value[1]);
      if (baseValueScale == null || currentValueScale == null) {
        return null;
      }
      x = getCateCoordinateOfBar({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      y = (_ref7 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref7 !== void 0 ? _ref7 : void 0;
      width = pos.size;
      var computedHeight = baseValueScale - currentValueScale;
      height = isNan(computedHeight) ? 0 : computedHeight;
      background = {
        x,
        y: offset.top,
        width,
        height: offset.height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y -= delta;
        height += delta;
      }
    } else {
      var _baseValueScale = xAxis.scale.map(value[0]);
      var _currentValueScale = xAxis.scale.map(value[1]);
      if (_baseValueScale == null || _currentValueScale == null) {
        return null;
      }
      x = _baseValueScale;
      y = getCateCoordinateOfBar({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      width = _currentValueScale - _baseValueScale;
      height = pos.size;
      background = {
        x: offset.left,
        y,
        width: offset.width,
        height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += _delta;
      }
    }
    if (x == null || y == null || width == null || height == null || !hasCustomShape && (width === 0 || height === 0)) {
      return null;
    }
    var barRectangleItem = _objectSpread$6(_objectSpread$6({}, entry), {}, {
      stackedBarStart,
      x,
      y,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      tooltipPosition: {
        x: x + width / 2,
        y: y + height / 2
      },
      parentViewBox,
      originalDataIndex: index
    }, cells && cells[index] && cells[index].props);
    return barRectangleItem;
  }).filter(Boolean);
}
function BarFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultBarProps);
  var stackId = useStackId(props.stackId);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "bar"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromBarData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetBarTooltipEntrySettings, {
    dataKey: props.dataKey,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    formatter: props.formatter,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "bar",
    id,
    data: void 0,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    dataKey: props.dataKey,
    stackId,
    hide: props.hide,
    barSize: props.barSize,
    minPointSize: props.minPointSize,
    maxBarSize: props.maxBarSize,
    isPanorama,
    hasCustomShape: props.shape != null && props.shape !== defaultBarShape
  }), /* @__PURE__ */ reactExports.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ reactExports.createElement(BarImpl, _extends$6({}, props, {
    id
  })))));
}
var Bar = /* @__PURE__ */ reactExports.memo(BarFn, propsAreEqual);
Bar.displayName = "Bar";
var _excluded$5 = ["domain", "range"], _excluded2$2 = ["domain", "range"];
function _objectWithoutProperties$5(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function shortArraysAreEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  }
  if (Array.isArray(arr1) && arr1.length === 2 && Array.isArray(arr2) && arr2.length === 2) {
    return arr1[0] === arr2[0] && arr1[1] === arr2[1];
  }
  return false;
}
function axisPropsAreEqual(prevProps, nextProps) {
  if (prevProps === nextProps) {
    return true;
  }
  var prevDomain = prevProps.domain, prevRange = prevProps.range, prevRest = _objectWithoutProperties$5(prevProps, _excluded$5);
  var nextDomain = nextProps.domain, nextRange = nextProps.range, nextRest = _objectWithoutProperties$5(nextProps, _excluded2$2);
  if (!shortArraysAreEqual(prevDomain, nextDomain)) {
    return false;
  }
  if (!shortArraysAreEqual(prevRange, nextRange)) {
    return false;
  }
  return propsAreEqual(prevRest, nextRest);
}
var _excluded$4 = ["type"], _excluded2$1 = ["dangerouslySetInnerHTML", "ticks", "scale"], _excluded3$1 = ["id", "scale"];
function _extends$5() {
  return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$5.apply(null, arguments);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(e, r, t) {
  return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$4(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function SetXAxisSettings(props) {
  var dispatch = useAppDispatch();
  var prevSettingsRef = reactExports.useRef(null);
  var layout = useCartesianChartLayout();
  var typeFromProps = props.type, restProps = _objectWithoutProperties$4(props, _excluded$4);
  var evaluatedType = getAxisTypeBasedOnLayout(layout, "xAxis", typeFromProps);
  var settings = reactExports.useMemo(() => {
    if (evaluatedType == null) {
      return void 0;
    }
    return _objectSpread$5(_objectSpread$5({}, restProps), {}, {
      type: evaluatedType
    });
  }, [restProps, evaluatedType]);
  reactExports.useLayoutEffect(() => {
    if (settings == null) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addXAxis(settings));
    } else if (prevSettingsRef.current !== settings) {
      dispatch(replaceXAxis({
        prev: prevSettingsRef.current,
        next: settings
      }));
    }
    prevSettingsRef.current = settings;
  }, [settings, dispatch]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeXAxis(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
var XAxisImpl = (props) => {
  var xAxisId = props.xAxisId, className = props.className, height = props.height, label = props.label;
  var cartesianAxisRef = reactExports.useRef(null);
  var labelRef = reactExports.useRef(null);
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var dispatch = useAppDispatch();
  var axisType = "xAxis";
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, xAxisId, isPanorama));
  var axisSize = useAppSelector((state) => selectXAxisSize(state, xAxisId));
  var position = useAppSelector((state) => selectXAxisPosition(state, xAxisId));
  var synchronizedSettings = useAppSelector((state) => selectXAxisSettingsNoDefaults(state, xAxisId));
  reactExports.useLayoutEffect(() => {
    if (height !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ reactExports.isValidElement(label) || synchronizedSettings == null) {
      return;
    }
    var axisComponent = cartesianAxisRef.current;
    if (!axisComponent) {
      return;
    }
    var updatedXAxisHeight = axisComponent.getCalculatedHeight();
    if (Math.round(axisSize.height) !== Math.round(updatedXAxisHeight)) {
      dispatch(updateXAxisHeight({
        id: xAxisId,
        height: updatedXAxisHeight
      }));
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    cartesianTickItems,
    axisSize,
    dispatch,
    label,
    xAxisId,
    height,
    synchronizedSettings
  ]);
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  props.dangerouslySetInnerHTML;
  props.ticks;
  props.scale;
  var allOtherProps = _objectWithoutProperties$4(props, _excluded2$1);
  synchronizedSettings.id;
  synchronizedSettings.scale;
  var restSynchronizedSettings = _objectWithoutProperties$4(synchronizedSettings, _excluded3$1);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$5({}, allOtherProps, restSynchronizedSettings, {
    ref: cartesianAxisRef,
    labelRef,
    x: position.x,
    y: position.y,
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems,
    axisType,
    axisId: xAxisId
  }));
};
var xAxisDefaultProps = {
  allowDataOverflow: implicitXAxis.allowDataOverflow,
  allowDecimals: implicitXAxis.allowDecimals,
  allowDuplicatedCategory: implicitXAxis.allowDuplicatedCategory,
  angle: implicitXAxis.angle,
  axisLine: defaultCartesianAxisProps.axisLine,
  height: implicitXAxis.height,
  hide: false,
  includeHidden: implicitXAxis.includeHidden,
  interval: implicitXAxis.interval,
  label: false,
  minTickGap: implicitXAxis.minTickGap,
  mirror: implicitXAxis.mirror,
  orientation: implicitXAxis.orientation,
  padding: implicitXAxis.padding,
  reversed: implicitXAxis.reversed,
  scale: implicitXAxis.scale,
  tick: implicitXAxis.tick,
  tickCount: implicitXAxis.tickCount,
  tickLine: defaultCartesianAxisProps.tickLine,
  tickSize: defaultCartesianAxisProps.tickSize,
  type: implicitXAxis.type,
  niceTicks: implicitXAxis.niceTicks,
  xAxisId: 0
};
var XAxisSettingsDispatcher = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, xAxisDefaultProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetXAxisSettings, {
    allowDataOverflow: props.allowDataOverflow,
    allowDecimals: props.allowDecimals,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    angle: props.angle,
    dataKey: props.dataKey,
    domain: props.domain,
    height: props.height,
    hide: props.hide,
    id: props.xAxisId,
    includeHidden: props.includeHidden,
    interval: props.interval,
    minTickGap: props.minTickGap,
    mirror: props.mirror,
    name: props.name,
    orientation: props.orientation,
    padding: props.padding,
    reversed: props.reversed,
    scale: props.scale,
    tick: props.tick,
    tickCount: props.tickCount,
    tickFormatter: props.tickFormatter,
    ticks: props.ticks,
    type: props.type,
    unit: props.unit,
    niceTicks: props.niceTicks
  }), /* @__PURE__ */ reactExports.createElement(XAxisImpl, props));
};
var XAxis = /* @__PURE__ */ reactExports.memo(XAxisSettingsDispatcher, axisPropsAreEqual);
XAxis.displayName = "XAxis";
var _excluded$3 = ["type"], _excluded2 = ["dangerouslySetInnerHTML", "ticks", "scale"], _excluded3 = ["id", "scale"];
function _extends$4() {
  return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$4.apply(null, arguments);
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(e, r, t) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$3(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function SetYAxisSettings(props) {
  var dispatch = useAppDispatch();
  var prevSettingsRef = reactExports.useRef(null);
  var layout = useCartesianChartLayout();
  var typeFromProps = props.type, restProps = _objectWithoutProperties$3(props, _excluded$3);
  var evaluatedType = getAxisTypeBasedOnLayout(layout, "yAxis", typeFromProps);
  var settings = reactExports.useMemo(() => {
    if (evaluatedType == null) {
      return void 0;
    }
    return _objectSpread$4(_objectSpread$4({}, restProps), {}, {
      type: evaluatedType
    });
  }, [evaluatedType, restProps]);
  reactExports.useLayoutEffect(() => {
    if (settings == null) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addYAxis(settings));
    } else if (prevSettingsRef.current !== settings) {
      dispatch(replaceYAxis({
        prev: prevSettingsRef.current,
        next: settings
      }));
    }
    prevSettingsRef.current = settings;
  }, [settings, dispatch]);
  reactExports.useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeYAxis(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function YAxisImpl(props) {
  var yAxisId = props.yAxisId, className = props.className, width = props.width, label = props.label;
  var cartesianAxisRef = reactExports.useRef(null);
  var labelRef = reactExports.useRef(null);
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var dispatch = useAppDispatch();
  var axisType = "yAxis";
  var axisSize = useAppSelector((state) => selectYAxisSize(state, yAxisId));
  var position = useAppSelector((state) => selectYAxisPosition(state, yAxisId));
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, yAxisId, isPanorama));
  var synchronizedSettings = useAppSelector((state) => selectYAxisSettingsNoDefaults(state, yAxisId));
  reactExports.useLayoutEffect(() => {
    if (width !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ reactExports.isValidElement(label) || synchronizedSettings == null) {
      return;
    }
    var axisComponent = cartesianAxisRef.current;
    if (!axisComponent) {
      return;
    }
    var updatedYAxisWidth = axisComponent.getCalculatedWidth();
    if (Math.round(axisSize.width) !== Math.round(updatedYAxisWidth)) {
      dispatch(updateYAxisWidth({
        id: yAxisId,
        width: updatedYAxisWidth
      }));
    }
  }, [
    // The dependency on cartesianAxisRef.current is not needed because useLayoutEffect will run after every render.
    // The ref will be populated by then.
    // To re-run this effect when ticks change, we can depend on the ticks array from the store.
    cartesianTickItems,
    axisSize,
    dispatch,
    label,
    yAxisId,
    width,
    synchronizedSettings
  ]);
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  props.dangerouslySetInnerHTML;
  props.ticks;
  props.scale;
  var allOtherProps = _objectWithoutProperties$3(props, _excluded2);
  synchronizedSettings.id;
  synchronizedSettings.scale;
  var restSynchronizedSettings = _objectWithoutProperties$3(synchronizedSettings, _excluded3);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$4({}, allOtherProps, restSynchronizedSettings, {
    ref: cartesianAxisRef,
    labelRef,
    x: position.x,
    y: position.y,
    tickTextProps: width === "auto" ? {
      width: void 0
    } : {
      width
    },
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems,
    axisType,
    axisId: yAxisId
  }));
}
var yAxisDefaultProps = {
  allowDataOverflow: implicitYAxis.allowDataOverflow,
  allowDecimals: implicitYAxis.allowDecimals,
  allowDuplicatedCategory: implicitYAxis.allowDuplicatedCategory,
  angle: implicitYAxis.angle,
  axisLine: defaultCartesianAxisProps.axisLine,
  hide: false,
  includeHidden: implicitYAxis.includeHidden,
  interval: implicitYAxis.interval,
  label: false,
  minTickGap: implicitYAxis.minTickGap,
  mirror: implicitYAxis.mirror,
  orientation: implicitYAxis.orientation,
  padding: implicitYAxis.padding,
  reversed: implicitYAxis.reversed,
  scale: implicitYAxis.scale,
  tick: implicitYAxis.tick,
  tickCount: implicitYAxis.tickCount,
  tickLine: defaultCartesianAxisProps.tickLine,
  tickSize: defaultCartesianAxisProps.tickSize,
  type: implicitYAxis.type,
  niceTicks: implicitYAxis.niceTicks,
  width: implicitYAxis.width,
  yAxisId: 0
};
var YAxisSettingsDispatcher = (outsideProps) => {
  var props = resolveDefaultProps(outsideProps, yAxisDefaultProps);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetYAxisSettings, {
    interval: props.interval,
    id: props.yAxisId,
    scale: props.scale,
    type: props.type,
    domain: props.domain,
    allowDataOverflow: props.allowDataOverflow,
    dataKey: props.dataKey,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    allowDecimals: props.allowDecimals,
    tickCount: props.tickCount,
    padding: props.padding,
    includeHidden: props.includeHidden,
    reversed: props.reversed,
    ticks: props.ticks,
    width: props.width,
    orientation: props.orientation,
    mirror: props.mirror,
    hide: props.hide,
    unit: props.unit,
    name: props.name,
    angle: props.angle,
    minTickGap: props.minTickGap,
    tick: props.tick,
    tickFormatter: props.tickFormatter,
    niceTicks: props.niceTicks
  }), /* @__PURE__ */ reactExports.createElement(YAxisImpl, props));
};
var YAxis = /* @__PURE__ */ reactExports.memo(YAxisSettingsDispatcher, axisPropsAreEqual);
YAxis.displayName = "YAxis";
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([pickChartPointer, selectChartLayout, selectPolarViewBox, selectTooltipAxisType, selectTooltipAxisRangeWithReverse, selectTooltipAxisTicks, selectOrderedTooltipTicks, selectChartOffsetInternal], combineActiveProps);
function isSvgPointer(pointer) {
  return "getBBox" in pointer.currentTarget && typeof pointer.currentTarget.getBBox === "function";
}
function getRelativeCoordinate(event) {
  var rect = event.currentTarget.getBoundingClientRect();
  var scaleX, scaleY;
  if (isSvgPointer(event)) {
    var bbox = event.currentTarget.getBBox();
    scaleX = bbox.width > 0 ? rect.width / bbox.width : 1;
    scaleY = bbox.height > 0 ? rect.height / bbox.height : 1;
  } else {
    var element = event.currentTarget;
    scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
    scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : 1;
  }
  var getCoordinates = (clientX, clientY) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((clientX - rect.left) / scaleX),
    relativeY: Math.round((clientY - rect.top) / scaleY)
  });
  if ("touches" in event) {
    return Array.from(event.touches).map((touch) => getCoordinates(touch.clientX, touch.clientY));
  }
  return getCoordinates(event.clientX, event.clientY);
}
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getRelativeCoordinate(mousePointer));
    if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
      listenerApi.dispatch(setMouseClickAxisIndex({
        activeIndex: activeProps.activeIndex,
        activeDataKey: void 0,
        activeCoordinate: activeProps.activeCoordinate
      }));
    }
  }
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
var rafId$2 = null;
var timeoutId$2 = null;
var latestChartPointer = null;
mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || (throttledEvents === null || throttledEvents === void 0 ? void 0 : throttledEvents.includes("mousemove"));
    if (rafId$2 !== null) {
      cancelAnimationFrame(rafId$2);
      rafId$2 = null;
    }
    if (timeoutId$2 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$2);
      timeoutId$2 = null;
    }
    latestChartPointer = getRelativeCoordinate(mousePointer);
    var callback = () => {
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (!latestChartPointer) {
        rafId$2 = null;
        timeoutId$2 = null;
        return;
      }
      if (tooltipEventType === "axis") {
        var activeProps = selectActivePropsFromChartPointer(currentState, latestChartPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        } else {
          listenerApi.dispatch(mouseLeaveChart());
        }
      }
      rafId$2 = null;
      timeoutId$2 = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$2 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$2 === null) {
        timeoutId$2 = setTimeout(callback, throttleDelay);
      }
    }
  }
});
function reduxDevtoolsJsonStringifyReplacer(key, value) {
  if (value instanceof HTMLElement) {
    return "HTMLElement <".concat(value.tagName, ' class="').concat(value.className, '">');
  }
  if (value === window) {
    return "global.window";
  }
  if (key === "children" && typeof value === "object" && value !== null) {
    return "<<CHILDREN>>";
  }
  return value;
}
var initialState$1 = {
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: false
};
var rootPropsSlice = createSlice({
  name: "rootProps",
  initialState: initialState$1,
  reducers: {
    updateOptions: (state, action) => {
      var _action$payload$barGa;
      state.accessibilityLayer = action.payload.accessibilityLayer;
      state.barCategoryGap = action.payload.barCategoryGap;
      state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState$1.barGap;
      state.barSize = action.payload.barSize;
      state.maxBarSize = action.payload.maxBarSize;
      state.stackOffset = action.payload.stackOffset;
      state.syncId = action.payload.syncId;
      state.syncMethod = action.payload.syncMethod;
      state.className = action.payload.className;
      state.baseValue = action.payload.baseValue;
      state.reverseStackOrder = action.payload.reverseStackOrder;
    }
  }
});
var rootPropsReducer = rootPropsSlice.reducer;
var updateOptions = rootPropsSlice.actions.updateOptions;
var initialState = null;
var reducers = {
  updatePolarOptions: (state, action) => {
    if (state === null) {
      return action.payload;
    }
    state.startAngle = action.payload.startAngle;
    state.endAngle = action.payload.endAngle;
    state.cx = action.payload.cx;
    state.cy = action.payload.cy;
    state.innerRadius = action.payload.innerRadius;
    state.outerRadius = action.payload.outerRadius;
    return state;
  }
};
var polarOptionsSlice = createSlice({
  name: "polarOptions",
  initialState,
  reducers
});
var updatePolarOptions = polarOptionsSlice.actions.updatePolarOptions;
var polarOptionsReducer = polarOptionsSlice.reducer;
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var blurAction = createAction("blur");
var keyboardEventsMiddleware = createListenerMiddleware();
var rafId$1 = null;
var timeoutId$1 = null;
var latestKeyboardActionPayload = null;
keyboardEventsMiddleware.startListening({
  actionCreator: keyDownAction,
  effect: (action, listenerApi) => {
    latestKeyboardActionPayload = action.payload;
    if (rafId$1 !== null) {
      cancelAnimationFrame(rafId$1);
      rafId$1 = null;
    }
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("keydown");
    if (timeoutId$1 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$1);
      timeoutId$1 = null;
    }
    var callback = () => {
      try {
        var currentState = listenerApi.getState();
        var accessibilityLayerIsActive = currentState.rootProps.accessibilityLayer !== false;
        if (!accessibilityLayerIsActive) {
          return;
        }
        var keyboardInteraction = currentState.tooltip.keyboardInteraction;
        var key = latestKeyboardActionPayload;
        if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") {
          return;
        }
        var resolvedIndex = combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(currentState), selectTooltipAxisDataKey(currentState), selectTooltipAxisDomain(currentState));
        var currentIndex = resolvedIndex == null ? -1 : Number(resolvedIndex);
        var isOutsideDomain = !Number.isFinite(currentIndex) || currentIndex < 0;
        var tooltipTicks = selectTooltipAxisTicks(currentState);
        var displayedData = selectTooltipDisplayedData(currentState);
        var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
        if (key === "Enter") {
          if (isOutsideDomain) {
            return;
          }
          var _coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(keyboardInteraction.index));
          listenerApi.dispatch(setKeyboardInteraction({
            active: !keyboardInteraction.active,
            activeIndex: keyboardInteraction.index,
            activeCoordinate: _coordinate
          }));
          return;
        }
        var direction = selectChartDirection(currentState);
        var directionMultiplier = direction === "left-to-right" ? 1 : -1;
        var movement = key === "ArrowRight" ? 1 : -1;
        var nextIndex;
        if (isOutsideDomain) {
          var axisDataKey = selectTooltipAxisDataKey(currentState);
          var domain = selectTooltipAxisDomain(currentState);
          var effectiveMovement = movement * directionMultiplier;
          var mkInteraction = (i2) => ({
            active: false,
            index: String(i2),
            dataKey: void 0,
            graphicalItemId: void 0,
            coordinate: void 0
          });
          nextIndex = -1;
          if (effectiveMovement > 0) {
            for (var i = 0; i < displayedData.length; i++) {
              if (combineActiveTooltipIndex(mkInteraction(i), displayedData, axisDataKey, domain) != null) {
                nextIndex = i;
                break;
              }
            }
          } else {
            for (var _i = displayedData.length - 1; _i >= 0; _i--) {
              if (combineActiveTooltipIndex(mkInteraction(_i), displayedData, axisDataKey, domain) != null) {
                nextIndex = _i;
                break;
              }
            }
          }
          if (nextIndex < 0) {
            return;
          }
        } else {
          nextIndex = currentIndex + movement * directionMultiplier;
          var dataLength = (tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks.length) || displayedData.length;
          if (dataLength === 0 || nextIndex >= dataLength || nextIndex < 0) {
            return;
          }
        }
        var coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(nextIndex));
        listenerApi.dispatch(setKeyboardInteraction({
          active: true,
          activeIndex: nextIndex.toString(),
          activeCoordinate: coordinate
        }));
      } finally {
        rafId$1 = null;
        timeoutId$1 = null;
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$1 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$1 === null) {
        callback();
        latestKeyboardActionPayload = null;
        timeoutId$1 = setTimeout(() => {
          if (latestKeyboardActionPayload) {
            callback();
          } else {
            timeoutId$1 = null;
            rafId$1 = null;
          }
        }, throttleDelay);
      }
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: focusAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var keyboardInteraction = state.tooltip.keyboardInteraction;
    if (keyboardInteraction.active) {
      return;
    }
    if (keyboardInteraction.index == null) {
      var nextIndex = "0";
      var tooltipEventType = selectTooltipEventType$1(state, state.tooltip.settings.shared);
      var coordinate = selectCoordinateForDefaultIndex(state, tooltipEventType, "hover", String(nextIndex));
      listenerApi.dispatch(setKeyboardInteraction({
        active: true,
        activeIndex: nextIndex,
        activeCoordinate: coordinate
      }));
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: blurAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var keyboardInteraction = state.tooltip.keyboardInteraction;
    if (keyboardInteraction.active) {
      listenerApi.dispatch(setKeyboardInteraction({
        active: false,
        activeIndex: keyboardInteraction.index,
        activeCoordinate: keyboardInteraction.coordinate
      }));
    }
  }
});
function createEventProxy(reactEvent) {
  reactEvent.persist();
  var currentTarget = reactEvent.currentTarget;
  return new Proxy(reactEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return currentTarget;
      }
      var value = Reflect.get(target, prop);
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
var rafIdMap = /* @__PURE__ */ new Map();
var timeoutIdMap = /* @__PURE__ */ new Map();
var latestEventMap = /* @__PURE__ */ new Map();
externalEventsMiddleware.startListening({
  actionCreator: externalEventAction,
  effect: (action, listenerApi) => {
    var _action$payload = action.payload, handler = _action$payload.handler, reactEvent = _action$payload.reactEvent;
    if (handler == null) {
      return;
    }
    var eventType = reactEvent.type;
    var eventProxy = createEventProxy(reactEvent);
    latestEventMap.set(eventType, {
      handler,
      reactEvent: eventProxy
    });
    var existingRafId = rafIdMap.get(eventType);
    if (existingRafId !== void 0) {
      cancelAnimationFrame(existingRafId);
      rafIdMap.delete(eventType);
    }
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var eventListAsString = throttledEvents;
    var isThrottled = eventListAsString === "all" || (eventListAsString === null || eventListAsString === void 0 ? void 0 : eventListAsString.includes(eventType));
    var existingTimeoutId = timeoutIdMap.get(eventType);
    if (existingTimeoutId !== void 0 && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(existingTimeoutId);
      timeoutIdMap.delete(eventType);
    }
    var callback = () => {
      var latestAction = latestEventMap.get(eventType);
      try {
        if (!latestAction) {
          return;
        }
        var latestHandler = latestAction.handler, latestEvent = latestAction.reactEvent;
        var currentState = listenerApi.getState();
        var nextState = {
          activeCoordinate: selectActiveTooltipCoordinate(currentState),
          activeDataKey: selectActiveTooltipDataKey(currentState),
          activeIndex: selectActiveTooltipIndex(currentState),
          activeLabel: selectActiveLabel$1(currentState),
          activeTooltipIndex: selectActiveTooltipIndex(currentState),
          isTooltipActive: selectIsTooltipActive$1(currentState)
        };
        if (latestHandler) {
          latestHandler(nextState, latestEvent);
        }
      } finally {
        rafIdMap.delete(eventType);
        timeoutIdMap.delete(eventType);
        latestEventMap.delete(eventType);
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      var rafId2 = requestAnimationFrame(callback);
      rafIdMap.set(eventType, rafId2);
    } else if (typeof throttleDelay === "number") {
      if (!timeoutIdMap.has(eventType)) {
        callback();
        var timeoutId2 = setTimeout(callback, throttleDelay);
        timeoutIdMap.set(eventType, timeoutId2);
      }
    } else {
      callback();
    }
  }
});
var selectAllTooltipPayloadConfiguration = createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads);
var selectTooltipCoordinate = createSelector([selectAllTooltipPayloadConfiguration, (_state, tooltipIndex) => tooltipIndex, (_state, _tooltipIndex, graphicalItemId) => graphicalItemId], (allTooltipConfigurations, tooltipIndex, graphicalItemId) => {
  if (tooltipIndex == null) {
    return void 0;
  }
  var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
    return tooltipConfiguration.settings.graphicalItemId === graphicalItemId;
  });
  if (mostRelevantTooltipConfiguration == null) {
    return void 0;
  }
  var getPosition = mostRelevantTooltipConfiguration.getPosition;
  if (getPosition == null) {
    return void 0;
  }
  return getPosition(tooltipIndex);
});
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
var rafId = null;
var timeoutId = null;
var latestChartPointers = null;
var latestTouchEvent = null;
touchEventMiddleware.startListening({
  actionCreator: touchEventAction,
  effect: (action, listenerApi) => {
    var touchEvent = action.payload;
    if (touchEvent.touches == null || touchEvent.touches.length === 0) {
      return;
    }
    latestTouchEvent = createEventProxy(touchEvent);
    var state = listenerApi.getState();
    var _state$eventSettings = state.eventSettings, throttleDelay = _state$eventSettings.throttleDelay, throttledEvents = _state$eventSettings.throttledEvents;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("touchmove");
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (timeoutId !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    latestChartPointers = Array.from(touchEvent.touches).map((touch) => getRelativeCoordinate({
      clientX: touch.clientX,
      clientY: touch.clientY,
      currentTarget: touchEvent.currentTarget
    }));
    var callback = () => {
      if (latestTouchEvent == null) {
        return;
      }
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (tooltipEventType === "axis") {
        var _latestChartPointers;
        var latestTouchPointer = (_latestChartPointers = latestChartPointers) === null || _latestChartPointers === void 0 ? void 0 : _latestChartPointers[0];
        if (latestTouchPointer == null) {
          rafId = null;
          timeoutId = null;
          return;
        }
        var activeProps = selectActivePropsFromChartPointer(currentState, latestTouchPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        }
      } else if (tooltipEventType === "item") {
        var _target$getAttribute;
        var touch = latestTouchEvent.touches[0];
        if (document.elementFromPoint == null || touch == null) {
          return;
        }
        var target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!target || !target.getAttribute) {
          return;
        }
        var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
        var graphicalItemId = (_target$getAttribute = target.getAttribute(DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME)) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
        var settings = selectAllGraphicalItemsSettings(currentState).find((item) => item.id === graphicalItemId);
        if (itemIndex == null || settings == null || graphicalItemId == null) {
          return;
        }
        var dataKey = settings.dataKey;
        var coordinate = selectTooltipCoordinate(currentState, itemIndex, graphicalItemId);
        listenerApi.dispatch(setActiveMouseOverItemIndex({
          activeDataKey: dataKey,
          activeIndex: itemIndex,
          activeCoordinate: coordinate,
          activeGraphicalItemId: graphicalItemId
        }));
      }
      rafId = null;
      timeoutId = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId === null) {
        callback();
        latestTouchEvent = null;
        timeoutId = setTimeout(() => {
          if (latestTouchEvent) {
            callback();
          } else {
            timeoutId = null;
            rafId = null;
          }
        }, throttleDelay);
      }
    }
  }
});
var initialEventSettingsState = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
};
var eventSettingsSlice = createSlice({
  name: "eventSettings",
  initialState: initialEventSettingsState,
  reducers: {
    setEventSettings: (state, action) => {
      if (action.payload.throttleDelay != null) {
        state.throttleDelay = action.payload.throttleDelay;
      }
      if (action.payload.throttledEvents != null) {
        state.throttledEvents = castDraft(action.payload.throttledEvents);
      }
    }
  }
});
var setEventSettings = eventSettingsSlice.actions.setEventSettings;
var eventSettingsReducer = eventSettingsSlice.reducer;
var rootReducer = combineReducers({
  brush: brushReducer,
  cartesianAxis: cartesianAxisReducer,
  chartData: chartDataReducer,
  errorBars: errorBarReducer,
  eventSettings: eventSettingsReducer,
  graphicalItems: graphicalItemsReducer,
  layout: chartLayoutReducer,
  legend: legendReducer,
  options: optionsReducer,
  polarAxis: polarAxisReducer,
  polarOptions: polarOptionsReducer,
  referenceElements: referenceElementsReducer,
  renderedTicks: renderedTicksReducer,
  rootProps: rootPropsReducer,
  tooltip: tooltipReducer,
  zIndex: zIndexReducer
});
var createRechartsStore = function createRechartsStore2(preloadedState) {
  var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return configureStore({
    reducer: rootReducer,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (getDefaultMiddleware) => {
      var _process$env$NODE_ENV;
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: !["commonjs", "es6", "production"].includes((_process$env$NODE_ENV = "es6") !== null && _process$env$NODE_ENV !== void 0 ? _process$env$NODE_ENV : "")
      }).concat([mouseClickMiddleware.middleware, mouseMoveMiddleware.middleware, keyboardEventsMiddleware.middleware, externalEventsMiddleware.middleware, touchEventMiddleware.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (getDefaultEnhancers) => {
      var enhancers = getDefaultEnhancers;
      if (typeof getDefaultEnhancers === "function") {
        enhancers = getDefaultEnhancers();
      }
      return enhancers.concat(autoBatchEnhancer({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: reduxDevtoolsJsonStringifyReplacer
      },
      name: "recharts-".concat(chartName)
    }
  });
};
function RechartsStoreProvider(_ref2) {
  var preloadedState = _ref2.preloadedState, children = _ref2.children, reduxStoreName = _ref2.reduxStoreName;
  var isPanorama = useIsPanorama();
  var storeRef = reactExports.useRef(null);
  if (isPanorama) {
    return children;
  }
  if (storeRef.current == null) {
    storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
  }
  var nonNullContext = RechartsReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Provider_default, {
    context: nonNullContext,
    store: storeRef.current
  }, children);
}
function ReportMainChartPropsImpl(_ref2) {
  var layout = _ref2.layout, margin = _ref2.margin;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (!isPanorama) {
      dispatch(setLayout(layout));
      dispatch(setMargin(margin));
    }
  }, [dispatch, isPanorama, layout, margin]);
  return null;
}
var ReportMainChartProps = /* @__PURE__ */ reactExports.memo(ReportMainChartPropsImpl, propsAreEqual);
function ReportChartProps(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(updateOptions(props));
  }, [dispatch, props]);
  return null;
}
var ReportEventSettingsImpl = (props) => {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(setEventSettings(props));
  }, [dispatch, props]);
  return null;
};
var ReportEventSettings = /* @__PURE__ */ reactExports.memo(ReportEventSettingsImpl, propsAreEqual);
function ZIndexSvgPortal(_ref2) {
  var zIndex = _ref2.zIndex, isPanorama = _ref2.isPanorama;
  var ref = reactExports.useRef(null);
  var dispatch = useAppDispatch();
  reactExports.useLayoutEffect(() => {
    if (ref.current) {
      dispatch(registerZIndexPortalElement({
        zIndex,
        element: ref.current,
        isPanorama
      }));
    }
    return () => {
      dispatch(unregisterZIndexPortalElement({
        zIndex,
        isPanorama
      }));
    };
  }, [dispatch, zIndex, isPanorama]);
  return /* @__PURE__ */ reactExports.createElement("g", {
    tabIndex: -1,
    ref,
    className: "recharts-zIndex-layer_".concat(zIndex)
  });
}
function AllZIndexPortals(_ref2) {
  var children = _ref2.children, isPanorama = _ref2.isPanorama;
  var allRegisteredZIndexes = useAppSelector(selectAllRegisteredZIndexes);
  if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) {
    return children;
  }
  var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex < 0);
  var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex > 0);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, allNegativeZIndexes.map((zIndex) => /* @__PURE__ */ reactExports.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })), children, allPositiveZIndexes.map((zIndex) => /* @__PURE__ */ reactExports.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })));
}
var _excluded$2 = ["children"];
function _objectWithoutProperties$2(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$3.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
};
var MainChartSurface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = useChartWidth();
  var height = useChartHeight();
  var hasAccessibilityLayer = useAccessibilityLayer();
  if (!isPositiveNumber(width) || !isPositiveNumber(height)) {
    return null;
  }
  var children = props.children, otherAttributes = props.otherAttributes, title = props.title, desc = props.desc;
  var tabIndex, role;
  if (otherAttributes != null) {
    if (typeof otherAttributes.tabIndex === "number") {
      tabIndex = otherAttributes.tabIndex;
    } else {
      tabIndex = hasAccessibilityLayer ? 0 : void 0;
    }
    if (typeof otherAttributes.role === "string") {
      role = otherAttributes.role;
    } else {
      role = hasAccessibilityLayer ? "application" : void 0;
    }
  }
  return /* @__PURE__ */ reactExports.createElement(Surface, _extends$3({}, otherAttributes, {
    title,
    desc,
    role,
    tabIndex,
    width,
    height,
    style: FULL_WIDTH_AND_HEIGHT,
    ref
  }), children);
});
var BrushPanoramaSurface = (_ref2) => {
  var children = _ref2.children;
  var brushDimensions = useAppSelector(selectBrushDimensions);
  if (!brushDimensions) {
    return null;
  }
  var width = brushDimensions.width, height = brushDimensions.height, y = brushDimensions.y, x = brushDimensions.x;
  return /* @__PURE__ */ reactExports.createElement(Surface, {
    width,
    height,
    x,
    y
  }, children);
};
var RootSurface = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var children = _ref2.children, rest = _objectWithoutProperties$2(_ref2, _excluded$2);
  var isPanorama = useIsPanorama();
  if (isPanorama) {
    return /* @__PURE__ */ reactExports.createElement(BrushPanoramaSurface, null, /* @__PURE__ */ reactExports.createElement(AllZIndexPortals, {
      isPanorama: true
    }, children));
  }
  return /* @__PURE__ */ reactExports.createElement(MainChartSurface, _extends$3({
    ref
  }, rest), /* @__PURE__ */ reactExports.createElement(AllZIndexPortals, {
    isPanorama: false
  }, children));
});
function _slicedToArray$1(r, e) {
  return _arrayWithHoles$1(r) || _iterableToArrayLimit$1(r, e) || _unsupportedIterableToArray$1(r, e) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}
function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(r) {
  if (Array.isArray(r)) return r;
}
function useReportScale() {
  var dispatch = useAppDispatch();
  var _useState = reactExports.useState(null), _useState2 = _slicedToArray$1(_useState, 2), ref = _useState2[0], setRef = _useState2[1];
  var scale = useAppSelector(selectContainerScale);
  reactExports.useEffect(() => {
    if (ref == null) {
      return;
    }
    var rect = ref.getBoundingClientRect();
    var newScale = rect.width / ref.offsetWidth;
    if (isWellBehavedNumber(newScale) && newScale !== scale) {
      dispatch(setScale(newScale));
    }
  }, [ref, dispatch, scale]);
  return setRef;
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$2.apply(null, arguments);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
var EventSynchronizer = () => {
  useSynchronisedEventsFromOtherCharts();
  return null;
};
function getNumberOrZero(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    var parsed = parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
}
var ResponsiveDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var _props$style, _props$style2;
  var observerRef = reactExports.useRef(null);
  var _useState = reactExports.useState({
    containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
    containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
  }), _useState2 = _slicedToArray(_useState, 2), sizes = _useState2[0], setSizes = _useState2[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = reactExports.useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (observerRef.current != null) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node != null && typeof ResizeObserver !== "undefined") {
      var _node$getBoundingClie = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie.width, containerHeight = _node$getBoundingClie.height;
      setContainerSize(containerWidth, containerHeight);
      var callback = (entries) => {
        var entry = entries[0];
        if (entry == null) {
          return;
        }
        var _entry$contentRect = entry.contentRect, width = _entry$contentRect.width, height = _entry$contentRect.height;
        setContainerSize(width, height);
      };
      var observer = new ResizeObserver(callback);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [ref, setContainerSize]);
  reactExports.useEffect(() => {
    return () => {
      var observer = observerRef.current;
      if (observer != null) {
        observer.disconnect();
      }
    };
  }, [setContainerSize]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref: innerRef
  }, props)));
});
var ReadSizeOnceDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  var _useState3 = reactExports.useState({
    containerWidth: getNumberOrZero(width),
    containerHeight: getNumberOrZero(height)
  }), _useState4 = _slicedToArray(_useState3, 2), sizes = _useState4[0], setSizes = _useState4[1];
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = reactExports.useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (node != null) {
      var _node$getBoundingClie2 = node.getBoundingClientRect(), containerWidth = _node$getBoundingClie2.width, containerHeight = _node$getBoundingClie2.height;
      setContainerSize(containerWidth, containerHeight);
    }
  }, [ref, setContainerSize]);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref: innerRef
  }, props)));
});
var StaticDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref
  }, props)));
});
var NonResponsiveDiv = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height;
  if (typeof width === "string" || typeof height === "string") {
    return /* @__PURE__ */ reactExports.createElement(ReadSizeOnceDiv, _extends$2({}, props, {
      ref
    }));
  }
  if (typeof width === "number" && typeof height === "number") {
    return /* @__PURE__ */ reactExports.createElement(StaticDiv, _extends$2({}, props, {
      width,
      height,
      ref
    }));
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ reactExports.createElement("div", _extends$2({
    ref
  }, props)));
});
function getWrapperDivComponent(responsive) {
  return responsive ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var children = props.children, className = props.className, heightFromProps = props.height, onClick = props.onClick, onContextMenu = props.onContextMenu, onDoubleClick = props.onDoubleClick, onMouseDown = props.onMouseDown, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave, onMouseMove = props.onMouseMove, onMouseUp = props.onMouseUp, onTouchEnd = props.onTouchEnd, onTouchMove = props.onTouchMove, onTouchStart = props.onTouchStart, style = props.style, widthFromProps = props.width, responsive = props.responsive, _props$dispatchTouchE = props.dispatchTouchEvents, dispatchTouchEvents = _props$dispatchTouchE === void 0 ? true : _props$dispatchTouchE;
  var containerRef = reactExports.useRef(null);
  var dispatch = useAppDispatch();
  var _useState5 = reactExports.useState(null), _useState6 = _slicedToArray(_useState5, 2), tooltipPortal = _useState6[0], setTooltipPortal = _useState6[1];
  var _useState7 = reactExports.useState(null), _useState8 = _slicedToArray(_useState7, 2), legendPortal = _useState8[0], setLegendPortal = _useState8[1];
  var setScaleRef = useReportScale();
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
  var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
  var innerRef = reactExports.useCallback((node) => {
    setScaleRef(node);
    if (typeof ref === "function") {
      ref(node);
    }
    setTooltipPortal(node);
    setLegendPortal(node);
    if (node != null) {
      containerRef.current = node;
    }
  }, [setScaleRef, ref, setTooltipPortal, setLegendPortal]);
  var myOnClick = reactExports.useCallback((e) => {
    dispatch(mouseClickAction(e));
    dispatch(externalEventAction({
      handler: onClick,
      reactEvent: e
    }));
  }, [dispatch, onClick]);
  var myOnMouseEnter = reactExports.useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseEnter,
      reactEvent: e
    }));
  }, [dispatch, onMouseEnter]);
  var myOnMouseLeave = reactExports.useCallback((e) => {
    dispatch(mouseLeaveChart());
    dispatch(externalEventAction({
      handler: onMouseLeave,
      reactEvent: e
    }));
  }, [dispatch, onMouseLeave]);
  var myOnMouseMove = reactExports.useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseMove,
      reactEvent: e
    }));
  }, [dispatch, onMouseMove]);
  var onFocus = reactExports.useCallback(() => {
    dispatch(focusAction());
  }, [dispatch]);
  var onBlur = reactExports.useCallback(() => {
    dispatch(blurAction());
  }, [dispatch]);
  var onKeyDown = reactExports.useCallback((e) => {
    dispatch(keyDownAction(e.key));
  }, [dispatch]);
  var myOnContextMenu = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onContextMenu,
      reactEvent: e
    }));
  }, [dispatch, onContextMenu]);
  var myOnDoubleClick = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onDoubleClick,
      reactEvent: e
    }));
  }, [dispatch, onDoubleClick]);
  var myOnMouseDown = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseDown,
      reactEvent: e
    }));
  }, [dispatch, onMouseDown]);
  var myOnMouseUp = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseUp,
      reactEvent: e
    }));
  }, [dispatch, onMouseUp]);
  var myOnTouchStart = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchStart,
      reactEvent: e
    }));
  }, [dispatch, onTouchStart]);
  var myOnTouchMove = reactExports.useCallback((e) => {
    if (dispatchTouchEvents) {
      dispatch(touchEventAction(e));
    }
    dispatch(externalEventAction({
      handler: onTouchMove,
      reactEvent: e
    }));
  }, [dispatch, dispatchTouchEvents, onTouchMove]);
  var myOnTouchEnd = reactExports.useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchEnd,
      reactEvent: e
    }));
  }, [dispatch, onTouchEnd]);
  var WrapperDiv = getWrapperDivComponent(responsive);
  return /* @__PURE__ */ reactExports.createElement(TooltipPortalContext.Provider, {
    value: tooltipPortal
  }, /* @__PURE__ */ reactExports.createElement(LegendPortalContext.Provider, {
    value: legendPortal
  }, /* @__PURE__ */ reactExports.createElement(WrapperDiv, {
    width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
    height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
    className: clsx("recharts-wrapper", className),
    style: _objectSpread$3({
      position: "relative",
      cursor: "default",
      width,
      height
    }, style),
    onClick: myOnClick,
    onContextMenu: myOnContextMenu,
    onDoubleClick: myOnDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown: myOnMouseDown,
    onMouseEnter: myOnMouseEnter,
    onMouseLeave: myOnMouseLeave,
    onMouseMove: myOnMouseMove,
    onMouseUp: myOnMouseUp,
    onTouchEnd: myOnTouchEnd,
    onTouchMove: myOnTouchMove,
    onTouchStart: myOnTouchStart,
    ref: innerRef
  }, /* @__PURE__ */ reactExports.createElement(EventSynchronizer, null), children)));
});
var _excluded$1 = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function _objectWithoutProperties$1(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var CategoricalChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = props.width, height = props.height, responsive = props.responsive, children = props.children, className = props.className, style = props.style, compact = props.compact, title = props.title, desc = props.desc, others = _objectWithoutProperties$1(props, _excluded$1);
  var attrs = svgPropertiesNoEvents(others);
  if (compact) {
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(ReportChartSize, {
      width,
      height
    }), /* @__PURE__ */ reactExports.createElement(RootSurface, {
      otherAttributes: attrs,
      title,
      desc
    }, children));
  }
  return /* @__PURE__ */ reactExports.createElement(RechartsWrapper, {
    className,
    style,
    width,
    height,
    responsive: responsive !== null && responsive !== void 0 ? responsive : false,
    onClick: props.onClick,
    onMouseLeave: props.onMouseLeave,
    onMouseEnter: props.onMouseEnter,
    onMouseMove: props.onMouseMove,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onContextMenu: props.onContextMenu,
    onDoubleClick: props.onDoubleClick,
    onTouchStart: props.onTouchStart,
    onTouchMove: props.onTouchMove,
    onTouchEnd: props.onTouchEnd
  }, /* @__PURE__ */ reactExports.createElement(RootSurface, {
    otherAttributes: attrs,
    title,
    desc,
    ref
  }, /* @__PURE__ */ reactExports.createElement(ClipPathProvider, null, children)));
});
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultMargin$1 = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultCartesianChartProps = _objectSpread$2({
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  layout: "horizontal",
  margin: defaultMargin$1,
  responsive: false,
  reverseStackOrder: false,
  stackOffset: "none",
  syncMethod: "index"
}, initialEventSettingsState);
var CartesianChart = /* @__PURE__ */ reactExports.forwardRef(function CartesianChart2(props, ref) {
  var _categoricalChartProp;
  var rootChartProps = resolveDefaultProps(props.categoricalChartProps, defaultCartesianChartProps);
  var chartName = props.chartName, defaultTooltipEventType = props.defaultTooltipEventType, validateTooltipEventTypes = props.validateTooltipEventTypes, tooltipPayloadSearcher = props.tooltipPayloadSearcher, categoricalChartProps = props.categoricalChartProps;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ reactExports.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
  }, /* @__PURE__ */ reactExports.createElement(ChartDataContextProvider, {
    chartData: categoricalChartProps.data
  }), /* @__PURE__ */ reactExports.createElement(ReportMainChartProps, {
    layout: rootChartProps.layout,
    margin: rootChartProps.margin
  }), /* @__PURE__ */ reactExports.createElement(ReportEventSettings, {
    throttleDelay: rootChartProps.throttleDelay,
    throttledEvents: rootChartProps.throttledEvents
  }), /* @__PURE__ */ reactExports.createElement(ReportChartProps, {
    baseValue: rootChartProps.baseValue,
    accessibilityLayer: rootChartProps.accessibilityLayer,
    barCategoryGap: rootChartProps.barCategoryGap,
    maxBarSize: rootChartProps.maxBarSize,
    stackOffset: rootChartProps.stackOffset,
    barGap: rootChartProps.barGap,
    barSize: rootChartProps.barSize,
    syncId: rootChartProps.syncId,
    syncMethod: rootChartProps.syncMethod,
    className: rootChartProps.className,
    reverseStackOrder: rootChartProps.reverseStackOrder
  }), /* @__PURE__ */ reactExports.createElement(CategoricalChart, _extends$1({}, rootChartProps, {
    ref
  })));
});
var allowedTooltipTypes$4 = ["axis"];
var LineChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "LineChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes$4,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
var allowedTooltipTypes$3 = ["axis", "item"];
var BarChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "BarChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes$3,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
function ReportPolarOptions(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(updatePolarOptions(props));
  }, [dispatch, props]);
  return null;
}
var _excluded = ["layout"];
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultMargin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultPolarChartProps = _objectSpread$1({
  accessibilityLayer: true,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: defaultMargin,
  reverseStackOrder: false,
  syncMethod: "index",
  layout: "radial",
  responsive: false,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, initialEventSettingsState);
var PolarChart = /* @__PURE__ */ reactExports.forwardRef(function PolarChart2(props, ref) {
  var _polarChartProps$id;
  var polarChartProps = resolveDefaultProps(props.categoricalChartProps, defaultPolarChartProps);
  var layout = polarChartProps.layout, otherCategoricalProps = _objectWithoutProperties(polarChartProps, _excluded);
  var chartName = props.chartName, defaultTooltipEventType = props.defaultTooltipEventType, validateTooltipEventTypes = props.validateTooltipEventTypes, tooltipPayloadSearcher = props.tooltipPayloadSearcher;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ reactExports.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_polarChartProps$id = polarChartProps.id) !== null && _polarChartProps$id !== void 0 ? _polarChartProps$id : chartName
  }, /* @__PURE__ */ reactExports.createElement(ChartDataContextProvider, {
    chartData: polarChartProps.data
  }), /* @__PURE__ */ reactExports.createElement(ReportMainChartProps, {
    layout,
    margin: polarChartProps.margin
  }), /* @__PURE__ */ reactExports.createElement(ReportEventSettings, {
    throttleDelay: polarChartProps.throttleDelay,
    throttledEvents: polarChartProps.throttledEvents
  }), /* @__PURE__ */ reactExports.createElement(ReportChartProps, {
    baseValue: void 0,
    accessibilityLayer: polarChartProps.accessibilityLayer,
    barCategoryGap: polarChartProps.barCategoryGap,
    maxBarSize: polarChartProps.maxBarSize,
    stackOffset: polarChartProps.stackOffset,
    barGap: polarChartProps.barGap,
    barSize: polarChartProps.barSize,
    syncId: polarChartProps.syncId,
    syncMethod: polarChartProps.syncMethod,
    className: polarChartProps.className,
    reverseStackOrder: polarChartProps.reverseStackOrder
  }), /* @__PURE__ */ reactExports.createElement(ReportPolarOptions, {
    cx: polarChartProps.cx,
    cy: polarChartProps.cy,
    startAngle: polarChartProps.startAngle,
    endAngle: polarChartProps.endAngle,
    innerRadius: polarChartProps.innerRadius,
    outerRadius: polarChartProps.outerRadius
  }), /* @__PURE__ */ reactExports.createElement(CategoricalChart, _extends({}, otherCategoricalProps, {
    ref
  })));
});
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var allowedTooltipTypes$2 = ["item"];
var defaultPieChartProps = _objectSpread(_objectSpread({}, defaultPolarChartProps), {}, {
  layout: "centric",
  startAngle: 0,
  endAngle: 360
});
var PieChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var propsWithDefaults = resolveDefaultProps(props, defaultPieChartProps);
  return /* @__PURE__ */ reactExports.createElement(PolarChart, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: allowedTooltipTypes$2,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: propsWithDefaults,
    ref
  });
});
var allowedTooltipTypes$1 = ["axis"];
var AreaChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "AreaChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes$1,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
var allowedTooltipTypes = ["axis"];
var ComposedChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "ComposedChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
export {
  AreaChart as A,
  BarChart as B,
  CartesianGrid as C,
  LineChart as L,
  PieChart as P,
  ReferenceLine as R,
  Tooltip as T,
  XAxis as X,
  YAxis as Y,
  Area as a,
  Pie as b,
  Cell as c,
  Line as d,
  Bar as e,
  ComposedChart as f,
  Legend as g,
  LabelList as h,
  ResponsiveContainer as i
};
