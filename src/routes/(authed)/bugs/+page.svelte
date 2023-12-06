<script lang="ts">
    import type { PageData } from './$types';
	import { Input } from '$ui/input';
	import { Button } from '$ui/button';
	import * as Sheet from '$ui/sheet';
	import { cn } from '$utils';
	import * as Form from '$ui/form';
	import * as Select from '$ui/select';
	import { createBugSchema } from './schema';
	import * as Card from "$lib/components/ui/card";
	import {Bug, FolderGit, Calendar} from "lucide-svelte"
	import { invalidate } from '$app/navigation';
	import type { FormOptions } from 'formsnap';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { BugPriority, BugSeverity, BugStatus } from '@prisma/client';

    export let data: PageData;

    let sheetOpen: boolean = false;


    $: project = $page.url.searchParams.get("project");
    $: shouldCreate = $page.url.searchParams.get("create") === "true";




    const formOptions: FormOptions<typeof createBugSchema> =  {
		onSubmit: () => {
			console.log('submit');
		},
		onResult({result}) {
			if(result.type === "success"){
				invalidate("reload:bugs")
				sheetOpen = false;
			}

            console.log(result);
            
			
		},
	};

    onMount(() => {
        if(shouldCreate && project){
            sheetOpen = true;
        }
    })
    
    
</script>

<div class="max-w-6xl w-full mx-auto my-3 flex justify-center items-center gap-4">
	<form class="flex-1">
		<Input placeholder="Search" />
	</form>

	<Sheet.Root bind:open={sheetOpen} >
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} variant="default">Create Bug</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right" class="overflow-auto">
			<Sheet.Header>
				<Sheet.Title>Create Bug</Sheet.Title>
				<Sheet.Description>
					Create a Bug.
				</Sheet.Description>
			</Sheet.Header>
			<Form.Root method="POST" action="?/createBug" form={data.form} schema={createBugSchema} options={formOptions} let:config debug>

                <!-- <Form.Field {config} name="project_id">
					<Form.Item>
						<Form.Input type="hidden" bind:value={project}/>
						<Form.Validation  />
					</Form.Item>
				</Form.Field> -->
				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Label>Name</Form.Label>
						<Form.Input />
						<Form.Description>This is your bug display name.</Form.Description>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="description">
					<Form.Item>
						<Form.Label>Description</Form.Label>
						<Form.Textarea />
						<Form.Description>This is the Bug description, make it brief</Form.Description>
						<Form.Validation />
					</Form.Item>
				</Form.Field>

                <Form.Field {config} name="status">
                    <Form.Item>
                        <Form.Label>Status</Form.Label>
                        <Form.Select>
                            <Select.Trigger>
                                <Select.Value placeholder="Select Status"/>
                              </Select.Trigger>
                              <Select.Content>
                                {#each Object.keys(BugStatus)  as item}
                                    <Select.Item value={item}>{item}</Select.Item>
                                {/each}
                              </Select.Content>
                        </Form.Select>
                        <Form.Description>This is the Bug Status</Form.Description>
                        <Form.Validation />
                    </Form.Item>
                </Form.Field>

                <Form.Field {config} name="priority">
                    <Form.Item>
                        <Form.Label>Priority</Form.Label>
                        <Form.Select>
                            <Select.Trigger>
                                <Select.Value placeholder="Select Priorty"/>
                              </Select.Trigger>
                              <Select.Content>
                                {#each Object.keys(BugPriority)  as item}
                                    <Select.Item value={item}>{item}</Select.Item>
                                {/each}
                              </Select.Content>
                        </Form.Select>
                        <Form.Description>This is the Bug priority</Form.Description>
                        <Form.Validation />
                    </Form.Item>
                </Form.Field>

                <Form.Field {config} name="severity">
                    <Form.Item>
                        <Form.Label>Severity</Form.Label>
                        <Form.Select>
                            <Select.Trigger>
                                <Select.Value placeholder="Select Severity"/>
                              </Select.Trigger>
                              <Select.Content>
                                {#each Object.keys(BugSeverity)  as item}
                                    <Select.Item value={item}>{item}</Select.Item>
                                {/each}
                              </Select.Content>
                        </Form.Select>
                        <Form.Description>This is the Bug Severity</Form.Description>
                        <Form.Validation />
                    </Form.Item>
                </Form.Field>


				
				<Form.Button type="submit" >Submit</Form.Button>
			</Form.Root>
		</Sheet.Content>
	</Sheet.Root>
</div>
