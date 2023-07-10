import {
  TextInput,
  Button,
  Group,
  Box,
  Select,
  NumberInput,
  Title,
  Paper,
  SimpleGrid,
  Modal,
  Text,
  Textarea,
  FileInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      email: '',
      state: '',
      city: '',
      address: '',
      pin: '',
      problem: '',
      file: "",
    },

    validate: {
      name: (value) =>
        /^[A-Z][a-zA-Z]*\s([A-Z][a-zA-Z]*\s)?[A-Z][a-zA-Z]*$/.test(value)
          ? null
          : 'Enter a valid name',
      age: (value) =>
        value >= 10 && value <= 80
          ? null
          : 'You must be 10-80 years old to register',
      // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      gender: (value) =>
        value === 'male' || value === 'female' || value === 'others'
          ? null
          : 'Enter a Gender',
    },
  });

  return (
    <Paper
      mx='auto'
      shadow='lg'
      p='lg'
      bg={'lightblue'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Title order={1} my="10">
        Patient Registration and Token Generation
      </Title>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const {
            name,
            age,
            gender,
            email,
            state,
            city,
            address,
            pin,
            problem,
          } = form.values;

          const requestDataBody = {
            name: name,
            age: age,
            gender: gender,
            email: email,
            state: state,
            city: city,
            address: address,
            pin: pin,
            problem: problem,
            "district": "IN",
          };
          console.log(requestDataBody);
          try {
            const URL = 'http://localhost:3000/auth/registration';
            const res = await fetch(URL, {
              method: 'POST',
              body: JSON.stringify(requestDataBody),
            });
            if (!res.ok) {
              return new Error('Error in posting data');
            }
            const resData = await res.json();
            console.log(resData);
          } catch (e) {
            console.log(e);
          }
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 20,
          borderRadius: 10,
          boxShadow: '5px 5px 8px #00000050',
          backgroundColor: "whitesmoke"
        }}
      >

        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='default'
            label='Name'
            placeholder='John Doe'
            {...form.getInputProps('name')}
          />
          <NumberInput
            w={300}
            withAsterisk
            variant='default'
            label='Age'
            placeholder='22'
            {...form.getInputProps('age')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <Select
            w={300}
            withAsterisk
            label='Gender'
            variant='default'
            placeholder='Male'
            clearable
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'others', label: 'Others' },
            ]}
            {...form.getInputProps('gender')}
          />
          <TextInput
            w={300}
            variant='default'
            label='Email'
            placeholder='example@gmail.com'
            {...form.getInputProps('email')}
            withAsterisk
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='default'
            label='State'
            placeholder='West Bengal'
            {...form.getInputProps('state')}
          />
          <TextInput
            w={300}
            variant='default'
            label='City'
            placeholder='Kolkata'
            {...form.getInputProps('city')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='default'
            label='Address'
            placeholder='Salt Lake'
            {...form.getInputProps('address')}
          />
          <TextInput
            w={300}
            variant='default'
            label='Pin'
            minLength={6}
            maxLength={6}
            placeholder='700093'
            {...form.getInputProps('pin')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <Textarea
            placeholder="Fever, Headache"
            label="Problems"
            withAsterisk
            w={300}
            {...form.getInputProps('problem')}
          />
          <FileInput label="Prescription" placeholder="X-Ray Report" accept="file/pdf"
            {...form.getInputProps('file')}
            w={300}
          />;
        </SimpleGrid>

        <Button type='submit' mt={20}>
          Register for Checkup </Button>
      </form>
    </Paper>
  );
};

export default PatientForm;