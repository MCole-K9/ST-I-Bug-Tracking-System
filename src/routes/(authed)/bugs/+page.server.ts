import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createBugSchema } from './schema';
import prisma from '$server/prisma';
import { fail } from '@sveltejs/kit';

export const load = (async ({url, locals}) => {


    let project_id = url.searchParams.get("project");
    return {
        form: superValidate({project_id: project_id ?? "", user_id: (await locals.auth.validate())?.user.userId }, createBugSchema )
    };
}) satisfies PageServerLoad;





export const actions: Actions = {
    createBug: async ({request, locals}) => {


        console.log("HIt");
        
        const form = await superValidate(request, createBugSchema);

        if(form.valid) {
            // do something with form.data
            await prisma.bug.create({
                data: {
                    name: form.data.name,
                    description: form.data.description,
                    status: form.data.status,
                    priority: form.data.priority,
                    severity: form.data.severity,
                    project: {
                        connect: {
                            id: form.data.project_id
                        }
                    },
                    user: {
                        connect: {
                            id: form.data.user_id
                        }
                    },
                   
                    
                }
            })
        }else{
            // do something with form.errors
            return fail(400, {form})
        }
    }
};