<script lang="ts">
	import type { PageData } from './$types';
    import {Input} from '$ui/input';
    import {Button} from '$ui/button';
	import * as Sheet from "$ui/sheet";
	import { cn } from '$utils';


	export let data: PageData;
</script>

<div class="max-w-6xl w-full mx-auto my-3 flex justify-center items-center gap-4">
	<form class="flex-1">
		<Input placeholder="Search"/>
	</form>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
		  <Button builders={[builder]} variant="default">Create Project</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right">
		  <Sheet.Header>
			<Sheet.Title>Create Project</Sheet.Title>
			<Sheet.Description>
			  Create a project. This where you will be able to track bugs.s
			</Sheet.Description>
		  </Sheet.Header>
		  <div class="grid gap-4 py-4">
			<div class="grid grid-cols-4 items-center gap-4">
			 
			</div>
			<div class="grid grid-cols-4 items-center gap-4">
			
			</div>
		  </div>
		  <Sheet.Footer>
			<Sheet.Close asChild let:builder>
			  <Button builders={[builder]} type="submit">Save changes</Button>
			</Sheet.Close>
		  </Sheet.Footer>
		</Sheet.Content>
	  </Sheet.Root>
</div>

<div class={cn("h-screen w-screen flex justify-center items-center")}>
	<h1 class=" text-2xl">No Projects</h1>
</div>

