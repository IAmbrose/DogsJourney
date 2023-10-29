import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const DogProfileCard = ({ allUserDogProfile, currentUserDogProfile }) => {
    const navigate = useNavigate();

    const handleViewMemories = (userId) => {
        navigate(`/memory/${userId}`);
      };

      const dogProfile = allUserDogProfile || currentUserDogProfile;

  return (
    <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={() => handleViewMemories(dogProfile.user._id)}>
                {dogProfile.image && (
                    <CardMedia
                        component="img"
                        height="140"
                        image={dogProfile.image}
                        alt={`${dogProfile.name}'s image`}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {dogProfile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {dogProfile.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Owner: {dogProfile.user.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default DogProfileCard