import { useEffect, useState } from 'react'
import { getAllDogTricks, updateDogTrick, addMemory } from '../../Utilities/users-service'
import AddDogTrickForm from '../AddDogTrickForm/AddDogTrickForm';
import Checkbox from '@mui/material/Checkbox';

const DogTrickCard = ({ user, onMemoryAdded }) => {
    const [dogTricks, setDogTricks] = useState([]);
    const [showAddDogTrickForm, setShowAddDogTrickForm] = useState(false)
    console.log(user)

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
        await updateDogTrick(dogTrickId);
        const updatedTricks = dogTricks.map((trick) => {
          if (trick._id === dogTrickId) {
            const updatedTrick = {
              ...trick,
              tricksCompleted: trick.tricksCompleted.map((completion) => {
                if (completion.user === user._id) {
                  return { ...completion, completed: !completion.completed };
                }
                return completion;
              }),
            };
            if (!trick.tricksCompleted.find((completion) => completion.user === user._id).completed) {
              const newMemoryText = `Completed the dog trick "${trick.trick_name}" - ${trick.description}`;
              try {
                addMemory({ text: newMemoryText });
                onMemoryAdded();
                console.log('Memory added:', newMemoryText);
              } catch (error) {
                console.error('Error adding memory:', error);
              }
            }
            return updatedTrick;
          }
          return trick;
        });
        setDogTricks(updatedTricks);
      } catch (error) {
        console.error('Error updating dog trick completion status:', error);
      }
    };
  
  const handleDogTrickAdded = async () => {
    try {
      const data = await getAllDogTricks();
      setDogTricks(data);
    } catch (error) {
      console.error('Error fetchging dog tricks:', error)
    }
  }


  const toggleAddDogTrickForm = () => {
    if (user.isAdmin) {
      setShowAddDogTrickForm(!showAddDogTrickForm)
    } else {
      setShowAddDogTrickForm(false);
    }
  }

  return (
    <div>
      <h2>Dog Tricks</h2>
      {user.isAdmin && (
        <div>
          <button onClick={toggleAddDogTrickForm}>Add Dog Trick</button>
          {showAddDogTrickForm && (
              <AddDogTrickForm onDogTrickAdded={handleDogTrickAdded} />
          )}
        </div>
        )}
      <div className="dog-trick-cards">
        {dogTricks.map((trick) => (
          <div className="dog-trick-card" key={trick._id}>
            <h3>{trick.trick_name}</h3>
            <Checkbox
                checked={
                  (trick.tricksCompleted.find((completion) => completion.user === user._id) || { completed: false }).completed
                }
                onChange={() => toggleDogTrickCompleted(trick._id)}
              />
            <p>Description: {trick.description}</p>
            <p>Difficulty Level: {trick.difficulty_level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogTrickCard