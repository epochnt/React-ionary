import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, useNavigation, useActionData } from 'react-router'
import { getTransformedCart } from '../cart/utils'
import { Button } from './../../ui'
import EmptyCart from '../cart/EmptyCart'

function CreateOrder() {
  const navigation = useNavigation()
  const errors = useActionData()
  const userName = useSelector(state => state.user.userName)
  const cart = useSelector(getTransformedCart)
  const [withPriority, setWithPriority] = useState(false)

  const isSubmitting = navigation.state === 'submitting'
  const cartPrice = cart.reduce((sum, pizza) => sum + pizza.totalPrice, 0)
  const totalPrice = withPriority ? cartPrice * 1.2 : cartPrice

  if (!cart.length) return <EmptyCart />
  return (
    <div className="py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input mb-2 w-full"
              type="tel"
              name="phone"
              required
            />
            {errors?.phone && (
              <span
                className="ms-1 rounded-md bg-red-100 p-1 text-xs text-red-700"
              >
                {errors?.phone}
              </span>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring
              focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={e => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting}>
            {isSubmitting ? 'Placing order...' : `Order now $${totalPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateOrder
