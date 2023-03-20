import { createContext, useRef, useState } from "react";

const MapContext = createContext();

export default MapContext

export function MapController({ children }) {
  const ref = useRef();
  console.log(`ref from mapcontext ${ref}`);
  console.log(ref);
  const center = { lat: 47.6162, lng: -122.3021 };
  const zoom = 10;
  // let tempMap;
  // if (ref !== undefined) {
  //   console.log('ref is not undefined')
  //   tempMap = new window.google.maps.Map(ref, {center, zoom});
  // }
  const [map, setMap] = useState();

  // const tempBounds = new window.google.maps.LatLngBounds();
  const [bounds, setBounds] = useState(new window.google.maps.LatLngBounds());
  return (
    <MapContext.Provider value={{ map, setMap, bounds, setBounds }}>
    <div ref={ref} id="map" >
      {/* everything inside of this provider is a child of MapContext */}
      {children}
      </div>
    </MapContext.Provider>
  )
}
