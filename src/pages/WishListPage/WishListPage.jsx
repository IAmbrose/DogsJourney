import { useEffect } from 'react';
import DogCard from '../../components/DogCard/DogCard';
import { getAllDogFromWishList, deleteDogFromWishList } from '../../Utilities/users-service';
import { Grid } from '@mui/material';

const WishListPage = ({ wishList, setWishList }) => {

    const handleDeleteFromWishList = async (dogId) => {
      try {
        await deleteDogFromWishList(dogId);
        setWishList(wishList.filter((dog) => dog._id !== dogId));
      } catch (error) {
        console.error("Error deleting dog from wishlist:", error.message);
      }
    }

    useEffect(() => {
        const fetchWishList = async () => {
          try {
            const wishListData = await getAllDogFromWishList();
            setWishList(wishListData);
          } catch (error) {
            console.error('Error fetching wishlist data:', error.message);
          }
        };
        fetchWishList();
      }, []);

    return (
      <div>
        <h1>Wishlist</h1>
          <Grid container spacing={2}>
            {wishList.map((wishListData, index) => (
              <Grid item key={index}>
                <DogCard
                  wishListData={wishListData}
                  showAddToWishList={false}
                  showDeleteFromWishList={true}
                  onDeleteFromWishList={() => handleDeleteFromWishList(wishListData._id)}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }

export default WishListPage