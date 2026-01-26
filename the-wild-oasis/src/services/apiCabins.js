import { supabase } from './supabase'

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
