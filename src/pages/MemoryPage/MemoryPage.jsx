import { useEffect, useState } from 'react'
import { getAllMemories, deleteMemory, updateMemory } from '../../Utilities/users-service'
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import AddMemoryForm from './AddMemoryForm';

const MemoryPage = ({ user }) => {
  const [memories, setMemories] = useState([]);
  const [editedMemoryId, setEditedMemoryId] = useState(null)
  const currentUser = user._id

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
      setEditedMemoryId(null); 
    } catch (error) {
      console.error('Error editing memory:', error);
    }
  }

  return (
    <div>
      <h1>{user.name} MemoryPage</h1>

      <div>
        <AddMemoryForm 
        onMemoryAdded={handleMemoryAdded}
        currentUser={currentUser} 
        />
        {memories.map((memory) => (
          <MemoryCard 
          key={memory._id} 
          memory={memory}
          onDeleteMemory={handleDeleteMemory}
          editedMemoryId={editedMemoryId} 
          onConfirmEdit={handleConfirmEdit}
          />
        ))}
      </div>
    </div>
  )
}

export default MemoryPage