import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItemQty from './UpdateItemQty'

function CartItem({ item }) {
  const { pizzaId, name, qty, totalPrice } = item

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {qty}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <div className="flex sm:gap-6 gap-2">
          <UpdateItemQty pizzaId={pizzaId} />

          <DeleteItem pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  )
}

export default CartItem
