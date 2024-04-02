import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { APIProvider, Map, MapMouseEvent } from '@vis.gl/react-google-maps'
import Markers, { points } from './Marker'
import { LocationsData } from '../utils/types/locationTypes'
import { getAll } from '../api/handleGetAll'

type MapComponentProps = {
  searchValue: LocationsData | null
  newPoint: points
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setNewPoint: React.Dispatch<React.SetStateAction<points>>
}

const MapComponent = ({
  searchValue,
  newPoint,
  setModalOpen,
  setNewPoint,
}: MapComponentProps) => {
  const [points, setPoints] = useState<points[]>([])

  const spacialValues = (pointsGet: LocationsData[]) => {
    const spacial = pointsGet?.map((point: LocationsData) => ({
      id: point.id,
      name: point.name,
      description: point.description,
      image_link: point.image_link,
      lat: Number(point.latitude),
      lng: Number(point.longitude),
      key: point.id.toString(),
    }))
    setPoints(spacial)
  }
  const extractPoints = async () => {
    try {
      const pointsGet: LocationsData[] = await getAll(
        '/tourist-attractions?page=1&limit=1000'
      )
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

  const center = useMemo(() => {
    if (points.length === 0) {
      return { lat: -14.2400732, lng: -53.1805017 }
    }
    const lastPoint = newPoint.key ? newPoint : points[0]
    return { lat: lastPoint.lat, lng: lastPoint.lng }
  }, [points])

  const MapContainer = styled.div`
    height: 80vh;
  `

  const onMapClick = (e: MapMouseEvent) => {
    if (e.detail.latLng) {
      setPoints(current => [
        ...current,
        {
          lat: e.detail.latLng?.lat ?? 0,
          lng: e.detail.latLng?.lng ?? 0,
          key: `new-point-${current?.length}`,
        },
      ])
      console.log(points)
      setNewPoint({
        lat: e.detail.latLng?.lat ?? 0,
        lng: e.detail.latLng?.lng ?? 0,
        key: `new-point-${points?.length}`,
      })
      setModalOpen(true)
      setPoints(current => current.slice(0, -1))
    }
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <MapContainer>
        <Map
          defaultZoom={12}
          defaultCenter={center}
          onClick={onMapClick}
          mapId="123"
        >
          <Markers points={points} />
        </Map>
      </MapContainer>
    </APIProvider>
  )
}

export default MapComponent
