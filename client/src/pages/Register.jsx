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
  
  const useStyles = createStyles((theme) => ({
    wrapper: {
        height:"100vh", 
        width:"100%", 
    //   minHeight: rem(900),
      backgroundSize: 'cover  ',
      backgroundRepeat: "no-repeat",
      backgroundImage:
        // 'url(https://images.unsplash.com/photo-1583912268183-a34d41fe464a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60)'
        'url(https://images.unsplash.com/photo-1639772823849-6efbd173043c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxtQjU0cDdkVEJROHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60)',
        backgroundPosition: "right"
    },
  
    form: {
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
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
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30} >
          {/* <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Mantine!
          </Title> */}
  
          <TextInput mt="50%"  label="Phone Number" placeholder="+91834567899" size="md" />
          <TextInput label="OTP" placeholder="Sent OTP" mt="md" size="md" />
          {/* <Checkbox label="Keep me logged in" mt="xl" size="md" /> */}
          <Button fullWidth mt="xl" size="md">
            Register
          </Button>
  
          {/* <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
              Register
            </Anchor>
          </Text> */}
        </Paper>
      </div>
    );
  }