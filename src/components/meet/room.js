import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
    const { roomID } = useParams();
    const meetingContainerRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recordedChunks, setRecordedChunks] = useState([]);

    useEffect(() => {
        const startMeeting = async () => {
            const appID = 678220723;
            const serverSecret = "5e49895a95fcc817b6585325500e0df5";
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomID,
                Date.now().toString(),
                "pardhu"
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: meetingContainerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                onReady: (zegoExpressEngine) => {
                    console.log("Meeting is ready.");
                },
            });
        };

        if (meetingContainerRef.current) {
            startMeeting();
        }
    }, [roomID]);

    const startScreenRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                }
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const combinedStream = new MediaStream([...stream.getTracks(), ...audioStream.getTracks()]);

            const recorder = new MediaRecorder(combinedStream, {
                mimeType: 'video/webm;codecs=vp9',
            });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            recorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const mp4Blob = new Blob(recordedChunks, { type: 'video/mp4' });
                const url = URL.createObjectURL(mp4Blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `screen-recording-${Date.now()}.mp4`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setRecordedChunks([]); // Reset recorded chunks after download
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
            console.log("Screen recording started.");
        } catch (error) {
            console.error("Error starting screen recording:", error);
        }
    };

    const stopScreenRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
            console.log("Screen recording stopped.");
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div ref={meetingContainerRef} style={{ width: "100%", height: "100%" }}></div>
            <button 
                onClick={isRecording ? stopScreenRecording : startScreenRecording}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: isRecording ? 'red' : 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 1000, 
                }}
            >
                {isRecording ? "Stop Screen Recording" : "Start Screen Recording"}
            </button>
        </div>
    );
}

export default Room;
