import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  api.renderInOutlet("ai-bot-conversations-above-input", "ai-greeting");
});
