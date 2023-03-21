function JobLink({ jobId }) {
  return (
    <a href={`https://adzuna.com/details/${jobId}`} id='job-link'>
      {/* <button>Adzuna Ad Link: {jobId}</button> */}
      <button>Link to Adzuna Page</button>
    </a>
  )
}
export default JobLink
