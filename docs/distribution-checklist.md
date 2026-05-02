# Waltz Flight Assistant Distribution Checklist

Use this before publishing a new plugin version or declaring a clean-room install verified.

## Current status

- Standalone source of truth: `/Users/christycui/Documents/waltz-flight-assistant-plugin`
- GitHub repo: `WaltzOfWhispers/waltz-flight-assistant-plugin`
- ClawHub package name: `@waltzlabs/flight-assistant-plugin`
- Manifest/config key: `waltz-flight-assistant`
- Current hosted backend: `https://waltz-flight-staging.up.railway.app`

As of 2026-05-02:

- ClawHub publish dry-run succeeds.
- Clean-room local link install succeeds against OpenClaw `2026.4.21`.
- ClawHub package is published at `@waltzlabs/flight-assistant-plugin@0.1.4`.
- Public install and config should point at `https://waltz-flight-staging.up.railway.app`.

## Local verification

From the plugin repo:

```bash
bun install
bun run typecheck
bun run verify:publish-dry-run
bun run verify:cleanroom-install
```

What `verify:cleanroom-install` proves:

- OpenClaw can install the plugin into a fresh home directory.
- OpenClaw writes the expected config entry under `plugins.entries.waltz-flight-assistant`.
- The plugin creates its persisted `openclaw-id.txt` state on first load.

## Publish/update flow

1. Authenticate:

```bash
bunx clawhub login
bunx clawhub whoami
```

2. Re-run the dry-run:

```bash
bun run verify:publish-dry-run
```

3. Publish the GitHub repo:

```bash
bunx clawhub package publish WaltzOfWhispers/waltz-flight-assistant-plugin
```

4. Verify the published package:

```bash
bunx clawhub package inspect @waltzlabs/flight-assistant-plugin
```

## Public install path

End users should install from ClawHub:

```bash
bunx openclaw plugins install @waltzlabs/flight-assistant-plugin
```

Then restart OpenClaw before editing config.

Configure `openclaw.json` with:

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

If OpenClaw warns that the config is ignored, restart first and then apply the config change again.

## First-run clean-room check

Validate the actual end-user path on a clean OpenClaw home:

```bash
TMP_HOME=$(mktemp -d /tmp/waltz-openclaw-published.XXXXXX)
HOME="$TMP_HOME" bunx openclaw plugins install @waltzlabs/flight-assistant-plugin
```

Then restart OpenClaw, configure:

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

Finally, restart the gateway and manually verify:

- a fresh search request works
- payment setup link is returned when no saved card exists
- post-booking retrieval works
- the first successful booking attempt completes end to end
