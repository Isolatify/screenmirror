import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default')
  const [glassIntensity, setGlassIntensity] = useState('medium')
  const [animationSpeed, setAnimationSpeed] = useState('normal')

  const themes = {
    default: {
      primary: '201 55% 56%',
      secondary: '217 91% 60%',
      accent: '186 100% 50%'
    },
    ocean: {
      primary: '199 89% 48%',
      secondary: '210 100% 50%',
      accent: '170 100% 42%'
    },
    sunset: {
      primary: '24 95% 53%',
      secondary: '340 75% 55%',
      accent: '45 93% 47%'
    },
    forest: {
      primary: '142 76% 36%',
      secondary: '158 64% 52%',
      accent: '85 70% 45%'
    },
    candy: {
      primary: '330 81% 60%',
      secondary: '280 65% 60%',
      accent: '20 90% 50%'
    }
  }

  const glassIntensities = {
    light: { blur: '10px', opacity: '0.6' },
    medium: { blur: '20px', opacity: '0.8' },
    heavy: { blur: '30px', opacity: '0.9' }
  }

  const animationSpeeds = {
    slow: '3s',
    normal: '1.5s',
    fast: '0.5s'
  }

  useEffect(() => {
    const root = document.documentElement
    const selectedTheme = themes[theme]
    root.style.setProperty('--primary', selectedTheme.primary)
    root.style.setProperty('--secondary', selectedTheme.secondary)
    root.style.setProperty('--accent', selectedTheme.accent)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    const selectedIntensity = glassIntensities[glassIntensity]
    root.style.setProperty('--glass-blur', selectedIntensity.blur)
    root.style.setProperty('--glass-opacity', selectedIntensity.opacity)
  }, [glassIntensity])

  useEffect(() => {
    const root = document.documentElement
    const selectedSpeed = animationSpeeds[animationSpeed]
    root.style.setProperty('--animation-speed', selectedSpeed)
  }, [animationSpeed])

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      themes,
      glassIntensity,
      setGlassIntensity,
      glassIntensities,
      animationSpeed,
      setAnimationSpeed,
      animationSpeeds
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
