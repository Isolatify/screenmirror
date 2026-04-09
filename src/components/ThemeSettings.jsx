import { useTheme } from '../contexts/ThemeContext'
import { Palette, Droplets, Zap, X } from 'lucide-react'

function ThemeSettings({ onClose }) {
  const { theme, setTheme, themes, glassIntensity, setGlassIntensity, glassIntensities, animationSpeed, setAnimationSpeed, animationSpeeds } = useTheme()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="glass-card rounded-3xl p-8 max-w-md w-full mx-4 animate-scaleIn">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold gradient-text">Customize Theme</h3>
          <button onClick={onClose} className="p-2 glass-button rounded-full hover:bg-red-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Selection */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Palette className="w-4 h-4" />
            Color Theme
          </label>
          <div className="grid grid-cols-5 gap-2">
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => setTheme(themeName)}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  theme === themeName
                    ? 'ring-2 ring-purple-500 ring-offset-2 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{
                  background: `linear-gradient(135deg, hsl(${themes[themeName].primary}) 0%, hsl(${themes[themeName].secondary}) 100%)`
                }}
                title={themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Glass Intensity */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Droplets className="w-4 h-4" />
            Glass Effect
          </label>
          <div className="flex gap-2">
            {Object.keys(glassIntensities).map((intensity) => (
              <button
                key={intensity}
                onClick={() => setGlassIntensity(intensity)}
                className={`flex-1 p-3 rounded-xl glass-button transition-all duration-300 ${
                  glassIntensity === intensity
                    ? 'ring-2 ring-purple-500 ring-offset-2'
                    : ''
                }`}
              >
                <span className="capitalize">{intensity}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Animation Speed */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm font-medium mb-3">
            <Zap className="w-4 h-4" />
            Animation Speed
          </label>
          <div className="flex gap-2">
            {Object.keys(animationSpeeds).map((speed) => (
              <button
                key={speed}
                onClick={() => setAnimationSpeed(speed)}
                className={`flex-1 p-3 rounded-xl glass-button transition-all duration-300 ${
                  animationSpeed === speed
                    ? 'ring-2 ring-purple-500 ring-offset-2'
                    : ''
                }`}
              >
                <span className="capitalize">{speed}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="p-4 glass-button rounded-xl mb-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Preview</p>
            <div className="flex justify-center gap-2">
              <div
                className="w-8 h-8 rounded-lg"
                style={{ background: `hsl(${themes[theme].primary})` }}
              />
              <div
                className="w-8 h-8 rounded-lg"
                style={{ background: `hsl(${themes[theme].secondary})` }}
              />
              <div
                className="w-8 h-8 rounded-lg"
                style={{ background: `hsl(${themes[theme].accent})` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default ThemeSettings
