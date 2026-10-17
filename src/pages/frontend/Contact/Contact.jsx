import { motion } from "motion/react"
const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            

            
            <div className="container mx-auto px-4 pt-32 pb-20 grow relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto min-h-[600px]"
                >
                    
                    
                    <div className="w-full lg:w-5/12 bg-emerald-700 text-white p-10 flex flex-col justify-between relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-emerald-100 mb-10 text-sm leading-relaxed">
                                Fill up the form and our Team will get back to you within 24 hours.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">+880 1712 345 678</p>
                                        <p className="text-emerald-200 text-sm">Mon-Fri, 9am - 6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">support@etutor.com</p>
                                        <p className="text-emerald-200 text-sm">Online Support</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">Dhaka, Bangladesh</p>
                                        <p className="text-emerald-200 text-sm">123 Education Lane, Dhanmondi</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <div className="flex gap-4">
                                
                                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                                    <a key={social} href="#" className="w-10 h-10 rounded-full border border-emerald-400/50 flex items-center justify-center hover:bg-white hover:text-emerald-700 transition-all duration-300">
                                        <span className="sr-only">{social}</span>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    
                    <div className="w-full lg:w-7/12 p-10 lg:p-14 bg-white">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0 outline-none transition-all" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0 outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0 outline-none transition-all" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                                    <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0 outline-none transition-all" placeholder="+880..." />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <div className="flex flex-wrap gap-4">
                                    {['General Inquiry', 'Support', 'Feedback', 'Partnership'].map((option) => (
                                        <label key={option} className="flex items-center cursor-pointer group">
                                            <input type="radio" name="subject" className="hidden peer" />
                                            <span className="px-4 py-2 text-sm text-gray-500 border border-gray-200 rounded-full peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:border-emerald-600 transition-all hover:border-emerald-400">
                                                {option}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                                <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-0 outline-none transition-all" placeholder="Write your message here..."></textarea>
                            </div>

                            <div className="pt-4 text-right">
                                <button type="button" className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-slate-900 rounded-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-emerald-200 transform hover:-translate-y-1">
                                    Send Message
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </div>
                        </form>
                    </div>

                </motion.div>


            </div>
        </div>
    );
};

export default ContactPage;