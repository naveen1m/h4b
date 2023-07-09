import React from 'react';
import { Text } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {

  const { name, email } = useLocation().state;
  const { roomID } = useParams();

  console.log(useLocation());
  console.log(name);
  console.log(roomID);

  const meeting = async (elem) => {
    const appID = 336433262;
    const serverSecret = "45f692d059e888cc1f612e4b083fe849"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), name);
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: elem,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https:/localhost:3000/room/${roomID}`
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true
    });
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-zinc-500'>
      <div className='h-full w-full' ref={meeting} />
    </div>
  )
}

export default Room;