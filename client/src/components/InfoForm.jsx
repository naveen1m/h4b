import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

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
    <Paper size={600} my={20} className='w-1/2 h-full p-20 bg-green-800'>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={() => {
          console.log({
            name: form.values.name,
            email: form.values.email,
          })
          navigate(`/room/${form.values.roomID}`, {
            state: {
              name: form.values.name,
              email: form.values.email,
            }
          });
        }}>
          <TextInput label="Name" placeholder="John Doe" required value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />
          <TextInput label="Email" placeholder="you@mantine.dev" required value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          />
          <TextInput label="Room ID" placeholder="utterk" required minLength={6} maxLength={6} value={form.values.roomID}
            onChange={(event) => form.setFieldValue('roomID', event.currentTarget.value)}
          />
          <Button fullWidth mt="xl" type='submit'>
            Connect With Doctor
          </Button>
        </form>
      </Paper>
    </Paper>
  );
}

export default InfoForm;