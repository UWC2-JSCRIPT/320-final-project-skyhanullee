import { renderToString } from "react-dom/server";
import MarkerCard from "./MarkerCard";

function Marker({ job, map }) {
  console.log(`----------marker called----------`);
  const { latitude, longitude, title, id } = job;
  const markerPosition = new window.google.maps.LatLng(latitude, longitude);
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition,
    map: map,
  });
  console.log(marker);
  // new window.google.maps.Marker({position: { lat: 47.6062, lng: -122.3321 } , map: map});
  // new window.google.maps.Marker({position: { lat: 47.6162, lng: -122.3021 } , map: map});
  const infowindow = new window.google.maps.InfoWindow({
    // content: title,
    content: renderToString(<MarkerCard job={job} />),
    position: markerPosition,
  });
  marker.addListener("click", () => {
    // if (infowindow.open) {
    infowindow.open({
      anchor: marker,
      map,
    });
    // }
    // else {
    //   infowindow.close();
    // }
  });


  return (
      <>{marker}</>
  )
}
export default Marker
