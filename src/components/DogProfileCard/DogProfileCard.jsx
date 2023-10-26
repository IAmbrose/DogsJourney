import { useNavigate } from 'react-router-dom'

const DogProfileCard = ({ allUserDogProfile, currentUserDogProfile }) => {
    const navigate = useNavigate();

    const handleViewMemories = (userId) => {
        navigate(`/memory/${userId}`);
      };

      const dogProfile = allUserDogProfile || currentUserDogProfile;

  return (
    <div>
        <div>
            {dogProfile.image && <img src={dogProfile.image} alt={`${dogProfile.name}'s image`} />}
        </div>
        <div>
        <h2>{dogProfile.name}</h2>
        <p>{dogProfile.description}</p>
        <p>Owner: {dogProfile.user.name}</p>
        <button onClick={() => handleViewMemories(dogProfile.user._id)}>See Memories</button>
      </div>
    </div>
  )
}

export default DogProfileCard