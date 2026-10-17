import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useSecureAxios from "../../../../../hook/useSecureAxios";
import PlaceholderImage from './../../../../../assets/placeholder.png'
import Swal from "sweetalert2";
const AppliedTutors = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const [applications, setApplications] = useState([])
    const { secureAxios } = useSecureAxios();

    useEffect(() => {
        secureAxios.get(`/api/student/applied-tutors`).then(response => {
            if (response?.data?.success) {
                setApplications(response?.data?.data?.map(item => ({
                    id: item._id,
                    tuition_id: item?.tuitionsId,
                    tutorName: item?.name,
                    date: item?.date ? new Date(item.date).toLocaleDateString('en-BD') : null,
                    img: item?.image || PlaceholderImage,
                    status: item?.status
                })))
            }
        })
    }, [])

    const handlePayment = (id) => {
        secureAxios.get(`/api/student/payment/${id}`).then(response => {
            if (response?.data?.success) {
                window.location.href = response?.data?.url
            }
        })
    }

    const handleReject = (id) => {
        secureAxios.get(`/api/student/tutor/reject/${id}`).then(response => {
            if (response?.data?.success) {
                Swal.fire('Success', response?.data?.message, 'success')

                secureAxios.get(`/api/student/applied-tutors`).then(response => {
                    if (response?.data?.success) {
                        setApplications(response?.data?.data?.map(item => ({
                            id: item._id,
                            tuition_id: item?.tuitionsId,
                            tutorName: item?.name,
                            date: item?.date ? new Date(item.date).toLocaleDateString('en-BD') : null,
                            img: item?.image || PlaceholderImage,
                            status: item?.status
                        })))
                    }
                })
            }
        })
    }

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
                            <th className="p-4 font-semibold">Action</th>
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
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'completed' ? 'bg-blue-50 text-blue-600' :
                                        app.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-yellow-50 text-yellow-600'
                                        }`}>{app.status}</span>
                                </td>
                                <td className="p-4 text-gray-500 flex gap-2">
                                    {
                                        app.status == 'completed' && <span className={`px-2 py-1 rounded text-xs font-bold bg-blue-50 text-blue-600'
                                            }`}>Paid</span>
                                    }
                                    {
                                        app.status === 'pending' && <button onClick={() => handlePayment(app.tuition_id)} className="bg-emerald-600 w-max cursor-pointer hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-1" href="/user/student/post-new-tution" data-discover="true">Pay Now</button>
                                    }
                                    {
                                        app.status === 'pending' && <button onClick={() => handleReject(app.tuition_id)} className="bg-red-500 w-max cursor-pointer hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md transition-all flex items-center gap-1" href="/user/student/post-new-tution" data-discover="true">Reject</button>
                                    }
                                    {
                                        app.status == 'rejected' && <span className={`px-2 py-1 rounded text-xs font-bold bg-red-50 text-red-600'
                                            }`}>Rejected</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppliedTutors;