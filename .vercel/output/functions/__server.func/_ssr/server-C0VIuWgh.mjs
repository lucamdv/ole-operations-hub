import { d as getRequestHeader, e as getRequestHost, b as getRequest, S as StartServer } from "./server-BxlZVXOU.mjs";
import { H, f, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G } from "./server-BxlZVXOU.mjs";
import { w as defineHandlerCallback } from "../_libs/tanstack__router-core.mjs";
import { E as E2, W, v as v2, t as t2 } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as renderRouterToString } from "../_libs/tanstack__react-router.mjs";
import "../_libs/seroval.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "stream";
import "crypto";
import "../_libs/isbot.mjs";
var defaultRenderHandler = defineHandlerCallback(({ router, responseHeaders }) => renderRouterToString({
  router,
  responseHeaders,
  children: /* @__PURE__ */ jsxRuntimeExports.jsx(StartServer, { router })
}));
var VIRTUAL_MODULES = {
  startManifest: "tanstack-start-manifest:v",
  serverFnResolver: "#tanstack-start-server-fn-resolver",
  pluginAdapters: "#tanstack-start-plugin-adapters"
};
export {
  H as HEADERS,
  StartServer,
  VIRTUAL_MODULES,
  E2 as attachRouterServerSsrUtils,
  f as clearResponseHeaders,
  h as clearSession,
  W as createRequestHandler,
  i as createStartHandler,
  defaultRenderHandler,
  j as defaultStreamHandler,
  defineHandlerCallback,
  k as deleteCookie,
  l as getCookie,
  m as getCookies,
  getRequest,
  getRequestHeader,
  n as getRequestHeaders,
  getRequestHost,
  o as getRequestIP,
  p as getRequestProtocol,
  q as getRequestUrl,
  r as getResponse,
  s as getResponseHeader,
  t as getResponseHeaders,
  u as getResponseStatus,
  v as getSession,
  w as getValidatedQuery,
  x as removeResponseHeader,
  y as requestHandler,
  z as sealSession,
  A as setCookie,
  B as setResponseHeader,
  C as setResponseHeaders,
  D as setResponseStatus,
  v2 as transformPipeableStreamWithRouter,
  t2 as transformReadableStreamWithRouter,
  E as unsealSession,
  F as updateSession,
  G as useSession
};
