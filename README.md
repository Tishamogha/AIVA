# AIVA - AI Voice Assistant (Frontend)

## Overview
This is the **frontend** for the AIVA project – a voice-based AI companion with an interactive avatar. The frontend is built with **Next.js, Bootstrap, and Lottie animations**.  

Users can:
- Interact with an AI avatar visually
- Press and hold the mic button to simulate voice input
- See avatar animations and status updates
- Toggle between dark and light mode
- Enjoy animated Lottie background for a polished look

---

## Tech Stack
- **Frontend Framework:** Next.js 13 (App Router)
- **UI Library:** Bootstrap 5
- **Animations:** CSS animations + Lottie React
- **Icons:** Bootstrap Icons
- **State Management:** React `useState`

---

## Features Implemented

### 1. Dark/Light Mode
- Toggle button switches the UI between dark and light theme
- Background gradients adjust automatically

### 2. Avatar
- Rounded avatar image with shadow and border
- Animations:
  - Bounce + rotate when AI is active
  - Subtle floating effect
  - Blink animation for eyes/mouth (CSS)

### 3. Mic Button
- Press-and-hold to simulate listening
- Glowing effect, pulsing, and shake animation for long press

### 4. Status Text & Emoji
- Updates dynamically with mic press:
  - Listening 🎧
  - Thinking 🤔
  - Default message
- Emojis pop in with animation
- Typewriter effect for text simulation

### 5. Lottie Background
- Full-screen animated background using Lottie
- Works in dark and light mode
- Positioned behind avatar and UI elements
- Semi-transparent to avoid distraction

### 6. Responsiveness
- Fully responsive layout for mobile and desktop
- Avatar and buttons resize gracefully
- All elements centered vertically and horizontally

### 7. Future Enhancements (Frontend)
- Real-time voice input waveform
- Chat history cards
- More advanced avatar expressions with Lottie/3D
- Interactive quick reaction buttons
- Improved accessibility features
