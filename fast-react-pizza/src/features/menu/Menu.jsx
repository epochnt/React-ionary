import { useLoaderData } from 'react-router'
import { getMenu } from '../../services'
import MenuItem from './MenuItem'

function Menu() {
  const menu = useLoaderData()
  return (
    <ul className="divide-y-2 divide-stone-200">
      {menu.map(pizza => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  )
}

// move it out later to make fast referesh work
export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
