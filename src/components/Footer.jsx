import { Heart, Zap, Settings, Code } from 'lucide-react'
import { useState } from 'react'
import ThemeSettings from './ThemeSettings'

function Footer({ onNavigate }) {
  const [showThemeSettings, setShowThemeSettings] = useState(false)

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 footer py-4 px-6 z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img 
                  src="/logo.png" 
                  alt="Screen Mirror Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold gradient-text">Screen Mirror</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made by</span>
                <img 
                  src="/ig.png" 
                  alt="Instagram" 
                  className="w-8 h-8 object-contain"
                />
                <span>The Isolatify Brand</span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <button onClick={() => onNavigate('privacy')} className="hover:text-purple-600 transition-colors">Privacy</button>
                <button onClick={() => onNavigate('terms')} className="hover:text-purple-600 transition-colors">Terms</button>
                <button onClick={() => onNavigate('help')} className="hover:text-purple-600 transition-colors">Help</button>
                <button onClick={() => onNavigate('contact')} className="hover:text-purple-600 transition-colors">Contact Us</button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowThemeSettings(true)}
                  className="p-2 glass-button rounded-full hover:text-purple-600 transition-colors"
                  title="Theme Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <a href="#" className="p-2 glass-button rounded-full hover:text-purple-600 transition-colors" title="View Source">
                  <Code onClick={() => window.open('https://github.com/Isolatify/screenmirror', '_blank')} className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {showThemeSettings && (
        <ThemeSettings onClose={() => setShowThemeSettings(false)} />
      )}
    </>
  )
}

export default Footer
