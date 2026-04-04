export default function ErrorToast({ error }: { error: string }) {
  return (
    <div id="error-toast">
      <p>{error}</p>
    </div>
  )
}