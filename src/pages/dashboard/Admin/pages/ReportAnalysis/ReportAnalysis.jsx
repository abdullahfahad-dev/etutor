import { useEffect, useState } from "react";
import useSecureAxios from "../../../../../hook/useSecureAxios";
import { Loading } from "../../../../../components/utils/Loading";

const ReportAnalysis = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const {secureAxios} = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/admin/revenew').then(response => {
            if(response?.data?.success){
                setTransactions(response?.data?.data?.map(item => ({
                    user: item?.user?.name,
                    amount: item?.salary,
                    type: item?.tuition?.title
                })))
            }
            setLoading(false)
        })
    },[])

    if(loading) return <Loading />

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Financial Reports</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-linear-to-br from-slate-800 to-slate-900 text-white p-6 rounded-xl shadow-lg">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Total Platform Earnings</p>
                    <h3 className="text-3xl font-bold">{transactions?.reduce((sum, current) => {
                        return sum += parseInt(current.amount)
                    },0)} BDT</h3>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Total Transactions</p>
                    <h3 className="text-3xl font-bold text-gray-800">{transactions?.length}</h3>
                    <p className="text-gray-400 text-xs mt-2">Successful payments</p>
                </div>
            </div>

            {/* Transaction History Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Recent Transactions</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Job</th>
                            <th className="p-4 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {transactions.map((tx) => (
                            <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 font-medium text-gray-800">{tx.user}</td>
                                <td className="p-4 text-gray-500">{tx.type}</td>
                                <td className="p-4 text-right font-bold text-emerald-600">+{tx.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default ReportAnalysis;