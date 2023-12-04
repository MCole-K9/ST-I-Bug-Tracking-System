import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve  }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);

	const session = await event.locals.auth.validate()

	if (session) {

		if(event.url.pathname === '/login' || event.url.pathname === '/register'){
			throw redirect(301, '/dashboard')
		}
		
	}else{

		if(event.url.pathname !== '/login' && event.url.pathname !== '/register'){
			throw redirect(301, '/login')
		}
	}

	return await resolve(event);
};