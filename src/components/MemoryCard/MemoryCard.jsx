import { useState } from "react";

const MemoryCard = ({ memory, onDeleteMemory, editedMemoryId, onConfirmEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMemoryText, setEditedMemoryText] = useState(memory.text);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleDelete = () => {
      setDeleteConfirmation(true)
    }

    const handleConfirmDelete = () => {
      onDeleteMemory(memory._id);
      setDeleteConfirmation(false);
    }

    
    const handleStartEdit = () => {
      setIsEditing(true);
    }
  
    const handleConfirmEdit = () => {
      onConfirmEdit(memory._id, editedMemoryText);
      setIsEditing(false);
    };
  return (
    <div>
      {isEditing || editedMemoryId === memory._id ? (
        <div>
          <textarea
            value={editedMemoryText}
            onChange={(e) => setEditedMemoryText(e.target.value)}
          />
          <button onClick={handleConfirmEdit}>Save Edit</button>
        </div>
      ) : (
        <div>
          <div>{memory.text}</div>
          <div>{memory.user.name}</div>
          <div>
            <img src={memory.image} alt='Memory Image' />
          </div>
          <button onClick={handleDelete}>Delete</button>
          {deleteConfirmation && (
          <div>
            <p>Are you sure you want to delete this memory?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setDeleteConfirmation(false)}>No</button>
          </div>
        )}
          <button onClick={handleStartEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default MemoryCard