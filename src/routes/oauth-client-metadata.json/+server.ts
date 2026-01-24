import { metadata } from '$lib/atproto';
import { json } from '@sveltejs/kit';

export const prerender = true;

export async function GET() {
	return json(metadata);
}
