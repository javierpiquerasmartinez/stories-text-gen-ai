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
    revised_prompt?: string
    output_format?: string
    quality?: string
    size?: string
  }
}

export type Message = TextMessage | ImageMessage