import { createContext, useContext, useState, useCallback } from 'react'
import type { ARESettings, DenominationId } from '../settings'
import { loadSettings, saveSettings, DENOMINATION_TRANSLATION_MAP } from '../settings'

interface SettingsContextValue {
  settings: ARESettings
  setDenomination: (id: DenominationId | null) => void
  updateSettings: (patch: Partial<ARESettings>) => void
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: loadSettings(),
  setDenomination: () => {},
  updateSettings: () => {},
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ARESettings>(loadSettings)

  const updateSettings = useCallback((patch: Partial<ARESettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch }
      saveSettings(next)
      return next
    })
  }, [])

  const setDenomination = useCallback((id: DenominationId | null) => {
    setSettings(prev => {
      const mapping = id ? DENOMINATION_TRANSLATION_MAP[id] : null
      const next: ARESettings = {
        ...prev,
        denomination: id,
        defaultTranslations: {
          ...prev.defaultTranslations,
          christianity: mapping?.defaultChristianityTranslation ?? prev.defaultTranslations.christianity,
        },
      }
      saveSettings(next)
      return next
    })
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, setDenomination, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
