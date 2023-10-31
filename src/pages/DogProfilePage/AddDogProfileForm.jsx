import { useState } from 'react'
import { addDogProfile } from '../../Utilities/users-service'
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';

const AddDogProfileForm = ({onDogProfileAdded}) => {
    const [newDogProfileName, setNewDogProfileName] = useState('');
    const [newDogProfileDesc, setNewDogProfileDesc] = useState('');
    const [file, setFile] = useState(null);


    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleUpload = async () => {
      try {
        const data = new FormData();
        data.append("my_file", file);
        const response = await axios.post("http://localhost:3000/upload", data);
        return(response.data.secure_url);
      } catch (error) {
        alert(error.message);
      } 
    };


  const handleAddProfile = async (e) => {
      e.preventDefault();
      try {
          const imageURL = await handleUpload();
          await addDogProfile({ name: newDogProfileName, description: newDogProfileDesc, imageURL: imageURL });
          setNewDogProfileName('');
          setNewDogProfileDesc('');
          setFile(null);
          onDogProfileAdded();
        } catch (error) {
          console.error('Error adding memory:', error);
        }
    };

  return (
      <Box component="form" onSubmit={handleAddProfile} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          fullWidth
          label="Fill Dog Name"
          value={newDogProfileName}
          onChange={(e) => setNewDogProfileName(e.target.value)}
          required
          />
        <TextField
          fullWidth
          multiline
          label="Dog Description"
          value={newDogProfileDesc}
          onChange={(e) => setNewDogProfileDesc(e.target.value)}
          required
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
        <Button 
        type="submit"
        variant="contained"
        >
          Add Profile
          </Button>
      </Box>
  );
};

export default AddDogProfileForm