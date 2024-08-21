import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomLogin = () => {
  const [RoomCode, setRoomCode] = useState("");
  const navigate = useNavigate();

  const submitCode = async (e) => {
    e.preventDefault();
    const recipientEmail = sessionStorage.getItem('email');
    
    if (!recipientEmail) {
      alert('No recipient email found.');
      return;
    }

    const emailData = {
      recipient: recipientEmail,
      body: `You have been invited to join a video call. Please use the following link: http://localhost:3000/room/${RoomCode}`
    };

    try {
      await fetch('http://localhost:8000/send-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      navigate(`/room/${RoomCode}`);
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };

  return (
    <div className="mt-16">
      <h1 className="font-black text-center text-5xl font-serif">
        Video Call
      </h1>
      <div className="mt-28">
        <form onSubmit={submitCode} className="text-center">
          <label className="text-black text-3xl font-serif">
            Enter Random code to join
          </label>
          <div className="w-2/6 text-center ml-96 align-middle pl-64 ">
            <input
              type="text"
              placeholder="Enter Random Code"
              value={RoomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mt-10">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomLogin;
