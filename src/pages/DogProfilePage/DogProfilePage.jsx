import { useEffect, useState } from 'react'
import { getAllDogProfile } from '../../Utilities/users-service'
import DogProfileCard from '../../components/DogProfileCard/DogProfileCard';

const DogProfilePage = () => {
    const [allUserDogProfiles, setAllUserDogProfiles] = useState([]);

    useEffect(() => {
        async function fetchDogProfiles() {
          try {
            const data = await getAllDogProfile();
            setAllUserDogProfiles(data);
          } catch (error) {
            console.error('Error fetching dog profiles:', error);
          }
        }
        fetchDogProfiles();
      }, []);

  return (
    <div>
        <h1>DogProfilePage</h1>
        {allUserDogProfiles.map((allUserDogProfile) => (
            <DogProfileCard
                key={allUserDogProfile._id}
                allUserDogProfile={allUserDogProfile}
                />
        ))}
    </div>
  )
}

export default DogProfilePage