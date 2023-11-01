import { useEffect, useState } from "react";
import { likeMemory, getLikes } from '../../Utilities/users-service'
import { Card, CardContent, CardActions, CardMedia, Typography, Button, CircularProgress  } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextField from '@mui/material/TextField';
import axios from "axios";

const MemoryCard = ({ memory, onDeleteMemory, onConfirmEdit, user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedMemoryText, setEditedMemoryText] = useState(memory.text);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

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


    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleUpload = async () => {
      setLoading(true);
      try {
        const data = new FormData();
        data.append("my_file", file);
        const response = await axios.post("http://localhost:3000/upload", data);
        return(response.data.secure_url);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    const handleEdit = () => {
      setIsEditing(true);
    }
  
    const handleConfirmEdit = async () => {
      let updatedImageURL = memory.imageURL
      if (file) {
      updatedImageURL = await handleUpload();
      }
      try {
        onConfirmEdit(memory._id, editedMemoryText, updatedImageURL);
        setIsEditing(false);
        setFile(null);
      } catch (error) {
        console.error("Error editing memory:", error);
        }
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
          sx={{ objectFit: 'fill', height:400}}
          image={memory.imageURL}
          alt="Memory Image"
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
          {deleteConfirmation ? (
            <div>
              <Typography>Are you sure you want to delete this memory?</Typography>
              <Button onClick={handleConfirmDelete}>Yes</Button>
              <Button onClick={() => setDeleteConfirmation(false)}>No</Button>
            </div>
          ) : (
            <>
              {!isEditing && user._id === memory.user._id && (
                <div>
                <Button size="small" onClick={handleDelete}>
                  Delete
                </Button>
                <Button size="small" onClick={handleEdit}>
                  Edit
                </Button>
              </div>
              )}
              {isEditing ? (
                <div>
                  <TextField
                    fullWidth
                    multiline
                    value={editedMemoryText}
                    onChange={e => setEditedMemoryText(e.target.value)}
                  />
                  <label htmlFor="file" className="btn-grey">
                  {" "}
                  select file
                </label>
                {file && <center> {file.name}</center>}
                <input
                  id="file"
                  type="file"
                  onChange={handleSelectFile}
                  multiple={false}
                />
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleConfirmEdit}>Confirm</Button>
                  {loading && <CircularProgress color='success'/>}
                </div>
              ) : (
                <div>
                  <Button size="small" onClick={handleLike}>
                    <FavoriteIcon sx={{ color: liked ? 'red' : 'grey' }} />
                  </Button>
                  <Typography variant="BUTTON">{likesCount}</Typography>
                </div>
              )}
            </>
          )}
        </CardActions>
      </Card>
  );
};
export default MemoryCard