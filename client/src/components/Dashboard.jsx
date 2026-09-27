


function Dashboard({applications}) {
  const total = applications.length;

  const applied = applications.filter(app => app.status === 'APPLIED').length;
  const interviewing = applications.filter(app => app.status === 'INTERVIEWING').length;
  const offered = applications.filter(app => app.status === 'OFFERED').length;
  const rejected = applications.filter(app => app.status === 'REJECTED').length;

  return (
    <section>
      <h2>Dashboard</h2>
      <p>Total Applications: {total}</p>
      <p>Applied: {applied}</p>
      <p>Interviewing: {interviewing}</p>
      <p>Offered: {offered}</p>
      <p>Rejected: {rejected}</p>
    </section>
  );
}

export default Dashboard;
