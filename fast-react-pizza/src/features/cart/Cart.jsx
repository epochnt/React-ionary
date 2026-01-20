import { useDispatch, useSelector } from 'react-redux'
import { getCart } from './utils'
import { clearCart } from './cartSlice'
import { CustomLink, Button } from '../../ui'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'

function Cart() {
  const userName = useSelector(state => state.user.userName)
  const cart = useSelector(getCart)
  const dipatch = useDispatch()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="py-4">
      <CustomLink
        className="text-blue-500 hover:text-blue-600 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </CustomLink>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map(item => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>
        <button
          className="inline-block rounded-full border border-stone-300 px-4 py-3
            font-semibold text-stone-400 uppercase transition-colors
            duration-300 hover:bg-stone-300 hover:text-stone-800
            focus:bg-stone-300 focus:text-stone-800 focus:ring
            focus:ring-stone-200 focus:ring-offset-1 focus:outline-none
            disabled:cursor-not-allowed md:px-6 md:py-3"
          onClick={() => dipatch(clearCart())}
        >
          Clear cart
        </button>
      </div>
    </div>
  )
}

export default Cart
