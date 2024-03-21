import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import Map from '../../components/Map'
import Modal from '../../components/Modal'
import SearchBar from '../../components/SearchBar'
import SelectFilter from '../../components/Select'
import SideBar from '../../components/Sidebar'
import { Filters, Header, Logo } from './styles'

const Home = () => {
  const navigate = useNavigate()
  return (
    <Layout>
      <Header>
        <Logo
          alt="person in a wild environment"
          onClick={() => navigate('/')}
        />
        <Filters>
          <SearchBar />
          <SelectFilter />
        </Filters>
        <Modal />
        <SideBar />
      </Header>
      <Map />
    </Layout>
  )
}

export default Home
