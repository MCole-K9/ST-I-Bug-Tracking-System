<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$ui/input';
	import { Button } from '$ui/button';
	import * as Sheet from '$ui/sheet';
	import { cn } from '$utils';
	import * as Form from '$ui/form';
	import { createProjectSchema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import * as Card from "$lib/components/ui/card";
	import {Bug, FolderGit, Calendar} from "lucide-svelte"
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	const form = superForm(data.form, {
		onSubmit: () => {
			console.log('submit');
		},
		onResult({result}) {
			if(result.type === "success"){
				invalidate("reload:projects")
			}
			
		},
	});
</script>

<div class="max-w-6xl w-full mx-auto my-3 flex justify-center items-center gap-4">
	<form class="flex-1">
		<Input placeholder="Search" />
	</form>

	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} variant="default">Create Project</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Create Project</Sheet.Title>
				<Sheet.Description>
					Create a project. This where you will be able to track bugs
				</Sheet.Description>
			</Sheet.Header>
			<Form.Root method="POST" action="?/createProject" {form} controlled schema={createProjectSchema} let:config>
				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Label>Name</Form.Label>
						<Form.Input />
						<Form.Description>This is your project display name.</Form.Description>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Field {config} name="description">
					<Form.Item>
						<Form.Label>Description</Form.Label>
						<Form.Textarea />
						<Form.Description>This is the project description, Make It Brief</Form.Description>
						<Form.Validation />
					</Form.Item>
				</Form.Field>
				<Form.Button type="submit">Submit</Form.Button>
			</Form.Root>
		</Sheet.Content>
	</Sheet.Root>
</div>





<div class="p-5 grid grid-cols-4 gap-4">
	{#each data.projects as project (project.id)}
		<Card.Root>
			<Card.Header>
			  <Card.Title>{project.name}</Card.Title>
			  <Card.Description>{project.description}</Card.Description>
			</Card.Header>
			<Card.Footer>
				<div class="flex items-center gap-4 text-sm">
					<div class="flex items-center gap-1">
					  <Calendar class="w-4 h-4" />
					  <span class="text-gray-500 dark:text-gray-400">2h ago</span>
					</div>
					<div class="flex items-center gap-1">
					  <Bug class="w-4 h-4" />
					  <span class="text-gray-500 dark:text-gray-400">{project._count.bugs}</span>
					</div>
				  </div>
			</Card.Footer>
		  </Card.Root>
		
	
	 
	{:else}
		<div class={cn('h-screen w-screen flex justify-center items-center col-span-full')}>
			<h1 class=" text-2xl">No Projects</h1>
		</div>
	{/each}

</div>
