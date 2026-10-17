import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../../../../../components/utils/Loading";
import useSecureAxios from "../../../../../hook/useSecureAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const EditTuitionModal = ({ isOpen, onClose, tuition }) => {
    if (!isOpen || !tuition) return null;
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { secureAxios } = useSecureAxios();
    const onSubmit = (data) => {
        const myTution = {
            title: data?.title,
            subject: data?.subject,
            location: data?.location,
            salary: data?.salary
        }
        secureAxios.patch(`/api/student/tuition/update/${tuition?.id}`, myTution).then(response => {
            if (response?.data?.success) {
                Swal.fire('Success', response?.data?.message, 'success')
            }
            onClose(false)
        })
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="bg-emerald-600 px-6 py-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Edit Tuition Post</h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                        <input name="title" {...register('title', { required: true })} defaultValue={tuition.title} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                        {errors.title && <label>Title Field is required</label>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                        <input name="subject" {...register('subject', { required: true })} defaultValue={tuition.subject} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                        {errors.subject && <label>Subject Field is required</label>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                            <input name="location" {...register('location', { required: true })} defaultValue={tuition.location} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                            {errors.location && <label>Location Field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Salary</label>
                            <input name="salary" {...register('salary', { required: true })} defaultValue={tuition.salary} type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition-all" required />
                            {errors.salary && <label>Salary is required</label>}
                        </div>
                    </div>
                    <div className="pt-2 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 font-semibold hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="px-6 py-2 cursor-pointer bg-emerald-600 text-white font-bold rounded-lg shadow-md hover:bg-emerald-700 transition-all">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const MyTutions = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [tutions, setTutions] = useState([]);
    const [loading, setLoading] = useState(true)
    const { secureAxios } = useSecureAxios();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentTuition, setCurrentTuition] = useState(null);
    useEffect(() => {
        secureAxios.get('/api/student/tuition/all').then(response => {
            if (response?.data?.success) {
                setTutions(response?.data?.data)
            }
            setLoading(false)
        })
    }, []);
    if (loading) return <Loading />



    const myPosts = tutions?.map((item) => ({
        id: item._id,
        title: item.title,
        subject: item.subject,
        location: item.location,
        salary: item.salary,
        postedDate: item.postedDate,
        status: item.status,
        applications: item.applications
    }));


    const handleEditClick = (tuition) => {
        setCurrentTuition(tuition);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        secureAxios.delete(`/api/student/tuition/delete/${id}`).then(response => {
            if (response?.data?.success) {
                Swal.fire('Success', response?.data?.message, 'success')

                secureAxios.get('/api/student/tuition/all').then(response => {
                    if (response?.data?.success) {
                        setTutions(response?.data?.data)
                    }
                })
            }
            setLoading(false)
        })
    }

    console.log(tutions, 'this is tutions')
    const filteredPosts = activeTab === 'All' ? myPosts : myPosts.filter(post => post.status === activeTab);


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">My Tuitions</h2>
                <Link to={'/user/student/post-new-tution'} className="bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg> Post New
                </Link>
            </div>
            <div className="flex border-b border-gray-200 mb-6 gap-6">
                {['All', 'approved', 'pending', 'completed', 'rejected'].map((tab) => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-2 cursor-pointer text-sm font-medium transition-colors border-b-2 ${activeTab === tab ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>{tab}</button>
                ))}
            </div>
            <div className="space-y-4">
                {filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${post.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : post.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>{post.status}</span>
                                    <span className="text-xs text-gray-400">{post.postedDate}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
                                <p className="text-sm text-gray-600">{post.subject} • {post.location}</p>
                                <p className="text-sm font-semibold text-emerald-600 mt-2">{post.salary}</p>
                            </div>
                            <div className="text-right flex flex-col justify-center">
                                <div className="text-center mb-2">
                                    <p className="text-2xl font-bold text-gray-800">{post.applications}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditClick(post)}
                                        className="bg-white cursor-pointer border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/user/student/applied-tutors/${post.id}`} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">View Details</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <EditTuitionModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                tuition={currentTuition}
            />
        </div>
    );
};

export default MyTutions;