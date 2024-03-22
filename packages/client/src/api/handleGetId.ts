import { api } from './api'

export const getAllAttractions = async (id: string) => {
  try {
    const res = await api.get(`/tourist-attractions/${id}`)
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
