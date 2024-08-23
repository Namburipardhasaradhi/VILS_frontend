import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function Room() {
    const { roomID } = useParams();
    const meetingContainerRef = useRef(null);

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

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <div ref={meetingContainerRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
}

export default Room;
