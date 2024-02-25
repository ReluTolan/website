import "../(pages)/page-styles.css"

export default function ErrorMessageModal({ message, onClose }) {
  if (!message) return null

  return (
    <div className="error-modal">
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
