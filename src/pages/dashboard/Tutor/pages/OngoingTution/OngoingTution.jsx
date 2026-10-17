import { useEffect, useState } from "react";
import { Loading } from "../../../../../components/utils/Loading";
import useSecureAxios from "../../../../../hook/useSecureAxios";

const OngoingTuition = () => {
    const [ongoing, setonGoings] = useState([])
    const [loading, setLoading] = useState(true)
    const {secureAxios} = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/tutor/ongoing').then(response => {
            console.log(response)
            setLoading(false)
            setonGoings(response?.data?.data?.map(item => ({
                id: item?.tutions?._id,
                title: item?.tutions?.className,
                schedule: item?.tutions?.per_week
            })))
        })
    },[])

    if(loading) return <Loading />

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Ongoing Tuitions</h2>
            <div className="grid gap-4">
                {ongoing.map(item => (
                    <div key={item.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 flex-shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded font-bold">Active</span>
                                </div>
                                <p className="text-gray-500 text-sm">Schedule: {item.schedule}</p>
                            </div>
                        </div>
                        {/* <div className="text-right w-full md:w-auto">
                            <p className="text-xs text-gray-400 mb-2">Started: {item.started}</p>
                            <button className="px-4 py-2 border border-gray-200 text-gray-600 font-bold rounded-lg text-sm hover:bg-gray-50 transition-colors w-full md:w-auto">
                                View Details
                            </button>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OngoingTuition;