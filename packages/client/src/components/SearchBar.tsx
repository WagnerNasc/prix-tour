import { DataSearch, Grommet, ThemeType, Toolbar } from 'grommet'
import React, { useMemo } from 'react'
import { getAll } from '../api/handleGetAll'
import { LocationsData } from '../utils/types/locationTypes'
import { ResultBox } from './Toolbar'

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
    },

    input: {
      font: {
        weight: 400,
      },
    },
  },
}

const SearchBar = () => {
  const [value, setValue] = React.useState('')
  const [options, setOptions] = React.useState<LocationsData[]>([])

  const handleData = async () => {
    const res = await getAll(`/tourist-attractions?filter=${value}`)
    setOptions(res)
  }
  useMemo(() => {
    handleData()
  }, [value])

  const handleClick = (option: LocationsData) => {
    setOptions([])
    setValue(option.name)
  }

  return (
    <Grommet theme={customTheme}>
      <div>
        <Toolbar>
          <DataSearch
            placeholder={'Busca por nome'}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Toolbar>
        <ResultBox>
          {value &&
            options?.map((option, index) => (
              <div
                style={{ cursor: 'pointer' }}
                key={index}
                onClick={() => handleClick(option)}
              >
                {option.name}
              </div>
            ))}
        </ResultBox>
      </div>
    </Grommet>
  )
}

export default SearchBar
