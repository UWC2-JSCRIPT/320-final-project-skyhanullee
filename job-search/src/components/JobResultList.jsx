import React, { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server';
import JobResultContext from '../context/JobResultContext'
import MapContext from '../context/MapContext';
import JobCard from './JobCard';
import Marker from './Marker';
import MarkerCard from './MarkerCard';

function JobResultList() {
  const { jobResult , jobMarkerList, setJobMarkerList} = useContext(JobResultContext);
  const { map, bounds, infowindow } = useContext(MapContext);
  // const [jobMarkerList, setJobMarkerList] = useState([]);

  useEffect(() => {
    // setJobMarkerList([]);
    jobResult.results.forEach((job) => {
      if (job.latitude !== undefined && map !== undefined && bounds !== undefined) {
        const { marker } = Marker(job, map, bounds, infowindow);
        const tempJobMarker = {
          id: job.id,
          job: job,
          marker: marker,
        };
        setJobMarkerList(current => [...current, tempJobMarker]);
      }
    })
  }, [jobResult, bounds]);

  const jobResultList = jobMarkerList.map((jobMarker) => {
    const { job } = jobMarker;

    if (job.latitude === undefined) {
      console.log('job.latitude is undefined');
    }
    if (map === undefined) {
      console.log('map is undefined');
    }
    if (bounds === undefined) {
      console.log('bounds is undefined');
    }

    const currentJob = jobMarkerList.find(c => c.id === job.id);
    return (
      <li
        key={job.id}
        onClick={() => {
          if (currentJob !== undefined) {
            infowindow.setContent(renderToString(<MarkerCard job={job} />));
            infowindow.setPosition(currentJob.marker.position);
            infowindow.open({
              anchor: currentJob.marker,
              map,
            }, this);
          }
        }}
      >
        <JobCard job={job} />
      </li>
    )
  });

  return (
    <ul>{jobResultList}</ul>
  )
}

export default JobResultList
