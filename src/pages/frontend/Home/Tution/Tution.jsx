import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../../../../components/utils/Loading";
import useSecureAxios from "../../../../hook/useSecureAxios";
export function Tution() {
    const [latestTuitions, setLatestTutions] = useState([])
    const [loading, setLoading] = useState(true)
    const { secureAxios } = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/home/tutions').then(response => {
            console.log(response)
            if (response?.data?.success) {
                setLatestTutions(response?.data?.data?.map(item => ({
                    id: item?._id,
                    subject: item?.subject,
                    class: item?.className,
                    location: item?.location,
                    salary: item?.salary,
                    days: item?.per_week
                })))
                setLoading(false)
            }
        })
    }, [])

    if (loading) return <Loading />
    return (
        <div>
            <div className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">

                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-100/50 rounded-full">
                            Recent Opportunities
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Latest Tuition Jobs
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Browse the most recent tuition opportunities posted by parents and students.
                            Apply now to start teaching.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {latestTuitions.map((job) => (
                            <motion.div
                                key={job.id}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 flex flex-col group"
                            >

                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        {job.subject}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-1">{job.class}</h3>
                                <p className="text-sm text-gray-500 mb-4">{job.medium}</p>


                                <div className="space-y-3 mb-6 grow">
                                    <div className="flex items-center text-sm text-gray-600 gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span className="truncate">{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span className="font-bold text-emerald-600">{job.salary}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 gap-3">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        <span>{job.days}</span>
                                    </div>
                                </div>


                                <Link to={`/tutions/${job.id}`} className="w-full justify-center grid cursor-pointer py-2.5 rounded-lg border border-emerald-600 text-emerald-600 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                                    View Details
                                </Link>
                            </motion.div>
                        ))}
                    </div>


                    <div className="text-center mt-12">
                        <Link to={'/tutions'} className="px-8 py-3 cursor-pointer bg-white text-slate-700 w-max font-bold rounded-xl border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                            View All Jobs
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
