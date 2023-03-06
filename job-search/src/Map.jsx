import { useRef, useEffect, useState } from "react";

function Map({ center, zoom, markerCoordinateArray, alteredListOfJobs }) {
  const ref = useRef();
  // console.log(alteredListOfJobs);

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    Array.from(alteredListOfJobs).forEach((job) => {
      if(!isNaN(job.location.lat)) {
        // setMarkerArray([
        //   ...markerArray,
        //   new window.google.maps.Marker({position: job.location, map: map})
        // ])
        console.log(job.job.title, job.location);
        new window.google.maps.Marker({position: job.location, map: map});
        // new window.google.maps.Marker({position: { lat: 47.6062, lng: -122.3321 } , map: map});
        // new window.google.maps.Marker({position: { lat: 47.6162, lng: -122.3021 } , map: map});
      }

    // console.log('map called');
    });


  }, [alteredListOfJobs]);



  return (
    <div ref={ref} id="map" />
  )
}
export default Map
