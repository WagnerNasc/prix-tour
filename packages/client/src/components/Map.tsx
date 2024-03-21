import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import styled from 'styled-components';

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const center = useMemo(() => ({ lat: 43.194019, lng: -80.384499 }), []);

  const MapContainer = styled.div`
    height: 80vh;
    width: 90vw;
    margin: 0 auto;
  `;

  return (
    <MapContainer>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: -22.951916, lng: -43.210487 }} />
        </GoogleMap>
      )}
    </MapContainer>
  );
};

export default Map;
