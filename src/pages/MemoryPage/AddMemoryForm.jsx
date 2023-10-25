import { useState } from 'react'
import { addMemory } from '../../Utilities/users-service'

const AddMemoryForm = ({ onMemoryAdded }) => {
    const [newMemoryText, setNewMemoryText] = useState('');

    const handleAddMemory = async (e) => {
        e.preventDefault();
        try {
          await addMemory({ text: newMemoryText });
          setNewMemoryText('');
          onMemoryAdded();
        } catch (error) {
          console.error('Error adding memory:', error);
        }
      };

  return (
    <div>
      <h2>Add a Memory</h2>
      <form onSubmit={handleAddMemory}>
      <div>
        <label>Memory Text:</label>
        <textarea
            value={newMemoryText}
            onChange={(e) => setNewMemoryText(e.target.value)}
            required
        />
        </div>
        <button type="submit">Add Memory</button>
      </form>
    </div>
  );
};

export default AddMemoryForm