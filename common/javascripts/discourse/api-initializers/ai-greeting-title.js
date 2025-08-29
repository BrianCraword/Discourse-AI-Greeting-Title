import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const settings = api.container.lookup("service:site-settings");

  const log = settings.enable_logging
    ? (...args) => console.log("[ai-greeting]", ...args)
    : () => {};

  function applyGreeting() {
    const el = document.querySelector(".ai-bot-conversations__title");
    if (!el) return; // Not on the AI page yet

    let user;
    try {
      user = api.getCurrentUser?.();
    } catch (e) {
      log("Error getting user:", e);
      user = null;
    }

    const raw = user?.name || user?.username || "Guest";
    const first = raw.split(" ")[0];
    const template = settings.greeting_template || "Hello, {name}";
    const desired = template.replace("{name}", first);

    if (el.textContent !== desired) {
      el.textContent = desired;
      log("Set title to:", desired);
    }
  }

  // Run on SPA navigations
  api.onPageChange(() => {
    log("Page change detected");
    setTimeout(applyGreeting, 0);
  });

  // Catch re-renders (observe main outlet for efficiency)
  const mainOutlet = document.querySelector("#main-outlet");
  if (mainOutlet) {
    const mo = new MutationObserver(applyGreeting);
    mo.observe(mainOutlet, { childList: true, subtree: true });
  }

  // First run
  applyGreeting();
});
