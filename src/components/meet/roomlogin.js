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
      body: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <p>Dear User,</p>
          <p>You have been invited to join a secure video call on our platform.</p>
          <p><strong>Room Code:</strong> ${RoomCode}</p>
          <p>Please click the link below to join the video call:</p>
          <p><a href="https://vilsvc.netlify.app/room/${RoomCode}" style="color: #4e00c2;">Join Video Call</a></p>
          <p>If you have any questions or require assistance, please do not hesitate to contact our support team.</p>
          <p>Best Regards,<br/>The vilsvc Team</p>
        </div>
      `,
    };

    try {
      await fetch('https://vils-backend-2.onrender.com/send-email/', {
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Join a Video Call</h1>
        <form onSubmit={submitCode}>
          <label style={styles.label}>Enter a Room Code to Join</label>
          <input
            type="text"
            placeholder="Enter Room Code"
            value={RoomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0', // Light grey background
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#4e00c2', // Violet color
  },
  label: {
    display: 'block',
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4e00c2',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default RoomLogin;
