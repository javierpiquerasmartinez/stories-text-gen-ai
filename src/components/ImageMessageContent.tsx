import type { ImgMessageContent } from "../types";

export default function ImageMessageContent({ content }: { content: ImgMessageContent }) {
    return (
        <img src={content.url} alt="Imagen generada" />
    )
}
