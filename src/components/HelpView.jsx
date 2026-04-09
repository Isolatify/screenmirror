import { ArrowLeft, HelpCircle, Monitor, Share2, Smartphone, AlertTriangle, CheckCircle, Zap } from 'lucide-react'

function HelpView({ onBack }) {
  return (
    <div className="min-h-screen p-4 pb-20">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors glass-button px-4 py-2 rounded-full"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-10 animate-scaleIn">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Help Center</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-500" />
                How to Display a Screen
              </h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Click "Display" on the home page</li>
                <li>A 6-digit code will be generated</li>
                <li>Share this code with the person who wants to share their screen</li>
                <li>Wait for the connection to be established</li>
                <li>The shared screen will appear automatically</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-purple-500" />
                How to Share Your Screen
              </h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Click "Share Screen" on the home page</li>
                <li>Enter the 6-digit code from the display device</li>
                <li>Select your share mode (Screen or Camera)</li>
                <li>Adjust quality settings if needed</li>
                <li>Click "Connect" and select what to share</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-500" />
                Mobile Support
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Screen Mirror works on mobile devices! On phones and tablets, you can share your camera 
                instead of your screen (since mobile browsers don't support screen sharing). 
                You can also view shared screens on any mobile device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-purple-500" />
                Troubleshooting
              </h2>
              <div className="space-y-4">
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Connection won't establish?</h3>
                  <p className="text-muted-foreground text-sm">
                    Make sure both devices have a stable internet connection and the code is entered correctly.
                  </p>
                </div>
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Screen is black or not showing?</h3>
                  <p className="text-muted-foreground text-sm">
                    Try refreshing the connection or checking if you've granted screen sharing permissions.
                  </p>
                </div>
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Poor video quality?</h3>
                  <p className="text-muted-foreground text-sm">
                    Adjust the resolution and frame rate settings in the Share Screen settings panel.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-500" />
                Tips for Best Performance
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Use a stable internet connection (WiFi recommended)</li>
                <li>Lower resolution for slower connections</li>
                <li>Disable audio if not needed to reduce bandwidth</li>
                <li>Close unnecessary applications on the sharing device</li>
                <li>Use Chrome or Edge for best WebRTC support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Still Need Help?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you're still experiencing issues, please check our Privacy Policy and Terms of Service 
                for more information about how our service works.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpView
