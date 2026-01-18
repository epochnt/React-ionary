import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function SearchOrder() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSumbit = e => {
    e.preventDefault()
    if (query) {
      navigate(`/order/${query}`)
    }
  }

  return (
    <form onSubmit={handleSumbit}>
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm
          transition-all duration-300 placeholder:text-stone-400 focus:ring-1
          focus:ring-yellow-500 focus:outline-none sm:w-64 sm:focus:w-72"
      />
    </form>
  )
}
