import { useState } from 'react'
import { addDogTrick} from '../../Utilities/users-service'

const AddDogTrickForm = ({onDogTrickAdded}) => {
    const [newDogTrickName, setNewDogTrickName] = useState('')
    const [newDogTrickDesc, setNewDogTrickDesc] = useState('')
    const [newDogTrickDiff, setNewDogTrickDiff] = useState('')

    const handleAddDogTrick = async (e) => {
        e.preventDefault();
        try {
          await addDogTrick({ trick_name: newDogTrickName, description: newDogTrickDesc, difficulty_level:newDogTrickDiff });
          setNewDogTrickName('');
          setNewDogTrickDesc('');
          setNewDogTrickDiff('');
          onDogTrickAdded();
        } catch (error) {
          console.error('Error adding dog trick:', error);
        }
      };


  return (
    <div>
      <h2>Add a Dog Trick</h2>
      <form onSubmit={handleAddDogTrick}>
      <div>
        <input
            value={newDogTrickName}
            placeholder='Fill dog trick name'
            onChange={(e) => setNewDogTrickName(e.target.value)}
            required
            />
        <input
            value={newDogTrickDesc}
            placeholder='Fill dog trick description'
            onChange={(e) => setNewDogTrickDesc(e.target.value)}
            required
            />
        <input
            value={newDogTrickDiff}
            placeholder='Fill dog trick difficulty level'
            onChange={(e) => setNewDogTrickDiff(e.target.value)}
            required
            />
        </div>
        <button type="submit">Add Dog Trick</button>
      </form>
    </div>
  );
};

export default AddDogTrickForm