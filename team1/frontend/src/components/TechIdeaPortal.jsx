import React, { useState, useEffect } from 'react';
import { getTechIdeas, submitTechIdea, deleteTechIdea } from '../services/techIdeaApi';

const TechIdeaPortal = () => {
    const [userName, setUserName] = useState('');
    const [techDescription, setTechDescription] = useState('');
    const [techIdeas, setTechIdeas] = useState([]);
    const [showTechIdeas, setShowTechIdeas] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (showTechIdeas) {
            fetchTechIdeas();
        }
    }, [showTechIdeas]);

    const fetchTechIdeas = async () => {
        try {
            setLoading(true);
            const fetchedTechIdeas = await getTechIdeas();
            setTechIdeas(fetchedTechIdeas);
            setError(null);
        } catch (err) {
            setError('Failed to fetch tech ideas. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!userName.trim() || !techDescription.trim()) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const newTechIdea = {
                userName: userName.trim(),
                techDescription: techDescription.trim()
            };

            await submitTechIdea(newTechIdea);
            
            // Clear input fields
            setUserName('');
            setTechDescription('');
            setError(null);
            
            // Refresh tech ideas list if it's being shown
            if (showTechIdeas) {
                fetchTechIdeas();
            }
        } catch (err) {
            setError('Failed to submit tech idea. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleShowTechIdeas = async () => {
        setShowTechIdeas(true);
        await fetchTechIdeas();
    };

    const handleDeleteTechIdea = async (id) => {
        try {
            setLoading(true);
            await deleteTechIdea(id);
            // Refresh the tech ideas list after deletion
            fetchTechIdeas();
            setError(null);
        } catch (err) {
            setError('Failed to delete tech idea. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Tech Idea Submission Portal</h1>

            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="userName" className="block mb-2 font-medium">
                    Tech Idea
                </label>
                <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="techDescription" className="block mb-2 font-medium">
                    Tech Description
                </label>
                <textarea
                    id="techDescription"
                    value={techDescription}
                    onChange={(e) => setTechDescription(e.target.value)}
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
                    {loading ? 'Submitting...' : 'Submit Tech Idea'}
                </button>

                <button
                    onClick={handleShowTechIdeas}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:bg-gray-300"
                    disabled={loading}
                >
                    Show Available Tech Ideas
                </button>
            </div>

            {showTechIdeas && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold mb-3">Available Tech Ideas</h2>
                    {loading ? (
                        <p>Loading tech ideas...</p>
                    ) : techIdeas.length === 0 ? (
                        <p>No tech ideas have been submitted yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {techIdeas.map((idea) => (
                                <div key={idea.id} className="p-4 border rounded bg-gray-50 flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold">{idea.userName}</h3>
                                        <p className="mt-2">{idea.techDescription}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteTechIdea(idea.id)}
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

export default TechIdeaPortal;