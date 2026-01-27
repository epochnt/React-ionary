import { supabase } from './supabase'
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')
  if (error) {
    console.log(error)
    throw new Error('Error loading data from supabase')
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)
  if (error) {
    console.log(error)
    throw new Error('Error deleting cabin from supabase')
  }
}

export async function insertCabin(cabin) {
  // https://crslioynmzlmesorgtdr.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagefileName = `${Math.random() * 1000}-${cabin.name}`.replaceAll(
    '/',
    '',
  )
  const imagePath = cabin.image
    ? `${SUPABASE_URL}/storage/v1/object/public/cabin-images/${imagefileName}`
    : ''

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin, image: imagePath }])
    .select()

  if (error) {
    console.log(error)
    throw new Error('Error inserting cabin to supabase')
  }

  if (!imagePath) return data

  const { error: fileUploadError } = await supabase.storage
    .from('cabin-images')
    .upload(imagefileName, cabin.image)

  if (fileUploadError) {
    console.log(fileUploadError)
    await deleteCabin(data.at(0).id)
  }
  return data
}
