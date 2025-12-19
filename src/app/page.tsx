'use client';
import { useState } from 'react';
import Lottie from 'lottie-react';
import abstraction from '../../public/Abstraction.json'; // adjust path if needed

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [status, setStatus] = useState('Tap and hold the mic to speak');
  const [emoji, setEmoji] = useState('');
  const [avatarAnim, setAvatarAnim] = useState(false);
  const [micShake, setMicShake] = useState(false);

  const startListening = () => {
    setStatus('Listening... 🎧');
    setEmoji('🎧');
    setAvatarAnim(true);
    setTimeout(() => setMicShake(true), 3000); // shake after 3s
  };

  const stopListening = () => {
    setStatus('Thinking... 🤔');
    setEmoji('🤔');
    setTimeout(() => {
      setStatus('Tap and hold the mic to speak');
      setEmoji('');
      setAvatarAnim(false);
      setMicShake(false);
    }, 1000);
  };

  return (
    <div className={`${darkMode ? 'bg-animated-dark text-light' : 'bg-animated text-dark'} d-flex flex-column align-items-center justify-content-center vh-100 text-center position-relative`}>

      {/* Lottie Background */}
      <div className="position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 0, pointerEvents: 'none', opacity: 0.3 }}>
        <Lottie animationData={abstraction} loop autoplay />
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        className="btn btn-outline-secondary position-absolute top-0 end-0 m-3"
        onClick={() => setDarkMode(!darkMode)}
        style={{ zIndex: 2 }}
      >
        {darkMode ? <i className="bi bi-sun-fill fs-5"></i> : <i className="bi bi-moon-fill fs-5"></i>}
      </button>

      {/* Avatar */}
      <img
        src="/avatar.jpeg"
        alt="AI Avatar"
        className={`rounded-circle border border-4 border-white shadow mb-3 ${avatarAnim ? 'avatar-animate avatar-float blink' : ''}`}
        style={{ width: '200px', height: '200px', objectFit: 'cover', transition: 'transform 0.3s', zIndex: 2 }}
      />

      {/* Avatar Name */}
      <h2 className="mb-4" style={{ zIndex: 2 }}>AIVA</h2>

      {/* Mic Button */}
      <button
        className={`btn btn-danger btn-lg rounded p-2 fs-2 mb-3 mic-button ${micShake ? 'shake' : ''}`}
        onMouseDown={startListening}
        onMouseUp={stopListening}
        style={{ zIndex: 2 }}
      >
        🎤
      </button>

      {/* Status Text */}
      <div className={`fs-6 mb-2 status-text ${darkMode ? 'text-light' : 'text-muted'}`} style={{ zIndex: 2 }}>
        {status} {emoji && <span className="emoji">{emoji}</span>}
      </div>
    </div>
  );
}
