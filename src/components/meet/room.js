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
                "Enter your name"
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: meetingContainerRef.current,
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
                onReady: () => {
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
                video: { mediaSource: 'screen' },
                audio: true,
            });

            const recorder = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9',
            });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedChunks((prev) => [...prev, event.data]);
                }
            };

            recorder.onstop = async () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `screen-recording-${Date.now()}.webm`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setRecordedChunks([]); 
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
                    width: 'calc(100% - 40px)',
                    maxWidth: '200px',
                }}
            >
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
        </div>
    );
}

export default Room;
