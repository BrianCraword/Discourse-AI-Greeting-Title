common/javascripts/discourse/api-initializers/ai-greeting-title.js
import { apiInitializer } from “discourse/lib/api”;

export default apiInitializer(“0.11.1”, (api) => {
const log = (…a) => console.log(“[ai-greeting]”, …a);

// Try multiple potential selectors to survive DOM/class changes
const titleSelectors = [
“.ai-bot-conversations__title”, // original
“.ai-bot-conversations__header .ai-bot-conversations__title”,
“[data-ai-conversations-title]”, // hypothetical attr if added
“h1.ai-title, .ai-title”, // generic fallback
];

function findTitleEl() {
for (const sel of titleSelectors) {
const el = document.querySelector(sel);
if (el) return el;
}
return null;
}

function isOnAIPage() {
// Body has special classes when on AI pages; keep it permissive
return (
document.body.classList.contains(“ai-bot-conversations-page”) ||
document.querySelector(“.discourse-ai, .ai-bot-conversations__header, .ai-conversations-panel”)
);
}

function applyGreeting() {
if (!isOnAIPage()) return;

const el = findTitleEl();
if (!el) return;

const user = api.getCurrentUser?.();
const raw = user?.name || user?.username || "Guest";
const first = String(raw).split(" ")[0] || "Guest";
const desired = `Hello, ${first}`;

if (el.textContent !== desired) {
  el.textContent = desired;
  log("Set title to:", desired);
}
}

// Run on SPA navigations
api.onPageChange(() => {
log(“page change”);
// Defer so DOM has time to render after route change
setTimeout(applyGreeting, 0);
setTimeout(applyGreeting, 150);
setTimeout(applyGreeting, 600);
});

// Observe entire body to catch late renders or widget swaps
const mo = new MutationObserver(() => applyGreeting());
mo.observe(document.body, { childList: true, subtree: true });

// First runs
applyGreeting();
setTimeout(applyGreeting, 250);
setTimeout(applyGreeting, 1000);
});
