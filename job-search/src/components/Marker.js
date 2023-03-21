import { renderToString } from "react-dom/server";
import MarkerCard from "./MarkerCard";

function Marker( job, map, bounds, infowindow ) {
  const { latitude, longitude, id } = job;
  const markerPosition = { lat: latitude, lng: longitude }
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition,
    map: map,
  });
  window.google.maps.event.addListener(marker, "click", (e) => {
    infowindow.setContent(renderToString(<MarkerCard job={job} />));
    infowindow.setPosition(markerPosition);
    infowindow.open({
      anchor: marker,
      map,
    }, this);
  });
  const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
  bounds.extend(jobLatLng);
  map.fitBounds(bounds);

  return ({
    marker: marker, 
})
}
export default Marker
