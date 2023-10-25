import { useState } from "react";

const MemoryCard = ({ memory, onDeleteMemory, editedMemoryId, onConfirmEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMemoryText, setEditedMemoryText] = useState(memory.text);

    const handleDelete = () => {
        onDeleteMemory(memory._id);
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
          <button onClick={handleStartEdit}>Edit</button>
        </div>
      )}
    </div>
  )
}

export default MemoryCard