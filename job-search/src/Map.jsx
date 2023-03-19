import { useRef, useEffect, useState, useContext } from "react";
import { renderToString } from 'react-dom/server';
import JobResultContext from "./JobResultContext";
import Marker from "./Marker";
import MarkerCard from "./MarkerCard";

function addMarker(job, map, bounds) {
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

  const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
  bounds.extend(jobLatLng);
  map.fitBounds(bounds);
}

function Map({ center, zoom }) {
  const ref = useRef();
  // console.log(jobResult.results);
  const { jobResult } = useContext(JobResultContext);


  // to set up map bounds when showing on screen
  let bounds = new window.google.maps.LatLngBounds();

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {center, zoom});
    console.log('marker useeffect called in Map.jsx');

    jobResult.results.forEach((job) => {
    // jobResult.results.map((job) => {
      // console.log(job);
      if(job.latitude !== undefined) {
        addMarker(job, map, bounds);
        // const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
        // bounds.extend(jobLatLng);
        // map.fitBounds(bounds);
        // return (<Marker job={job} map={map} />);
      }
      // return (console.log('job does not have latitude'));
    });
    console.log('map called');


  }, [jobResult]);



  return (
    <div ref={ref} id="map" />
  )
}
export default Map
