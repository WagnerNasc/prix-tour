import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import Markers, { points } from './Marker'
import { LocationsData } from '../utils/types/locationTypes'
import { getAll } from '../api/handleGetAll'

type MapComponentProps = {
  searchValue: LocationsData | null
}

const MapComponent = ({ searchValue }: MapComponentProps) => {
  const [points, setPoints] = useState<points[]>([])

  const spacialValues = (pointsGet: LocationsData[]) => {
    const spacial = pointsGet?.map((point: LocationsData) => ({
      id: point.id,
      name: point.name,
      description: point.description,
      lat: Number(point.latitude),
      lng: Number(point.longitude),
      key: point.id.toString(),
    }))
    setPoints(spacial)
  }
  const extractPoints = async () => {
    try {
      const pointsGet: LocationsData[] = await getAll('/tourist-attractions')
      spacialValues(pointsGet)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilters = () => {
    try {
      if (searchValue) {
        spacialValues([searchValue] as LocationsData[])
        return
      }
      extractPoints()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    extractPoints()
  }, [])

  useMemo(() => {
    handleFilters()
  }, [searchValue])

  const center = useMemo(() => ({ lat: -14.2400732, lng: -53.1805017 }), [])

  const MapContainer = styled.div`
    height: 80vh;
  `
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <MapContainer>
        <Map
          defaultZoom={4}
          defaultCenter={center}
          mapId={import.meta.env.VITE_GOOGLE_API_KEY}
        >
          <Markers points={points} />
        </Map>
      </MapContainer>
    </APIProvider>
  )
}

export default MapComponent
