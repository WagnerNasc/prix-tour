import { Grommet, Select, ThemeType } from 'grommet'
import React from 'react'

type SelectFilterProps = {
  placeholder: string
  options: string[]
}

const SelectFilter = ({ placeholder, options }: SelectFilterProps) => {
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
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={({ option }) => setValue(option)}
      />
    </Grommet>
  )
}

export default SelectFilter
