import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

const DogProfileCard = ({ allUserDogProfile, currentUserDogProfile }) => {
    const navigate = useNavigate();

    const handleViewMemories = (userId) => {
        navigate(`/memory/${userId}`);
      };

      const dogProfile = allUserDogProfile || currentUserDogProfile;

  return (
    <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleViewMemories(dogProfile.user._id)}>
                {dogProfile.imageURL && (
                    <CardMedia
                        component="img"
                        sx={{ objectFit: 'contain', height: 230}}
                        image={dogProfile.imageURL}
                        alt={`${dogProfile.name}'s image`}
                    />
                )}
                <CardContent>
                    <Typography variant="h5">
                        {dogProfile.name}
                    </Typography>
                    <Typography variant="body2">
                        {dogProfile.description}
                    </Typography>
                    <Typography variant="body2" color="#757575">
                        Owner: {dogProfile.user.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default DogProfileCard