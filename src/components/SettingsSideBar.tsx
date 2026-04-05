import type { AIProviderConfig, AISelection, Provider } from "../types/ai"

export default function SettingsSideBar({
    selection,
    availableProviders,
    onProviderChange,
    onModelChange,
    onTemperatureChange,
    onStreamChange
}: {
    selection: AISelection,
    availableProviders: AIProviderConfig[],
    onProviderChange: (providerId: Provider) => void,
    onModelChange: (modelId: string) => void,
    onTemperatureChange: (temperature: number) => void,
    onStreamChange: (stream: boolean) => void
}) {
  return (
    <aside id="settings-sidebar">
        <h2>Settings</h2>
        <h3>AI Provider</h3>
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
        <h3>AI Model</h3>
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
        <h3>Temperature</h3>
        <input
        type="range"
        id="temperature-slider"
        min="0"
        max="1"
        step="0.1"
        value={selection.temperature}
        onChange={(e) => onTemperatureChange(parseFloat(e.target.value))}
        />
        <p>{selection.temperature.toFixed(1)}</p>
        <h3>Stream</h3>
        <input
        type="checkbox"
        id="stream-checkbox"
        checked={selection.stream}
        onChange={(e) => onStreamChange(e.target.checked)}
        />
    </aside>
  )
}