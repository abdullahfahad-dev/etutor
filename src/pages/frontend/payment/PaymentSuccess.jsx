import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router";
import useSecureAxios from "../../../hook/useSecureAxios";
import { Loading } from "../../../components/utils/Loading";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get('session_id');
    const {secureAxios} = useSecureAxios();
    const [transaction, setTransaction] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        secureAxios.patch(`/api/student/payment/${session_id}`).then(response => {
            if(response?.data?.success){
                console.log(response)
                setTransaction({
                    id: response?.data?.data?.payment_intent,
                    amount: (response?.data?.data?.amount_total / 100),
                    date: response?.data?.data?.created * 1000,
                    method: 'Strip',
                    purpose: response?.data?.purpose?.title
                })
            }
            setLoading(false)
        }).catch(error => {
            setLoading(false)
        })
    },[session_id])
    // const transaction = {
    //     id: "TXN_88392011",
    //     amount: "500 BDT",
    //     date: "18 Dec, 2025",
    //     time: "06:30 PM",
    //     method: "Strip",
    //     purpose: "Premium Tuition Post"
    // };

    if(loading) return <Loading />

    if(!session_id) return <Navigate to={'/'} />
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 md:px-6 max-w-lg">
                
                <div
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100"
                >
                    {/* Success Header */}
                    <div className="bg-emerald-600 p-8 text-center">
                        <div
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                        >
                            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                        <p className="text-emerald-100">Thank you for your payment.</p>
                    </div>

                    {/* Receipt Details */}
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100 border-dashed">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                                <p className="text-2xl font-bold text-gray-800">{transaction.amount}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                                <div className="flex items-center justify-end gap-2">
                                    <span className="font-bold text-gray-800">{transaction.method}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-mono text-gray-700 font-medium">{transaction.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date & Time</span>
                                <span className="text-gray-700 font-medium">{transaction.date}, {transaction.time}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Purpose</span>
                                <span className="text-gray-700 font-medium">{transaction.purpose}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PaymentSuccess;