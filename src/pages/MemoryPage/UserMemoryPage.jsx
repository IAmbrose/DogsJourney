import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemoriesByUser, getUserDetails } from '../../Utilities/users-service'; 
import MemoryCard from '../../components/MemoryCard/MemoryCard';


const UserMemoryPage = () => {
  const { userId } = useParams(); 
  const [memories, setMemories] = useState([]);
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getMemoriesByUser(userId);
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };

    const fetchUserName = async () => {
      try {
        const users = await getUserDetails();
        const selectedUser = users.users.find(user => user._id === userId); 
        setUserName(selectedUser.name)
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserName();
    fetchMemories();
  }, [userId]);

  

  return (
    <div>
      <h1>Memories for {userName}</h1>
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