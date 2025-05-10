import { JSX, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RAJob } from "../models";
import { getJobs } from "../services";

export default function ViewRAJobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<RAJob[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(function (): void {
        getJobs()
            .then(function (res: RAJob[]): void {
                setJobs(res);
            })
            .catch(function (err: any): void {
                console.error("Error fetching jobs:", err);
            })
            .finally(function (): void {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <p>Loading RA jobs...</p>
            </div>
        );
    }

    function getStatusColor(status: "OPEN" | "CLOSED"): "text-success" | "text-danger" {
        if (status === "OPEN") {
            return "text-success";
        }
        else if (status === "CLOSED") {
            return "text-danger";
        }
        else {
            throw new Error("Invalid status");
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">All RA Jobs</h2>

            {jobs.length === 0 ? (
                <p className="text-center">No jobs found.</p>
            ) : (
                <div className="row gy-4">
                    {jobs.map(function (job: RAJob): JSX.Element {
                        return (
                            <div key={job.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">
                                            <Link to={`/view/${job.id}`} className="text-decoration-none">
                                                {job.title}
                                            </Link>
                                        </h5>

                                        <p className="card-text">
                                            <strong>Description:</strong> {job.description}
                                        </p>

                                        <p className={"card-text"}>
                                            <strong>Status:</strong>
                                            <span className={`${getStatusColor(job.status)}`}> {job.status}</span>
                                        </p>

                                        {job.time && (
                                            <p className="card-text mt-auto">
                                                <strong>Update Time:</strong>{" "}
                                                {new Date(job.time as unknown as Date).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
