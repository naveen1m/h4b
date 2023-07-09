import { upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const InfoForm = () => {

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      roomID: "",
    },

    validate: {
      name: (val) => (val.length <= 2 ? 'Name too short' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to TeleMed
      </Text>

      <form onSubmit={form.onSubmit(() => {
        navigate(`/room/${form.values.roomID}`, {
          state: {
            name: form.values.name,
            email: form.values.email,
          }
        });
      })}>
        <Stack>

          <TextInput
            label="Name"
            placeholder="Your name"
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            radius="md"
          />


          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <TextInput
            required
            label="RoomID"
            placeholder="keeutr"
            min={6}
            max={6}
            value={form.values.roomID}
            onChange={(event) => form.setFieldValue('roomID', event.currentTarget.value)}
            error={form.errors.email && 'Length Invalid'}
            radius="md"
          />

        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            Submit
          </Anchor>
          <Button type="submit" radius="xl">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default InfoForm;