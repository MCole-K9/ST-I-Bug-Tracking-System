import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { createBugSchema } from './schema';
import prisma from '$server/prisma';
import { fail } from '@sveltejs/kit';
import type { Prisma } from '@prisma/client';

export const load = (async ({url, locals, depends}) => {

    depends("reload:bugs")

    let project_id = url.searchParams.get("project");
    let query = url.searchParams.get("q");

    let options:Prisma.BugFindManyArgs = {
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
                    },
                    
                }
            ] 
        }
    }
    
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
    createBug: async ({request}) => {

        const form = await superValidate(request, createBugSchema);
        
        if(form.valid) {
            // do something with form.data

            await prisma.$transaction(async(tx) => {
                //cant use form.data because it has a default value for priority, severity, and status if not provided 
                //and it is required on history the schema

                let bug = await tx.bug.create({
                    data: {
                        ...form.data,
                    },
                })
        
                await tx.bugHistory.create({
                    data: {
                        bug_id: bug.id,
                        user_id: bug.user_id,
                        status: bug.status,
                        priority: bug.priority,
                        severity: bug.severity,
                    }
                })
            })
         
        }else{
            // do something with form.errors
            return fail(400, {form})
        }
    }
};