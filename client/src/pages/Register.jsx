import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  rem,
} from '@mantine/core';
<<<<<<< HEAD
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useNavigate } from 'react-router';
=======
import { useNavigate } from 'react-router-dom';
>>>>>>> a87e5b29ae5232ce8996213ba916f3994600fe6f

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    //   minHeight: rem(900),
    backgroundSize: 'cover  ',
    backgroundRepeat: "no-repeat",
    backgroundImage:
      // 'url(https://images.unsplash.com/photo-1583912268183-a34d41fe464a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60)'
      'url(https://images.unsplash.com/photo-1639772823849-6efbd173043c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxtQjU0cDdkVEJROHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60)',
    backgroundPosition: "right"
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minHeight: "100vh",
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function Register() {
  const { classes } = useStyles();
<<<<<<< HEAD
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: '',
      otp: "",
    },

    validate: {
      name: (val) => (val.length <= 2 ? 'Name too short' : null),
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    },
  });

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} >
        <div className={classes.innerForm}>
          <form>
            <Title order={2} my={10} underline>Patient Registration Form</Title>
            <Group>
              <TextInput label="Email" placeholder="me@mail.com" size="md" type='email' value={form.values.email} onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                className='h-20'
                withAsterisk
              />
              <Button radius="md" size="md" style={{ marginTop: 14 }}
                onClick={async () => {
                  try {
                    console.log("Btn clicked")
                    const res = await fetch("http://localhost:3000/auth/otpSend", {
                      method: "POST",
                      body: JSON.stringify({
                        email: form.values.email
                      }),
                      headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                      }
                    });
                    if (!res.ok) {
                      throw new Error("Network Error");
                    }
                    const resJSON = await res.json();
                    setToken(resJSON.data.token)
                    console.log(resJSON.data);
                  }
                  catch (err) {
                    console.log(err);
                  }
                }}>
                Send OTP</Button>
            </Group>

            <TextInput label="OTP" placeholder="Sent OTP" mt="md" size="md"
              value={form.values.otp} onChange={(event) => form.setFieldValue('otp', event.currentTarget.value)}
              withAsterisk
            />
            <Button fullWidth mt="xl" size="md" onClick={async () => {
              const res = await fetch("http://localhost:3000/auth/verify", {
                method: "POST",
                body: JSON.stringify({
                  token: token,
                  otp: form.values.otp
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                }
              })
              if (!res.ok) {
                throw new Error("Network Error");
              }
              const resJSON = await res.json();
              if (resJSON.success) {
                localStorage.setItem("tokenTeleMed", token)
                console.log("Login Successfull");
                navigate("/patientregister")
              }
              else {
                console.log("Login Unsuccessfull");
              }
              form.reset();
            }}>
=======
  const navigate = useNavigate();
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} >
        {/* <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Mantine!
          </Title> */}

        <TextInput mt="50%" label="Phone Number" placeholder="+91834567899" size="md" />
        <TextInput label="OTP" placeholder="Sent OTP" mt="md" size="md" />
        {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
        <Button fullWidth mt="xl" size="md" onClick={() => {
          navigate("/patientregister");
        }} >
          Register
        </Button>

        {/* <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
>>>>>>> a87e5b29ae5232ce8996213ba916f3994600fe6f
              Register
            </Anchor>
          </Text> */}
      </Paper>
    </div>
  );
}