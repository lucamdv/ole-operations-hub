function registerSW(options = {}) {
  const {
    immediate = false,
    onNeedReload,
    onNeedRefresh,
    onOfflineReady,
    onRegistered,
    onRegisteredSW,
    onRegisterError
  } = options;
  let wb;
  let registerPromise;
  const updateServiceWorker = async (_reloadPage = true) => {
    await registerPromise;
  };
  async function register() {
    if ("serviceWorker" in navigator) {
      wb = await import("./workbox-window.prod.es5-BAA1jQbh.mjs").then(({ Workbox }) => {
        return new Workbox("/sw.js", { scope: "/", type: "classic" });
      }).catch((e) => {
        onRegisterError?.(e);
        return void 0;
      });
      if (!wb)
        return;
      {
        {
          wb.addEventListener("activated", (event) => {
            if (event.isUpdate || event.isExternal) {
              if (onNeedReload)
                onNeedReload();
              else
                window.location.reload();
            }
          });
          wb.addEventListener("installed", (event) => {
            if (!event.isUpdate) {
              onOfflineReady?.();
            }
          });
        }
      }
      wb.register({ immediate }).then((r) => {
        if (onRegisteredSW)
          onRegisteredSW("/sw.js", r);
        else
          onRegistered?.(r);
      }).catch((e) => {
        onRegisterError?.(e);
      });
    }
  }
  registerPromise = register();
  return updateServiceWorker;
}
export {
  registerSW
};
