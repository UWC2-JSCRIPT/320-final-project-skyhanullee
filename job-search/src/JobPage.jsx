import { useLocation, useParams } from 'react-router-dom';

function JobPage() {
  const { jobId } = useParams();
  const dataLocation = useLocation();

  const jobObject = dataLocation.state?.data;

  const { title, location, company, created, salary_min, description } = jobObject.job
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salary = salary_min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className='job-page'>
      <h1 className='job-title'>{title}</h1>
      <div className='job-details'>
        <h2 id='job-location'>Location: {location.display_name}</h2>
        <h2 id='job-company'>Company: {company.display_name}</h2>
        <h2 id='job-date'>Date Created: {dateCreated}</h2>
        <h2 id='job-salary'>Salary: {salary}</h2>
      </div>
      <div id='job-description'>
        <h2>Description:</h2>
        <p>{description}</p>
      </div>
      <a href={`https://adzuna.com/details/${jobId}`} className='job-link'>
        <button>Adzuna Ad Link: {jobId}</button>
      </a>
    </div>
  )
}
export default JobPage
