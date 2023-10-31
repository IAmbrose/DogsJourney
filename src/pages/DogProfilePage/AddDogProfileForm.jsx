import { useState } from 'react'
import { addDogProfile } from '../../Utilities/users-service'
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';

const AddDogProfileForm = ({onDogProfileAdded}) => {
    const [newDogProfileName, setNewDogProfileName] = useState('');
    const [newDogProfileDesc, setNewDogProfileDesc] = useState('');


  const handleAddProfile = async (e) => {
      e.preventDefault();
      try {
        await addDogProfile({ name: newDogProfileName, description: newDogProfileDesc });
        setNewDogProfileName('');
        setNewDogProfileDesc('');
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