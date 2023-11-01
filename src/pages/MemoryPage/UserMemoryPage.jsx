import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMemoriesByUser, getAllDogProfile } from '../../Utilities/users-service'; 
import MemoryCard from '../../components/MemoryCard/MemoryCard';
import { Grid } from '@mui/material';


const UserMemoryPage = ({ user }) => {
  const { userId } = useParams(); 
  const [memories, setMemories] = useState([]);
  const [selectedUserDogProfile, setSelectedUserDogProfile] = useState([]);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const data = await getMemoriesByUser(userId);
        setMemories(data);
      } catch (error) {
        console.error('Error fetching memories:', error);
      }
    };


    const fetchUserDogProfile = async () => {
      try {
        const dogProfiles = await getAllDogProfile();
        const selectedProfile = dogProfiles.find((profile) => profile.user._id === userId);
        setSelectedUserDogProfile(selectedProfile);
      } catch (error) {
        console.error('Error fetching user dog profile:', error);
      }
    };
    fetchMemories();
    fetchUserDogProfile();
  }, [userId]);


  return (
    <div>
      <h1>Memories of {selectedUserDogProfile.name}</h1>
      <Grid container spacing={2}>
          {memories.map((memory) => (
            <Grid item key={memory._id}>
            <MemoryCard
              memory={memory}
              user = {user}
            />
          </Grid>
          ))}
      </Grid>
    </div>
  );
}
export default UserMemoryPage