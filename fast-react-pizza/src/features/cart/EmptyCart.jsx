import { CustomLink } from '../../ui'

function EmptyCart() {
  return (
    <div className="py-4">
      <CustomLink to="/menu">&larr; Back to menu</CustomLink>

      <p className="font-semibold mt-7">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  )
}

export default EmptyCart
