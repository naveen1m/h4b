import { Button } from '@mantine/core';
import axios from 'axios'



const fetchdata = () => {
    const uri = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline'
    const userId = '9083a5240ddc473ba1e706b7df47c7a0';
    const ulcaApiKey = '25e21b8af7-4d7a-4d29-89d4-6d7a3e745e12';
    const AuthorizationToken = 'hACDedKF03_rRl6dRcmcipqfE5GxfJrIdflv7PppXdA7Bv4CLA5aDYP-rZfGY1mG'

    const sourcetext = 'hello i am compleing this project by today!'
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
                    "source": "I am going to complete project "
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
fetchdata();


const Translate2bn = () => {
    return (
        <div>
            <Button size='md' ml="40%" mt="10%" onClick={() => recog()}>Record</Button>
            {console.log('i out now')}

        </div>
    )
}
export default Translate2bn;