
const MemoryCard = ({ memory }) => {
  return (
    <div>
        <div>{memory.text}</div>
        <div>{memory.user.name}</div>
        <div>
            <img src={memory.image} alt='Memory Image' />
        </div>
    </div>
  )
}

export default MemoryCard