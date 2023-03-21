import React, { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router-dom';
import JobResultContext from '../context/JobResultContext'
import MapContext from '../context/MapContext';
import JobCard from './JobCard';
import Marker from './Marker';
import MarkerCard from './MarkerCard';

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
    }
    if (map === undefined) {
      console.log('map is undefined');
    }
    if (bounds === undefined) {
      console.log('bounds is undefined');
    }

    const findJobId = jobMarkerList.find(j => j.id === job.id);


    return (
      <li key={job.id} onClick={() => {
        console.log('job result list onclick');
        // const checkJobId = jobMarkerList.find(j => j.id === job.id);
          // console.log(checkJobId);
        if (findJobId !== undefined) {
          findJobId.infowindow.open({
            anchor: findJobId.marker,
            map,
          })
        }
      }
      }>
        <JobCard job={job} />
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
