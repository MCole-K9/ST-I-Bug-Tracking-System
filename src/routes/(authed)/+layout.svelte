<script lang="ts">
	import { cn } from '$utils';
	import type { LayoutData } from './$types';
	import { Bug } from 'lucide-svelte';

	export let data: LayoutData;
</script>



<div class="flex flex-col w-full min-h-screen">
    <header class="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div class="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4">
            <Bug />
        </div>

        
	<div class="flex h-16 items-center px-4">
		<nav class="flex items-center space-x-4 lg:space-x-10">
			<a
				href="/examples/dashboard"
				class="text-sm font-medium transition-colors hover:text-primary"
			>
				Dashboard
			</a>

			<a
				href="/examples/dashboard"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Projects
			</a>
			<a
				href="/examples/dashboard"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Bugs
			</a>
			<a
				href="/examples/dashboard"
				class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
			>
				Settings
			</a>
		</nav>

		<!-- <div class="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav />
    </div> -->
	</div>

    </header>
</div>




<slot />
