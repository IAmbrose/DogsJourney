import { useState } from 'react'
import { addDogTrick} from '../../Utilities/users-service'
import { Button, Box } from "@mui/material";
import TextField from '@mui/material/TextField';

const AddDogTrickForm = ({onDogTrickAdded}) => {
    const [newDogTrickName, setNewDogTrickName] = useState('')
    const [newDogTrickDesc, setNewDogTrickDesc] = useState('')
    const [newDogTrickDiff, setNewDogTrickDiff] = useState('')

    const handleAddDogTrick = async (e) => {
        e.preventDefault();
        try {
          await addDogTrick({ trick_name: newDogTrickName, description: newDogTrickDesc, difficulty_level:newDogTrickDiff });
          setNewDogTrickName('');
          setNewDogTrickDesc('');
          setNewDogTrickDiff('');
          onDogTrickAdded();
        } catch (error) {
          console.error('Error adding dog trick:', error);
        }
      };


  return (
    <Box component="form" onSubmit={handleAddDogTrick} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
            fullWidth
            value={newDogTrickName}
            label='Fill dog trick name'
            onChange={(e) => setNewDogTrickName(e.target.value)}
            required
            />
        <TextField
            fullWidth
            multiline
            value={newDogTrickDesc}
            label='Fill dog trick description'
            onChange={(e) => setNewDogTrickDesc(e.target.value)}
            required
            />
        <TextField
            fullWidth
            value={newDogTrickDiff}
            label='Fill dog trick difficulty level'
            onChange={(e) => setNewDogTrickDiff(e.target.value)}
            required
            />
        <Button 
        type="submit" 
        variant="contained"
        >
          Add Dog Trick
          </Button>
    </Box>
  );
};

export default AddDogTrickForm