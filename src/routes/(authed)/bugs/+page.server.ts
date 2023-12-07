import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createBugSchema } from './schema';
import prisma from '$server/prisma';
import { fail } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';
import { Bug } from 'lucide-svelte';
import { BugService } from './BugService.server';

export const load = (async ({url, locals, depends}) => {

    depends(url.toString())

    let project_id = url.searchParams.get("project");
    let query = url.searchParams.get("q");

    let bugs = BugService.getBugs({query, project_id})

    return {
        bugs,
        form: superValidate({project_id: project_id ?? "", user_id: (await locals.auth.validate())?.user.userId }, createBugSchema )
    };
}) satisfies PageServerLoad;





export const actions: Actions = {
    createBug: async ({request}) => {

        const form = await superValidate(request, createBugSchema);
        
        if(form.valid) {
            // do something with form.data

          BugService.createBug(form.data)
         
        }else{
            // do something with form.errors
            return fail(400, {form})
        }
    }
};