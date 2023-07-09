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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const form = useForm({
    initialValues: {
      name: '',
      age: '',
      gender: '',
      email:'',
      state: '',
      district: '',
      city: '',
      address: '',
      pin: '',
      problem: ''
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
      Gender: (value) =>
        value === 'male' || value === 'female' || value === 'others'
          ? null
          : 'Enter a Gender',
    },
  });

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Paper
      mx='auto'
      shadow='lg'
      p='lg'
      bg={'whitesmoke'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Title order={1} my="5%">
        Patient Registeration and Token Generation
      </Title>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const {
            name,
            age,
            Gender,
            email,
            state,
            district,
            city,
            address,
            pin,
            problem,
            
          } = form.values;
          const requestDataBody = {
            name:name,
            Age: Number(age),
            Gender: Gender,
            email:email,
            state: state,
            district: district,
            city: city,
            address: address,
            pin: pin,
            problem:problem,
            
          };
          // console.log(requestDataBody)

          // try {
          //   const URL = 'someURL.com/getData';
          //   const res = await fetch(URL, {
          //     method: 'POST',
          //     body: JSON.stringify(requestDataBody),
          //   });
          //   if (!res.ok) {
          //     return new Error('Error in posting data');
          //   }
          //   const resData = await res.json();
          //   console.log(resData);
          // } catch (e) {
          //   console.log(e);
          // }
          const url = 'http://127.0.0.1:8000/hai_prediction'
          try {
            axios.post(url, requestDataBody, {mode: 'no-cors' }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
              console.log(response.data);
            });
          } catch (e) {
            console.log(e);
          }
         
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          // backgroundColor: 'lightgrey',
          padding: 60,
          borderRadius: 10,
          boxShadow: '5px 5px 8px #00000050',
        }}
      >

        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='filled'
            label='Name'
            placeholder='John Doe'
            {...form.getInputProps('name')}
          />
          <NumberInput
            w={300}
            withAsterisk
            variant='filled'
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
            variant='filled'
            placeholder='Male'
            clearable
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'others', label: 'Others' },
            ]}
            {...form.getInputProps('Gender')}
          />
          <TextInput
            w={300}
            variant='filled'
            label='email'
            placeholder='example@gmail.ocm'
            {...form.getInputProps('email')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='filled'
            label='state'
            placeholder='state'
            {...form.getInputProps('state')}
          />
          <TextInput
            w={300}
            variant='filled'
            label='city'
            placeholder='city'
            {...form.getInputProps('city')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
          <TextInput
            w={300}
            variant='filled'
            label='Address'
            placeholder='address'
            {...form.getInputProps('address')}
          />
          <TextInput
            w={300}
            variant='filled'
            label='pin'
            placeholder='pin'
            {...form.getInputProps('pin')}
          />
        </SimpleGrid>
        <SimpleGrid cols={2}>
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          <textarea
            w={300}
            variant='filled'
            label='problem'
            placeholder='cause, symptoms'
            {...form.getInputProps('problem')}
          ></textarea>
          {/* <TextInput
            w={300}
            variant='filled'
            label='document'
            placeholder='add ocument'
            {...form.getInputProps('symptoms')}
          /> */}
          <label w={300}
            variant='filled'
            class="text-black-900 text-sm"
            label='document'>Document
          <input  w={300} label='document'  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple /></label>
        {/* multiple files can be added */}
        </SimpleGrid>
 

        
        <Button type='submit' w={420} fullWidth mt={20}>
          Register for checkup </Button>
      </form>
    </Paper>
  );
};

export default PatientForm;