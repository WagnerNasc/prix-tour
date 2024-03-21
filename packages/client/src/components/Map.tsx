import { useMemo } from 'react'
import styled from 'styled-components'
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps'

const MapComponent = () => {
  const center = useMemo(() => ({ lat: 43.194019, lng: -80.384499 }), [])

  const MapContainer = styled.div`
    height: 80vh;
    width: 90vw;
    margin: 0 auto;
  `

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <MapContainer>
        <Map
          defaultZoom={5}
          defaultCenter={center}
          mapId={import.meta.env.VITE_GOOGLE_API_KEY}
        >
          <AdvancedMarker position={center}>
            <Pin background={'red'} borderColor={'red'} />
          </AdvancedMarker>
        </Map>
      </MapContainer>
    </APIProvider>
  )
}

export default MapComponent
