import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, RefreshCw, Pause, Play, Settings, Monitor, Volume2, VolumeX, Camera, Smartphone, Sparkles, Sliders } from 'lucide-react'
import Peer from 'peerjs'

function ShareScreenView({ onBack }) {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState('idle')
  const [isConnected, setIsConnected] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [quality, setQuality] = useState('high')
  const [frameRate, setFrameRate] = useState(30)
  const [resolution, setResolution] = useState('1080p')
  const [bitrate, setBitrate] = useState('auto')
  const [includeAudio, setIncludeAudio] = useState(true)
  const [connectionStats, setConnectionStats] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [shareMode, setShareMode] = useState('screen')
  
  const peerRef = useRef(null)
  const streamRef = useRef(null)
  const callRef = useRef(null)

  useEffect(() => {
    // Detect mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                          (navigator.maxTouchPoints > 0 && /MacIntel/.test(navigator.platform))
    setIsMobile(isMobileDevice)
    
    // Auto-switch to camera mode on mobile
    if (isMobileDevice) {
      setShareMode('camera')
    }
    
    return () => {
      cleanup()
    }
  }, [])

  const cleanup = () => {
    console.log('Cleaning up connection...')
    if (callRef.current) {
      callRef.current.close()
      callRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop()
        console.log('Stopped track:', track.kind)
      })
      streamRef.current = null
    }
    if (peerRef.current) {
      peerRef.current.destroy()
      peerRef.current = null
    }
    setIsConnected(false)
    setStatus('idle')
    setConnectionStats(null)
    setIsPaused(false)
    console.log('Cleanup complete')
  }

  const connect = async () => {
    if (!code || code.length !== 6) {
      alert('Please enter a valid 6-digit code')
      return
    }

    setStatus('connecting')

    try {
      let stream
      
      // Resolution mapping
      const resolutionMap = {
        '4k': { width: 3840, height: 2160 },
        '1080p': { width: 1920, height: 1080 },
        '720p': { width: 1280, height: 720 },
        '480p': { width: 854, height: 480 },
        '360p': { width: 640, height: 360 }
      }
      
      const res = resolutionMap[resolution] || resolutionMap['1080p']
      
      if (shareMode === 'camera') {
        // Use camera for mobile devices
        const cameraOptions = {
          video: {
            facingMode: 'environment', // Use back camera on mobile
            width: res.width,
            height: res.height,
            frameRate: frameRate
          },
          audio: includeAudio
        }
        
        stream = await navigator.mediaDevices.getUserMedia(cameraOptions)
        console.log('Got camera stream:', stream)
      } else {
        // Use screen share for desktop
        const displayMediaOptions = {
          video: {
            displaySurface: 'monitor',
            width: res.width,
            height: res.height,
            frameRate: frameRate
          },
          audio: includeAudio
        }

        stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)
        console.log('Got screen stream:', stream)
      }
      
      console.log('Stream tracks:', stream.getTracks())
      console.log('Video tracks:', stream.getVideoTracks())
      streamRef.current = stream

      // Handle user stopping the share
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.onended = () => {
          console.log('Video track ended')
          cleanup()
        }
      }

      // Initialize peer
      const peer = new Peer(`screen-mirror-share-${Date.now()}`, {
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
        console.log('Share peer connected with ID:', id)
        
        // Call the display peer
        console.log('Calling display peer with ID:', `screen-mirror-display-${code}`)
        const call = peer.call(`screen-mirror-display-${code}`, stream)
        console.log('Call created:', call)
        callRef.current = call

        call.on('close', () => {
          console.log('Call ended')
          cleanup()
        })

        call.on('error', (err) => {
          console.error('Call error:', err)
          setStatus('error')
        })

        setIsConnected(true)
        setStatus('connected')

        // Track connection stats
        setInterval(() => {
          if (call.peerConnection) {
            const stats = call.peerConnection.getStats()
            stats.then((report) => {
              report.forEach((stat) => {
                if (stat.type === 'outbound-rtp' && stat.kind === 'video') {
                  setConnectionStats({
                    bitrate: Math.round(stat.bytesSent / 1024),
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

    } catch (err) {
      console.error('Error getting stream:', err)
      setStatus('error')
      if (err.name === 'NotAllowedError') {
        alert(shareMode === 'camera' ? 'Camera permission denied' : 'Screen sharing permission denied')
      } else if (err.name === 'NotFoundError') {
        alert(shareMode === 'camera' ? 'No camera found' : 'No screen source found')
      } else {
        alert(`Failed to start ${shareMode === 'camera' ? 'camera' : 'screen'} sharing: ` + err.message)
      }
    }
  }

  const disconnect = () => {
    cleanup()
  }

  const refresh = () => {
    if (isConnected) {
      cleanup()
      setTimeout(() => connect(), 500)
    }
  }

  const togglePause = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack) {
        if (isPaused) {
          videoTrack.enabled = true
        } else {
          videoTrack.enabled = false
        }
        setIsPaused(!isPaused)
      }
    }
  }

  const updateQuality = (newQuality) => {
    setQuality(newQuality)
    if (isConnected) {
      refresh()
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
        <div className="glass-card rounded-3xl p-10 animate-scaleIn">
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-button rounded-full">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">Share Mode</span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-2 gradient-text">Start Sharing</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Enter the display code to begin sharing
          </p>

          {/* Share mode selector */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-sm font-medium mb-4">
              <Sliders className="w-4 h-4" />
              Share Mode
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setShareMode('screen')}
                disabled={isMobile}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  shareMode === 'screen'
                    ? 'glass-card ring-2 ring-purple-500 ring-offset-2 scale-105'
                    : 'glass-button hover:scale-105'
                } ${isMobile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Monitor className="w-6 h-6" />
                <span className="font-semibold">Screen</span>
              </button>
              <button
                onClick={() => setShareMode('camera')}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  shareMode === 'camera'
                    ? 'glass-card ring-2 ring-purple-500 ring-offset-2 scale-105'
                    : 'glass-button hover:scale-105'
                }`}
              >
                <Camera className="w-6 h-6" />
                <span className="font-semibold">Camera</span>
              </button>
            </div>
            {isMobile && (
              <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2 glass-button px-4 py-2 rounded-full inline-block">
                <Smartphone className="w-4 h-4" />
                Camera mode recommended for mobile devices
              </p>
            )}
          </div>

          {!isConnected ? (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Sparkles className="w-4 h-4" />
                  Display Code
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    className="flex-1 px-6 py-4 rounded-2xl glass-button text-center text-3xl font-mono tracking-wider focus:ring-2 focus:ring-purple-500 transition-all"
                    maxLength={6}
                  />
                  <button
                    onClick={connect}
                    disabled={status === 'connecting' || code.length !== 6}
                    className="px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'connecting' ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" />
                        Connecting...
                      </span>
                    ) : (
                      'Connect'
                    )}
                  </button>
                </div>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 glass-button">
                  Connection failed. Please check the code and try again.
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors glass-button px-4 py-3 rounded-xl"
                >
                  <Settings className="w-5 h-5" />
                  {showSettings ? 'Hide' : 'Show'} Settings
                </button>

                {showSettings && (
                  <div className="mt-6 space-y-6 p-6 glass-card rounded-2xl animate-scaleIn">
                    <div>
                      <label className="block text-sm font-medium mb-3">Resolution</label>
                      <div className="grid grid-cols-5 gap-2">
                        {['4k', '1080p', '720p', '480p', '360p'].map((res) => (
                          <button
                            key={res}
                            onClick={() => setResolution(res)}
                            className={`px-4 py-3 rounded-xl capitalize transition-all duration-300 ${
                              resolution === res
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105'
                                : 'glass-button hover:scale-105'
                            }`}
                          >
                            {res}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Frame Rate (FPS)</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[15, 24, 30, 60].map((fps) => (
                          <button
                            key={fps}
                            onClick={() => setFrameRate(fps)}
                            className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                              frameRate === fps
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105'
                                : 'glass-button hover:scale-105'
                            }`}
                          >
                            {fps}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Bitrate</label>
                      <div className="grid grid-cols-4 gap-2">
                        {['auto', 'low', 'medium', 'high'].map((bit) => (
                          <button
                            key={bit}
                            onClick={() => setBitrate(bit)}
                            className={`px-4 py-3 rounded-xl capitalize transition-all duration-300 ${
                              bitrate === bit
                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105'
                                : 'glass-button hover:scale-105'
                            }`}
                          >
                            {bit}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 glass-button rounded-xl">
                      <label className="text-sm font-medium">Include Audio</label>
                      <button
                        onClick={() => setIncludeAudio(!includeAudio)}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          includeAudio
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white scale-105'
                            : 'glass-button hover:scale-105'
                        }`}
                      >
                        {includeAudio ? (
                          <Volume2 className="w-6 h-6" />
                        ) : (
                          <VolumeX className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-scaleIn">
              <div className="glass-card rounded-2xl p-6 liquid-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse-glow" />
                    <span className="text-xl font-bold">
                      {shareMode === 'camera' ? 'Sharing Camera' : 'Sharing Screen'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={togglePause}
                      className="p-3 glass-button rounded-full hover:scale-110 transition-transform"
                      title={isPaused ? 'Resume' : 'Pause'}
                    >
                      {isPaused ? (
                        <Play className="w-5 h-5" />
                      ) : (
                        <Pause className="w-5 h-5" />
                      )}
                    </button>
                    <button
                      onClick={refresh}
                      className="p-3 glass-button rounded-full hover:scale-110 transition-transform"
                      title="Refresh"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={disconnect}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>

              {connectionStats && (
                <div className="glass-card rounded-2xl p-6 shimmer">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                    <Monitor className="w-5 h-5" />
                    Connection Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">{connectionStats.bitrate}</div>
                      <div className="text-sm text-muted-foreground">KB/s</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">{connectionStats.resolution}</div>
                      <div className="text-sm text-muted-foreground">Resolution</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">{connectionStats.fps}</div>
                      <div className="text-sm text-muted-foreground">FPS</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="glass-card rounded-2xl p-6">
                <p className="text-base text-center">
                  {shareMode === 'camera' 
                    ? 'Your camera is being shared. To stop sharing, click Disconnect above.'
                    : 'Your screen is being shared. To stop sharing, click the "Stop sharing" button in your browser or click Disconnect above.'
                  }
                </p>
              </div>

              {isPaused && (
                <div className="glass-card rounded-2xl p-6 border-2 border-yellow-400">
                  <p className="text-base text-center text-yellow-700">
                    Sharing is paused. Click the Play button to resume.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShareScreenView
