import { Grommet, Select, ThemeType } from 'grommet'
import React from 'react'

const SelectFilter = () => {
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
  }

  return (
    <Grommet theme={customTheme}>
      <Select
        options={[]}
        value={value}
        placeholder={'Filtrar por'}
        onChange={({ option }) => setValue(option)}
      />
    </Grommet>
  )
}

export default SelectFilter
