import { redirect } from 'react-router'
import { getOrder, createOrder } from '../../services'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

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

export async function loader({ params: { orderId } }) {
  const order = await getOrder(orderId)
  return order
}
