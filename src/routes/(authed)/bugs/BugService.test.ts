import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import { BugService } from './BugService.server';
import prisma from '$server/prisma';

describe('Bug Service Functianlity', () => {

    let project_id: string;
    let user_id: string;

    let bugs_created: string[] = [];

    beforeAll(async () => {

        
        //get a project
        const project = await prisma.project.findFirstOrThrow({
            where: {
                name: "Test Project"
            }
        })

        project_id = project.id;

        // get a user
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: "testuser@gmail.com"
            }
        })

        user_id = user.id;

        
        
        


    
        // Create a project
        // Create a bug
    })
	it('Creates a Bug and Bug History', async () => {


        let bug = await BugService.createBug({
            description: "Test Bug For Create",
            name: "Test Bug",
            project_id,
            user_id,
            priority: "MEDIUM",
            severity: "CRITICAL",
            status: "OPEN"
        })

        bugs_created.push(bug.id);
    

	});



    it('Gets Bugs that belong to a project', async () => {
        let bugs = await BugService.getBugs({project_id})


        for(let bug of bugs) {
            expect(bug.project_id).toBe(project_id)
        }
        

    });



    it('Updates a Bug () and Check History', async () => {

        let bug = await BugService.createBug({
            description: "Test Bug For Update",
            name: "Test Bug2",
            project_id,
            user_id,
            priority: "MEDIUM",
            severity: "CRITICAL",
            status: "OPEN"
        })

        bugs_created.push(bug.id);

        let updated_bug = await BugService.updateBug(bug.id, user_id, {
            priority: "HIGH",
            severity: "BLOCKER",
        })

        expect(updated_bug.priority).toBe("HIGH")
        expect(updated_bug.severity).toBe("BLOCKER")

        expect(updated_bug.history.at(-1)?.priority).toBe("MEDIUM")
        expect(updated_bug.history.at(-1)?.severity).toBe("CRITICAL")

    });


    it('Searches for Bug Based on name or description', async () => {

        let bug = await BugService.createBug({
            description: "Test Bug For Search",
            name: "Test Bug3",
            project_id,
            user_id,
            priority: "MEDIUM",
            severity: "CRITICAL",
            status: "OPEN"
        })

        bugs_created.push(bug.id);

        let bugs = await BugService.getBugs({query: "Bug For Search"})

        expect(bugs.length).toBeGreaterThan(0)

        for(let bug of bugs) {
            expect(bug.name).toBe("Test Bug3")
        }

        let bugs2 = await BugService.getBugs({query: "Test Bug2"})
        expect(bugs2.length).toBeGreaterThan(0)

        for(let bug of bugs2) {
            expect(bug.description).toBe("Test Bug For Update")
        }
    });



    afterAll(async () => {
        console.log("Cleanup not deleting bugs");
        
        
        // Clear the database of all bugs created during this test
        await prisma.bug.deleteMany({
            where: {
                id: {
                    in: bugs_created
                }
            }
        })
    })
});
