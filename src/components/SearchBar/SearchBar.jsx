import { useEffect, useState } from 'react'
import {searchDogBreeds, getDogNames, addDogToWishList } from "../../Utilities/users-service"
import DogCard from '../DogCard/DogCard';
import WishListPage from '../../pages/WishListPage/WishListPage';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dogBreeds, setDogBreeds] = useState([]);
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        const fetchDogBreeds = async () => {
            try {
                const breedsData = await getDogNames();
                console.log(typeof(breedsData))
                const breeds = Object.keys(breedsData);
                setDogBreeds(breeds);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchDogBreeds();
    }, []);


    const handleSearch = async () => {
        try {
            const searchData = await searchDogBreeds(searchQuery);
            setSearchResults(searchData);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleAddToWishList = async (dogData) => {
        try {
          const addedDog = await addDogToWishList(dogData);
          if (addedDog) {
            setWishList([...wishList, addedDog]);
          }
        } catch (error) {
          console.error("Error adding dog to wishlist:", error.message);
        }
      }

  return (
    <div>
        <input
            type="text"
            placeholder="Search for dog breed"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            >
                <option value="">Select a dog breed</option>
                {dogBreeds.map((breed, index) => (
                    <option key={index} value={breed}>
                        {breed}
                    </option>
                ))}
            </select>
        <button onClick={handleSearch}>Search</button>
        <div>
            {searchResults.map((result, index) => (
                <DogCard 
                    key={index}
                    searchResult={result}
                    onAddToWishList={() => handleAddToWishList(result)}
                    showAddToWishList={true}
                />
            ))}
        </div>
        <WishListPage 
        wishList={wishList} 
        setWishList={setWishList}
        />
    </div>
  )
}

export default SearchBar