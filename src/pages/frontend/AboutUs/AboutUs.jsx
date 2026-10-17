import { motion } from "motion/react"
import { Link } from "react-router";
const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            
            <section className="bg-slate-900 text-white pt-40 pb-32 relative overflow-hidden">
                
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-emerald-900/30 to-transparent"></div>
                
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Bridging the Gap Between <br/>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">Knowledge & Aspiration</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            eTutor is Bangladesh's most trusted online platform dedicated to connecting students with the perfect mentors to unlock their true potential.
                        </p>
                    </motion.div>
                </div>
            </section>

            
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                        <div>
                            <div className="text-4xl font-bold text-emerald-600 mb-2">50k+</div>
                            <div className="text-gray-500 text-sm font-medium">Active Students</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-orange-500 mb-2">12k+</div>
                            <div className="text-gray-500 text-sm font-medium">Verified Tutors</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-blue-600 mb-2">64</div>
                            <div className="text-gray-500 text-sm font-medium">Districts Covered</div>
                        </div>
                        <div className="border-r-0">
                            <div className="text-4xl font-bold text-purple-600 mb-2">4.8</div>
                            <div className="text-gray-500 text-sm font-medium">Average Rating</div>
                        </div>
                    </div>
                </div>
            </div>

            
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <img 
                                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                                alt="Our Mission" 
                                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                            />
                        </div>
                        <div className="w-full md:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Our mission is to democratize education by making high-quality tutoring accessible to every corner of the country. We believe that every student deserves a mentor who understands their unique learning style and can guide them towards academic excellence.
                                </p>
                            </div>
                            <div className="w-full h-px bg-gray-100"></div>
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    We envision a future where learning knows no boundaries. Whether you are in a bustling city or a remote village, eTutor aims to be the bridge that connects you to the best educational resources and experts, fostering a generation of lifelong learners.
                                </p>
                            </div>
                            <button className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center gap-2 group">
                                Read our full story 
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            
            <section className="py-24 bg-gray-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            The principles that guide every decision we make and every feature we build.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Integrity & Trust",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
                                desc: "We maintain the highest standards of honesty. Every tutor is verified to ensure safety for our students."
                            },
                            {
                                title: "Student Centric",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
                                desc: "Students are at the heart of everything we do. We constantly evolve our platform to meet their changing needs."
                            },
                            {
                                title: "Excellence",
                                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
                                desc: "We strive for excellence in every match we make, ensuring high-quality education delivery across the board."
                            }
                        ].map((value, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">{value.icon}</svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{value.title}</h3>
                                <p className="text-gray-500 text-center leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
            <section className="py-24">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <div className="bg-emerald-600 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to start your journey?</h2>
                            <p className="text-emerald-100 max-w-2xl mx-auto mb-10 text-lg">
                                Join thousands of students and tutors who are already part of the eTutor family. 
                                Sign up today and experience the difference.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to={'/user/register'} className="bg-white w-max text-emerald-700 font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                                    Become a Tutor
                                </Link>
                                <Link to={'/tutors'} className="bg-emerald-800 text-white border border-emerald-500 font-bold py-4 px-8 rounded-xl hover:bg-emerald-900 transition-colors">
                                    Find a Tutor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;