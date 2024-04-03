import React from 'react'
import { getAll } from '../../api/handleGetAll'
import { LocationsData } from '../../utils/types/locationTypes'
import { useFilters } from '../../contexts/MapsContext'
import Select, { OnChangeValue } from 'react-select'
import { controlStyles, menuListStyles, placeholderStyles } from './styles'
import { DropdownIcon } from './DropdownIcon'

type Option = {
  value: LocationsData
  label: string
}

const SearchBar = () => {
  const [, setSearchValue] = React.useState('')
  const [options, setOptions] = React.useState<LocationsData[]>([])

  const { setSearchFound = () => null } = useFilters()

  const handleData = async (value: string) => {
    const res = await getAll(`/tourist-attractions?filter=${value}`)

    setOptions(res)
  }

  const handleChange = (newValue: string) => {
    setSearchValue(newValue)
    handleData(newValue)
  }

  const handleClick = (option: Option) => {
    setOptions([])
    setSearchFound(option.value)
    setSearchValue(option.label)
  }

  return (
    <div>
      <Select
        placeholder={'Busca uma atração'}
        components={{ DropdownIndicator: () => <DropdownIcon /> }}
        onChange={(option: OnChangeValue<Option, false>) =>
          handleClick(option as Option)
        }
        onInputChange={e => handleChange(e)}
        noOptionsMessage={() => 'Nenhum resultado encontrado'}
        options={options?.map(option => ({
          value: option,
          label: option.name,
        }))}
        styles={{
          control: base => controlStyles(base, '52px', '30vw'),
          menuList: menuListStyles,
          placeholder: placeholderStyles,
        }}
      />
    </div>
  )
}

export default SearchBar
