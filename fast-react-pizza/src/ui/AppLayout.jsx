import { useNavigation, Outlet } from 'react-router'
import { CartOverview } from '../features'

import Header from './Header'
import Loader from './Loader'

export default function AppLayout() {
  const { state } = useNavigation()
  const isLoading = state === 'loading'

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <main
        className="mx-auto w-full max-w-3xl overflow-scroll px-5 md:max-w-6xl"
      >
        {' '}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  )
}
