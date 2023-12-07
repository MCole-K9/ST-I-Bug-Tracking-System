<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$components/ui/form';
	import type { PageData } from './$types';
	import { loginSchema } from './schema';

	export let data: PageData;
</script>

<div class="flex flex-col space-y-2 text-center">
	<h1 class="text-2xl font-semibold tracking-tight">Sign in to Your Account</h1>
	<p class="text-sm text-muted-foreground">Enter your email below to sign in</p>
</div>

<Form.Root method="POST" form={data.form} schema={loginSchema} let:config debug={dev}>
	<Form.Field {config} name="email">
		<Form.Item>
			<Form.Label>Email</Form.Label>
			<Form.Input />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="password">
		<Form.Item>
			<Form.Label>Password</Form.Label>
			<Form.Input type="password" />
			<Form.Validation />
		</Form.Item>
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</Form.Root>
