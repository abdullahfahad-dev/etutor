import { motion } from "motion/react"
import { Link } from "react-router";
export function Hero() {
    return (
        <div>
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-50 blur-3xl"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-orange-50 blur-3xl"
                />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">


                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-emerald-600 uppercase bg-emerald-50 rounded-full"
                            >
                                #1 Trusted Tutoring Platform
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
                            >
                                Unlock Your Potential with <span className="text-emerald-600 relative">
                                    Expert Tutors
                                    <motion.svg
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10"
                                        viewBox="0 0 200 9"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M2.00025 5.50002C17.5003 2.50002 85.0003 -2.49998 198.001 3.50002C198.001 3.50002 145.501 10.5 2.00025 5.50002Z" stroke="currentColor" strokeWidth="3" />
                                    </motion.svg>
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            >
                                Find the perfect private tutor for any subject, anywhere.
                                Whether you need help with Math, English, or Coding, we have expert mentors ready to guide you.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Link to={'/tutors'} className="flex justify-center sm:justify-start">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 cursor-pointer bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        Find a Tutor
                                    </motion.button>
                                </Link>
                                <Link to={'/user/register'}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 cursor-pointer bg-white text-slate-700 border border-slate-200 font-bold rounded-xl hover:bg-gray-50 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
                                    >
                                        Become a Tutor
                                    </motion.button>
                                </Link>
                            </motion.div>


                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center lg:justify-start gap-8 md:gap-12"
                            >
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">5k+</p>
                                    <p className="text-sm text-slate-500">Active Tutors</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">15k+</p>
                                    <p className="text-sm text-slate-500">Students</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-slate-900">4.9</p>
                                    <p className="text-sm text-slate-500">Average Rating</p>
                                </div>
                            </motion.div>
                        </div>


                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full lg:w-1/2 relative"
                        >
                            <motion.div
                                whileHover={{ rotate: 0 }}
                                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 transition-transform duration-500"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                                    alt="Students learning together"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end">
                                    <div className="p-6 text-white">
                                        <p className="font-bold text-lg">Learn from the Best</p>
                                        <p className="text-sm opacity-90">Verified tutors from top universities</p>
                                    </div>
                                </div>
                            </motion.div>


                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden md:flex items-center gap-3"
                            >
                                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Verified Expert</p>
                                    <p className="text-xs text-gray-500">Mathematics Dept.</p>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
