import Markdown from "react-markdown"

export default function TextMessageContent({ content }: { content: string }) {
    return (
        <Markdown>{content}</Markdown>
    )
}
