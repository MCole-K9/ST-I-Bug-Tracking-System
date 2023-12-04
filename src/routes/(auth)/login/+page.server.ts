import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$server/lucia';

export const load = (async () => {
    return {
        form: superValidate(loginSchema)
    };
}) satisfies PageServerLoad;



export const actions: Actions = {
    default: async ({ locals, request }) => {


        const form = await superValidate(request, loginSchema);

        // Convenient validation check:
        if (!form.valid) {
            // Again, return { form } and things will just work.
            return fail(400, { form });
        }

        // TODO: Do something with the validated form.data


        const key  = await auth.useKey("email", form.data.email, form.data.password)

        const session = await auth.createSession({
            userId: key.userId,
            attributes: {}
        });


        locals.auth.setSession(session)


        throw redirect(301, "/dashboard")
    }
};