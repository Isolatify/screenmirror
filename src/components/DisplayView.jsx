import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Copy, Check, Maximize, Minimize, Sparkles, Monitor } from 'lucide-react'
import Peer from 'peerjs'

function DisplayView({ onBack }) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('generating')
  const [isConnected, setIsConnected] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectionStats, setConnectionStats] = useState(null)
  
  const peerRef = useRef(null)
  const videoRef = useRef(null)
  const callRef = useRef(null)

  useEffect(() => {
    generateCode()
    return () => {
      if (peerRef.current) {
        peerRef.current.destroy()
      }
    }
  }, [])

  const generateCode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setCode(newCode)
    initializePeer(newCode)
  }

  const initializePeer = (peerId) => {
    setStatus('connecting')
    
    const peer = new Peer(`screen-mirror-display-${peerId}`, {
      debug: 2,
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' }
        ]
      }
    })

    peer.on('open', (id) => {
      console.log('Display peer connected with ID:', id)
      setStatus('waiting')
    })

    peer.on('call', (call) => {
      console.log('Incoming call')
      call.answer()
      callRef.current = call

      call.on('stream', (stream) => {
        console.log('Received stream', stream)
        console.log('Stream tracks:', stream.getTracks())
        console.log('Video tracks:', stream.getVideoTracks())
        console.log('Audio tracks:', stream.getAudioTracks())
        console.log('Video ref:', videoRef.current)
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          console.log('Set srcObject, current srcObject:', videoRef.current.srcObject)
          
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded, videoWidth:', videoRef.current.videoWidth, 'videoHeight:', videoRef.current.videoHeight)
            videoRef.current.play().then(() => {
              console.log('Video playing successfully')
            }).catch(err => console.error('Error playing video:', err))
          }
          
          videoRef.current.onplay = () => {
            console.log('Video onplay event fired')
          }
          
          videoRef.current.onerror = (e) => {
            console.error('Video onerror event:', e)
          }
          
          setIsConnected(true)
          setStatus('connected')
        } else {
          console.error('Video ref is null')
        }
      })

      call.on('close', () => {
        console.log('Call ended')
        setIsConnected(false)
        setStatus('waiting')
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      })

      // Track connection stats
      setInterval(() => {
        if (call.peerConnection) {
          const stats = call.peerConnection.getStats()
          stats.then((report) => {
            report.forEach((stat) => {
              if (stat.type === 'inbound-rtp' && stat.kind === 'video') {
                setConnectionStats({
                  bitrate: Math.round(stat.bytesReceived / 1024),
                  resolution: `${stat.frameWidth}x${stat.frameHeight}`,
                  fps: stat.framesPerSecond || 0
                })
              }
            })
          })
        }
      }, 1000)
    })

    peer.on('error', (err) => {
      console.error('Peer error:', err)
      setStatus('error')
    })

    peerRef.current = peer
  }

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (videoRef.current?.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const disconnect = () => {
    if (callRef.current) {
      callRef.current.close()
    }
    setIsConnected(false)
    setStatus('waiting')
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  return (
    <div className="min-h-screen p-4 pb-20">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors glass-button px-4 py-2 rounded-full"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="max-w-5xl mx-auto">
        {!isConnected && (
          <div className="glass-card rounded-3xl p-10 text-center animate-scaleIn">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 glass-button rounded-full">
              <Monitor className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">Display Mode</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Receive</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Share this 6-digit code to start receiving a screen share
            </p>

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 glass-button">
                Connection error. Please try again.
              </div>
            )}

            <div className="mb-8">
              <div className="inline-block relative">
                <div className="text-8xl font-bold tracking-wider mb-4 font-mono gradient-text animate-float">
                  {code || '---'}
                </div>
                <button
                  onClick={copyCode}
                  className="absolute -right-16 top-1/2 -translate-y-1/2 p-3 glass-button rounded-xl hover:scale-110 transition-transform"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-6 h-6 text-green-500" />
                  ) : (
                    <Copy className="w-6 h-6" />
                  )}
                </button>
              </div>
              <p className="text-base text-muted-foreground mt-4">
                {status === 'connecting' && (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Initializing...
                  </span>
                )}
                {status === 'waiting' && (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Waiting for connection...
                  </span>
                )}
                {status === 'error' && 'Error occurred'}
              </p>
            </div>

            <button
              onClick={generateCode}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Generate New Code
            </button>
          </div>
        )}
        
        <div className={`relative ${!isConnected ? 'hidden' : ''} animate-scaleIn`}>
          <div className="glass-card rounded-3xl p-4 liquid-border">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              controls
              className="w-full h-[400px] md:h-[600px] rounded-2xl bg-black object-contain"
              onError={(e) => console.error('Video error:', e)}
            />
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={toggleFullscreen}
                className="p-3 glass-button rounded-full hover:scale-110 transition-transform"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={disconnect}
                className="px-6 py-2 glass-button rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 font-semibold"
              >
                Disconnect
              </button>
            </div>

            {connectionStats && (
              <div className="absolute bottom-4 left-4 glass-dark rounded-2xl p-4 text-sm shimmer">
                <div className="flex gap-6">
                  <div>
                    <span className="text-muted-foreground">Bitrate:</span>{' '}
                    <span className="font-semibold">{connectionStats.bitrate} KB/s</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Resolution:</span>{' '}
                    <span className="font-semibold">{connectionStats.resolution}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">FPS:</span>{' '}
                    <span className="font-semibold">{connectionStats.fps}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayView
