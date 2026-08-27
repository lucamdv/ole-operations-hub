import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tanstackStart(),
    nitro({
      vercel: {
        functions: {
          maxDuration: "max",
        },
      },
    }),
    viteReact(),
    tailwindcss(),
    VitePWA({
      strategies: "generateSW",
      registerType: "autoUpdate",
      filename: "sw.js",
      injectRegister: null,
      devOptions: { enabled: false },
      manifest: false,
      workbox: {
        globDirectory: ".output/public",
        globPatterns: ["**/*.{js,css,woff2,png,svg,webmanifest}"],
        navigateFallback: "/",
        navigateFallbackDenylist: [/^\/~oauth/, /^\/api\//, /^\/auth\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "olex-html",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 32 },
            },
          },
          {
            urlPattern: ({ url, request }) =>
              url.origin === self.location.origin &&
              /\.(?:js|css|woff2|png|svg|ico)$/.test(url.pathname) &&
              request.destination !== "document",
            handler: "CacheFirst",
            options: {
              cacheName: "olex-assets",
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
});
