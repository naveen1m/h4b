import React, { useState } from 'react';
import { Button, Input } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import InfoForm from "./../components/InfoForm";

const Home = () => {

  return (
    <section className='w-screen h-100 flex justify-center items-center'>
      <InfoForm />
    </section>
  )
}

export default Home;