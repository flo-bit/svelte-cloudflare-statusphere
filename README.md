# svelte atproto client oauth demo

try it here: http://flo-bit.dev/svelte-atproto-client-oauth/

this is a scaffold for how to get client side oauth working with sveltekit and atproto
using the [`atcute`](https://github.com/mary-ext/atcute) libraries.

useful when you want people to login with atproto to your static sveltekit site.

## how to install

### either clone this repo

1. clone this repo
2. run `pnpm install`
3. run `pnpm run dev`
4. go to `http://127.0.0.1:5179`
5. if necessary change base in `svelte.config.js`

```js
const config = {
	// ...

	kit: {
		// ...

		paths: {
			base: process.env.NODE_ENV === 'development' ? '' : '/svelte-atproto-client-oauth'
		}
	}
};
```

6. change the SITE in `$lib/atproto/settings.ts` to your website

7. setup the correct permissions (see below)

### or manually install in your own project

1. copy the `src/lib/atproto` folder into your own project
2. also copy the `src/routes/oauth-client-metadata.json` folder into your project
3. initialize the client in your `src/routes/+layout.svelte`

```svelte
<script>
	import { initClient } from '$lib/atproto';

	let { children } = $props();

	onMount(() => {
		initClient();
	});
</script>

{@render children()}
```

4. add server and port to your `vite.config.ts`

```js
export default defineConfig({
	server: {
		host: '127.0.0.1',
		port: 5179
	}
});
```

5. install the dependencies

```bash
npm install @atcute/atproto @atcute/bluesky @atcute/identity-resolver @atcute/lexicons @atcute/oauth-browser-client @atcute/client
```

6. (optionally) set your base in `svelte.config.js` (e.g. for github pages: `base: '/your-repo-name/'`) while keeping it as `''` in development.


```ts
const config = {
	// ...

	kit: {
		// ...

		paths: {
			base: process.env.NODE_ENV === 'development' ? '' : '/svelte-atproto-client-oauth'
		}
	}
};
```

6. change the SITE in `$lib/atproto/settings.ts` to your website

7. setup the correct permissions (see below)


## how to use

### set permissions you request on sign-in in `$lib/atproto/settings.ts` (see commented out examples for more info)

- add collections to the collections array
- add rpcs to rpcCalls
- blobs for uploading blobs

### change sign up pds

If you want to allow sign-up, change the `signUpPDS` variable in `$lib/atproto/settings.ts` to a pds of your choice

ATTENTION: the current setting (pds.rip) is only for development, all accounts get deleted automatically after a week

### login flow

Either use the `LoginModal` component to render a login modal or use the `user` object to handle the login flow yourself.

```ts
// handlin login flow yourself
import { user } from '$lib/atproto';

// methods:
user.login(handle);
user.signup();
user.isLoggedIn;
user.logout();
```

LoginModal is a component that renders a login modal, add it for a quick login flow (needs tailwind).
(copy the `src/lib/UI` folder into your projects `src/lib` folder, add the `src/app.css` content to your `app.css`)

```svelte
<script>
	import { LoginModal, loginModalState } from '$lib/atproto';
</script>

<LoginModal />

<button onclick={() => loginModalState.show()}>Show Login Modal</button>
```

### make requests

Get the user's profile and make requests with the `user.client` object.

```ts
import { user } from '$lib/atproto';

// make requests with the user.client object
// this example needs the getActorLikes rpc permission, set permissions
const response = await user.client.get('app.bsky.feed.getActorLikes', {
	params: {
		actor: client.did,
		limit: 10
	}
});
```
