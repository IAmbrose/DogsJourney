import { useEffect, useState } from "react";
import { likeMemory, getLikes } from '../../Utilities/users-service'

const MemoryCard = ({ memory, onDeleteMemory, editedMemoryId, onConfirmEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMemoryText, setEditedMemoryText] = useState(memory.text);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => { 
      const getLikesCount = async () => {
        try {
          const response = await getLikes(memory._id);
          setLikesCount(response.likes.length);
        } catch (error) {
          console.error("Error getting likes:", error);
        }
      };
      getLikesCount();
    }, [memory._id, liked]);



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

    const handleLike = async () => {
      if (liked) {
        setLiked(false);
      } else {
        try {
          await likeMemory(memory._id);
          setLiked(true);
        } catch (error) {
          console.error("Error liking memory:", error);
        }
      }
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
          <div>
            <img src={memory.image} alt='Memory Image' />
          </div>
          <div>{memory.user.name}</div>
          <div>{memory.text}</div>
          <button onClick={handleDelete}>Delete</button>
          {deleteConfirmation && (
          <div>
            <p>Are you sure you want to delete this memory?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setDeleteConfirmation(false)}>No</button>
          </div>
        )}
          <button onClick={handleStartEdit}>Edit</button>
          <button onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
          <span>Likes: {likesCount}</span>
        </div>
      )}
    </div>
  )
}

export default MemoryCard