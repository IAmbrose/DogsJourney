import { useEffect, useState } from 'react'
import { getAllMemories, deleteMemory, updateMemory } from '../../Utilities/users-service'
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import AddMemoryForm from './AddMemoryForm';

const MemoryPage = () => {
  const [memories, setMemories] = useState([]);

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

  const handleEditMemory = async (memoryId, updatedText) => {
    try {
      await updateMemory(memoryId, { text: updatedText});
      const updatedMemories = memories.map((memory => {
        if (memory._id === memoryId) {
          return {...memory, text: updatedText};
        }
        return memory;
      }))
      setMemories(updatedMemories);
    } catch (error) {
      console.error('Error editting memory:', error);
    }
  }

  return (
    <div>
      <h1>MemoryPage</h1>

      <div>
        <AddMemoryForm onMemoryAdded={handleMemoryAdded} />
        {memories.map((memory) => (
          <MemoryCard 
          key={memory._id} 
          memory={memory}
          onDeleteMemory={handleDeleteMemory}
          onEditMemory={handleEditMemory}
          />
        ))}
      </div>
    </div>
  )
}

export default MemoryPage