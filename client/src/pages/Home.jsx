import React, { useState } from 'react';
import { Button, Input } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [roomID, setRoomID] = useState("");

  const navigate = useNavigate();

  return (
    <section>
      <Input
        icon={<IconAt />}
        placeholder="Enter meeting room ID"
        radius="md"
        size="md"
        value={roomID}
        onChange={(e) => {
          setRoomID(e.target.value);
        }
        }
      />
      <Button variant='default' onClick={() => {
        navigate(`/room/${roomID}`)
      }}>Join Meet</Button>
    </section>
  )
}

export default Home;