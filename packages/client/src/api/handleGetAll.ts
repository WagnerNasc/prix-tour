import { api } from './api'

export const getAll = async (path: string) => {
  try {
    const res = await api.get(path)
    return res?.data?.data
  } catch (error) {
    console.error(error)
  }
}
