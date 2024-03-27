import { Grommet, Select, ThemeType } from 'grommet'
import React from 'react'
import { CitiesData } from '../utils/types/citiesTypes'

type SelectFilterProps = {
  placeholder: string
  options: CitiesData[]
  onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}

const SelectFilter = ({
  placeholder,
  options,
  onScroll,
}: SelectFilterProps) => {
  const [value, setValue] = React.useState('')

  const customTheme: ThemeType = {
    global: {
      focus: {
        shadow: {
          color: 'none',
          size: '0px',
        },
      },
      font: {
        family: 'Roboto',
        weight: 400,
      },
    },
    select: {
      icons: {
        color: '#341F97',
      },
    },
  }

  return (
    <Grommet theme={customTheme}>
      <Select
        style={{ fontWeight: '400' }}
        options={options?.map(option => option?.name)}
        value={value}
        placeholder={placeholder}
        onChange={({ option }) => setValue(option)}
        onMore={onScroll}
      />
    </Grommet>
  )
}

export default SelectFilter
