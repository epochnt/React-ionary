import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getBookings } from '../../../services/apiBookings'

export function useBookings() {
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all' ? null : { status: filterValue }

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings(filter),
    retryOnMount: true,
  })

  return { bookings, isPending, error }
}
