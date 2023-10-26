import React from 'react'

const DogProfileCard = ({ dogProfile }) => {
  return (
    <div>
        <div>
            {dogProfile.image && <img src={dogProfile.image} alt={`${dogProfile.name}'s image`} />}
        </div>
        <div>
        <h2>{dogProfile.name}</h2>
        <p>{dogProfile.description}</p>
        <p>Owner: {dogProfile.user.name}</p>
      </div>
    </div>
  )
}

export default DogProfileCard