import React, { useState, useEffect } from 'react';
import { getJobs, submitJob, deleteJob } from '../services/jobApi';

const JobPortal = () => {
    const [companyName, setCompanyName] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobs, setJobs] = useState([]);
    const [showJobs, setShowJobs] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showJobs) {
            fetchJobs();
        }
    }, [showJobs]);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const fetchedJobs = await getJobs();
            setJobs(fetchedJobs);
            setError(null);
        } catch (err) {
            setError('Failed to fetch jobs. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!companyName.trim() || !jobDescription.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const newJob = {
                companyName: companyName.trim(),
                jobDescription: jobDescription.trim()
            };

            await submitJob(newJob);
            
            // Clear input fields
            setCompanyName('');
            setJobDescription('');
            setError(null);
            
            // Refresh jobs list if it's being shown
            if (showJobs) {
                fetchJobs();
            }
        } catch (err) {
            setError('Failed to submit job. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleShowJobs = () => {
        setShowJobs(true);
    };

    const handleDeleteJob = async (id) => {
        try {
            setLoading(true);
            await deleteJob(id);
            // Refresh the jobs list after deletion
            fetchJobs();
            setError(null);
        } catch (err) {
            setError('Failed to delete job. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Job Submission Portal</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="companyName" className="block mb-2 font-medium">
                    Company Name
                </label>
                <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="jobDescription" className="block mb-2 font-medium">
                    Job Description
                </label>
                <textarea
                    id="jobDescription"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    disabled={loading}
                />
            </div>

            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Job'}
                </button>

                <button
                    onClick={handleShowJobs}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-300"
                    disabled={loading}
                >
                    Show Available Jobs
                </button>
            </div>

            {showJobs && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-3">Available Jobs</h2>
                    {loading ? (
                        <p>Loading jobs...</p>
                    ) : jobs.length === 0 ? (
                        <p>No jobs have been submitted yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="p-4 border rounded bg-gray-50 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold">{job.companyName}</h3>
                                        <p className="mt-2">{job.jobDescription}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteJob(job.id)}
                                        className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300"
                                        disabled={loading}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobPortal;