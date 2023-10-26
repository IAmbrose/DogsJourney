import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemoriesByUser } from '../../Utilities/users-service'; 
import MemoryCard from '../../components/MemoryCard/MemoryCard';

const UserMemoryPage = () => {
  const { userId } = useParams(); 

  const [memories, setMemories] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getMemoriesByUser(userId);
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    fetchMemories();
  }, [userId]);

  console.log(userId)

  return (
    <div>
      <h1>Memories for User</h1>
      {memories.map((memory) => (
        <MemoryCard
          key={memory._id}
          memory={memory}
        />
      ))}
    </div>
  );
}
export default UserMemoryPage