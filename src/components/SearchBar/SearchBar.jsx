import { useEffect, useState } from 'react'
import {searchDogBreeds, getDogNames} from "../../Utilities/users-service"
import DogCard from '../DogCard/DogCard';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [dogBreeds, setDogBreeds] = useState([]);

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
                    dogData={result}
                    />
            ))}
        </div>
    </div>
  )
}

export default SearchBar