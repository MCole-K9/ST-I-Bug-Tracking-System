import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { registerSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$server/lucia';

export const load = (async () => {
    return {
        form: superValidate(registerSchema)
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({locals, request}) => {

        const form = await superValidate(request, registerSchema);
        console.log('POST', form);
    
        // Convenient validation check:
        if (!form.valid) {
          // Again, return { form } and things will just work.
          return fail(400, { form });
        }
    
        // TODO: Do something with the validated form.data

        const user = await auth.createUser({
            key: {
                providerId: 'email',
                providerUserId: form.data.email,
                password: form.data.password
            },
            attributes: {
                email: form.data.email,
                first_name: form.data.first_name,
                last_name: form.data.last_name

            }
        })

        
        
        // Redirect to the login page
        throw redirect(301, "/login")
    }
};
