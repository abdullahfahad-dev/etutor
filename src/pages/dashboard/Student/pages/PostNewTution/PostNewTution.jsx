import { useForm } from "react-hook-form";
import { useState } from "react";
import Swal from "sweetalert2";
import useSecureAxios from "../../../../../hook/useSecureAxios";

const PostNewTuition = () => {
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const {secureAxios} = useSecureAxios();
    
    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            
            const tutionData = {
                title: data?.title,
                subject: data?.subject,
                className: data?.className,
                per_week: data?.per_week,
                salary: data?.salary,
                location: data?.location,
                description: data?.description
            };

            console.log('Tuition Data:', tutionData);
            const response = await secureAxios.post('/api/student/tuition/create', tutionData);
            
            if(response?.data?.success) {
                Swal.fire('Success', 'Tuition posted successfully!', 'success');
                reset();
            } else {
                Swal.fire('Error', response?.data?.message || 'Failed to post tuition', 'error');
            }
            
            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false);
            console.log('Post tuition error:', error);
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
    }
    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Tuition</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                            <input {...register('title', {
                                required: true
                            })} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Need Math Tutor" />
                            {errors.title && <label htmlFor="" className="text-red-500">Title field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                            <input {...register('subject',{
                                required: true
                            })} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Physics, Chemistry" />
                            {errors.subject && <label htmlFor="" className="text-red-500">Subject field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                            <select {...register('className',{
                                required: true
                            })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="Class 1">Class 1</option>
                                <option value="Class 2">Class 2</option>
                                <option value="Class 3">Class 3</option>
                                <option value="Class 4">Class 4</option>
                                <option value="Class 5">Class 5</option>
                                <option value="Class 6">Class 6</option>
                                <option value="Class 7">Class 7</option>
                                <option value="Class 8">Class 8</option>
                                <option value="Class 9">Class 9</option>
                            </select>
                            {errors.className && <label htmlFor="" className="text-red-500">Class field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Days Per Week</label>
                            <select {...register('per_week',{
                                required: true
                            })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                                <option value="3 Days">3 Days</option>
                                <option value="4 Days">4 Days</option>
                                <option value="5 Days">5 Days</option>
                                <option value="6 Days">6 Days</option>
                            </select>
                            {errors.per_week && <label htmlFor="" className="text-red-500">Day Per Week field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Offer</label>
                            <input {...register('salary',{
                                required: true
                            })} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. 5000 BDT" />
                            {errors.salary && <label htmlFor="" className="text-red-500">Salary field is required</label>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <input {...register('location',{
                                required: true
                            })} type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="e.g. Dhanmondi, Dhaka" />
                            {errors.location && <label htmlFor="" className="text-red-500">Location field is required</label>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                        <textarea {...register('description',{
                            required: true
                        })} rows="4" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Requirements, preferred university, gender preference etc."></textarea>
                        {errors.description && <label htmlFor="" className="text-red-500">Description field is required</label>}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Posting...
                            </>
                        ) : (
                            'Post Tuition'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostNewTuition;