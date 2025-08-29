import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.11.1", (api) => {
  const log = (...a) => console.log("[ai-greeting]", ...a);

  function applyGreeting() {
    const el = document.querySelector(".ai-bot-conversations__title");
    if (!el) return; // Not on the AI page yet

    const user = api.getCurrentUser?.();
    const raw = user?.name || user?.username || "Guest";
    const first = raw.split(" ")[0];
    const desired = `Hello, ${first}`; // Fixed template literal with backticks

    if (el.textContent !== desired) {
      el.textContent = desired;
      log("Set title to:", desired);
    }
  }

  // Run on SPA navigations
  api.onPageChange(() => {
    log("page change");
    setTimeout(applyGreeting, 0);
  });

  // Catch re-renders of the conversations area (target main outlet for efficiency)
  const mainOutlet = document.querySelector("#main-outlet");
  if (mainOutlet) {
    const mo = new MutationObserver(applyGreeting);
    mo.observe(mainOutlet, { childList: true, subtree: true });
  } else {
    // Fallback to body if main-outlet not found
    const mo = new MutationObserver(applyGreeting);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // First run
  applyGreeting();
});
