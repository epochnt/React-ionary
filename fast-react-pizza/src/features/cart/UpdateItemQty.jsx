import { useDispatch, useSelector } from 'react-redux'
import { incItemQty, decItemQty } from './cartSlice'
import { getQty } from './utils'
import { Button } from '../../ui'

export default function UpdateItemQty({ pizzaId }) {
  const qty = useSelector(getQty(pizzaId))
  const dispatch = useDispatch()
  const handleIncQty = () => {
    dispatch(incItemQty(pizzaId))
  }

  const handleDecQty = () => {
    dispatch(decItemQty(pizzaId))
  }

  return (
    <div className="space-x-1">
      <Button size="rounded" onClick={handleDecQty}>
        -
      </Button>
      <span>{qty}</span>
      <Button size="rounded" onClick={handleIncQty}>
        +
      </Button>
    </div>
  )
}
