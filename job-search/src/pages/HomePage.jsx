import { useState, useEffect, useContext } from 'react';
import JobForm from '../components/JobForm';
import JobResultContext from '../context/JobResultContext';
import JobResultList from '../components/JobResultList';
import Map from '../components/Map';

function HomePage() {
  const [searchTerms, setSearchTerms] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const resultsPerPage = 5;


  const onFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerms(event.target[0].value);
    setSearchLocation(event.target[1].value);
    // setResultsPerPage(event.target[2].value);
  }
  const ADZUNA_API_ID = process.env.REACT_APP_ADZUNA_APP_ID;
  const ADZUNA_API_KEY = process.env.REACT_APP_ADZUNA_APP_KEY;

  const { jobResult, setJobResult } = useContext(JobResultContext);

  // const [jobResult, setJobResult] = useState();

  const [loading, toggleLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`)
      .then(response => response.json())
      .then(
        (data) => {
          // console.log(`https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${ADZUNA_API_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=${resultsPerPage}&what=${searchTerms}&where=${searchLocation}`);
          setJobResult(data);
          toggleLoading(false);
        },
        (error) => {
          toggleLoading(false);
          setHasError(true);
        }
      )
  }, [searchTerms, searchLocation])

  if (loading) {
    return <h1>loading...</h1>
  }

  if (hasError) {
    return <h1>Error</h1>
  }

  return (
    <section className='main-container'>
      <section className='map-container'>
        <Map 
          // jobResult={jobResult}
        />
      </section>
      <section className='job-app-container'>
        <JobForm
          onFormSubmit={onFormSubmit}
          setSearchTerms={setSearchTerms}
          setSearchLocation={setSearchLocation}
        />

        <section className='job-card-container'>
          <JobResultList />
        </section>
      </section>
    </section>
  );
}

export default HomePage
