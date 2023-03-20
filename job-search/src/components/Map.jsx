import { useRef, useEffect, useState, useContext } from "react";
// import { renderToString } from 'react-dom/server';
import JobResultContext from '../context/JobResultContext';
import MapContext from "../context/MapContext";
// import Marker from "./Marker";
// import MarkerCard from "./MarkerCard";

function Map() {
  const ref = useRef();
  // console.log(jobResult.results);
  const { jobResult } = useContext(JobResultContext);
  const { map, setMap, setBounds } = useContext(MapContext);

  // // to set up map bounds when showing on screen
  let bounds = new window.google.maps.LatLngBounds();

  const center = {lat: jobResult.results[0].latitude, lng: jobResult.results[0].longitude};
  const zoom = 10;

  useEffect(() => {
    // let map = new window.google.maps.Map(ref.current, {center, zoom});
    setMap(new window.google.maps.Map(ref.current, {center, zoom}));
    console.log('marker useeffect called in Map.jsx');
    jobResult.results.forEach((job)   => {
    // // jobResult.results.map((job) => {
    //   // console.log(job);
      if(job.latitude !== undefined && map !== undefined) {
    //     addMarker(job, map, bounds);
        const jobLatLng = new window.google.maps.LatLng(job.latitude, job.longitude);
        bounds.extend(jobLatLng);
        map.fitBounds(bounds);
        setBounds(bounds);
    //     // return (<Marker job={job} />);
      }
    //   // return (console.log('job does not have latitude'));
    });
    console.log('map called');

  }, [jobResult]);

  // useEffect(() => {
  //   jobResult.results.forEach((job) => {
  //     // console.log(job.latitude);
  //     // if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
  //     //   addMarker(job, map, bounds);
  //     // }
  //     if (job.latitude === undefined) {
  //       console.log('job.latitude is undefined');
  //       return
  //     }
  //     if (map === undefined) {
  //       console.log('map is undefined');
  //       return
  //     }
  //     if (bounds === undefined) {
  //       console.log('bounds is undefined');
  //       return
  //     }
  //     addMarker(job, map, bounds);
  //   });
  // },[jobResult.results, map])

  // jobResult.results.forEach((job) => {
  //   // console.log(job.latitude);
  //   if(job.latitude !== undefined && map !== undefined) {
  //     addMarker(job, map, setMap);
  //   }
  // });

  return (
    <div ref={ref} id="map" />
  )
}
export default Map
