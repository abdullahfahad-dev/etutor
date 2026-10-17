import { useEffect, useState } from 'react';
import { motion } from "motion/react"
import useSecureAxios from '../../../../../hook/useSecureAxios';
import { Loading } from '../../../../../components/utils/Loading';
import Swal from 'sweetalert2';


const UserManagement = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState([])
    const { secureAxios } = useSecureAxios();
    useEffect(() => {
        secureAxios.get('/api/admin/users').then(response => {
            console.log(response)
            if (response?.data?.success) {
                setUsers(response?.data?.data?.map(item => ({
                    id: item?._id,
                    name: item?.name,
                    email: item?.email,
                    phone: item?.number,
                    role: item?.role,
                    status: 'Active',
                    img: item?.image

                })))
            }
            setLoading(false)
        })
    }, [])

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    const handleSaveUser = (id, updatedData) => {
        setUsers(users.map(u => u.id === id ? { ...u, ...updatedData } : u));
        setIsEditOpen(false);
    };

    const handleDeleteUser = (id) => {
        secureAxios.delete(`/api/admin/user/delete/${id}`).then(response => {
            if (response?.data?.success) {
                Swal.fire('Success', response?.data?.message, 'success')
                setUsers(users.filter(u => u.id !== id));
            }
        })

    };

    const handleQuickRoleChange = (id, newRole) => {
        setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
        secureAxios.patch(`/api/admin/user/update/${id}`, {
            role: newRole
        }).then(response => {
            if (response?.data?.success) {
                Swal.fire('Success', response?.data?.message, 'success')
            }

        })
    };

    if (loading) return <Loading />
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
                <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                    Total Users: {users.length}
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-200 text-xs uppercase text-slate-500 font-semibold">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={user.img} alt="" className="w-10 h-10 rounded-full bg-gray-200 border border-gray-300" />
                                        <div>
                                            <p className="font-bold text-gray-800">{user.name}</p>
                                            <p className="text-gray-500 text-xs">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    {/* Quick Role Changer */}
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleQuickRoleChange(user.id, e.target.value)}
                                        className="bg-white border border-gray-200 text-gray-700 text-xs rounded-lg px-2 py-1 focus:ring-2 focus:ring-slate-500 outline-none cursor-pointer"
                                    >
                                        <option value="student">Student</option>
                                        <option value="tutor">Tutor</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default UserManagement;