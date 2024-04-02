import { api } from '../../api/api'
import { CitiesData } from '../../utils/types/citiesTypes'

export type OptionType = {
  value: number
  label: string
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })

let totalPages: number

export const loadOptions = async (search: string, page: number) => {
  await sleep(500)
  const response = await api.get(`/cities?page=${page}&filter=${search}`)
  totalPages = response.data.total_pages
  const data = response?.data?.data

  const options: OptionType[] = data.map((item: CitiesData) => ({
    value: item.id,
    label: item.name,
  }))

  let filteredOptions: OptionType[]
  if (!search) {
    filteredOptions = options
  } else {
    const searchLower = search.toLowerCase()

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
    )
  }

  const hasMore = totalPages > page
  return {
    options: filteredOptions,
    hasMore,
  }
}
