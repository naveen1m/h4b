import React from 'react'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

function Meeting() {
    const navigate = useNavigate();
    return (
        <div className='center text-black-800'>
            <h2 align='center' >Meeting... talk to doctor with translated language and transcribed feature!</h2>
            <Button size='md' ml='30%' onClick={() => { navigate('/') }} >Close</Button>
        </div>
    )
}

export default Meeting
