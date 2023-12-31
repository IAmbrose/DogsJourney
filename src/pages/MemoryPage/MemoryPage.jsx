import { useEffect, useState } from 'react'
import { getAllMemories, deleteMemory, updateMemory, getDogProfile, updateDogProfile } from '../../Utilities/users-service'
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import AddMemoryForm from './AddMemoryForm';
import DogProfileCard from '../../components/DogProfileCard/DogProfileCard';
import AddDogProfileForm from '../DogProfilePage/AddDogProfileForm';
import DogTrickCard from '../../components/DogTrickCard/DogTrickCard';
import { Grid, Button, Typography } from '@mui/material';

const MemoryPage = ({ user }) => {
  const [memories, setMemories] = useState([]);
  const [currentUserDogProfiles, setCurrentUserDogProfiles] = useState([])
  const [showAddMemoryForm, setShowAddMemoryForm] = useState(false)
  const [showAddDogProfileForm, setShowAddDogProfileForm] = useState(false)

  

  useEffect(() => {
    const fetchDogProfile = async () => {
      try {
        const data = await getDogProfile();
        setCurrentUserDogProfiles(data);
      } catch (error) {
        console.error('Error fetching dog profile:', error);
      }
    };
    fetchDogProfile();
  }, [])


  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getAllMemories();
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchMemories();
  }, []);

  
  const handleMemoryAdded = async () => {
    try {
      const data = await getAllMemories();
      setMemories(data);
      setShowAddMemoryForm(false);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  const toggleAddMemoryForm = () => {
    setShowAddMemoryForm(!showAddMemoryForm);
  }

  const handleDeleteMemory = async (memoryId) => {
    try {
      await deleteMemory(memoryId);
      const updatedMemories = memories.filter((memory) => memory._id !== memoryId);
      setMemories(updatedMemories);
    } catch (error) {
      console.error('Error deleting memory:', error)
    }
  }


  const handleDogProfileConfirmEdit = async (dogProfileId, updatedName, updatedDescription, updatedImageURL) => {
    if (updatedName.trim() === "") {
      console.error('Edited name cannot be empty');
      return;
    }
    
    if (updatedDescription.trim() === "") {
      console.error('Edited desciption cannot be empty');
      return;
    }

    try {
      await updateDogProfile(dogProfileId, updatedName, updatedDescription, updatedImageURL);
      const updatedDogProfile = await getDogProfile();
      setCurrentUserDogProfiles(updatedDogProfile);
    } catch (error) {
      console.error('Error editing memory:', error);
    }
  }

  const handleDogProfileAdded = async () => {
    try {
      const data = await getDogProfile();
      setCurrentUserDogProfiles(data);
      setShowAddDogProfileForm(false);
    } catch (error) {
      console.error('Error fetching dog profile:', error);
    }
  };


  const toggleAddDogProfileForm = () => {
    setShowAddDogProfileForm(!showAddDogProfileForm);
  };

  const handleConfirmEdit = async (memoryId, updatedText, updatedImageURL) => {
    if (updatedText.trim() === "") {
      console.error('Edited text cannot be empty');
      return;
    }

    try {
      await updateMemory(memoryId, updatedText, updatedImageURL);
      const updatedMemories = await getAllMemories();
      setMemories(updatedMemories);
    } catch (error) {
      console.error('Error editing memory:', error);
    }
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Typography variant='h5' fontWeight="bold" mt={2}>My Dog Profile</Typography>
        {currentUserDogProfiles.map((currentUserDogProfile) => (
          <DogProfileCard
          key={currentUserDogProfile._id}
          currentUserDogProfile={currentUserDogProfile}
          onConfirmEdit={handleDogProfileConfirmEdit}
          user={user}
          />
          ))}
        <Typography variant='h5' fontWeight="bold" mt={2}>My Memories</Typography>
        {currentUserDogProfiles.length === 0 && (
          <Button onClick={toggleAddDogProfileForm}>Add Dog Profile</Button>
        )}
          {showAddDogProfileForm && (
            <AddDogProfileForm
              onDogProfileAdded={handleDogProfileAdded} />
          )}
          <Button onClick={toggleAddMemoryForm}>Add Memory</Button>
          {showAddMemoryForm && (
          <AddMemoryForm 
          onMemoryAdded={handleMemoryAdded}
          />
          )}
          <Grid container spacing={2} mb={2}>
              {memories.map((memory) => (
                <Grid item key={memory._id} mt={2}>
                <MemoryCard 
                memory={memory}
                onDeleteMemory={handleDeleteMemory}
                onConfirmEdit={handleConfirmEdit}
                user={user}
                currentUserDogProfiles={currentUserDogProfiles}
                />
                </Grid>
              ))}
          </Grid>
      </Grid>
      <Grid item xs={4}>
        <DogTrickCard 
        user={user}
        onMemoryAdded={handleMemoryAdded}
         />
      </Grid>
    </Grid>
  )
}

export default MemoryPage