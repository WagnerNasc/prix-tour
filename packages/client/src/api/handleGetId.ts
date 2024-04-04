import { api } from './api'

export const getAttractionsById = async (path: string, id: string) => {
  try {
    const res = await api.get(`${path}${id}`)
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
