<script lang="ts">
	import type { PageData } from './$types';
    import {Input} from '$ui/input';
    import {Button} from '$ui/button';
	import { cn } from '$utils';

	export let data: PageData;
</script>

<div class="max-w-6xl w-full mx-auto flex justify-center items-center gap-4">
	<form class="flex-1">
		<Input placeholder="Search"/>
	</form>
    <Button class="bg-primary text-primary-foreground">Create Project</Button>
	
</div>

<div class={cn("h-screen w-screen flex justify-center items-center mt-10")}>
	<h1 class=" text-2xl">No Projects</h1>
</div>
