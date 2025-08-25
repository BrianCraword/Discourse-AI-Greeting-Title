import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class AiGreeting extends Component {
  @service currentUser;

  get firstName() {
    const raw =
      this.currentUser?.name ||
      this.currentUser?.username ||
      "Guest";
    return String(raw).split(" ")[0];
  }
}
