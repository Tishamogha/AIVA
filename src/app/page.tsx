'use client';
import { useState, useRef } from 'react';
import Lottie from 'lottie-react';
import abstraction from '../../public/Abstraction.json'; // adjust path if needed

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [status, setStatus] = useState('Tap and hold the mic to speak');
  const [emoji, setEmoji] = useState('');
  const [avatarAnim, setAvatarAnim] = useState(false);
  const [micShake, setMicShake] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const recognition = useRef<any>(null);

  const getSpeechRecognition = () => {
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
  };

  // Start listening
  const startListening = () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
      setStatus('Mic not supported ❌');
      setEmoji('❌');
      return;
    }

    setStatus('Listening... 🎧');
    setEmoji('🎧');
    setAvatarAnim(true);

    try {
      recognition.current = new SpeechRecognition();
      recognition.current.lang = 'en-US';
      recognition.current.interimResults = false;
      recognition.current.maxAlternatives = 1;

      recognition.current.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        setTranscript(transcriptText);
        addToChat(`🧑‍💬 ${transcriptText}`);
        sendMessageToAI(transcriptText);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setStatus('Error 😢');
        setEmoji('😢');
        recognition.current = null;
      };

      recognition.current.onend = () => {
        setAvatarAnim(false);
        setMicShake(false);
        recognition.current = null;
      };

      recognition.current.start();
      setTimeout(() => setMicShake(true), 3000);
    } catch (err) {
      console.error('Failed to start recognition:', err);
      setStatus('Error 😢');
      setEmoji('😢');
    }
  };

  // Stop listening
  const stopListening = () => {
    setStatus('Thinking... 🤔');
    setEmoji('🤔');

    if (recognition.current) {
      try {
        recognition.current.stop();
      } catch (err) {
        console.warn('Recognition already stopped or failed:', err);
      }
    }
  };

  // Mock AI response + Text-to-Speech
  const sendMessageToAI = async (userMessage: string) => {
    setStatus('Thinking... 🤔');
    setEmoji('🤔');

    setTimeout(() => {
      let aiMessage = '';
      const msg = userMessage.toLowerCase();

      if (msg.includes('hello')) aiMessage = 'Hello! How are you?';
      else if (msg.includes('how are you')) aiMessage = "I'm doing great! 😊";
      else if (msg.includes('name')) aiMessage = "I'm AIVA, your AI companion!";
      else aiMessage = "That's interesting! 🤖";

      setStatus('Speaking... 🗣️');
      setEmoji('🗣️');

      // Speak the AI message
      speakAI(aiMessage);

      // Add to chat history
      addToChat(`🤖 ${aiMessage}`);
    }, 1000);
  };

  // Browser Text-to-Speech
  const speakAI = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('TTS not supported in this browser');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 1;

    utterance.onstart = () => {
      setAvatarAnim(true);
    };

    utterance.onend = () => {
      setStatus('Tap and hold the mic to speak');
      setEmoji('');
      setAvatarAnim(false);
    };

    speechSynthesis.speak(utterance);
  };

  const addToChat = (message: string) => {
    setChatHistory((prev) => [...prev, message]);
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-animated-dark text-light' : 'bg-animated text-dark'
      } d-flex flex-column align-items-center justify-content-center vh-100 text-center position-relative`}
    >
      {/* Lottie Background */}
      <div
        className="position-absolute w-100 h-100 top-0 start-0"
        style={{ zIndex: 0, pointerEvents: 'none', opacity: 0.3 }}
      >
        <Lottie animationData={abstraction} loop autoplay />
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        className="btn btn-outline-secondary position-absolute top-0 end-0 m-3"
        onClick={() => setDarkMode(!darkMode)}
        style={{ zIndex: 2 }}
      >
        {darkMode ? (
          <i className="bi bi-sun-fill fs-5"></i>
        ) : (
          <i className="bi bi-moon-fill fs-5"></i>
        )}
      </button>

      {/* Avatar */}
      <img
        src="/avatar.jpg"
        alt="AI Avatar"
        className={`rounded-circle border border-4 border-white shadow mb-3 ${
          avatarAnim ? 'avatar-animate avatar-float blink' : ''
        }`}
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          transition: 'transform 0.3s',
          zIndex: 2,
        }}
      />

      {/* Avatar Name */}
      <h2 className="mb-4" style={{ zIndex: 2 }}>
        AIVA
      </h2>

      {/* Mic Button */}
      <button
        className={`btn btn-danger btn-lg rounded p-2 fs-2 mb-3 mic-button ${
          micShake ? 'shake' : ''
        }`}
        onMouseDown={startListening}
        onMouseUp={stopListening}
        style={{ zIndex: 2 }}
      >
        🎤
      </button>

      {/* Status Text */}
      <div
        className={`fs-6 mb-2 status-text ${darkMode ? 'text-light' : 'text-muted'}`}
        style={{ zIndex: 2 }}
      >
        {status} {emoji && <span className="emoji">{emoji}</span>}
      </div>

      {/* Chat History */}
      <div
        className="mt-3"
        style={{
          zIndex: 2,
          maxWidth: '90%',
          textAlign: 'left',
          overflowY: 'auto',
          maxHeight: '30vh',
        }}
      >
        {chatHistory.map((msg, idx) => (
          <div key={idx} className="mb-1">
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
