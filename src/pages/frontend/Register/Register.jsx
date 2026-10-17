import { motion } from "motion/react"
import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import useSecureAxios from "../../../hook/useSecureAxios";
const Register = () => {
    const { registerUser, setUser, setUserRole } = useAuth();
    const [role, setRole] = useState('student');
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const {secureAxios} = useSecureAxios();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const userData = {
                name: data?.name,
                email: data?.email,
                role: role,
                number: data?.number
            }

            const result = await registerUser(data?.name, data?.email, data?.password);
            if (result.success) {
            console.log(result, 'this is register data')
                secureAxios.post('/api/user/register', userData).then(response => {
                    if(response?.data?.success){
                        Swal.fire('Success', 'Registration successfully', 'success')
                        console.log(result?.resposne?.user, 'this is user information')
                        setUser(result?.resposne?.user)
                        setUserRole(role)
                    }else{
                        Swal.fire('Error', response?.data?.message, 'error')
                    }
                }).catch(error => {
                    setIsLoading(false)
                    console.log(error, 'register catch error')
                })
                setIsLoading(false)

            }else{
                if(result?.code == 'auth/email-already-in-use'){
                    Swal.fire('Error', 'User allready exists', 'error')
                }
                setIsLoading(false)
                console.log(result)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error, 'register error')
        }

    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row min-h-[600px]"
            >

                <div className={`w-full md:w-5/12 p-10 text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-500 ${role === 'student' ? 'bg-emerald-600' : 'bg-orange-500'}`}>


                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>


                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            {role === 'student' ? (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                            ) : (
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            )}
                        </div>
                        <motion.div
                            key={role}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">
                                {role === 'student' ? "Start Your Learning Journey" : "Inspire the Next Generation"}
                            </h2>
                            <p className="text-white/90 mb-8 leading-relaxed">
                                {role === 'student'
                                    ? "Connect with expert tutors, track your progress, and achieve your academic goals with eTutor."
                                    : "Join our community of verified tutors. Share your knowledge, set your schedule, and earn while you teach."}
                            </p>
                        </motion.div>
                    </div>


                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-medium text-sm">Free Account Registration</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <span className="font-medium text-sm">Secure Data Protection</span>
                        </div>
                    </div>
                </div>


                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                            <p className="text-gray-500 text-sm mt-2">Join us as a Student or Tutor</p>
                        </div>


                        <div className="flex bg-gray-100 p-1.5 rounded-xl mb-8 relative">

                            <motion.div
                                className="absolute top-1.5 bottom-1.5 rounded-lg bg-white shadow-sm z-0"
                                layoutId="roleIndicator"
                                initial={false}
                                animate={{
                                    left: role === 'student' ? '0.375rem' : '50%',
                                    width: 'calc(50% - 0.375rem)'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />

                            <button
                                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold relative z-10 flex items-center justify-center gap-2 transition-colors duration-200 ${role === 'student' ? 'text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setRole('student')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                Student
                            </button>
                            <button
                                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold relative z-10 flex items-center justify-center gap-2 transition-colors duration-200 ${role === 'tutor' ? 'text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setRole('tutor')}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Tutor
                            </button>
                        </div>


                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    </div>
                                    <input {...register('name', { required: true })} type="text" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="Enter your full name" />
                                    {errors?.name && <label htmlFor="" className="text-red-500">{errors?.name?.message}</label>}
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <input {...register('number', { required: true })} type="tel" className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="017xxxxxxxx" />
                                    {errors?.number && <label htmlFor="" className="text-red-500">{errors?.number?.message}</label>}
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                                    </div>
                                    <input type="email" {...register('email', { required: true })} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="you@example.com" />
                                    {errors?.email && <label htmlFor="" className="text-red-500">{errors?.email?.message}</label>}
                                </div>
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                    <input type="password" {...register('password', { required: true })} className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="••••••••" />
                                    {errors?.password && <label htmlFor="" className="text-red-500">{errors?.password?.message}</label>}
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full cursor-pointer font-bold py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${role === 'student'
                                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                                        : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200'
                                    }`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : (
                                    `Register as ${role === 'student' ? 'Student' : 'Tutor'}`
                                )}
                            </button>
                        </form>

                        <p className="text-center mt-6 text-sm text-gray-600">
                            Already have an account?
                            <Link to="/user/login" className="text-emerald-600 font-bold hover:underline ml-1">Login here</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;