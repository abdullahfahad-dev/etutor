import { motion } from "motion/react"
import { Link } from "react-router";
const Unauthorized = () => {
    return (
        <div className="flex-1 flex items-center justify-center p-4 py-36">
            <div className="text-center max-w-2xl mx-auto">
                
                {/* Animated Lock Icon */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-40 h-40 mx-auto mb-8"
                >
                    <div className="absolute inset-0 bg-red-50 rounded-full animate-pulse"></div>
                    <div className="relative z-10 flex items-center justify-center w-full h-full text-red-500">
                        <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        
                        {/* Floating Question Marks (Decoration) */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-orange-400"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Error Text */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className="text-6xl font-extrabold text-slate-800 mb-2">403</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-4">Access Denied</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        Sorry, you don't have permission to access this page. <br className="hidden md:block"/>
                        It looks like you've stumbled into a restricted area of eTutor.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to={'/'} className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Go Back Home
                        </Link>
                        
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Unauthorized;