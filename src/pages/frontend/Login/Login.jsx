import { useState } from "react";
import { motion } from "motion/react"
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../../hook/useAuth";
import Swal from "sweetalert2";
import useSecureAxios from "../../../hook/useSecureAxios";
const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { loginUsingCredintial, loginWithGoogle } = useAuth();

    const { secureAxios } = useSecureAxios();

    const onSubmit = async (data) => {

        try {
            setIsLoading(true);
            const result = await loginUsingCredintial(data?.email, data?.password)
            if (result?.success) {
                Swal.fire('Success', 'Login Successfully', 'success')
            } else {
                if (result?.code == 'auth/invalid-credential') {
                    Swal.fire('Error', 'Credintial not matched', 'error')
                } else {
                    Swal.fire('Error', result?.code, 'error')
                }
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error, 'login catch error')
        }

    };

    const handleGoogleLogin = async () => {
        try {
            const data = await loginWithGoogle();
            if (data?.success) {
                Swal.fire('Success', 'Login Successfully', 'success')
                const userData = {
                    name: data?.response?.user?.displayName,
                    email: data?.response?.user?.email,
                    role: 'student'
                }
                secureAxios.post('/api/user/login', userData).then(response => {
                    console.log(response)
                })
            } else {
                Swal.fire('Error', data?.code, 'error')
            }
        } catch (error) {
            console.log(error)
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

                <div className="w-full md:w-5/12 p-10 bg-emerald-600 text-white flex flex-col justify-between relative overflow-hidden">


                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>


                    <div className="relative z-10 mt-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                        </div>
                        <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                        <p className="text-emerald-50 text-lg leading-relaxed">
                            To keep connected with us please login with your personal info.
                        </p>
                    </div>


                    <div className="relative z-10 mb-10">
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                            <p className="text-sm font-medium opacity-90 italic">
                                "Education is the most powerful weapon which you can use to change the world."
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">
                                    NM
                                </div>
                                <div className="text-xs opacity-75">
                                    <p className="font-bold">Nelson Mandela</p>
                                    <p>Former President of South Africa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-800">Sign in to eTutor</h2>
                            <p className="text-gray-500 mt-2">Enter your details to access your account</p>
                        </div>


                        <button
                            onClick={handleGoogleLogin}
                            className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors mb-6 shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </button>

                        <div className="flex items-center mb-6">
                            <div className="grow border-t border-gray-200"></div>
                            <span className="shrink-0 mx-4 text-gray-400 text-sm">Or sign in with email</span>
                            <div className="grow border-t border-gray-200"></div>
                        </div>


                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                                    </div>
                                    <input type="email" {...register('email', {
                                        required: true
                                    })} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="you@example.com" required />
                                </div>
                            </div>


                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <a href="#" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline">Forgot Password?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                    <input {...register('password', {
                                        required: true
                                    })} type="password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-gray-50 focus:bg-white" placeholder="••••••••" required />
                                </div>
                            </div>


                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="text-center mt-8">
                            <p className="text-sm text-gray-600">
                                Don't have an account?
                                <Link to="/user/register" className="text-emerald-600 font-bold hover:underline ml-1">Register Now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;