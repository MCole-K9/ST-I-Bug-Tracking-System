import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createBugSchema } from './schema';
import prisma from '$server/prisma';
import { fail } from '@sveltejs/kit';

export const load = (async ({url, locals, depends}) => {

    depends("reload:bugs")

    let project_id = url.searchParams.get("project");
    let query = url.searchParams.get("q");

    let options = {
        where: {
           
        }
    }

    if(project_id){
        options.where = {
            project_id
        }
    }

    if(query){
        
        options.where = {
            ...options.where,
            OR: [
                {
                    name: {
                        search: query
                    
                    },
                    description: {
                        search: query
                    }
    
    
                }
            ] 
        }
    }

    console.log(options);
    
    let bugs = await prisma.bug.findMany({
        include: {
            project: {
                select: {
                    name: true
                }   
            }
        },
        ...options
    })
    return {
        bugs,
        form: superValidate({project_id: project_id ?? "", user_id: (await locals.auth.validate())?.user.userId }, createBugSchema )
    };
}) satisfies PageServerLoad;





export const actions: Actions = {
    createBug: async ({request, locals}) => {

        const form = await superValidate(request, createBugSchema);
        
        if(form.valid) {
            // do something with form.data
            await prisma.bug.create({
                data: form.data
            })
        }else{
            // do something with form.errors
            return fail(400, {form})
        }
    }
};