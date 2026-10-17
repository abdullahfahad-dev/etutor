import { useEffect, useState } from "react";
import { Loading } from "../../../components/utils/Loading";
import useSecureAxios from "../../../hook/useSecureAxios";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PlaceholderImage from './../../../assets/placeholder.png'

const TutorProfilePage = () => {
    const [tutor, setTutor] = useState({})
    const [loading, setLoading] = useState(true);
    const { secureAxios } = useSecureAxios();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        secureAxios.get(`/api/tutors/list/${id}`).then(response => {
            console.log(response)
            if (response?.data?.success) {
                setTutor(response?.data?.data)

            } else {
                Swal.fire('Error', response?.data?.message, 'error')
                navigate('/tutors', {
                    replace: true
                })
            }
            setLoading(false)
        }).catch(error => {
            console.log(error)

            navigate('/tutors', {
                replace: true
            })
        });
    }, []);

    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12">
            <div className="container mx-auto px-4 md:px-6">


                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <a href="#" className="hover:text-emerald-600">Home</a>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <a href="#" className="hover:text-emerald-600">Tutors</a>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">{tutor.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">


                    <div className="w-full lg:w-2/3">


                        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm mb-6 relative">

                            <div className="h-32 bg-linear-to-r from-emerald-500 to-teal-600"></div>

                            <div className="px-8 pb-8">
                                <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6 gap-6 text-center md:text-left">

                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-white">
                                            <img src={tutor.image || PlaceholderImage} alt={tutor.name} className="w-full h-full object-cover" />
                                        </div>
                                        {tutor.verified && (
                                            <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm" title="Verified Tutor">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </div>


                                    <div className="grow">
                                        <h1 className="text-3xl font-bold text-gray-800 mb-1 mt-5 pt-[40px]">{tutor.name}</h1>
                                        <p className="text-emerald-600 font-medium mb-1">{tutor.email}</p>
                                        <p className="text-gray-500 text-sm">{tutor.number}</p>
                                    </div>
                                </div>


                            </div>
                        </div>





                    </div>


                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-lg sticky top-28">
                            {/* <div className="text-center mb-6">
                                <p className="text-sm text-gray-500 mb-2">Interested in hiring?</p>
                                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-emerald-200 hover:shadow-emerald-300 transition-all transform hover:-translate-y-0.5 mb-3 flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Request to Hire
                                </button>
                            </div> */}

                            <div className="space-y-4 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">Phone Verified</p>
                                        <p className="text-gray-500 text-xs">Contact info confirmed</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800">University ID</p>
                                        <p className="text-gray-500 text-xs">Credentials verified</p>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="mt-6 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                                <p className="text-xs text-yellow-800 text-center font-medium">
                                    Avg. Response Time: <span className="font-bold">1 Hour</span>
                                </p>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TutorProfilePage;