import React from 'react';
import { Text } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {

  const { name } = useLocation().state;
  const { roomID } = useParams();

  const meeting = async (elem) => {
    const appID = +import.meta.env.VITE_ZEGOCLOUD_APP_ID;
    const serverSecret = import.meta.env.VITE_ZEGOCLOUD_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), name || "User");
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