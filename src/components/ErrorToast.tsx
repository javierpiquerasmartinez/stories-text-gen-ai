import { useEffect } from "react";

export default function ErrorToast({ error, closeTimeout, onClose }: { error: string; closeTimeout?: number, onClose?: () => void }) {

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (closeTimeout && onClose) {
      timer = setTimeout(() => {
        onClose();
      }, closeTimeout)
    }
    return () => {
      if (timer)
        clearTimeout(timer);
    }
  }, [error, closeTimeout, onClose])

  return (
    <div id="error-toast">
      <p>{error}</p>
      <button onClick={onClose} className="error-toast__close" aria-label="Dismiss error">&#x00D7;</button>
    </div>
  )
}