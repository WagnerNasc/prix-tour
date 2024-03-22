import { api } from './api'
import { FormValues } from '../components/forms/forms'

export const PostAttraction = async (values: FormValues) => {
  try {
    const res = await api.post('/tourist-attractions', values)
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
