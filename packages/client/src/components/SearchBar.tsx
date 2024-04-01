import { DataSearch, Grommet, ThemeType, Toolbar } from 'grommet'
import React from 'react'
import { getAll } from '../api/handleGetAll'
import { LocationsData } from '../utils/types/locationTypes'
import { ResultBox } from './Toolbar'
import { useFilters } from '../contexts/MapsContext'

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
  const [searchValue, setSearchValue] = React.useState('')
  const [options, setOptions] = React.useState<LocationsData[]>([])

  const { setSearchFound = () => null } = useFilters()

  const handleData = async (value: string) => {
    const res = await getAll(`/tourist-attractions?filter=${value}`)
    setOptions(res)
  }

  const handleChange = (newValue: string) => {
    setSearchValue(newValue)
    handleData(newValue)
    if (newValue === '') {
      setSearchFound(null)
    }
  }

  const handleClick = (option: LocationsData) => {
    setOptions([])
    setSearchFound(option)
    setSearchValue(option.name)
  }

  return (
    <Grommet theme={customTheme}>
      <div>
        <Toolbar>
          <DataSearch
            placeholder={'Busca por nome'}
            value={searchValue}
            onChange={e => handleChange(e.target.value)}
          />
        </Toolbar>
        <ResultBox>
          {searchValue &&
            options?.map((option, index) => (
              <div
                style={{
                  cursor: 'pointer',
                  fontSize: '1rem',
                  paddingLeft: '1rem',

                  paddingTop: '0.5rem',
                }}
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
