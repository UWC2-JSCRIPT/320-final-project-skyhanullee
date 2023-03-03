import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobCard from './JobCard';
// import jsonData from './data.json';

function HomePage() {
  const [searchTerms, setSearchTerms] = useState('react');
  const [location, setLocation] = useState('');
  const [resultsPerPage, setResultsPerPage] = useState(4);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(event.target[0].value);
    setLocation(event.target[1].value);
    setResultsPerPage(event.target[2].value);
  }

  const [jobResult, setJobResult] = useState(undefined);
  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const API_ID = process.env.REACT_APP_ID;
  const API_KEY = process.env.REACT_APP_KEY;

  useEffect(() => {
    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${API_ID}&app_key=${API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${location}`)
      .then(response => response.json())
      .then(
        (data) => {
          // console.log(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${API_ID}&app_key=${API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${location}`);
          setJobResult(data);
          toggleLoading(false);
        },
        (error) => {
          toggleLoading(false);
          setHasError(true);
        }
      )
  }, [resultsPerPage, searchTerms, location, API_ID, API_KEY])

  if (loading) {
    return <p>loading...</p>
  }

  if (hasError) {
    return <p>Error</p>
  }

  const jobResultList = jobResult.results.map((job) => {
    return (
      <li key={job.id}>
        <Link to={`/job/${job.id}`} state={{ data: { job } }}>
          <JobCard
            job={job}
          />
        </Link>
      </li>
    )
  });

  return (
    <div>
      <section className='job-app-container'>
        <JobForm
          onFormSubmit={onFormSubmit}
          setSearchTerms={setSearchTerms}
          setLocation={setLocation}
          setResultsPerPage={setResultsPerPage}
        />
        <h1>Showing results for: {searchTerms}</h1>
        <section className='job-card-container'>
          <ul>
            {jobResultList}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default HomePage
