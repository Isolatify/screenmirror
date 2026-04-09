import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react'

function PrivacyView({ onBack }) {
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Privacy Policy</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: April 2026
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-500" />
                Data Collection
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Screen Mirror is designed with privacy in mind. We do not collect, store, or transmit any personal data. 
                Your screen sharing sessions are peer-to-peer (P2P) and do not pass through our servers for content delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-500" />
                Screen Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you share your screen, the video stream is sent directly to the recipient using WebRTC technology. 
                We use a signaling server only to establish the initial connection - your screen content never touches our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-500" />
                Connection Codes
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The 6-digit connection codes are generated locally on your device and are temporary. 
                They are not stored in any database and expire after your session ends.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-500" />
                Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                All connections use end-to-end encryption via WebRTC. We do not have access to your shared content, 
                and we do not log or monitor your sessions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use PeerJS's free cloud signaling server for connection establishment only. 
                This service does not have access to your screen content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any privacy concerns or questions, please contact us through our help page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyView
