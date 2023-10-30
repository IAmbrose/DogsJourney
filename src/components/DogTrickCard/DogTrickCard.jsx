import { useEffect, useState } from 'react'
import { getAllDogTricks, updateDogTrick } from '../../Utilities/users-service'
import AddDogTrickForm from '../AddDogTrickForm/AddDogTrickForm';

const DogTrickCard = ({ user }) => {
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
        const updatedTricks = dogTricks.map((trick) =>
          trick._id === dogTrickId ? 
          {
            ...trick,
            tricksCompleted: trick.tricksCompleted.map((completion) => {
              if (completion.user === user._id) {
                return { ...completion, completed: !completion.completed };
              }
              return completion;
            })
          } : trick
        );
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
            <p>Description: {trick.description}</p>
            <p>Difficulty Level: {trick.difficulty_level}</p>
            <label>
              Completed:
              <input
                type="checkbox"
                checked={
                  (trick.tricksCompleted.find((completion) => completion.user === user._id) || { completed: false }).completed
                }
                onChange={() => toggleDogTrickCompleted(trick._id)}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DogTrickCard