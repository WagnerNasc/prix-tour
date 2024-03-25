import {
  Data,
  DataSearch,
  DataTable,
  Grommet,
  ThemeType,
  Toolbar,
} from 'grommet'

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

const SearchBar = () => {
  return (
    <Grommet theme={customTheme}>
      <Data data={[]}>
        <Toolbar>
          <DataSearch width="medium" placeholder={'Busca por nome'} />
        </Toolbar>
        <DataTable />
      </Data>
    </Grommet>
  )
}

export default SearchBar
