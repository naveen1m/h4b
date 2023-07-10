import { Button } from '@mantine/core';
import axios from 'axios'
import { useState } from 'react';

// const fetchdata = () => {
//     const uri = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
//     const userId = '9083a5240ddc473ba1e706b7df47c7a0';
//     const ulcaApiKey = '25e21b8af7-4d7a-4d29-89d4-6d7a3e745e12';
//     const AuthorizationToken = 'hACDedKF03_rRl6dRcmcipqfE5GxfJrIdflv7PppXdA7Bv4CLA5aDYP-rZfGY1mG'

//     const sourcetext = 'hello i am compleing this project by today!'
//     const payload = {
//         "pipelineTasks": [
//             {
//                 "taskType": "translation",
//                 "config": {
//                     "language": {
//                         "sourceLanguage": "en",
//                         "targetLanguage": "hi"
//                     },
//                     "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
//                 }
//             }
//         ],
//         "inputData": {
//             "input": [
//                 {
//                     "source": "I am going to complete project "
//                 }
//             ]
//         }
//     }

//     axios.post(uri,
//         payload, {
//         headers: {
//             Authorization: AuthorizationToken,
//             'Content-Type': 'application/json',
//             'ulcaApiKey': ulcaApiKey,
//             'userId': userId
//         }
//     })
//         .then(function (res) {
//             console.log('Response:', res.data.pipelineResponse[0].output[0].target);
//         })
//         .catch(function (error) {
//             console.error('Error:', error);
//         });

// }
// fetchdata();


const Translate2bn = () => {

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const [recording, setRecording] = useState(false);

    const speechToText = () => {
        setRecording(true);
        try {
            recognition.lang = "en-US";
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.start();
            recognition.onresult = (event) => {
                const speechResult = event.results[0][0].transcript;
                console.log(speechResult);
            }

            recognition.onspeechend = () => {
                speechToText();
            };
            recognition.onerror = (event) => {
                stopRecording();
                if (event.error === "no-speech") {
                    alert("No speech was detected. Stopping...");
                } else if (event.error === "audio-capture") {
                    alert(
                        "No microphone was found. Ensure that a microphone is installed."
                    );
                } else if (event.error === "not-allowed") {
                    alert("Permission to use microphone is blocked.");
                } else if (event.error === "aborted") {
                    alert("Listening Stopped.");
                } else {
                    alert("Error occurred in recognition: " + event.error);
                }
            };
        } catch (error) {
            setRecording(false);
            console.log(error);
        }
    }
    const stopRecording = () => {
        recognition.stop();
        setRecording(false);
    }

    return (
        <div>
            <Button size='md' ml="40%" mt="10%" onClick={() => {
                if (!recording) {
                    speechToText();
                    setRecording(true);
                } else {
                    stopRecording();
                }
            }
            }>Record</Button>

        </div>
    )
}
export default Translate2bn;