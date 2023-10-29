import { useEffect, useState } from 'react'
import {searchDogBreeds, getDogNames, addDogToWishList } from "../../Utilities/users-service"
import DogCard from '../DogCard/DogCard';
import WishListPage from '../../pages/WishListPage/WishListPage';
import { Autocomplete, TextField, Grid, Button, CircularProgress } from '@mui/material';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dogBreeds, setDogBreeds] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try {
            const searchData = await searchDogBreeds(searchQuery);
            setSearchResults(searchData);
        } catch (error) {
            console.error(error.message);
        }
        setLoading(false)
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
    <Grid container justifyContent="center">
       <Grid item sx={{ alignItems: 'center', p: 2 }}>
                <Autocomplete
                    options={dogBreeds}
                    value={searchQuery}
                    onChange={(e, newValue) => setSearchQuery(newValue)}
                    renderInput={(params) => (
                        <TextField {...params} label="Search for dog breed" sx={{ width: '200%' }} />
                    )}
                />
                 <Grid item>
                    <Button onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
                {loading ? (
                    <CircularProgress /> 
                ) : (
                    <Grid container spacing={2}>
                        {searchResults.map((result, index) => (
                            <Grid item key={index} xs={6} sm={4} md={3} lg={2}>
                                <DogCard
                                    searchResult={result}
                                    onAddToWishList={() => handleAddToWishList(result)}
                                    showAddToWishList={true}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
            <WishListPage 
            wishList={wishList} 
            setWishList={setWishList}
            />
        </Grid>
    </Grid>     
  )
}

export default SearchBar