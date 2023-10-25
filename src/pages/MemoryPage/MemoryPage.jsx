import { useEffect, useState } from 'react'
import { getAllMemories } from '../../Utilities/users-service'
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
    // You can update the memory list here, similar to how you fetched memories initially
    try {
      const data = await getAllMemories();
      setMemories(data);
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
  };

  return (
    <div>
      <h1>MemoryPage</h1>

      <div>
        <AddMemoryForm onMemoryAdded={handleMemoryAdded} />
        {memories.map((memory) => (
          <MemoryCard 
          key={memory._id} 
          memory={memory}
          />
        ))}
      </div>
    </div>
  )
}

export default MemoryPage