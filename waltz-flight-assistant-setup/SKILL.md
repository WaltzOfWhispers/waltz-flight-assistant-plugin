---
name: waltz-flight-assistant-setup
description: Set up Waltz Flight Assistant to book flights end to end, in conversation. Use when the plugin needs to be installed, configured, repaired, or pointed at the hosted Waltz backend.
metadata:
  {
    "openclaw":
      {
        "requires": { "bins": ["openclaw"] },
      },
  }
---

# Waltz Flight Assistant Setup

Install and configure the Waltz Flight Assistant plugin before trying to route flight work through it.

This setup changes the user's OpenClaw environment:
- it may install a new plugin package
- it updates `~/.openclaw/openclaw.json`
- it points the plugin at a hosted Waltz backend
- it restarts the OpenClaw gateway

Before making those changes, summarize them and get the user's approval.

## Setup workflow

1. Tell the user exactly what you are about to change and confirm they want to continue.
2. Check whether the plugin is already installed and loaded:
   - `openclaw plugins inspect waltz-flight-assistant --json`
3. If the plugin is missing, install it:
   - `openclaw plugins install clawhub:@waltzlabs/flight-assistant-plugin`
4. If the plugin is installed, confirm the publisher, version, and source look correct before continuing.
   - expected package: `@waltzlabs/flight-assistant-plugin`
   - expected plugin id: `waltz-flight-assistant`
5. If the plugin was just installed, restart OpenClaw before editing config or testing flight requests.
6. Back up `~/.openclaw/openclaw.json` before changing it.
7. Explain that the hosted backend is `https://waltz-flight-staging.up.railway.app` and confirm the user wants to point Waltz at that endpoint.
8. Update `~/.openclaw/openclaw.json` so `plugins.entries.waltz-flight-assistant` exists with:

```json
{
  "enabled": true,
  "config": {
    "baseUrl": "https://waltz-flight-staging.up.railway.app"
  }
}
```

9. Restart the gateway after writing or changing `baseUrl`:
   - `openclaw gateway restart`
10. Verify the config took effect:
   - `openclaw plugins inspect waltz-flight-assistant --json`
   - confirm the plugin is loaded and the config entry exists

## Runtime rules

- This skill is for setup and repair only.
- Do not use this skill to search flights, book flights, continue payment setup, or continue authentication flows.
- Use published plugin package `clawhub:@waltzlabs/flight-assistant-plugin` for installs.
- Use plugin id `waltz-flight-assistant` for config.
- Use `https://waltz-flight-staging.up.railway.app` as the default `baseUrl` unless Waltz provides a different deployment.
- If OpenClaw says the Waltz config is being ignored, restart first and then apply the config change again.
- After any `baseUrl` change, restart the gateway before testing the plugin.
- Prefer updating the config directly only after describing the exact change, backing up the file, and getting the user's approval.

## After setup

- Hand off to the installed Waltz plugin for flight requests.
- Remind the user that Waltz can search, book, and retrieve flights through the hosted backend.
- Make clear that any booking, payment setup, charge approval, or authentication step still requires explicit user confirmation in the main flight flow.

## If setup is incomplete

- If the plugin is not loaded in the current session, tell the user exactly what remains:
  - install plugin
  - restart OpenClaw
  - apply Waltz config
  - restart the gateway
  - retry the flight request
- Keep the explanation short and concrete. Do not send the user to local repo paths.
