<script lang="ts">
	import { cn } from '$utils';
	import type { LayoutData } from './$types';
	import { Bug } from 'lucide-svelte';
  import { Separator } from "$ui/separator";

	export let data: LayoutData;
</script>





<div class="flex items-center justify-between h-16 px-4">
    <div class="flex items-center gap-2 text-lg font-semibold">
     <Bug class="w-6 h6" />
      <span>Bug Tracker</span>
    </div>
    <nav class=" md:flex gap-6">
      <a class="" href="/dashboard">
        Dashboard
      </a>
      <a class="" href="/projects">
        Projects
      </a>
      <a class="" href="/bugs">
        Bugs
      </a>
      
    </nav>
    <div class="flex items-center gap-4">
      <button class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 text-gray-300"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
        <div class="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-4 w-4 absolute top-0 right-0 text-xs">
          3
        </div>
      </button>
    </div>
  </div>

<Separator class="" />

<section class="px-4">
    <slot />
</section>

