import { useState } from 'react'
import { addDogProfile } from '../../Utilities/users-service'

const AddDogProfileForm = ({onDogProfileAdded}) => {
    const [newDogProfileName, setNewDogProfileName] = useState('');
    const [newDogProfileDesc, setNewDogProfileDesc] = useState('');


    const handleAddProfile = async (e) => {
        e.preventDefault();
        try {
          await addDogProfile({ name: newDogProfileName, description: newDogProfileDesc });
          setNewDogProfileName('');
          setNewDogProfileDesc('');
          onDogProfileAdded();
        } catch (error) {
          console.error('Error adding memory:', error);
        }
      };

  return (
    <div>
      <h2>Add a Profile</h2>
      <form onSubmit={handleAddProfile}>
      <div>
        <input
            value={newDogProfileName}
            placeholder='Fill dog name'
            onChange={(e) => setNewDogProfileName(e.target.value)}
            required
            />
        <label>Dog Description:</label>
        <textarea
            value={newDogProfileDesc}
            onChange={(e) => setNewDogProfileDesc(e.target.value)}
            required
        />
        </div>
        <button type="submit">Add Profile</button>
      </form>
    </div>
  );
};

export default AddDogProfileForm