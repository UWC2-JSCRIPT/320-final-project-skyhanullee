function JobLink({ jobId }) {
  return (
    <a href={`https://adzuna.com/details/${jobId}`} className='job-link'>
      <button>Adzuna Ad Link: {jobId}</button>
    </a>
  )
}
export default JobLink
