import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RAJob from "./RAJob";

const ViewRAJobs: React.FC = () => {
  const [jobs, setJobs] = useState<RAJob[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE = "http://localhost:8080";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("${BASE}/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading RA jobs...</p>;
  }

  return (
    <div>
      <h2>All RA Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {jobs.map((job) => (
            <li
              key={job.id}
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3>
                <Link to={`/view/${job.id}`}>{job.title}</Link>
              </h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Status:</strong> {job.status}</p>
              {job.time && (
                <p>
                  <strong>Update Time:</strong>{" "}
                  {new Date(job.time as unknown as Date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewRAJobs;
