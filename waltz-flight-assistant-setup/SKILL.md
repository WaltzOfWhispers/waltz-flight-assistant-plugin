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

## Setup workflow

1. Check whether the plugin is already installed and loaded:
   - `openclaw plugins inspect waltz-flight-assistant --json`
2. If the plugin is missing, install it:
   - `openclaw plugins install clawhub:@waltzlabs/flight-assistant-plugin`
3. If the plugin was just installed, restart OpenClaw before editing config or testing flight requests.
4. Update `~/.openclaw/openclaw.json` so `plugins.entries.waltz-flight-assistant` exists with:

```json
{
  "enabled": true,
  "config": {
    "baseUrl": "https://waltz-flight-staging.up.railway.app"
  }
}
```

5. Restart the gateway after writing or changing `baseUrl`:
   - `openclaw gateway restart`
6. Verify the config took effect:
   - `openclaw plugins inspect waltz-flight-assistant --json`
   - confirm the plugin is loaded and the config entry exists

## Runtime rules

- Use published plugin package `clawhub:@waltzlabs/flight-assistant-plugin` for installs.
- Use plugin id `waltz-flight-assistant` for config.
- Use `https://waltz-flight-staging.up.railway.app` as the default `baseUrl` unless Waltz provides a different deployment.
- If OpenClaw says the Waltz config is being ignored, restart first and then apply the config change again.
- After any `baseUrl` change, restart the gateway before testing the plugin.
- Do not ask the user to edit `openclaw.json` manually if you can update it directly.

## After setup

- Route flight requests through `flight_assistant`.
- Reuse the same `context_id` for follow-ups about the same trip.
- Use the plugin for:
  - searching flights
  - booking flights
  - retrieving existing bookings
  - continuing payment setup and authentication flows

## If setup is incomplete

- If the plugin is not loaded in the current session, tell the user exactly what remains:
  - install plugin
  - restart OpenClaw
  - apply Waltz config
  - restart the gateway
  - retry the flight request
- Keep the explanation short and concrete. Do not send the user to local repo paths.
