const WEBHOOK_MODE_KEY = "ole.webhook.mode.v1";
const DEFAULT_WEBHOOK_MODE = "production";
function resolveWebhookUrl(url, mode) {
  if (!mode) return url;
  if (mode === "production") return url.replace("/webhook-test/", "/webhook/");
  return url.includes("/webhook-test/") ? url : url.replace("/webhook/", "/webhook-test/");
}
export {
  DEFAULT_WEBHOOK_MODE as D,
  WEBHOOK_MODE_KEY as W,
  resolveWebhookUrl as r
};
