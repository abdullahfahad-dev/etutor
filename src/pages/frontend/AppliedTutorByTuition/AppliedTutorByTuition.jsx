import { useEffect, useState } from "react";
import useSecureAxios from "../../../hook/useSecureAxios";
import { useParams } from "react-router";
import PlaceholderImage from './../../../assets/placeholder.png'

const AppliedTutorByTuition = () => {
    const { id } = useParams();
    const [applications, setApplications] = useState([])
    const { secureAxios } = useSecureAxios();

    useEffect(() => {
        secureAxios.get(`/api/student/applied-tutors-by-tuition/${id}`).then(response => {
            if (response?.data?.success) {
                setApplications(response?.data?.data?.map((item) => ({
                    id: item?.user?._id,
                    tutorName: item?.user?.name,
                    date: item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-BD') : null,
                    status: item?.status,
                    img: item?.image || PlaceholderImage
                })))
            }
        })
    }, [])

    

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Applied Tutors</h2>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                            <th className="p-4 font-semibold">Tutor Profile</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4 flex items-center gap-3">
                                    <img src={app.img} alt="" className="w-8 h-8 rounded-full bg-gray-100" />
                                    <span className="font-medium text-gray-800">{app.tutorName}</span>
                                </td>
                                <td className="p-4 text-gray-500">{app.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'Shortlisted' ? 'bg-blue-50 text-blue-600' :
                                            app.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                                        }`}>{app.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliedTutorByTuition;