import { Button } from '@mantine/core';
import axios from 'axios'
import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


// fetchdata();


const Translate2bn = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        browserSupportsContinuousListening
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    if (browserSupportsContinuousListening) {
        SpeechRecognition.startListening({ continuous: true })
    } else {
        console.log('error in listening')
        // Fallback behaviour
    }

    // using bhashini from here 
    const fetchdata = (transcribe) => {
        const uri = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
        const userId = '9083a5240ddc473ba1e706b7df47c7a0';
        const ulcaApiKey = '25e21b8af7-4d7a-4d29-89d4-6d7a3e745e12';
        const AuthorizationToken = 'hACDedKF03_rRl6dRcmcipqfE5GxfJrIdflv7PppXdA7Bv4CLA5aDYP-rZfGY1mG'

        const sourcetext = transcribe
        const payload = {
            "pipelineTasks": [
                {
                    "taskType": "translation",
                    "config": {
                        "language": {
                            "sourceLanguage": "en",
                            "targetLanguage": "hi"
                        },
                        "serviceId": "ai4bharat/indictrans-v2-all-gpu--t4"
                    }
                }
            ],
            "inputData": {
                "input": [
                    {
                        "source": sourcetext
                    }
                ]
            }
        }

        axios.post(uri,
            payload, {
            headers: {
                Authorization: AuthorizationToken,
                'Content-Type': 'application/json',
                'ulcaApiKey': ulcaApiKey,
                'userId': userId
            }
        })
            .then(function (res) {
                console.log('Response:', res.data.pipelineResponse[0].output[0].target);
            })
            .catch(function (error) {
                console.error('Error:', error);
            });

    }

    const [trans, setTrans] = useState("");
    console.log(trans)
    useEffect(() => {
        fetchdata("translate")
        console.log(trans)
    }, [trans])

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button onClick={() => {
                SpeechRecognition.startListening();

            }}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
            <p></p>
            <p>------------------</p>
            <p>{fetchdata(transcript)}</p>


        </div>
    )
}
export default Translate2bn;