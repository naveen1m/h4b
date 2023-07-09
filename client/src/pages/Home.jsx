import React, { useState } from 'react';
import { Button, Input } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import InfoForm from "./../components/InfoForm";

const Home = () => {

  return (
    <section>
      <InfoForm />
    </section>
  )
}

export default Home;