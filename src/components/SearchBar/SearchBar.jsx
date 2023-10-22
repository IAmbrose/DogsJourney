import { useState } from 'react'
import {searchDogBreeds} from "../../Utilities/users-service"
import DogCard from '../DogCard/DogCard';


const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

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