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
      />
    </form>
  )
}
