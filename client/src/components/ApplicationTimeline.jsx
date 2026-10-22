function ApplicationTimeline({ application }) {
  if (!application) {
    return null
  }

  return (  
    <section>
      <h2>Application Timeline</h2>

      <ol>
        {application.created_at && (
          <li>
            Added to tracker:
            <time dateTime={application.created_at}>
              {new Date(application.created_at).toLocaleDateString()}
            </time>
          </li>
        )}

        {application.applied_date && (
          <li>
            Applied:{' '}
            <time dateTime={application.applied_date}>
              {new Date(application.applied_date).toLocaleDateString()}
            </time>
          </li>
        )}

        <li>Current status: {application.status}</li>

        {application.follow_up_date && (
          <li>
            Follow up:{' '}
            <time dateTime={application.follow_up_date}>
              {new Date(application.follow_up_date).toLocaleDateString()}
            </time>
          </li>
        )}
      </ol>
    </section>
  )
}

export default ApplicationTimeline