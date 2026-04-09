import { useState } from 'react'
import LandingView from './components/LandingView'
import DisplayView from './components/DisplayView'
import ShareScreenView from './components/ShareScreenView'
import PrivacyView from './components/PrivacyView'
import TermsView from './components/TermsView'
import HelpView from './components/HelpView'
import ContactView from './components/ContactView'
import Footer from './components/Footer'
import { ThemeProvider } from './contexts/ThemeContext'
import './index.css'

function App() {
  const [currentView, setCurrentView] = useState('landing')

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg">
        {currentView === 'landing' && (
          <LandingView onDisplay={() => setCurrentView('display')} onShareScreen={() => setCurrentView('share')} />
        )}
        {currentView === 'display' && (
          <DisplayView onBack={() => setCurrentView('landing')} />
        )}
        {currentView === 'share' && (
          <ShareScreenView onBack={() => setCurrentView('landing')} />
        )}
        {currentView === 'privacy' && (
          <PrivacyView onBack={() => setCurrentView('landing')} />
        )}
        {currentView === 'terms' && (
          <TermsView onBack={() => setCurrentView('landing')} />
        )}
        {currentView === 'help' && (
          <HelpView onBack={() => setCurrentView('landing')} />
        )}
        {currentView === 'contact' && (
          <ContactView onBack={() => setCurrentView('landing')} />
        )}
        <Footer onNavigate={setCurrentView} />
      </div>
    </ThemeProvider>
  )
}

export default App
