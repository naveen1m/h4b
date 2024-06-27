import io from 'socket.io-client';

// handle api requests
const Uri = process.env.ULCA_API_URI ?? null;
const UserId = process.env.ULCA_USER_ID ?? null;
const UlcaApiKey = process.env.ULCA_API_KEY ?? null;
const AuthorizationToken = process.env.ULCA_AUTH_TOKEN ?? null;


async function api(sourcetext, from, to) {
    const payload = {
        "pipelineTasks": [
            {
                "taskType": "translation",
                "config": {
                    "language": {
                        "sourceLanguage": from,
                        "targetLanguage": to
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
    return fetch(Uri, {
        method: 'POST',
        headers: {
            Authorization: AuthorizationToken,
            'Content-Type': 'application/json',
            'ulcaApiKey': UlcaApiKey,
            'userId': UserId
        },
        body: JSON.stringify(payload)
    }).then(res => {
        return res.json();
    }).then((res) => {
        // console.log(res.pipelineResponse[0].output[0].target)
        return res.pipelineResponse[0].output[0].target;
    }).catch((err) => {
        console.log(err)
    })
}
// ------------

const socket = io('localhost:3050')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

// Get user media
let myStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true
}).then(stream => {
    myStream = stream;
    addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)
    })
})

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
    console.log('Peer ID: ', id);
    socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}

// Toggle camera
document.getElementById('toggle-camera').addEventListener('click', () => {
    const enabled = myStream.getVideoTracks()[0].enabled;
    myStream.getVideoTracks()[0].enabled = !enabled;
    console.log(`Camera ${enabled ? 'disabled' : 'enabled'}`);
});

// convert from text to speech
const synth = window.speechSynthesis;
const voices = synth.getVoices();
const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'hi-IN';

socket.on('message:receive', async (message) => {
    let translated = await api(message, 'en', 'hi');
    console.log("received message: ", translated);
    utterance.text = translated;
    synth.speak(utterance);
});

// const TEXT = document.getElementById('text');
const RESULT = document.getElementById('result');

// speech
let total_result = '';

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition({ lang: 'en-US', interimResults: true, continuous: true });
recognition.continuous = true;
// recognition.start();

recognition.onresult = async (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            total_result += event.results[i][0].transcript + ' ';
        }
    }
    let current_result = event.results[event.results.length - 1][0].transcript

    // console.log("current result: ", await api(current_result));
    socket.emit('message:send', ROOM_ID, current_result);
    console.log("total result: ", total_result);
};

// Event listeners for start and stop listening buttons
document.getElementById('start-listening').addEventListener('click', () => {
    recognition.start();
    console.log('Speech recognition started');
});

document.getElementById('stop-listening').addEventListener('click', () => {
    recognition.stop();
    console.log('Speech recognition stopped');
});