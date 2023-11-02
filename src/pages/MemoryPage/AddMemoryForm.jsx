import { useState } from 'react'
import { addMemory } from '../../Utilities/users-service'
import { Button, Box, CircularProgress } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';

const AddMemoryForm = ({ onMemoryAdded }) => {
    const [newMemoryText, setNewMemoryText] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false)

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

    const handleAddMemory = async (e) => {
        e.preventDefault();
        try {
          const imageURL = await handleUpload();
          await addMemory({ text: newMemoryText, imageURL: imageURL });
          setNewMemoryText('');
          setFile(null);
          onMemoryAdded();
        } catch (error) {
          console.error('Error adding memory:', error);
        }
      };

  return (
      <Box component="form" onSubmit={handleAddMemory} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          fullWidth
          multiline
          label="Memory Text"
          value={newMemoryText}
          onChange={(e) => setNewMemoryText(e.target.value)}
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
        Add Memory
        </Button>
        {loading && <CircularProgress color='success'/>}
      </Box>
  );
};

export default AddMemoryForm