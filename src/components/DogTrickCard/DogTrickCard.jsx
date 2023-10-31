import { useEffect, useState } from 'react'
import { getAllDogTricks, updateDogTrick, addMemory } from '../../Utilities/users-service'
import AddDogTrickForm from '../AddDogTrickForm/AddDogTrickForm';
import Checkbox from '@mui/material/Checkbox';
import { Button, Box, Typography } from "@mui/material";


const DogTrickCard = ({ user, onMemoryAdded }) => {
    const [dogTricks, setDogTricks] = useState([]);
    const [showAddDogTrickForm, setShowAddDogTrickForm] = useState(false)

    useEffect(() => {
      const fetchDogTricks = async () => {
        try {
          const data = await getAllDogTricks();
          setDogTricks(data);
        } catch (error) {
          console.error('Error fetching dog tricks:', error);
        }
      };
      fetchDogTricks();
    }, []);

    const toggleDogTrickCompleted = async (dogTrickId) => {
      try {
        await updateDogTrick(dogTrickId);
        const updatedTricks = dogTricks.map((trick) => {
          if (trick._id === dogTrickId) {
            const updatedTrick = {
              ...trick,
              tricksCompleted: trick.tricksCompleted.map((completion) => {
                if (completion.user === user._id) {
                  return { ...completion, completed: !completion.completed };
                }
                return completion;
              }),
            };
            if (!trick.tricksCompleted.find((completion) => completion.user === user._id).completed) {
              const newMemoryText = `Completed the dog trick "${trick.trick_name}" - ${trick.description}`;
              try {
                addMemory({ text: newMemoryText });
                onMemoryAdded();
                console.log('Memory added:', newMemoryText);
              } catch (error) {
                console.error('Error adding memory:', error);
              }
            }
            return updatedTrick;
          }
          return trick;
        });
        setDogTricks(updatedTricks);
      } catch (error) {
        console.error('Error updating dog trick completion status:', error);
      }
    };
  
  const handleDogTrickAdded = async () => {
    try {
      const data = await getAllDogTricks();
      setDogTricks(data);
      setShowAddDogTrickForm(false)
    } catch (error) {
      console.error('Error fetchging dog tricks:', error)
    }
  }


  const toggleAddDogTrickForm = () => {
    if (user.isAdmin) {
      setShowAddDogTrickForm(!showAddDogTrickForm)
    } else {
      setShowAddDogTrickForm(false);
    }
  }

  return (
    <Box sx={{ border: 5, borderRadius: 4, borderColor: 'white' }}>
      <Box sx={{ p: 2 }}>
      <Typography variant='h5' fontWeight="bold">Dog Tricks Checklist</Typography>
      {user.isAdmin && (
        <div>
          <Button onClick={toggleAddDogTrickForm}>Add Dog Trick</Button>
          {showAddDogTrickForm && (
              <AddDogTrickForm onDogTrickAdded={handleDogTrickAdded} />
          )}
        </div>
        )}
      <div>
        {dogTricks.map((trick) => (
          <div className="dog-trick-card" key={trick._id}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={
                  (trick.tricksCompleted.find((completion) => completion.user === user._id) || { completed: false }).completed
                }
                onChange={() => toggleDogTrickCompleted(trick._id)}
              />
            <Typography variant='h6' fontWeight="bold">{trick.trick_name}</Typography>
            </Box>
            <Typography variant='body1'>Description: {trick.description}</Typography>
            <Typography variant='body1'>Difficulty Level: {trick.difficulty_level}</Typography>
          </div>
        ))}
      </div>
      </Box>
    </Box>
  );
};

export default DogTrickCard