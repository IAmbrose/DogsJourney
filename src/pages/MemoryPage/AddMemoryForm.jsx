import { useState } from 'react'
import { addMemory } from '../../Utilities/users-service'
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';

const AddMemoryForm = ({ onMemoryAdded }) => {
    const [newMemoryText, setNewMemoryText] = useState('');

    const handleAddMemory = async (e) => {
        e.preventDefault();
        try {
          await addMemory({ text: newMemoryText });
          setNewMemoryText('');
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
        <Button 
        type="submit"
        variant="contained"
        >
        Add Memory
        </Button>
      </Box>
  );
};

export default AddMemoryForm