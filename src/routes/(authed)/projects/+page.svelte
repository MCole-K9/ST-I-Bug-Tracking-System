<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$ui/input';
	import { Button } from '$ui/button';
	import * as Sheet from '$ui/sheet';
	import { cn } from '$utils';
	import * as Form from '$ui/form';
	import { createProjectSchema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;

	const form = superForm(data.form, {
		onSubmit: () => {
			console.log('submit');
		}
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

<div class={cn('h-screen w-screen flex justify-center items-center')}>
	<h1 class=" text-2xl">No Projects</h1>
</div>

