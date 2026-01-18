import { useNavigation, Outlet } from 'react-router'
import { CartOverview } from '../features'

import Header from './Header'
import Loader from './Loader'

export default function AppLayout() {
  const { state } = useNavigation()
  const isLoading = state === 'loading'

  return (
    <div className="layour">
      {isLoading && <Loader />}
      <Header />
      <main>
        {' '}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}
