import { useEffect, useState } from 'react'
import { getAllDogTricks, updateDogTrick } from '../../Utilities/users-service'

const DogTrickCard = () => {
    const [dogTricks, setDogTricks] = useState([]);

    useEffect(() => {
      const fetchDogTricks = async () => {
        try {
          const data = await getAllDogTricks();
          setDogTricks(data);
        } catch (error) {
          console.error('Error fetching dog tricks:', error);
        }
      };
      fetchDogTricks();
    }, []);

    const toggleDogTrickCompleted = async (dogTrickId) => {
        try {
          const updatedDogTrick = await updateDogTrick(dogTrickId);
      
          if (updatedDogTrick) {
            const updatedDogTricks = dogTricks.map((trick) =>
              trick._id === updatedDogTrick._id ? updatedDogTrick : trick
            );
            setDogTricks(updatedDogTricks);
          }
        } catch (error) {
          console.error("Error updating the dog trick:", error);
        }
      };
      

    


  return (
    <div>
      <h2>Dog Tricks</h2>
      <div className="dog-trick-cards">
        {dogTricks.map((trick) => (
          <div className="dog-trick-card" key={trick._id}>
            <h3>{trick.trick_name}</h3>
            <p>Description: {trick.description}</p>
            <p>Difficulty Level: {trick.difficulty_level}</p>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={trick.completed}
                onChange={toggleDogTrickCompleted}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogTrickCard