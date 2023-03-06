import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobCard from './JobCard';
import MapPage from './MapPage';
// import jsonData from './data.json';

function HomePage() {
  const [searchTerms, setSearchTerms] = useState('react');
  const [searchLocation, setSearchLocation] = useState('seattle');
  // const [resultsPerPage, setResultsPerPage] = useState(4);
  const resultsPerPage = 3;

  // const [markerCoordinateArray, setMarkerCoordinateArray] = useState([]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(event.target[0].value);
    setSearchLocation(event.target[1].value);
    // setResultsPerPage(event.target[2].value);
  }
  const ADZUNA_API_ID = process.env.REACT_APP_ADZUNA_APP_ID;
  const ADZUNA_API_KEY = process.env.REACT_APP_ADZUNA_APP_KEY;

  const [jobResult, setJobResult] = useState();
  const [listOfJobs, setListOfJobs] = useState([]);

  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // const updateListOfJobs = (jobList) => {
  //   let tempArray = [];
  //   jobList.results.forEach((job) => {
  //     tempArray.push({
  //       id: job.id,
  //       job: job,
  //       location: { lat: job.latitude, lng: job.longitude }
  //     });
  //   });
  //   setListOfJobs(...listOfJobs, tempArray);
  //   // console.log(listOfJobs);
  // };

  useEffect(() => {
    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`)
      .then(response => response.json())
      .then(
        (data) => {
          console.log(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`);
          setJobResult(data);
          toggleLoading(false);
          // data.results.forEach(job => {
          //   console.log(job.latitude, job.longitude);
          //   setMarkerCoordinateArray([...markerCoordinateArray, {lat: job.latitude, lng: job.longitude}]);
          // });
          // updateListOfJobs(data);
              let tempArray = [];
              data.results.forEach((job) => {
                tempArray.push({
                  id: job.id,
                  job: job,
                  location: { lat: parseFloat(job.latitude), lng: parseFloat(job.longitude) }
                });
              });
              setListOfJobs(...listOfJobs, tempArray);
              // console.log(listOfJobs);

          // console.log(data);
        },
        (error) => {
          toggleLoading(false);
          setHasError(true);
        }
      )
  }, [searchTerms, searchLocation])

  if (loading) {
    return <p>loading...</p>
  }

  if (hasError) {
    return <p>Error</p>
  }
  
  const jobResultList = jobResult.results.map((job) => {
    // console.log(job.id);
    return (
      <li key={job.id}>
        <Link to={`/job/${job.id}`} state={{ data: { job } }}>
          <JobCard job={job} />
        </Link>
      </li>
    )
  });

  // const printListOfJobs = () => {
  //   console.log('printing list of jobs:');
  //   console.log(listOfJobs);
  //   console.log(typeof(listOfJobs));
  // }

  // printListOfJobs();

  return (
    <section className='main-container'>
      <section className='map-container'>
        {/* <MapPage markerCoordinateArray={markerCoordinateArray} /> */}
        <MapPage alteredListOfJobs={listOfJobs} />
      </section>
      <section className='job-app-container'>
        <JobForm
          onFormSubmit={onFormSubmit}
          setSearchTerms={setSearchTerms}
          setSearchLocation={setSearchLocation}
        // setResultsPerPage={setResultsPerPage}
        />
        {/* <h1>Showing results for: {searchTerms}</h1> */}
        <section className='job-card-container'>
          <ul>
            {jobResultList}
          </ul>
        </section>
      </section>
    </section>
  );
}

export default HomePage
