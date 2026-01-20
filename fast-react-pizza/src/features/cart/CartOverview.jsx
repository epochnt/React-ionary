import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { getTotalItems, getTotalPrice } from './utils'

function CartOverview() {
  const totalItem = useSelector(getTotalItems)
  const totalPrice = useSelector(getTotalPrice)

  if (!totalItem) return null

  return (
    <div
      className="flex items-center justify-between bg-stone-800 p-4 text-sm
        text-stone-200 uppercase sm:px-6 md:text-base"
    >
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalItem} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
