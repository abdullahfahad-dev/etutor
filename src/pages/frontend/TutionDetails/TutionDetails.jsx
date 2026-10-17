import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react";
import useSecureAxios from "../../../hook/useSecureAxios";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { Loading } from "../../../components/utils/Loading";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";


const ApplyModal = ({ isOpen, onClose, jobInfo, user }) => {
    if (!isOpen) return null;
    const {secureAxios} = useSecureAxios();

    const { handleSubmit, register, formState: { errors } } = useForm();

    const tutorData = {
        name: user?.displayName,
        email: user?.email
    };
    

    const onSubmit = (data) => {
        const applyData = {
            tuition_id: jobInfo.id,
            qualifications: data.qualifications,
            experience: data.experience,
            salary: data.salary
        }
        console.log(applyData, jobInfo, 'information')
        secureAxios.post('/api/tutor/apply',applyData).then(response => {
            if(response?.data?.success){
                Swal.fire('Success', response?.data?.message, 'success')
            }
        })
        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Apply for Tuition</h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-100">
                    <p className="text-sm text-emerald-800 font-medium">Applying for: <span className="font-bold">{jobInfo.title}</span></p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    {/* Read-only Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                            <input
                                type="text"
                                value={tutorData.name}
                                readOnly
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <input
                                type="email"
                                value={tutorData.email}
                                readOnly
                                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-600 cursor-not-allowed focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Tutor Input Fields */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Qualifications <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            placeholder="e.g. BSc in Mathematics, BUET"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                            required
                            {...register('qualifications', {
                                required: true
                            })}
                        />
                        {
                            errors?.qualifications && <label htmlFor="" className="text-red-500">Qualification field is required</label>
                        }
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Experience <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                placeholder="e.g. 2 Years"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                                required
                                {...register('experience', {
                                    required: true
                                })}
                            />
                            {
                                errors?.experience && <label htmlFor="" className="text-red-500">Experience field is required</label>
                            }
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Salary (BDT) <span className="text-red-500">*</span></label>
                            <input
                                type="number"
                                placeholder="e.g. 5000"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-gray-400"
                                required
                                {...register('salary',{
                                    required: true
                                })}
                            />
                            {
                                errors?.salary && <label htmlFor="" className="text-red-500">Salary field is required</label>
                            }
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

const TuitionDetailsPage = () => {
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
    const { user, userRoleLoading, loading: userLoading, userRole } = useAuth();
    const [tuition, setTuition] = useState({});
    const { secureAxios } = useSecureAxios();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    useEffect(() => {
        secureAxios.get(`/api/tution/list/${id}`).then(response => {
            if (response?.data?.success) {
                setTuition(response?.data?.data)
                setLoading(false)
            } else {
                Swal.fire('Error', response?.data?.message, 'error')
                navigate('/tutions', {
                    replace: true
                })
            }
        }).catch(error => {
            console.log(error)
            setLoading(false)
            Swal.fire('Error', error?.response?.data?.message, 'error')
            navigate('/tutions', {
                replace: true
            })
        })
    }, [id])
    const job = {
        id: tuition?._id,
        title: tuition?.title,
        posted_date: tuition?.createdAt ? new Date(tuition.createdAt).toLocaleDateString('en-BD') : null,
        status: "Active",
        location: tuition?.location,
        salary: tuition?.salary,
        details: {
            class: tuition?.className,
            days_per_week: tuition?.per_week,
            subjects: tuition?.subject?.split(','),
        },
        description: tuition?.description
    };

    if (loading || userLoading || userRoleLoading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            <div className="container mx-auto px-4 md:px-6">


                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <a href="#" className="hover:text-emerald-600">Home</a>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <a href="#" className="hover:text-emerald-600">Tuitions</a>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">{job.title}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">


                    <div className="w-full lg:w-2/3">


                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                    {job.title}
                                </h1>
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                    {job.status}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-500 border-b border-gray-100 pb-6 mb-6">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Posted: {job.posted_date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    {job.location}
                                </span>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Class</p>
                                    <p className="text-gray-800 font-medium">{job.details.class}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-gray-400 uppercase font-semibold">Days Per Week</p>
                                    <p className="text-gray-800 font-medium">{job.details.days_per_week}</p>
                                </div>
                            </div>


                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-400 uppercase font-semibold mb-3">Subjects</p>
                                <div className="flex flex-wrap gap-2">
                                    {job.details.subjects.map(sub => (
                                        <span key={sub} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                                            {sub}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>


                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-emerald-500 pl-3">
                                Requirement Details
                            </h3>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                {job.description}
                            </p>

                            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                                <h4 className="text-sm font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Note:
                                </h4>
                                <p className="text-xs text-yellow-700">
                                    Please read the requirements carefully before applying. Only apply if you are confident about teaching the mentioned subjects.
                                </p>
                            </div>
                        </div>

                    </div>


                    <div className="w-full lg:w-1/3 space-y-6">


                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg sticky top-28">
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500 mb-1">Salary</p>
                                <h2 className="text-3xl font-extrabold text-emerald-600">{job.salary} BDT</h2>
                            </div>

                            {
                                user && userRole == 'tutor' && (
                                    <button onClick={() => setIsApplyModalOpen(true)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all transform hover:-translate-y-0.5 mb-3 cursor-pointer">
                                        Apply Now
                                    </button>
                                )
                            }

                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <h4 className="text-sm font-bold text-gray-700 mb-3">Safety Tips</h4>
                                <ul className="text-xs text-gray-500 space-y-2 list-disc list-inside">
                                    <li>Do not pay any money before joining.</li>
                                    <li>Meet in a safe and public place.</li>
                                    <li>Verify all details before confirming.</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isApplyModalOpen && (
                    <ApplyModal
                        isOpen={isApplyModalOpen}
                        onClose={() => setIsApplyModalOpen(false)}
                        jobInfo={job}
                        user={user}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default TuitionDetailsPage;