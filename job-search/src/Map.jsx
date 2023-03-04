import { useRef, useEffect, useState } from "react";

function Map({ center, zoom, markerCoordinateArray }) {
  const ref = useRef();
  // const [markerArray, setMarkerArray] = useState([]);

  // const updateMarkerArray = markerCoordinateArray.forEach(markerCoordinates => {
  //   setMarkerArray([
  //     ...markerArray,
  //     new window.google.maps.Marker({position: markerCoordinates, map: googleMap})
  //   ])
  //   console.log(markerCoordinates);
  // });


  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    console.log('map called')


  });



  return (
    <div ref={ref} id="map" />
  )
}
export default Map
