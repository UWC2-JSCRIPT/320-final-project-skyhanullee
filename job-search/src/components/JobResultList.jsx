import React, { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router-dom';
import JobResultContext from '../context/JobResultContext'
import MapContext from '../context/MapContext';
import JobCard from './JobCard';
import Marker from './Marker';
import MarkerCard from './MarkerCard';

function addMarker(job, map, setMap, bounds, setBounds) {
  console.log('addMarker is called');
  const { latitude, longitude, id } = job;
  // const markerPosition = new window.google.maps.LatLng(latitude, longitude);
  const markerPosition = { lat: latitude, lng: longitude }
  const marker = new window.google.maps.Marker({
    id: id,
    position: markerPosition,
    map: map,
  });
  console.log(typeof (marker));
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

function JobResultList() {
  const { jobResult } = useContext(JobResultContext);
  const { map, setMap, bounds, setBounds } = useContext(MapContext);

  let tempBounds = new window.google.maps.LatLngBounds();
  const [markerList, setMarkerList] = useState([]);
  const [jobMarkerList, setJobMarkerList] = useState([]);
  const [markerInfowindow, setMarkerInfowindow] = useState();

  useEffect(() => {
    setJobMarkerList([]);
    jobResult.results.forEach((job) => {
      if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
        // console.log(job);
        // addMarker(job, map, setMap, bounds, setBounds);
        let tempMarker = Marker(job, map, bounds, setMarkerInfowindow);
        setMarkerList([...markerList, tempMarker]);

        let tempJobMarker = {
          id: job.id,
          job: job,
          marker: tempMarker,
          infowindow: markerInfowindow
        };
        setJobMarkerList(current => [...current, tempJobMarker]);
        // console.log(tempJobMarker);
      }
    })
  }, [jobResult, bounds, setJobMarkerList]);

  // jobMarkerList.forEach((jobMarker) => {
  //   console.log(jobMarker);
  // })

  // const jobResultList = jobResult.results.map((job) => {
  const jobResultList = jobMarkerList.map((jobMarker) => {
    const { job } = jobMarker;
    // console.log(job);
    // jobResult.results.forEach((job) => {
    // console.log(job.latitude);
    // if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
    //   addMarker(job, map, bounds);
    // }
    if (job.latitude === undefined) {
      console.log('job.latitude is undefined');
      // return
    }
    if (map === undefined) {
      console.log('map is undefined');
      // return
    }
    if (bounds === undefined) {
      console.log('bounds is undefined');
      // return
    }
    // if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
    //   // addMarker(job, map, setMap, bounds, setBounds);
    //   let tempMarker = Marker(job, map, setMap, bounds, setBounds);
    //   // console.log(typeof(tempMarker));
    //   setMarkerList([...markerList, tempMarker]);
    // }

    return (
      <li key={job.id} onClick={() => {
        console.log('job result list onclick');
        const checkJobId = jobMarkerList.find(j => j.id === job.id);
          console.log(checkJobId);
        if (checkJobId !== undefined) {
          checkJobId.infowindow.open({
            anchor: checkJobId.marker,
            map,
          })
        }
      }
      }>
        {/* <Link to={`/job/${job.id}`} state={{ data: { job } }}> */}
        <JobCard job={job} />
        {/* </Link> */}
      </li>
    )
  });


  // console.log(markerList)

  // const jobResultList = jobResult.results.map((job) => {
  //   return (
  //     <li key={job.id} onClick={() => {
  //         console.log('job result list onclick');
  //       }
  //     }>
  //       {/* <Link to={`/job/${job.id}`} state={{ data: { job } }}> */}
  //         <JobCard job={job} />
  //       {/* </Link> */}
  //     </li>
  //   )
  // });
  return (
    <ul>{jobResultList}</ul>
  )
}

export default JobResultList
