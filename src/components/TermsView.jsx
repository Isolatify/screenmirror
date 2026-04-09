import { ArrowLeft, FileText, CheckCircle, AlertCircle, Info } from 'lucide-react'

function TermsView({ onBack }) {
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Terms of Service</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Last updated: April 2026
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By using Screen Mirror, you agree to these terms of service. If you do not agree to these terms, 
                please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-purple-500" />
                Service Description
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Screen Mirror is a free peer-to-peer screen sharing service that allows users to share their screen 
                or camera with others using a simple 6-digit code. The service is provided "as is" without warranty.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-500" />
                User Responsibilities
              </h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>You must be at least 13 years old to use this service</li>
                <li>You are responsible for what you choose to share</li>
                <li>Do not share illegal, harmful, or inappropriate content</li>
                <li>Respect the privacy and rights of others</li>
                <li>Do not attempt to exploit or disrupt the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Screen Mirror is not responsible for any damages arising from the use of our service. 
                We provide no warranties, express or implied, regarding the service's reliability, accuracy, or availability.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate access to our service at any time, 
                with or without notice, for any reason, including violation of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these terms from time to time. Continued use of the service after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these terms, please contact us through our help page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsView
