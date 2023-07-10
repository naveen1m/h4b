import {
  Paper,
  createStyles,
  TextInput,
  Button,
  rem,
  Group,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    //   minHeight: rem(900),
    backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "url(https://media.istockphoto.com/id/1137422797/vector/doctors-examining-a-patient-using-a-medical-app.jpg?s=612x612&w=0&k=20&c=r4vdnCDv4AOdaKDZ_UeFAbqZg9fkY9olv6UzRWZO_Ng=)",
    backgroundPosition: "center"
  },

  form: {
    borderRight: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    minWidth: "50%",
    minHeight: "100vh",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    maxWidth: rem(500),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  innerForm: {
    width: 500,
    height: 500,
    border: "1px solid black",
    borderRadius: 10,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const Register = () => {
  const { classes } = useStyles();
  const [token, setToken] = useState("");

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
              <TextInput label="Email" placeholder="me@mail.com" size="md" type='number' value={form.values.email} onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                className='h-20'
              />
              <Button radius="md" size="md" style={{ marginTop: 10 }}
                onClick={async () => {
                  try {
                    console.log("Btn clicked")
                    const res = await fetch("http://localhost:3000/auth/otpSend", {
                      method: "POST",
                      body: JSON.stringify({
                        email: form.values.email
                      })
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
            />
            <Button fullWidth mt="xl" size="md" onClick={async () => {
              const res = await fetch("http://localhost:3000/auth/verify", {
                method: "POST",
                body: JSON.stringify({
                  token: token,
                  otp: form.values.otp
                })
              })
              if (!res.ok) {
                throw new Error("Network Error");
              }
              const resJSON = await res.json();
              if (resJSON.success) {
                localStorage.setItem("tokenTeleMed", token)
                console.log("Login Successfull");
                alert("Login Successful");
              }
              else {
                console.log("Login Unsuccessfull");
                alert("Login Unsuccessful");
              }
              form.reset();
            }}>
              Register
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default Register;