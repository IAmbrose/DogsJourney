import { useEffect, useState } from 'react'
import { getAllDogProfile } from '../../Utilities/users-service'
import DogProfileCard from '../../components/DogProfileCard/DogProfileCard';

const DogProfilePage = () => {
    const [dogProfiles, setDogProfiles] = useState([]);

    useEffect(() => {
        async function fetchDogProfiles() {
          try {
            const data = await getAllDogProfile();
            setDogProfiles(data);
          } catch (error) {
            console.error('Error fetching dog profiles:', error);
          }
        }
        fetchDogProfiles();
      }, []);

  return (
    <div>
        <h1>DogProfilePage</h1>
        {dogProfiles.map((dogProfile) => (
            <DogProfileCard
                key={dogProfile._id}
                dogProfile={dogProfile}
                />
        ))}
    </div>
  )
}

export default DogProfilePage