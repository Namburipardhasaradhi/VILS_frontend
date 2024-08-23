import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
    const { roomID } = useParams();
    const meetingContainerRef = useRef(null);
    const [recorder, setRecorder] = useState(null);
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
                onReady: async (zegoExpressEngine) => {
                    console.log("Meeting is ready.");
                    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                    const mediaRecorder = new MediaRecorder(stream);
                    setRecorder(mediaRecorder);

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            setRecordedChunks((prev) => [...prev, event.data]);
                        }
                    };

                    mediaRecorder.onstop = async () => {
                        const blob = new Blob(recordedChunks, {
                            type: 'video/webm'
                        });
                        const formData = new FormData();
                        formData.append('file', blob, `recording_${Date.now()}.webm`);

                        await fetch('http://localhost:8000/upload-screen-recording', {
                            method: 'POST',
                            body: formData,
                        });

                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = `recording_${Date.now()}.webm`;
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    };
                },
            });
        };

        if (meetingContainerRef.current) {
            startMeeting();
        }
    }, [roomID, recordedChunks]);

    const startRecording = () => {
        if (recorder) {
            recorder.start();
            console.log("Recording started");
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stop();
            console.log("Recording stopped");
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div ref={meetingContainerRef} style={{ width: "100%", height: "100%" }}></div>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
        </div>
    );
}

export default Room;
