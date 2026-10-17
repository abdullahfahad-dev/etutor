import { motion } from "motion/react"
import { useEffect, useState } from "react";
import useSecureAxios from "../../../../../hook/useSecureAxios";
import { Loading } from "../../../../../components/utils/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";



const EditApplicationModal = ({ isOpen, onClose, application }) => {
    if (!isOpen || !application) return null;
    const {secureAxios} = useSecureAxios();
    const {handleSubmit, register, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        const tutionData = {
            qualifications: data.qualifications,
            experience: data.experience,
            salary: data.salary
        }
        secureAxios.patch(`/api/tutor/my-applications/update/${application?.id}`,tutionData).then(response => {
            if(response?.data?.success){
                Swal.fire('Success', response?.data?.message, 'success')
            }
            onClose(false)
        })
    };

    

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Update Application</h3>
                    <button onClick={() => onClose()} className="text-white/80 hover:text-white cursor-pointer">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800 mb-2">
                        Updating proposal for <strong>{application.jobTitle}</strong>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qualifications</label>
                        <input
                            name="qualifications"
                            type="text"
                            defaultValue={application.qualifications || "B.Sc in CSE, BUET"}
                            {...register('qualifications',{
                                required: true
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            required
                        />
                        {errors?.qualifications && <label htmlFor="" className="text-red-500">Qualifications field is required.</label>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Experience</label>
                            <input
                                name="experience"
                                type="text"
                                defaultValue={application.experience || "2 Years"} // Mock default
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                                {...register('experience',{
                                    required: true
                                })}
                            />
                            {errors?.experience && <label htmlFor="" className="text-red-500">Experience field is required.</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Salary</label>
                            <input
                                name="salary"
                                defaultValue={application.salary}
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                required
                                {...register('salary',{
                                    required: true
                                })}
                            />
                            {errors?.salary && <label htmlFor="" className="text-red-500">Salary field is required.</label>}
                        </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 cursor-pointer text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 cursor-pointer text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all">Update</button>
                    </div>
                </form>
            </motion.div>

        </div>
    );
};


const MyApplication = () => {
    const [applications, setApplications] = useState([
        { id: 1, jobTitle: "Class 5 Math Tutor", date: "2 days ago", salary: "4000 BDT", status: "Pending" },
        { id: 2, jobTitle: "HSC Physics", date: "1 week ago", salary: "7000 BDT", status: "Rejected" },
    ]);


    const [loading, setLoading] = useState(true)
    const { secureAxios } = useSecureAxios();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    useEffect(() => {
        secureAxios.get('/api/tutor/my-applications').then(response => {
            if (response?.data?.success) {
                setApplications(response?.data?.data?.map(item => ({
                    id: item?._id,
                    jobTitle: item?.tutions?.title,
                    date: item?.createdAt ? new Date(item.createdAt).toLocaleDateString('en-BD') : null,
                    salary: item?.salary,
                    status: item?.status
                })))
            }
            setLoading(false)
        })
    }, [])
    const onDelete = (id) => {
        secureAxios.delete(`/api/tutor/my-applications/delete/${id}`).then(response => {
            if(response?.data?.success){
                const currentApplicationData = applications.filter(item => item.id !== id);
                setApplications(currentApplicationData)
                Swal.fire('Success', response?.data?.message, 'success')
            }
        })
    }
    const onUpdate = (data) => {
        setSelectedApplication(data)
        setIsEditModalOpen(true)
    }
    if (loading) return <Loading />
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                    {applications.length} Active Requests
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {applications.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <p>No applications found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 font-semibold">Job Title</th>
                                    <th className="p-4 font-semibold">Applied Date</th>
                                    <th className="p-4 font-semibold">Salary Quote</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-800">{app.jobTitle}</td>
                                        <td className="p-4 text-gray-600">{app.date}</td>
                                        <td className="p-4 text-emerald-600 font-bold">{app.salary}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${app.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {app.status === 'pending' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => onUpdate(app)} className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium text-xs bg-blue-50 px-3 py-1 rounded hover:bg-blue-100 transition-colors">
                                                        Update
                                                    </button>
                                                    <button onClick={() => onDelete(app.id)} className="text-red-600 cursor-pointer hover:text-red-800 font-medium text-xs bg-red-50 px-3 py-1 rounded hover:bg-red-100 transition-colors">
                                                        Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">No actions available</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}


                                <EditApplicationModal
                                    isOpen={isEditModalOpen}
                                    onClose={() => setIsEditModalOpen(false)}
                                    application={selectedApplication}
                                />
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyApplication;