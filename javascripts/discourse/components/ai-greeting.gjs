import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class AiGreeting extends Component {
  @service currentUser;

  get greeting() {
    // Use the user's name or username, defaulting to "Guest"
    const rawName = this.currentUser?.name || this.currentUser?.username || "Guest";
    // Get just the first name
    const firstName = rawName.split(" ")[0];
    return `Hello, ${firstName}`;
  }
}
<template>
  <div class="custom-ai-greeting">
    <h1>{{this.greeting}}</h1>
  </div>
</template>
