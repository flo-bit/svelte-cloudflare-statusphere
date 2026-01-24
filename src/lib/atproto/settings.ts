export const SITE = 'https://flo-bit.dev';

// optionally add action=create/update/delete to only allow those actions for a collection
export const collections: string[] = ['xyz.statusphere.status'];
// example: only allow create and delete
// export const collections: string[] = ['xyz.statusphere.status?action=create&action=update'];

export const rpcCalls: Record<string, string | string[]> = {
	// example: allow authenticated proxying to bsky appview to get a users liked posts
	//'did:web:api.bsky.app#bsky_appview': ['app.bsky.feed.getActorLikes']
	// https://docs.bsky.app/docs/api/app-bsky-feed-get-actor-likes
};

export const blobs = [] as string | string[] | undefined;

// example: allowing video and html uploads
// export const blobs = ['video/*', 'text/html'] as string | string[] | undefined;

// example: allowing all blob types
// export const blobs = ['*/*'] as string | string[] | undefined;

// which PDS to use for signup
// ATTENTION: pds.rip is only for development, all accounts get deleted automatically after a week
export const signUpPDS = 'https://pds.rip/';
