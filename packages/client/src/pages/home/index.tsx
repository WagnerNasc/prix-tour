import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Map from '../../components/Map'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import SelectFilter from '../../components/Select'
import { Filters, Header, Logo } from './styles'
import { useFilters } from '../../contexts/MapsContext'

const Home = () => {
  const navigate = useNavigate()
  const { searchFound } = useFilters()
  return (
    <Layout>
      <Header>
        <Logo
          alt="person in a wild environment"
          onClick={() => navigate('/')}
        />
        <Filters>
          <SearchBar />
          <SelectFilter placeholder="Filtrar por" options={[]} />
        </Filters>
        <Modal />
      </Header>
      <Map searchValue={searchFound} />
    </Layout>
  )
}

export default Home
