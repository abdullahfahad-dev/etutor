import { motion } from "motion/react"
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Loading } from "../../../components/utils/Loading";
import useSecureAxios from "../../../hook/useSecureAxios";
import PlaceholderImage from './../../../assets/placeholder.png'
const TutorsPage = () => {
    const [tutors, setTutors] = useState([])
    const [loading, setLoading] = useState(true);
    const {secureAxios} = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/tutors/list').then(response => {
            if(response?.data?.success){
                setTutors(response?.data?.data?.map((item) => ({
                    id: item._id,
                    name: item?.name,
                    email: item?.email,
                    phoneNumber: item?.number,
                    image: item?.image
                })))
            }
            setLoading(false)
        })
    },[])

    

    if(loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">
                
                
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800">Find the Best Tutors</h1>
                    <p className="text-gray-500 mt-2">Connect with verified experts from top universities for your learning needs.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    
                    
                    
                    <div className="w-full">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {tutors.map((tutor) => (
                                <motion.div 
                                    key={tutor.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center relative overflow-hidden"
                                >
                                    
                                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    
                                    <div className="relative w-24 h-24 mb-4">
                                        <div className="w-full h-full rounded-full p-1 border-2 border-emerald-500 overflow-hidden">
                                            <img 
                                                src={tutor.image || PlaceholderImage} 
                                                alt={tutor.name} 
                                                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                    </div>

                                    
                                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                                        {tutor.name}
                                    </h2>
                                    <p>{tutor?.email}</p>
                                    <p className="mb-2">{tutor?.phoneNumber}</p>
                                    

                                    
                                    <Link to={`/tutors/${tutor?.id}`} className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-2 rounded-lg hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm hover:shadow-md mt-auto">
                                        View Profile
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorsPage;