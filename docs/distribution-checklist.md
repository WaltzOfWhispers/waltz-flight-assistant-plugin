# Waltz Flight Assistant Distribution Checklist

Use this before publishing a new plugin version or declaring a clean-room install verified.

## Current status

- Standalone source of truth: `/Users/christycui/Documents/waltz-flight-assistant-plugin`
- GitHub repo: `WaltzOfWhispers/waltz-flight-assistant-plugin`
- ClawHub package name: `@waltzlabs/flight-assistant-plugin`
- Manifest/config key: `waltz-flight-assistant`

As of 2026-05-01:

- ClawHub publish dry-run succeeds.
- Clean-room local link install succeeds against OpenClaw `2026.4.21`.
- The ClawHub package is not published yet.

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

## Publish flow

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

4. Verify the package exists:

```bash
bunx clawhub package inspect @waltzlabs/flight-assistant-plugin
```

## First-run install check

After the package is published, validate the actual end-user path on a clean OpenClaw home:

```bash
TMP_HOME=$(mktemp -d /tmp/waltz-openclaw-published.XXXXXX)
HOME="$TMP_HOME" bunx openclaw plugins install clawhub:@waltzlabs/flight-assistant-plugin
```

Then configure:

```json
{
  "plugins": {
    "entries": {
      "waltz-flight-assistant": {
        "enabled": true,
        "config": {
          "baseUrl": "https://your-hosted-backend.example.com"
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
