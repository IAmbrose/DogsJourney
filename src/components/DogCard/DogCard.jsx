import { useState } from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Rating } from '@mui/material';

const DogCard = ({ searchResult, wishListData, onAddToWishList, showAddToWishList, showDeleteFromWishList, onDeleteFromWishList }) => {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  const dogData = wishListData || searchResult;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={dogData.name}
        image={dogData.image_link}
        sx={{ objectFit: 'contain', height: 230}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dogData.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {showMore && (
            <>
            <Typography variant="subtitle1">Good with Children</Typography>
            <Rating name="good-with-children" value={dogData.good_with_children} readOnly />

            <Typography variant="subtitle1">Good with Other Dogs</Typography>
            <Rating name="good-with-other-dogs" value={dogData.good_with_other_dogs} readOnly />

            <Typography variant="subtitle1">Shedding</Typography>
            <Rating name="shedding" value={dogData.shedding} readOnly />

            <Typography variant="subtitle1">Grooming</Typography>
            <Rating name="grooming" value={dogData.grooming} readOnly />

            <Typography variant="subtitle1">Drooling</Typography>
            <Rating name="drooling" value={dogData.drooling} readOnly />

            <Typography variant="subtitle1">Playfulness</Typography>
            <Rating name="playfulness" value={dogData.playfulness} readOnly />

            <Typography variant="subtitle1">Protectiveness</Typography>
            <Rating name="protectiveness" value={dogData.protectiveness} readOnly />

            <Typography variant="subtitle1">Trainability</Typography>
            <Rating name="trainability" value={dogData.trainability} readOnly />

            <Typography variant="subtitle1">Energy</Typography>
            <Rating name="energy" value={dogData.energy} readOnly />

            <Typography variant="subtitle1">Barking</Typography>
            <Rating name="barking" value={dogData.barking} readOnly />
          </>
          )}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {showAddToWishList && (
          <Button size="small" onClick={onAddToWishList}>
            Add to Wishlist
          </Button>
        )}
        {showDeleteFromWishList && (
          <Button
            size="small"
            onClick={() => onDeleteFromWishList(wishListData._id)}
          >
            Delete
          </Button>
        )}
        <Button size="small" onClick={toggleShowMore}>
          {showMore ? 'Close' : 'Characteristics'}
        </Button>
      </CardActions>
    </Card>
  );
};


export default DogCard