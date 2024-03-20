import styled from "styled-components";
import { MapContainer } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";

export const MapperContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  .leaflet-container {
    height: 600px;
    width: 100%;
  }

  .mapTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .customMarker{
    background: ${props => props.theme["blue-logo"]};
    border-radius: 50%;
    height: 33px;
    line-height: 40px;
    text-align: center;
    width: 33px;
    opacity: 0.7;
    font-weight: bold;
  }

  .customMaker > span {
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
`

export const StyledMapContainer = styled(MapContainer)`
  width: 100%;
  height: 100%;
`;

export const StyledMapCluster = styled(MarkerClusterGroup)`
  background-color: ${props => props.theme["gray-900"]};
  color: ${props => props.theme["gray-900"]};
`;
