import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getBookings } from '../../../services/apiBookings'

export function useBookings() {
  const [searchParams] = useSearchParams()

  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all' ? null : { status: filterValue }

  const sortByValue = searchParams.get('sortBy')
  const sortBy =
    sortByValue &&
    (() => {
      const [field, direction] = sortByValue.split('-')
      return { field, direction }
    })()

  const {
    data: bookings,
    isPending,
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
    retryOnMount: true,
  })

  return { bookings, isPending, error }
}
