interface BaseMessage {
  id: string
  role: 'user' | 'assistant'
  type: 'text' | 'image'
}

export interface TextMessage extends BaseMessage {
  type: 'text'
  content: string
}

export interface ImageMessage extends BaseMessage {
  type: 'image'
  content: ImgMessageContent
}

export interface ImgMessageContent {
  url: string
  b64_json: string
  config: {
    revised_prompt: string
    output_format: string
    quality: string
    size: '1024x1024' | '1024x1536' | '1536x1024'
  }
}

export type Message = TextMessage | ImageMessage