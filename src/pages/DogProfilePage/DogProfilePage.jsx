import { useEffect, useState } from 'react'
import { getAllDogProfile } from '../../Utilities/users-service'
import DogProfileCard from '../../components/DogProfileCard/DogProfileCard';
import { Grid, Typography } from '@mui/material';

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
        <Grid container direction="column" justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h3" fontWeight="bold" sx={{mb: 2, mt: 2}}>Profiles</Typography>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
        {allUserDogProfiles.map((allUserDogProfile) => (
          <Grid item key={allUserDogProfile._id} xs={12} sx={{ mt: 2 }}>
            <DogProfileCard allUserDogProfile={allUserDogProfile} />
          </Grid>
        ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default DogProfilePage