import React from 'react'

const DogCard = ({dogData}) => {
  return (
    <div>
        <img src={dogData.image_link} alt={dogData.name} />
        <h2>{dogData.name}</h2>
    </div>
  )
}

export default DogCard