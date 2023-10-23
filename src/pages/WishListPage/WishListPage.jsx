import DogCard from '../../components/DogCard/DogCard';


const WishListPage = ({ wishList }) => {

    return (
      <div>
        <h1>Wishlist Page</h1>
        <div>
          {wishList?.map((dogData, index) => (
            <DogCard
              key={index}
              dogData={dogData}
            />
          ))}
        </div>
      </div>
    );
  }

export default WishListPage