import { Form, redirect, useNavigation, useActionData } from 'react-router'
import { createOrder } from '../../services'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]

function CreateOrder() {
  const navigation = useNavigation()
  const errors = useActionData()
  // const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === 'submitting'
  const cart = fakeCart

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            {errors?.phone && <span>{errors?.phone}</span>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              className="w-full rounded-full border border-stone-200 px-4 py-2
                text-sm transition-all duration-300 placeholder:text-stone-400
                focus:ring focus:ring-yellow-100 focus:outline-none md:px-6
                md:py-3"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            disabled={isSubmitting}
            className="inline-block rounded-full bg-yellow-400 px-4 py-3
              font-semibold text-stone-800 uppercase transition-colors
              duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring
              focus:ring-yellow-300 focus:ring-offset-1 focus:outline-none
              disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Placing order' : 'Order now'}
          </button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const errors = {}

  const order = {
    ...data,
    priority: data.priority === 'on',
    cart: JSON.parse(data.cart),
  }

  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Invalid phone number! Correct phone number needed to contact you.'
  }

  if (Object.keys(errors).length) return errors
  //post call to mutate server state
  const newOrder = await createOrder(order)
  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
