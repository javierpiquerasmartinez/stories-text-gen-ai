import { useState } from "react"
import type { AISelection, Provider } from "../types/ai"
import { availableProviders } from "../config/ai"


export default function useChatSettings() {
    const [selection, setSelection] = useState<AISelection>({
      provider: availableProviders[0].id,
      model: availableProviders[0].models[0].id,
      baseUrl: availableProviders[0].baseURL,
      apiKey: import.meta.env['VITE_'+availableProviders[0].apiKeyId+'_API_KEY'],
      temperature: 0.7,
      stream: true,
    })


  const onProviderChange = (providerId: Provider) => {
    const providerConfig = availableProviders.find(p => p.id === providerId)
    if (!providerConfig) return
    setSelection((prev) => ({
      ...prev,
      provider: providerId,
      model: providerConfig.models[0].id,
      baseUrl: providerConfig.baseURL,
      apiKey: import.meta.env['VITE_'+providerConfig.apiKeyId+'_API_KEY']
    }))
  }

  const onModelChange = (modelId: string) => {
    setSelection((prev) => ({
      ...prev,
      model: modelId,
    }))
  }

  const onTemperatureChange = (temperature: number) => {
    setSelection((prev) => ({
      ...prev,
      temperature,
    }))
  }

  const onStreamChange = (stream: boolean) => {
    setSelection((prev) => ({
      ...prev,
      stream,
    }))
  }

  return {
    selection,
    onProviderChange,
    onModelChange,
    onTemperatureChange,
    onStreamChange
  }
}