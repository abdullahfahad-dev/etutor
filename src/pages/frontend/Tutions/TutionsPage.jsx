import { motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Loading } from "../../../components/utils/Loading";
import useSecureAxios from "../../../hook/useSecureAxios";
import { Link } from "react-router";

const TuitionsPage = () => {
    const [sortBy, setSortBy] = useState('newest');
    const [tuitionJobs, setTuitionJobs] = useState([]);
    const [locations, setLocations] = useState([]);
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const { secureAxios } = useSecureAxios();

    const [filters, setFilters] = useState({
        subject: '',
        location: 'All Divisions',
        classInfo: 'All Classes'
    });

    // Transform API response data
    const transformTuitionData = useCallback((data) => {
        const tuitions = data?.tuitions?.map((item) => ({
            id: item._id,
            title: item?.title,
            location: item?.location,
            class: item?.className,
            subjects: item?.subject?.split(',') || [],
            salary: item?.salary,
            days: item?.per_week,
            posted: item?.createdAt
        })) || [];

        const allLocations = [...new Set(data?.allTution?.map(item => item?.location))].map(location => ({ location }));
        const allClasses = [...new Set(data?.allTution?.map(item => item?.className))].map(className => ({ class: className }));
        const allSubjects = [...new Set(data?.allTution?.flatMap(item => item.subject?.split(',') || []))];

        return { tuitions, allLocations, allClasses, allSubjects };
    }, []);

    // Fetch tuitions data
    const fetchTuitions = useCallback(async (page = currentPage, sort = sortBy) => {
        try {
            const params = new URLSearchParams({
                location: filters.location,
                classInfo: filters.classInfo,
                subject: filters.subject,
                page: page.toString(),
                sortby: sort
            });

            const response = await secureAxios.get(`/api/tution/list?${params}`);
            
            if (response?.data?.success) {
                const { tuitions, allLocations, allClasses, allSubjects } = transformTuitionData(response.data.data);
                
                setTuitionJobs(tuitions);
                setLocations(allLocations);
                setClasses(allClasses);
                setSubjects(allSubjects);
                setTotalPages(response?.data?.meta?.totalPages || 1);
            }
        } catch (error) {
            console.error('Error fetching tuitions:', error);
        } finally {
            setLoading(false);
        }
    }, [filters, currentPage, sortBy, secureAxios, transformTuitionData]);

    useEffect(() => {
        setLoading(true);
        setCurrentPage(1);
        fetchTuitions(1, sortBy);
    }, [filters, sortBy]);





    // Handle filter changes
    const handleFilterChange = useCallback((filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters({
            subject: '',
            location: 'All Divisions',
            classInfo: 'All Classes'
        });
        setSortBy('newest');
    }, []);

    const handleChangePage = useCallback((page) => {
        setCurrentPage(page);
        fetchTuitions(page, sortBy);
    }, [fetchTuitions, sortBy]);

    const handleSortChange = useCallback((newSort) => {
        setSortBy(newSort);
        setCurrentPage(1);
        fetchTuitions(1, newSort);
    }, [fetchTuitions]);

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Available Tuitions</h1>
                    <p className="text-gray-500 mt-2">Browse and apply for the latest tuition jobs near you.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- Sidebar Filters --- */}
                    <div className="w-full lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-28">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg text-gray-800">Filters</h3>
                                <button
                                    onClick={resetFilters}
                                    className="text-sm cursor-pointer text-emerald-600 font-medium hover:underline"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Search */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Subjects</label>
                                <select
                                    value={filters.subject}
                                    onChange={(e) => handleFilterChange('subject', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-600"
                                >
                                    <option value="">All Subjects</option>
                                    {subjects?.map((subject, index) => (
                                        <option key={index} value={subject}>{subject}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Location Filter */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Location</label>
                                <select
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-600"
                                >
                                    <option value="All Divisions">All Divisions</option>
                                    {locations?.map((item, index) => (
                                        <option key={index} value={item?.location}>{item.location}</option>
                                    ))}
                                </select>
                            </div>


                            {/* Class Filter */}
                            <div className="mb-6">
                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Class / Grade</label>
                                <select
                                    value={filters.classInfo}
                                    onChange={(e) => handleFilterChange('classInfo', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-600"
                                >
                                    <option value="All Classes">All Classes</option>
                                    {classes?.map((item, index) => (
                                        <option key={index} value={item?.class}>{item?.class}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Info Tag */}
                            <div className="bg-emerald-50 text-emerald-700 text-xs p-3 rounded-lg text-center">
                                Showing {tuitionJobs.length} results based on your filters.
                            </div>
                        </div>
                    </div>

                    {/* --- Job Listings --- */}
                    <div className="w-full lg:w-3/4">

                        {/* Sort Bar */}
                        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <p className="text-sm text-gray-500"><span className="font-bold text-gray-800">{tuitionJobs.length}</span> Jobs Found</p>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="border-none text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer bg-transparent outline-none"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="salary-high-low">Salary: High to Low</option>
                                    <option value="salary-low-high">Salary: Low to High</option>
                                </select>
                            </div>
                        </div>

                        {/* Jobs Grid */}
                        <div className="space-y-4">
                            {tuitionJobs.length > 0 ? (
                                tuitionJobs.map((job) => (
                                    <motion.div
                                        key={job.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-lg transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            {/* Job Content */}
                                            <div className="grow">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                                                        {job.class}
                                                    </span>
                                                </div>

                                                <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                                                    {job.title}
                                                </h2>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-600 mb-4">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                        {job.location}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                                        <span className="font-bold text-emerald-600">{job.salary} BDT</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                        {job.days}
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.subjects.map(sub => (
                                                        <span key={sub} className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded border border-gray-100">
                                                            {sub}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Section */}
                                            <div className="flex flex-row md:flex-col justify-between items-end md:items-center min-w-[120px] gap-4 md:border-l md:border-gray-100 md:pl-6">
                                                <span className="text-xs text-gray-400 whitespace-nowrap bg-gray-50 px-2 py-1 rounded">
                                                    {job.posted}
                                                </span>
                                                <Link to={`/tutions/${job.id}`} className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white text-sm font-bold py-2 px-6 rounded-lg transition-all shadow-md shadow-emerald-100 hover:shadow-emerald-200 w-full md:w-auto">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-200">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">No Tuitions Found</h3>
                                    <p className="text-gray-500 text-sm mt-1">Try adjusting your filters to find more results.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="mt-4 text-emerald-600 font-bold hover:underline"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-12 gap-2">
                                {currentPage > 1 && (
                                    <button 
                                        onClick={() => handleChangePage(currentPage - 1)} 
                                        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                )}
                                
                                {Array.from({ length: totalPages }, (_, index) => {
                                    const pageNumber = index + 1;
                                    const isActive = currentPage === pageNumber;
                                    
                                    return (
                                        <button 
                                            key={pageNumber} 
                                            onClick={() => handleChangePage(pageNumber)} 
                                            className={`w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg font-bold border transition-colors ${
                                                isActive 
                                                    ? 'bg-emerald-600 text-white shadow-emerald-200 shadow-md' 
                                                    : 'border-gray-200 text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    );
                                })}
                                
                                {currentPage < totalPages && (
                                    <button 
                                        onClick={() => handleChangePage(currentPage + 1)} 
                                        className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TuitionsPage;