"use client"
export default function Delete({ params }) {
  function handleDelete() {
    // Show a confirmation dialog
    if (window.confirm("Are you sure you want to delete this painting?")) {
      fetch(`/api/delete-piata/${params.id}`, {
        method: "DELETE",
      })
        .then(response => {
          if (response.ok) {
            // Handle successful deletion here
            alert("Painting deleted successfully")
            // Optionally, update UI or state here, such as removing the item from a list
          } else {
            // Handle failure
            alert("Failed to delete the painting. Please try again.")
          }
        })
        .catch(error => {
          // Handle network errors
          alert(`An error occurred: ${error.message}`)
        })
    }
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <button onClick={() => console.log(params.id)}>Delete test</button>
      <button onClick={() => handleDelete()}>Delete admin</button>
    </div>
  )
}