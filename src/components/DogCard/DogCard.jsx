import { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const DogCard = ({ searchResult, wishListData, onAddToWishList, showAddToWishList, showDeleteFromWishList, onDeleteFromWishList }) => {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  const dogData = wishListData || searchResult;

  return (
    
    <div>
        <img src={dogData.image_link} alt={dogData.name} />
        <h2>{dogData.name}</h2>
        <p>
          {showMore}
          <button onClick={toggleShowMore} className="see-more-link">
            {showMore ? 'See Less' : 'See More Characteristics'}
          </button>
        </p>
        
        {showMore && (
          <>
            <p>Good with Children: {dogData.good_with_children}</p>
            <p>Good with Other Dogs: {dogData.good_with_other_dogs}</p>
            <p>Shedding: {dogData.shedding}</p>
            <p>Grooming: {dogData.grooming}</p>
            <p>Drooling: {dogData.drooling}</p>
            <p>Playfulness: {dogData.playfulness}</p>
            <p>Protectiveness: {dogData.protectiveness}</p>
            <p>Trainability: {dogData.trainability}</p>
            <p>Energy: {dogData.energy}</p>
            <p>Barking: {dogData.barking}</p>
          </>
        )}
        {showAddToWishList && (
          <button onClick={onAddToWishList}>Add to Wishlist</button>
        )}
        {showDeleteFromWishList && (
          <button onClick={() => onDeleteFromWishList(wishListData._id)}>Delete From WishList</button>
        )}
    </div>
  )
}

export default DogCard