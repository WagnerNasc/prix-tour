import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import type { Marker } from '@googlemaps/markerclusterer'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { useState, useEffect, useRef } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export type points = { lat: number; lng: number } & { key: string }

type MarkerProps = {
  points: points[]
}

const Markers = ({ points }: MarkerProps) => {
  const map = useMap()
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({})

  const clusterer = useRef<MarkerClusterer | null>(null)

  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
    }
  }, [map])

  useEffect(() => {
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
    console.log(point)
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
    </>
  )
}

export default Markers
