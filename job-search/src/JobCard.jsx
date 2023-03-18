function JobCard({ job }) {
  const { title, location, company, salary_min, created, id } = job
  const dateCreated = new Date(created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const salary = salary_min.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <div className='job-card' id={`job-${id}`}>
      <h2 className='job-title'>{title}</h2>
      <hr/>
      <div className='job-details'>
        <h3>Location:</h3>
        <p>{location.display_name}</p>
        <h3>Company:</h3>
        <p>{company.display_name}</p>
        <h3>Salary:</h3>
        <p>{salary}</p>
        <h3>Date Created: </h3>
        <p>{dateCreated}</p>
      </div>
    </div>
  )
}
export default JobCard
