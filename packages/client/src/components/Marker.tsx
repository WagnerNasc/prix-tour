import { AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps'
import type { Marker } from '@googlemaps/markerclusterer'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useState, useEffect, useRef, useMemo } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { LocationsData } from '../utils/types/locationTypes'
import { contentInfo } from './ContentInfoWindow'
import { useOnClickOutside } from '../utils/hooks/onClickOutside'

export type points = { lat: number; lng: number } & {
  key: string
} & Partial<LocationsData>

type MarkerProps = {
  points: points[]
}

const Markers = ({ points }: MarkerProps) => {
  const map = useMap()
  const infoWindowRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(infoWindowRef, () => closeInfoWindow())

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({})
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null)
  const [infowindowShown, setInfowindowShown] = useState(false)
  const [information, setInformation] = useState<points | null>(null)

  const clusterer = useRef<MarkerClusterer | null>(null)

  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
    }
  }, [map])

  useMemo(() => {
    clusterer.current?.clearMarkers()
    clusterer.current?.addMarkers(Object.values(markers))
  }, [markers])

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return

    setMarkers(prev => {
      if (marker) {
        return { ...prev, [key]: marker }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[key]
        return newMarkers
      }
    })
  }

  const handleMarkerClick = (point: points) => {
    setSelectedMarker(markers[point.key])
    setInfowindowShown(true)
    setInformation(point)
  }

  const closeInfoWindow = () => {
    setInfowindowShown(false)
  }

  return (
    <>
      {points?.map(point => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={marker => setMarkerRef(marker, point.key)}
          onClick={() => handleMarkerClick(point)}
        >
          <span style={{ fontSize: '2rem', color: '#341F97' }}>
            <FaMapMarkerAlt />
          </span>
        </AdvancedMarker>
      ))}
      {selectedMarker && infowindowShown && (
        <InfoWindow
          anchor={selectedMarker}
          onCloseClick={closeInfoWindow}
          content={contentInfo(
            information?.name,
            information?.description,
            information?.image_link
          )}
        />
      )}
    </>
  )
}

export default Markers
