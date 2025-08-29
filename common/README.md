# Discourse AI Greeting Title Theme Component

This theme component personalizes the title on the Discourse AI conversations page (requires the official Discourse AI plugin). It replaces the default title with a greeting like "Hello, [First Name]" (or "Hello, Guest" for visitors) and applies responsive styling.

## Features
- Personalized greeting using the user's name or username.
- Customizable greeting template via theme settings (e.g., "Hi, {name}!").
- Responsive font sizing for mobile and desktop.
- Optional debug logging.
- Ties into your site's color scheme (assumes `--vc-*` variables from base theme).

## Installation
1. In your Discourse admin panel: Admin > Customize > Themes > Components > Add Component > Install > From Git.
2. Enter the repo URL: `https://github.com/BrianCraword/Discourse-AI-Greeting-Title.git`.
3. Enable the component on your active theme.
4. (Optional) Customize settings in Admin > Customize > Themes > [Your Theme] > Components > AI Greeting Title > Settings.

## Customization
- **Greeting Template**: Change the text format (uses `{name}` placeholder).
- **Enable Logging**: Toggle console logs for debugging.

## Compatibility
- Requires Discourse 3.0+ and the official Discourse AI plugin.
- Tested on self-hosted setups (Docker on Ubuntu).

## Development
- Clone the repo: `git clone https://github.com/BrianCraword/Discourse-AI-Greeting-Title.git`.
- Make changes and push updates.
- For local testing, use the Discourse Theme CLI: https://meta.discourse.org/t/beginners-guide-to-using-discourse-themes/93648.

If you encounter issues, check the browser console or open an issue on this repo.

License: MIT (see LICENSE file if added).
