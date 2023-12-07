import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createProjectSchema } from './schema';
import { fail } from '@sveltejs/kit';
import prisma from "$server/prisma";

export const load = (async ({depends}) => {

    depends("reload:projects")

    const projects = await prisma.project.findMany({
        include: {
            _count: {
                select: {
                    bugs: true
                }
            }
        }
    })

    return {
        projects,
        form: superValidate(createProjectSchema)
    };
}) satisfies PageServerLoad;



export const actions: Actions = {
    createProject : async ({request, locals}) => {

        const form = await superValidate(request, createProjectSchema);

        if(form.valid) {
            // do something with form.data
            await prisma.project.create({
                data: {
                    name: form.data.name,
                    description: form.data.description,
                    users: {
                        connect: {
                            id: (await locals.auth.validate())?.user.userId
                        }
                    }
                }
            })
            
        }else{
            // do something with form.errors
            return fail(400, {form})
        }
    }
};