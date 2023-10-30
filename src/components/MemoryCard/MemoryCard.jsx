import { useEffect, useState } from "react";
import { likeMemory, getLikes } from '../../Utilities/users-service'
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MemoryCard = ({ memory, onDeleteMemory, editedMemoryId, onConfirmEdit, user }) => {
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
      try {
        if (liked) {
          await likeMemory(memory._id);
          setLiked(false);
          setLikesCount(likesCount - 1);
        } else {
          await likeMemory(memory._id);
          setLiked(true);
          setLikesCount(likesCount + 1);
        }
      } catch (error) {
        console.error("Error liking memory:", error);
      }
    };

    const formatDate = (postDate) => {
      const date = new Date(postDate);
      return date.toLocaleString(); 
    };

  return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="Memory Image"
          image={memory.imageURL}
          sx={{ objectFit: 'contain', height: 230 }}
        />
        <CardContent>
          <Typography variant="h5">
            {memory.user.name}
          </Typography>
          <Typography variant="body1">
            {memory.text}
          </Typography>
          <Typography variant="caption" color="#757575">
            Posted on: {formatDate(memory.createdAt)}
          </Typography>
        </CardContent>
        <CardActions>
          {user._id === memory.user._id && (
            <Button size="small" onClick={handleDelete}>
              Delete
            </Button>
          )}
          {deleteConfirmation && (
            <div>
              <p>Are you sure you want to delete this memory?</p>
              <Button onClick={handleConfirmDelete}>Yes</Button>
              <Button onClick={() => setDeleteConfirmation(false)}>No</Button>
            </div>
          )}
          <Button size="small" onClick={handleStartEdit}>
            Edit
          </Button>
          {isEditing || editedMemoryId === memory._id ? (
            <div>
              <textarea value={editedMemoryText} onChange={e => setEditedMemoryText(e.target.value)} />
              <Button onClick={handleConfirmEdit}>Save Edit</Button>
            </div>
          ) : (
            <Button size="small" onClick={handleLike}>
              {liked ? <FavoriteIcon color="#dd2c00" /> : <FavoriteIcon />}
            </Button>
          )}
          <Typography variant="subtitle2">{likesCount}</Typography>
        </CardActions>
      </Card>
  );
};
export default MemoryCard