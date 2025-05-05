import React, { useState, useEffect } from 'react';
import { getTechIdeas, submitTechIdea, deleteTechIdea, getTechTypes, getFilteredTechIdeas } from '../services/techIdeaApi';

const TechIdeaPortal = () => {
    const [userName, setUserName] = useState('');
    const [techDescription, setTechDescription] = useState('');
    const [techType, setTechType] = useState('');
    const [minBudget, setMinBudget] = useState('');
    const [maxBudget, setMaxBudget] = useState('');
    const [techIdeas, setTechIdeas] = useState([]);
    const [techTypes, setTechTypes] = useState([]);
    const [showTechIdeas, setShowTechIdeas] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Filter states
    const [filterTechType, setFilterTechType] = useState('');
    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
    const [filterMinBudget, setFilterMinBudget] = useState('');
    const [filterMaxBudget, setFilterMaxBudget] = useState('');

    useEffect(() => {
        loadTechTypes();
    }, []);

    useEffect(() => {
        if (showTechIdeas) {
            fetchTechIdeas();
        }
    }, [showTechIdeas]);

    const loadTechTypes = async () => {
        try {
            console.log('Fetching tech types...');
            const types = await getTechTypes();
            console.log('Received tech types:', types);
            if (!Array.isArray(types)) {
                console.error('Received invalid tech types format:', types);
                setError('Failed to load tech types: Invalid format');
                return;
            }
            if (types.length === 0) {
                console.warn('Received empty tech types array');
            }
            setTechTypes(types);
        } catch (err) {
            console.error('Error loading tech types:', err);
            setError('Failed to load tech types: ' + err.message);
        }
    };

    const fetchTechIdeas = async () => {
        try {
            setLoading(true);
            const filters = {
                techType: filterTechType || null,
                startDate: filterStartDate ? new Date(filterStartDate) : null,
                endDate: filterEndDate ? new Date(filterEndDate) : null,
                minBudget: filterMinBudget || null,
                maxBudget: filterMaxBudget || null
            };
            const fetchedTechIdeas = await getFilteredTechIdeas(filters);
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
        if (!userName.trim() || !techDescription.trim() || !techType || !minBudget || !maxBudget) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            const newTechIdea = {
                userName: userName.trim(),
                techDescription: techDescription.trim(),
                techType: techType,
                minBudget: parseFloat(minBudget),
                maxBudget: parseFloat(maxBudget)
            };

            await submitTechIdea(newTechIdea);
            
            // Clear input fields
            setUserName('');
            setTechDescription('');
            setTechType('');
            setMinBudget('');
            setMaxBudget('');
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

    const handleFilter = () => {
        fetchTechIdeas();
    };

    const handleClearFilters = () => {
        setFilterTechType('');
        setFilterStartDate('');
        setFilterEndDate('');
        setFilterMinBudget('');
        setFilterMaxBudget('');
        fetchTechIdeas();
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
                    User Name
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
                <label htmlFor="techType" className="block mb-2 font-medium">
                    Tech Type
                </label>
                <select
                    id="techType"
                    value={techType}
                    onChange={(e) => setTechType(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    <option value="">Select a tech type</option>
                    {techTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.replace(/_/g, ' ')}
                        </option>
                    ))}
                </select>
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

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="minBudget" className="block mb-2 font-medium">
                        Minimum Budget ($)
                    </label>
                    <input
                        type="number"
                        id="minBudget"
                        value={minBudget}
                        onChange={(e) => setMinBudget(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="maxBudget" className="block mb-2 font-medium">
                        Maximum Budget ($)
                    </label>
                    <input
                        type="number"
                        id="maxBudget"
                        value={maxBudget}
                        onChange={(e) => setMaxBudget(e.target.value)}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                        min="0"
                    />
                </div>
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
                <>
                    <div className="mb-6 p-4 border rounded">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Tech Type</label>
                                <select
                                    value={filterTechType}
                                    onChange={(e) => setFilterTechType(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                >
                                    <option value="">All Types</option>
                                    {techTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type.replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Date Range</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="date"
                                        value={filterStartDate}
                                        onChange={(e) => setFilterStartDate(e.target.value)}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                    <input
                                        type="date"
                                        value={filterEndDate}
                                        onChange={(e) => setFilterEndDate(e.target.value)}
                                        className="w-full px-3 py-2 border rounded"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2">Min Budget ($)</label>
                                <input
                                    type="number"
                                    value={filterMinBudget}
                                    onChange={(e) => setFilterMinBudget(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Max Budget ($)</label>
                                <input
                                    type="number"
                                    value={filterMaxBudget}
                                    onChange={(e) => setFilterMaxBudget(e.target.value)}
                                    className="w-full px-3 py-2 border rounded"
                                    min="0"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={handleFilter}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                disabled={loading}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

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
                                            <p className="mt-1 text-sm text-gray-600">
                                                Type: {idea.techType.replace(/_/g, ' ')}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Budget: ${idea.minBudget} - ${idea.maxBudget}
                                            </p>
                                            <p className="mt-2">{idea.techDescription}</p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Posted: {new Date(idea.datePosted).toLocaleDateString()}
                                            </p>
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
                </>
            )}
        </div>
    );
};

export default TechIdeaPortal;