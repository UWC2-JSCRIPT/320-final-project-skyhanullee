import { useRef, useEffect, useState } from "react";
import { renderToString } from 'react-dom/server';
import MarkerCard from "./MarkerCard";

function addMarker(job, map) {
  const { latitude, longitude, title, id } = job;
  const markerPosition = new window.google.maps.LatLng(latitude, longitude);
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition, 
    map: map,
  });
  // console.log(marker);
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
}

function Map({ center, zoom, jobResult }) {
  const ref = useRef();
  // console.log(jobResult.results);

  // to set up map bounds when showing on screen
  let bounds = new window.google.maps.LatLngBounds();

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {center, zoom});
    console.log('marker useeffect called in Map.jsx');

    jobResult.results.forEach((job) => {
      // console.log(job);
      if(job.latitude !== undefined) {
        addMarker(job, map);

        const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
        bounds.extend(jobLatLng);
        map.fitBounds(bounds);
      }

    // console.log('map called');
    });


  }, [jobResult]);



  return (
    <div ref={ref} id="map" />
  )
}
export default Map
