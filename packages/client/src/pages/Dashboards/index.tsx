import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef } from "react";
import { Header } from "../../components/Header";
import pinImage from "../../assets/pin.png"
import { MapperContainer } from "./styles";
import cities from "./tourist_spots.json";
import "leaflet/dist/leaflet.css";
import L, {  } from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster';

const markerIcon = new L.Icon({
  iconUrl: pinImage,
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

interface MarkerCluster {
  getChildCount: () => number;
}

const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "customMarker",
    iconSize: L.point(40, 40, true)
  });
};

export const Dashboards = ()  => {
  const center = {
    lat: -15.3836364, 
    lng: -49.4271001
  }
  const ZOOM_LEVEL = 4
  const maptiler = {
    url:
    "https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=fXmTwJM642uPLZiwzhA1",
attribution:
    '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }
  const mapRef = useRef(null);

  return (
    <>
      <Header/>

      <MapperContainer>
        <div className='mapTitle'>
          <h2>Pontos Turísticos</h2>
          {/* <p>Loading...</p> */}
        </div>
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
          <TileLayer
            url={maptiler.url}
            attribution={maptiler.attribution}
          />
          <MarkerClusterGroup
            iconCreateFunction={createClusterCustomIcon}
            chunkedLoading
          >
          {cities.map((city) => (
            city.tourist_spots.map((tourist_spot, index) => (
              <Marker
                position={[Number(tourist_spot.lat), Number(tourist_spot.lng)]}
                icon={markerIcon}
                key={index}
              >
                <Popup>
                  <b>
                    {tourist_spot.name}, {tourist_spot.description}
                  </b>
                </Popup>
              </Marker>
            ))
          ))}
          </MarkerClusterGroup>
        </MapContainer>
      </MapperContainer>
    </>
  );
};