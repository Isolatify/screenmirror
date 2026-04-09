# Screen Mirror

A modern, user-friendly web application for screen mirroring using WebRTC. Share your screen to any device with an internet connection using a simple 6-digit code.

## Features

- **Display Mode**: Generate a 6-digit code to receive screen shares on your device
- **Share Screen Mode**: Enter a code to share your screen to another device
- **Quality Settings**: Choose between low, medium, or high quality streaming
- **Audio Toggle**: Include or exclude system audio in the screen share
- **Connection Stats**: Real-time bitrate, resolution, and FPS monitoring
- **Fullscreen Support**: Display shared screen in fullscreen mode
- **Modern Design**: Clean, futuristic light mode UI with glassmorphism effects

## Tech Stack

- **React** + Vite for fast development
- **TailwindCSS** for modern styling
- **PeerJS** for WebRTC peer-to-peer connections
- **Lucide React** for beautiful icons

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project in Netlify
3. Netlify will automatically detect the configuration from `netlify.toml`
4. Deploy!

## How It Works

1. **Display Mode**: Click "Display" to generate a 6-digit code. Share this code with the person who wants to share their screen.
2. **Share Screen Mode**: Click "Share Screen", enter the 6-digit code from the display device, and select your screen/window/tab to share.
3. The connection uses WebRTC via PeerJS's free cloud signaling server for peer-to-peer communication.

## Mobile Support

The app works on mobile devices (phones & tablets) for both viewing and sharing:

- **Viewing**: Mobile devices can view shared screens/cameras using the Display mode
- **Sharing**: Mobile devices can share their camera (screen sharing is not supported on mobile browsers)
- The app automatically detects mobile devices and switches to camera mode for sharing
- Responsive design adapts to different screen sizes

## Requirements

- Modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)
- HTTPS is required for screen sharing (automatic on Vercel/Netlify)
- Both devices need internet access

## Notes

- The free PeerJS cloud server has limitations but works well for personal use
- Code collision is possible with 6-digit codes (1M combinations)
- For production scaling, consider a custom signaling server or PeerJS premium
