import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../cart/cartSlice'
import { formatCurrency } from '../../utils/helpers'
import { Button } from '../../ui'
import { getQty } from '../cart/utils'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQty from '../cart/UpdateItemQty'

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const qty = useSelector(getQty(id))

  const handleAddToCart = () => {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        qty: 1,
        unitPrice,
        totalPrice: unitPrice,
      })
    )
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <>
              <p>{formatCurrency(unitPrice)}</p>
              {qty && (
                <div className="flex gap-3">
                  <UpdateItemQty pizzaId={id} />
                  <DeleteItem pizzaId={id} />
                </div>
              )}
              {!qty && (
                <Button size="small" onClick={handleAddToCart}>
                  Add to cart
                </Button>
              )}
            </>
          ) : (
            <p className="font-medium text-stone-500 uppercase">Sold out</p>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
