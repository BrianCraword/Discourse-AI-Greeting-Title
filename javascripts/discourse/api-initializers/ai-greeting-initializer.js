import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  // Render our component into the AI plugin outlet
  api.renderInOutlet("ai-bot-conversations-above-input", "ai-greeting");
});
