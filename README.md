# Waltz Flight Assistant Plugin

Book flights end to end, in conversation.

Waltz learns your preferences and traveler info over time, so you stop re-entering everything.

No more 14 tabs and a spreadsheet.

This package bundles:

- `flight_assistant` for conversational flight search, booking retrieval, Stripe card setup handoff, booking approval, and booking completion
- a bundled skill that teaches the correct Stripe saved-card flow

## Install

Today, the verified install path is a local source install from this standalone repo:

```bash
openclaw plugins install -l .
```

Once the ClawHub package is published, the end-user install path becomes:

```bash
openclaw plugins install @waltzlabs/flight-assistant-plugin
```

Or explicitly through ClawHub:

```bash
openclaw plugins install clawhub:@waltzlabs/flight-assistant-plugin
```

The published package does not exist until the ClawHub publish step is completed. Use the linked local install above until then.

## Configure

Set the hosted flight agent URL in `openclaw.json`:

```json
{
  "plugins": {
    "entries": {
      "waltz-flight-assistant": {
        "enabled": true,
        "config": {
          "baseUrl": "https://waltz-flight-staging.up.railway.app"
        }
      }
    }
  }
}
```

Use `https://waltz-flight-staging.up.railway.app` unless Waltz provides a different deployment URL.

If you previously installed this plugin under the old `flight-agent` id, move your config to `plugins.entries.waltz-flight-assistant` before restarting OpenClaw.

Optional plugin config:

- `authToken`: bearer token for protected hosted deployments
- `openclawId`: preferred stable OpenClaw user id forwarded to the hosted agent
- `userId`: legacy alias for `openclawId`
- `requestTimeoutMs`: HTTP timeout in milliseconds

Restart OpenClaw or start a new session after configuration changes.

## Distribution verification

For release and clean-room install checks, use the checklist in [docs/distribution-checklist.md](./docs/distribution-checklist.md).

Convenience commands from this repo:

```bash
bun run verify:publish-dry-run
bun run verify:cleanroom-install
```

## Booking flow

1. Use `flight_assistant` for search, flight selection, and passenger details.
2. Only after the user is ready to book, let `flight_assistant` check whether a saved card exists.
3. If no saved card exists, send the Stripe-hosted setup link returned by `flight_assistant`.
4. After setup, return to `flight_assistant` and ask for explicit approval to charge the saved card.
5. If the bank requires customer authentication, send the hosted authentication link returned by `flight_assistant`.

Hard rules:

- The merchant is the AI Flight Assistant, not the airline.
- Do not ask for payment setup during browsing or comparison.
- Do not ask for a specific wallet or off-platform payment flow.

## Booking retrieval

Use the same `flight_assistant` tool for post-booking questions such as:

- `What flights do I have coming up?`
- `Show my bookings`
- `What is my booking reference for Shanghai?`

The hosted backend handles booking recall from stored bookings for the current OpenClaw user identity.

## Publish

ClawHub plugin packages use the package publish flow:

```bash
bunx clawhub package publish WaltzOfWhispers/waltz-flight-assistant-plugin --dry-run
bunx clawhub package publish WaltzOfWhispers/waltz-flight-assistant-plugin
```

This repository is the standalone source for the Waltz Flight Assistant OpenClaw plugin. Update the GitHub owner or package metadata if you publish it from a different org or account.
