import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { insertEditCabin } from '../../services/apiCabins'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import FormRow from '../../ui/FormRow'
import Textarea from '../../ui/Textarea'

function CreateCabinForm({ cabin = {} }) {
  const queryClient = useQueryClient()
  const { id: editId, ...editValues } = cabin
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: editId ? editValues : {},
  })
  const { errors } = formState

  const { isPending: isCreating, mutate: insert } = useMutation({
    mutationFn: (cabin) => insertEditCabin(cabin),
    onSuccess: () => {
      toast.success('New Cabin added successfully !')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (err) => toast.error(err.message),
  })

  const { isPending: isEditing, mutate: edit } = useMutation({
    mutationFn: ({ cabin, id }) => insertEditCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin edited successfully !')
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (err) => toast.error(err.message),
  })

  const onSubmit = (data) => {
    const image =
      typeof cabin.image === 'string' && cabin.image
        ? cabin.image
        : data.image[0]
    console.log(image)

    if (editId) edit({ cabin: { ...data, image }, id: editId })
    else insert({ ...data, image })
  }

  const onFormError = (err) => {
    console.log(err)
  }

  const isLoading = isCreating || isEditing

  return (
    <Form onSubmit={handleSubmit(onSubmit, onFormError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 2,
              message: 'Capacity should atleast be 2',
            },
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount value should be less than regular price',
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isLoading}
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {editId ? 'Edit cabin' : 'Add cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
