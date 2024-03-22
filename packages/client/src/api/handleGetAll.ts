import { api } from './api'

export const getAllAttractions = async () => {
  try {
    const res = await api.get('/tourist-attractions')
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
