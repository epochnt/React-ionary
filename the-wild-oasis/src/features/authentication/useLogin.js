import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { login as loginApi } from '../../services/apiAuth'

export function useLogin() {
  const navigate = useNavigate()
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: (data) => {
      toast.success('Logged In Successfully')
      navigate('/')
    },
    onError: (err) => {
      console.log(err)
      toast.error('Provided email of password are incorrect')
    },
  })
  return { login, isLoggingIn }
}
