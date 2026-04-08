import type { AIProviderConfig, AISelection, Provider } from "../types/ai"

export interface SidebarFeatures {
  systemPrompt?: {
    value: string;
    onChange: (value: string) => void;
  }
}

export default function SettingsSideBar({
  isOpen,
  selection,
  availableProviders,
  features,
  onProviderChange,
  onModelChange,
  onTemperatureChange,
  onStreamChange,
  onClose
}: {
  isOpen?: boolean,
  selection: AISelection,
  availableProviders: AIProviderConfig[],
  features?: SidebarFeatures,
  onProviderChange: (providerId: Provider) => void,
  onModelChange: (modelId: string) => void,
  onTemperatureChange: (temperature: number) => void,
  onStreamChange: (stream: boolean) => void,
  onClose: () => void
}) {

  const systemPromptFeature = features?.systemPrompt

  return (
    <aside id="settings-sidebar" className={isOpen ? 'is-open' : ''}>
      <h2>Settings</h2>
      <button className="settings-sidebar__close" onClick={onClose}>X</button>
      {
        systemPromptFeature && (
          <>
            <div className="settings-section">
              <label htmlFor="system-prompt-input">System prompt</label>
              <textarea
                id="system-prompt-input"
                className="settings-system-prompt"
                rows={4}
                value={systemPromptFeature.value}
                onChange={(e) => systemPromptFeature.onChange(e.target.value)}
                placeholder="You are a helpful assistant..."
              />
            </div>
            <div className="settings-divider" />
          </>
        )
      }

      <div className="settings-section">
        <label htmlFor="provider-select">Provider</label>
        <select
          id="provider-select"
          value={selection.provider}
          onChange={(e) => onProviderChange(e.target.value as Provider)}>
          {availableProviders.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-divider" />

      <div className="settings-section">
        <label htmlFor="model-select">Model</label>
        <select
          id="model-select"
          value={selection.model}
          onChange={(e) => onModelChange(e.target.value)}>
          {availableProviders.find((p) => p.id === selection.provider)?.models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-divider" />

      <div className="settings-section">
        <label htmlFor="temperature-slider">Temperature</label>
        <div className="settings-temperature-row">
          <input
            type="range"
            id="temperature-slider"
            min="0"
            max="1"
            step="0.1"
            value={selection.temperature}
            onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
          />
          <span className="settings-temperature-value">{selection.temperature.toFixed(1)}</span>
        </div>
      </div>

      <div className="settings-divider" />

      <div className="settings-section">
        <label>Streaming</label>
        <div className="settings-stream-row">
          <input
            type="checkbox"
            id="stream-checkbox"
            checked={selection.stream}
            onChange={(e) => onStreamChange(e.target.checked)}
          />
          <label className="settings-stream-label" htmlFor="stream-checkbox">
            Stream response
          </label>
        </div>
      </div>
    </aside>
  )
}