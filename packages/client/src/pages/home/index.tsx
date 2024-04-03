import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Map from '../../components/map/Map'
import Modal from '../../components/Modal'
import SearchBar from '../../components/selects/SearchBar'
import { Filters, Header, Logo } from './styles'
import { useFilters } from '../../contexts/MapsContext'

const Home = () => {
  const navigate = useNavigate()
  const {
    searchFound,
    setIsOpenAddToForm,
    isOpenAddToForm,
    setPointToAdd,
    pointToAdd,
  } = useFilters()

  return (
    <Layout>
      <Header>
        <Logo
          alt="person in a wild environment"
          onClick={() => navigate('/')}
        />
        <Filters>
          <SearchBar />
          <Modal
            isOpen={isOpenAddToForm}
            setModalOpen={setIsOpenAddToForm}
            newPoint={pointToAdd}
            setNewPoint={setPointToAdd}
          />
        </Filters>
      </Header>
      <Map
        newPoint={pointToAdd}
        searchValue={searchFound}
        setModalOpen={setIsOpenAddToForm}
        setNewPoint={setPointToAdd}
      />
    </Layout>
  )
}

export default Home
