import { motion } from "motion/react"
export function Platformworks() {
    return (
        <div>
            <div className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            How the Platform Works
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Getting started is easy. Follow these three simple steps to start your journey with eTutor.
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 z-0"></div>

                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-emerald-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-emerald-100 group-hover:scale-110 transition-all duration-300">
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Create Account</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Sign up as a student to post your tuition needs or as a tutor to create your teaching profile.
                            </p>
                        </motion.div>

                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-orange-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-orange-100 group-hover:scale-110 transition-all duration-300">
                                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Find & Connect</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Browse tutor profiles or tuition jobs. Filter by subject, location, and salary to find your match.
                            </p>
                        </motion.div>

                        
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-blue-50 shadow-sm flex items-center justify-center mb-6 group-hover:border-blue-100 group-hover:scale-110 transition-all duration-300">
                                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Start Learning</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                Connect with your tutor or student, schedule your classes, and begin your educational journey.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
