import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { Loading } from "../../../../components/utils/Loading";
import useSecureAxios from "../../../../hook/useSecureAxios";
import PlaceholderImage from './../../../../assets/placeholder.png'
import { Link } from "react-router";
export function Tutors() {
    const [latestTutors, setLatestTutors] = useState([])
    const [loading, setLoading] = useState(true)
    const {secureAxios} = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/home/tutors').then(response => {
            if(response?.data?.success){
                setLatestTutors(response?.data?.data?.map((item) => ({
                    id: item?._id,
                    name: item.name,
                    email: item.email,
                    phoneNumber: item.number,
                    image: item.image
                })))
                setLoading(false)
            }
        });
    },[])


    if(loading) return <Loading />
    return (
        <div>
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    
                    <div className="text-center mb-16">
                        <div className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wider text-orange-600 uppercase bg-orange-100/50 rounded-full">
                            Top Rated Mentors
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Latest Tutors
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Connect with verified tutors from top universities. 
                            Get expert guidance for better results.
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestTutors.map((tutor) => (
                            <motion.div 
                                key={tutor.id}
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 group text-center"
                            >
                                
                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    <div className="w-full h-full rounded-full p-1 border-2 border-emerald-500 overflow-hidden">
                                        <img 
                                            src={tutor.image || PlaceholderImage} 
                                            alt={tutor.name} 
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                </div>

                                
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{tutor.name}</h3>
                                <p className="text-sm font-medium text-emerald-600 mb-1">{tutor.email}</p>
                                <p className="text-xs text-gray-500 mb-4">{tutor.phoneNumber}</p>

                                
                                
                                <Link to={`/tutors/${tutor.id}`} className="w-full block cursor-pointer py-2.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-gray-200">
                                    View Profile
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    
                    <div className="text-center mt-12">
                        <Link to={'/tutors'} className="px-8 py-3 w-max cursor-pointer bg-white text-slate-700 font-bold rounded-xl border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto">
                            Find More Tutors
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
