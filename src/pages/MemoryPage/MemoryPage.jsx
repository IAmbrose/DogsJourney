import { useEffect, useState } from 'react'
import { getAllMemories, deleteMemory, updateMemory, getDogProfile } from '../../Utilities/users-service'
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import AddMemoryForm from './AddMemoryForm';
import DogProfileCard from '../../components/DogProfileCard/DogProfileCard';
import AddDogProfileForm from '../DogProfilePage/AddDogProfileForm';
import DogTrickCard from '../../components/DogTrickCard/DogTrickCard';

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

  const handleConfirmEdit = async (memoryId, updatedText) => {
    if (updatedText.trim() === "") {
      console.error('Edited text cannot be empty');
      return;
    }

    try {
      await updateMemory(memoryId, updatedText);
      const updatedMemories = await getAllMemories();
      setMemories(updatedMemories);
    } catch (error) {
      console.error('Error editing memory:', error);
    }
  }

  const handleDogProfileAdded = async () => {
    try {
      const data = await getDogProfile();
      setCurrentUserDogProfiles(data);
    } catch (error) {
      console.error('Error fetching dog profile:', error);
    }
  };


  const toggleAddDogProfileForm = () => {
    setShowAddDogProfileForm(!showAddDogProfileForm);
  };

  return (
    <div>
      <div>
        {currentUserDogProfiles.map((currentUserDogProfile) => (
          <DogProfileCard
          key={currentUserDogProfile._id}
          currentUserDogProfile={currentUserDogProfile}
          />
          ))}
      </div>
      {currentUserDogProfiles.length === 0 && (
        <button onClick={toggleAddDogProfileForm}>Add Dog Profile</button>
      )}
        {showAddDogProfileForm && (
          <AddDogProfileForm
            onDogProfileAdded={handleDogProfileAdded} />
        )}
      <h1>My Memory Page</h1>

      <div>
        <button onClick={toggleAddMemoryForm}>Add Memory</button>
        {showAddMemoryForm && (
        <AddMemoryForm 
        onMemoryAdded={handleMemoryAdded}
        />
        )}
        {memories.map((memory) => (
          <MemoryCard 
          key={memory._id} 
          memory={memory}
          onDeleteMemory={handleDeleteMemory}
          onConfirmEdit={handleConfirmEdit}
          user={user}
          />
        ))}
      </div>
      <div>
        <DogTrickCard 
        user={user}
        onMemoryAdded={handleMemoryAdded}
         />
      </div>
    </div>
  )
}

export default MemoryPage