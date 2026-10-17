import { useEffect, useState } from "react";
import useSecureAxios from "../../../../../hook/useSecureAxios";
import { Loading } from "../../../../../components/utils/Loading";

const TuitionManagement = () => {
    const [tuitions, setTuitions] = useState([]);
    const [loading, setLoading] = useState(true)
    const { secureAxios } = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/admin/tution/all-tution-list').then(response => {
            if (response?.data?.success) {
                setTuitions(response?.data?.data?.map((item) => ({
                    id: item?._id,
                    title: item?.title,
                    postedBy: item?.user?.name,
                    date: item?.createdAt,
                    status: item?.status,
                    details: item?.description
                })))
            }
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [])


    const handleStatusChange = (id, newStatus) => {
        secureAxios.patch('/api/admin/tution/change-status',{
            status: newStatus,
            id: id
        }).then(response => {
            console.log(response)
        })
        setTuitions(tuitions.map(t => t.id === id ? { ...t, status: newStatus } : t));

    };

    if(loading) return <Loading />

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Tuition Post Moderation</h2>

            <div className="grid gap-4">
                {tuitions.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="grow">
                            <div className="flex items-center gap-3 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${job.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                    job.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {job.status}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">#{job.id}</span>
                                <span className="text-xs text-gray-400">• {job.date}</span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">Posted by: <span className="font-medium text-slate-700">{job.postedBy}</span></p>
                            <p className="text-sm text-gray-500 mt-2 italic">"{job.details}"</p>
                        </div>

                        <div className="flex gap-3">
                            {job.status === 'pending' && (
                                <>
                                    <button
                                        onClick={() => handleStatusChange(job.id, 'approved')}
                                        className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md transition-all flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(job.id, 'rejected')}
                                        className="bg-white cursor-pointer border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        Reject
                                    </button>
                                </>
                            )}
                            {job.status !== 'pending' && (
                                <button
                                    onClick={() => handleStatusChange(job.id, 'pending')}
                                    className="text-slate-400 cursor-pointer hover:text-slate-600 text-sm underline"
                                >
                                    Re-evaluate
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TuitionManagement;