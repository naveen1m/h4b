import React from 'react';
import { Text } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {

  const { roomID } = useParams();

  const meeting = async (elem) => {
    const appID = 336433262;
    const serverSecret = "45f692d059e888cc1f612e4b083fe849"
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "User");
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: elem,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `https:/localhost:3000/room/${roomID}`
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      }
    });
  };

  return (
    <div>
      <Text fz="md">Room</Text>
      <Text fz="md">Room ID : {roomID}</Text>
      <div ref={meeting} />
    </div>
  )
}

export default Room;