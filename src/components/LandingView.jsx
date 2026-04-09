import { Monitor, Share2 } from 'lucide-react'

function LandingView({ onDisplay, onShareScreen }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-20">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slideIn">
          <div className="flex items-center justify-center gap-4 mb-8">
            <img 
              src="/logo.png" 
              alt="Screen Mirror Logo" 
              className="w-20 h-20 object-contain animate-float"
            />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">Screen Mirror</h1>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
            Share Your Screen
            <br />
            <span className="text-4xl md:text-5xl">Anywhere, Instantly</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Crystal clear screen sharing with a simple 6-digit code. 
            No sign-up required.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={onDisplay}
            className="group relative glass-card rounded-3xl p-10 hover:scale-105 transition-all duration-500 cursor-pointer liquid-border animate-scaleIn"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg animate-float">
                <Monitor className="w-12 h-12 text-white" />
              </div>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3 text-gray-900">Display</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Get a 6-digit code to display shared screen on this device
                </p>
              </div>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </button>

          <button
            onClick={onShareScreen}
            className="group relative glass-card rounded-3xl p-10 hover:scale-105 transition-all duration-500 cursor-pointer liquid-border animate-scaleIn"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative flex flex-col items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <Share2 className="w-12 h-12 text-white" />
              </div>
              
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3 text-gray-900">Share Screen</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Enter a code to share your screen to another device
                </p>
              </div>
              
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </button>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-3xl mx-auto animate-slideIn" style={{ animationDelay: '0.3s' }}>
          <div className="glass-button rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Free</div>
            <div className="text-sm text-muted-foreground">No sign-up needed</div>
          </div>
          <div className="glass-button rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Fast</div>
            <div className="text-sm text-muted-foreground">WebRTC powered</div>
          </div>
          <div className="glass-button rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Secure</div>
            <div className="text-sm text-muted-foreground">End-to-end encrypted</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingView
