import { useEffect } from 'react';
import DogCard from '../../components/DogCard/DogCard';
import { getAllDogFromWishList, deleteDogFromWishList } from '../../Utilities/users-service';

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
        <div>
          {wishList.map((wishListData, index) => (
            <DogCard
              key={index}
              wishListData={wishListData}
              showAddToWishList={false}
              showDeleteFromWishList={true}
              onDeleteFromWishList={() => handleDeleteFromWishList(wishListData._id)}
            />
          ))}
        </div>
      </div>
    );
  }

export default WishListPage