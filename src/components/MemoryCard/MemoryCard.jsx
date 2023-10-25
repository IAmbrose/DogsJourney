import { useState } from "react";

const MemoryCard = ({ memory, onDeleteMemory, onEditMemory }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMemoryText, setEditedMemoryText] = useState(memory.text);

    const handleDelete = () => {
        onDeleteMemory(memory._id);
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleConfirmEdit = () => {
        onEditMemory(memory._id, { text: editedMemoryText} );
        setIsEditing(false);
    };
  return (
    <div>
      {isEditing ? (
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
        <button onClick={handleEdit}>Edit</button>
    </div>
    )}
</div>
  )
}

export default MemoryCard