# svelte atproto cloudflare workers oauth

SvelteKit + AT Protocol OAuth on Cloudflare Workers. Server-side OAuth with `@atcute/oauth-node-client`, Cloudflare KV for session/state storage, and SvelteKit remote functions for type-safe client-server communication.

## Quick Start

```sh
pnpm install
pnpm dev
```

Dev mode uses a loopback OAuth client — no keys or Cloudflare setup needed. Open http://127.0.0.1:5183 and log in with any Bluesky handle.

See [GETTING_STARTED.md](GETTING_STARTED.md) for production deployment, tunnel setup, and configuration.

## Adding to an existing project

**With an AI agent** — paste this into Claude Code (or similar) in your existing repo:

```
add atproto oauth to this project https://raw.githubusercontent.com/flo-bit/svelte-atproto-oauth-cloudflare-workers/main/AGENT_SETUP.md
```

The [agent prompt](AGENT_SETUP.md) asks a few questions and sets everything up.

**Manually** — see [SETUP.md](SETUP.md) for a step-by-step guide.

## Project Structure

```
src/lib/atproto/
├── auth.svelte.ts          # Client-side auth state & login/logout/signup
├── index.ts                # Public exports
├── metadata.ts             # OAuth scope from permissions
├── methods.ts              # AT Protocol helpers (read/write/resolve)
├── settings.ts             # Permissions config, constants
├── server/
│   ├── oauth.ts            # OAuthClient factory (loopback vs confidential)
│   ├── oauth.remote.ts     # Remote functions: login, logout
│   ├── repo.remote.ts      # Remote functions: putRecord, deleteRecord, uploadBlob
│   ├── session.ts          # Session restoration from signed cookie
│   ├── profile.ts          # Profile loading with optional KV cache
│   ├── kv-store.ts         # Cloudflare KV-backed Store
│   └── signed-cookie.ts    # HMAC-signed cookie helpers
└── scripts/
    ├── generate-key.ts
    ├── generate-secret.ts
    └── setup-dev.ts

src/routes/(oauth)/
├── oauth/callback/+server.ts
├── oauth/jwks.json/+server.ts
└── oauth-client-metadata.json/+server.ts
```

## How It Works

- **Auth**: Server-side OAuth via `@atcute/oauth-node-client`. Sessions stored in KV, identified by HMAC-signed `did` cookie.
- **Remote functions**: Write operations and auth actions use SvelteKit remote functions — type-safe server calls without manual API routes.
- **Dev mode**: Loopback client by default. Set `OAUTH_PUBLIC_URL` in `.env` for confidential client via tunnel.
- **Prod mode**: Confidential client with `private_key_jwt`, KV stores, `OAUTH_PUBLIC_URL` from `wrangler.jsonc`.

## License

MIT
