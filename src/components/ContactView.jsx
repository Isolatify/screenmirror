import { ArrowLeft, Mail, MessageSquare, Send, Zap } from 'lucide-react'

function ContactView({ onBack }) {
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
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Contact Us</h1>
          </div>

          <p className="text-muted-foreground mb-8">
            Have questions, feedback, or need support? We'd love to hear from you!
          </p>

          <div className="space-y-8">
            <section className="glass-button rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-purple-500" />
                Email Us
              </h2>
              <p className="text-muted-foreground mb-4">
                Send us an email directly and we'll get back to you as soon as possible.
              </p>
              <a 
                href="mailto:abdul.mohammad5504@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <Mail className="w-5 h-5" />
                abdul.mohammad5504@gmail.com
              </a>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-purple-500" />
                Response Time
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We typically respond to emails within 24-48 hours. For urgent matters, 
                please include "URGENT" in your subject line.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What to Include</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Your name and how you prefer to be addressed</li>
                <li>A detailed description of your question or issue</li>
                <li>Screenshots or error messages if applicable</li>
                <li>Your preferred method of contact (email, etc.)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Common Topics</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Technical Support</h3>
                  <p className="text-muted-foreground text-sm">
                    Connection issues, sharing problems, or feature requests
                  </p>
                </div>
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Partnerships</h3>
                  <p className="text-muted-foreground text-sm">
                    Business inquiries, collaboration opportunities
                  </p>
                </div>
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Feedback</h3>
                  <p className="text-muted-foreground text-sm">
                    Suggestions, bug reports, or general feedback
                  </p>
                </div>
                <div className="glass-button rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Privacy & Security</h3>
                  <p className="text-muted-foreground text-sm">
                    Privacy concerns or security-related questions
                  </p>
                </div>
              </div>
            </section>

            <section className="glass-button rounded-2xl p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-500" />
                Quick Contact
              </h2>
              <p className="text-muted-foreground">
                For the fastest response, email us at{' '}
                <a 
                  href="mailto:abdul.mohammad5504@gmail.com" 
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  abdul.mohammad5504@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactView
