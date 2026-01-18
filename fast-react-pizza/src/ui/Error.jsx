import { useNavigate, useRouteError } from 'react-router'
import { CustomLink } from '../ui'
function NotFound() {
  const error = useRouteError()
  const navigate = useNavigate()
  console.log(error)

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <CustomLink onClick={() => navigate(-1)}>&larr; Go back</CustomLink>
    </div>
  )
}

export default NotFound
