
import type { CreateBugSchemaType, UpdateBugSchemaType } from './schema';
import prisma from '$server/prisma';
import type { Prisma } from '@prisma/client';

export class BugService {


    static async getBugs(options?: {project_id?: string | null, query?: string | null, more?: Prisma.BugFindManyArgs }) {
        
        let optionsPrisma: Prisma.BugFindManyArgs = {
            where: {
               
            }
        }
    
        if(options?.project_id){
            optionsPrisma.where = {
                project_id: options.project_id
            }
        }
    
        if(options?.query){
            
            optionsPrisma.where = {
                ...optionsPrisma.where,
                OR: [
                    {
                        name: {
                            search: options.query
                        
                        },
                        description: {
                            search: options.query
                        },
                        
                    }
                ] 
            }
        }
        
        let bugs = await prisma.bug.findMany({
            ...options?.more,  // options below will override options.more
            include: {
                project: {
                    select: {
                        name: true
                    }   
                }
            },
            ...optionsPrisma,
            
        })
        return bugs as typeof bugs & {project: {name: string}}[] // this is a hack to get the project name;
    

    }
    static async createBug(data: CreateBugSchemaType) {

        await prisma.$transaction(async(tx) => {
            //cant use form.data because it has a default value for priority, severity, and status if not provided 
            //and it is required on history the schema

            let bug = await tx.bug.create({
                data: {
                    ...data,
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
    }

    static async updateBug(id: string, user_id: string ,data: UpdateBugSchemaType) {
        await prisma.$transaction(async(tx) => {
            //cant use form.data because it has a default value for priority, severity, and status if not provided 
            //and it is required on history the schema

            let bug = await tx.bug.update({
                where: {
                    id: id
                },
                data: {
                    ...data,
                },
            })
    
            await tx.bugHistory.create({
                data: {
                    bug_id: bug.id,
                    user_id: user_id,
                    status: bug.status,
                    priority: bug.priority,
                    severity: bug.severity,
                }
            })
        })
    }

}