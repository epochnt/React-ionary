import { RouterProvider, Navigate, createBrowserRouter } from 'react-router'
import GlobalStyles from './styles/GlobalStyles'
import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  PageNotFound,
  Settings,
  Users,
} from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <PageNotFound />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/account', element: <Account /> },
      { path: '/bookings', element: <Bookings /> },
      { path: '/cabins', element: <Cabins /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/login', element: <Login /> },
      { path: '/settings', element: <Settings /> },
      { path: '/users', element: <Users /> },
    ],
  },
])

export default function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}
