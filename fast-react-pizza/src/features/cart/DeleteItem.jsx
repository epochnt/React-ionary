import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'
import { Button } from '../../ui'

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteItem(pizzaId))
  }
  return (
    <Button size="small" onClick={handleDelete}>
      Delete
    </Button>
  )
}
