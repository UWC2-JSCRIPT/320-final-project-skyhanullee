import { useRef, useEffect, useState } from "react";

function Map({ center, zoom, jobResult }) {
  const ref = useRef();
  // console.log(jobResult.results);

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    

    jobResult.results.forEach((job) => {
      // console.log(job);
      if(job.latitude !== undefined) {
        // setMarkerArray([
        //   ...markerArray,
        //   new window.google.maps.Marker({position: job.location, map: map})
        // ])
        // console.log(job.title, job.latitude, job.longitude);
        new window.google.maps.Marker({position: {lat: job.latitude, lng: job.longitude}, map: map});
        // new window.google.maps.Marker({position: { lat: 47.6062, lng: -122.3321 } , map: map});
        // new window.google.maps.Marker({position: { lat: 47.6162, lng: -122.3021 } , map: map});
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(new window.google.maps.LatLng(job.latitude, job.longitude)
        );
      }

    // console.log('map called');
    });


  }, [jobResult]);



  return (
    <div ref={ref} id="map" />
  )
}
export default Map
