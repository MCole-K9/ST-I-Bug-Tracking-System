<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import * as Form from "$lib/components/ui/form";
    import {registerSchema} from "./schema"

    export let data;


    
    const { form,  } = superForm(data.form);

</script>

<Form.Root method="POST" form={data.form}  schema={registerSchema} let:config debug={true}>

    <div class="grid md:grid-cols-2">
        <Form.Field {config} name="first_name">
            <Form.Item>
              <Form.Label>First Name</Form.Label>
              <Form.Input />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

          <Form.Field {config} name="last_name">
            <Form.Item>
              <Form.Label>Last Name</Form.Label>
              <Form.Input />
              <Form.Validation />
            </Form.Item>
          </Form.Field>
    </div>
    
    <Form.Field {config} name="email">
        <Form.Item>
          <Form.Label>Email</Form.Label>
          <Form.Input />
          <Form.Validation />
        </Form.Item>
      </Form.Field>

      <Form.Field {config} name="password">
        <Form.Item>
          <Form.Label>Passwprd</Form.Label>
          <Form.Input />
          <Form.Validation />
        </Form.Item>
      </Form.Field>

      <Form.Field {config} name="confirmPassword">
        <Form.Item>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Input />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
    
    <Form.Button>Submit</Form.Button>
  </Form.Root>