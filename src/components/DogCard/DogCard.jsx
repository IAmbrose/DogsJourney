import { useState } from 'react'

const DogCard = ({ dogData, onAddToWishList }) => {
  const [showMore, setShowMore] = useState(false)

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }
  return (
    <div>
        <img src={dogData.image_link} alt={dogData.name} />
        <h2>{dogData.name}</h2>
        <p>
          {showMore}
          <button onClick={toggleShowMore} className="see-more-link">
            {showMore ? 'See Less' : 'See More Characteristics'}
          </button>
        </p>
        
        {showMore && (
          <>
            <p>Good with Children: {dogData.good_with_children}</p>
            <p>Good with Other Dogs: {dogData.good_with_other_dogs}</p>
            <p>Shedding: {dogData.shedding}</p>
            <p>Grooming: {dogData.grooming}</p>
            <p>Drooling: {dogData.drooling}</p>
            <p>Playfulness: {dogData.playfulness}</p>
            <p>Protectiveness: {dogData.protectiveness}</p>
            <p>Trainability: {dogData.trainability}</p>
            <p>Energy: {dogData.energy}</p>
            <p>Barking: {dogData.barking}</p>
          </>
        )}
        <button onClick={onAddToWishList}>Add to Wishlist</button>
    </div>
  )
}

export default DogCard