import { api } from './api'
import { FormValues } from '../components/forms/forms'

export const PostAttraction = async (path: string, values: FormValues) => {
  try {
    const res = await api.post(path, values)
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
