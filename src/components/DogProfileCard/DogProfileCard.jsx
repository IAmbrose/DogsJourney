import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, CardActionArea, CircularProgress, Button, TextField } from '@mui/material';
import axios from "axios";
import { useState } from 'react';



const DogProfileCard = ({ allUserDogProfile, currentUserDogProfile, onConfirmEdit, user }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(currentUserDogProfile?.name)
    const [editedDescription, setEditedDescription] = useState(currentUserDogProfile?.description);


    const navigate = useNavigate();

    const handleViewMemories = (userId) => {
        navigate(`/memory/${userId}`);
      };

      const dogProfile = allUserDogProfile || currentUserDogProfile;

      const handleSelectFile = (e) => setFile(e.target.files[0]);
      const handleUpload = async () => {
        setLoading(true);
        try {
          const data = new FormData();
          data.append("my_file", file);
          const response = await axios.post("/api/upload", data);
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
        let updatedImageURL = currentUserDogProfile.imageURL
        if (file) {
        updatedImageURL = await handleUpload();
        }
        try {
          onConfirmEdit(currentUserDogProfile._id, editedName, editedDescription, updatedImageURL);
          setIsEditing(false);
          setFile(null);
        } catch (error) {
          console.error("Error editing memory:", error);
          }
      };


  return (
    <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleViewMemories(dogProfile.user._id)}>
                {dogProfile.imageURL && (
                    <CardMedia
                        component="img"
                        sx={{ objectFit: 'fill', height: 400}}
                        image={dogProfile.imageURL}
                        alt={`${dogProfile.name}'s image`}
                    />
                )}
                <CardContent>
                    <Typography variant="h5">
                        {dogProfile.name}
                    </Typography>
                    <Typography variant="body2">
                        {dogProfile.description}
                    </Typography>
                    <Typography variant="body2" color="#757575">
                        Owner: {dogProfile.user.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {!isEditing && user?._id === currentUserDogProfile?.user?._id && (
                <div>
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
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    multiline
                    value={editedDescription}
                    onChange={e => setEditedDescription(e.target.value)}
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
              ) : null}
        </Card>
    );
}

export default DogProfileCard