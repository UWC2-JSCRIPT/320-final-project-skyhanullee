import { renderToString } from "react-dom/server";
import MarkerCard from "./MarkerCard";

function Marker( job, map, bounds, infowindow ) {
  // console.log('--------------------Marker is called-------------------------');
  const { latitude, longitude, id } = job;
  const markerPosition = { lat: latitude, lng: longitude }
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition,
    map: map,
  });
  
  // console.log(marker);
  // new window.google.maps.Marker({position: { lat: 47.6062, lng: -122.3321 } , map: map});
  // new window.google.maps.Marker({position: { lat: 47.6162, lng: -122.3021 } , map: map});

  // const infowindow = new window.google.maps.InfoWindow({
  //   content: renderToString(<MarkerCard job={job} />),
  //   position: markerPosition,
  // });
  // const infowindow = new window.google.maps.InfoWindow();

  // console.log(infowindow.content);

  // setMarkerInfowindow(infowindow);

  window.google.maps.event.addListener(marker, "click", (e) => {
    // const infowindow = new window.google.maps.InfoWindow();
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
    // infowindow: infowindow
})
}
export default Marker
