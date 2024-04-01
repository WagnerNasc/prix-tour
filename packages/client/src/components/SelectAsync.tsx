import type { GroupBase, OptionsOrGroups } from 'react-select'

export type OptionType = {
  value: number
  label: string
}

const options: OptionType[] = []
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  })
}

const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(undefined)
    }, ms)
  })

export const loadOptions = async (
  search: string,
  prevOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>
) => {
  await sleep(1000)

  let filteredOptions: OptionType[]
  if (!search) {
    filteredOptions = options
  } else {
    const searchLower = search.toLowerCase()

    filteredOptions = options.filter(({ label }) =>
      label.toLowerCase().includes(searchLower)
    )
  }

  const hasMore = filteredOptions.length > prevOptions.length + 10
  const slicedOptions = filteredOptions.slice(
    prevOptions.length,
    prevOptions.length + 10
  )

  return {
    options: slicedOptions,
    hasMore,
  }
}
