import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import Markers, { points } from './Marker'
import { LocationsData } from '../utils/types/locationTypes'
import { getAllAttractions } from '../api/handleGetAll'

const MapComponent = () => {
  const [points, setPoints] = useState<points[]>([])

  const extractPoints = async () => {
    const pointsGet = await getAllAttractions()
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

  useMemo(() => {
    extractPoints()
  }, [])

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
