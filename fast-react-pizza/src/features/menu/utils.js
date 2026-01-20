import { getMenu } from '../../services'

export async function loader() {
  const menu = await getMenu()
  return menu
}
