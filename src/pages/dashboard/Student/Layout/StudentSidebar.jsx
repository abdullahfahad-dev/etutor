import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../../../hook/useAuth";
import Swal from "sweetalert2";

export function Studentsidebar({ sidebarOpen, setSidebarOpen }) {
    const {logout, user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        console.log('clicked')
        const result = await logout();
        navigate('/',{
            replace: true
        })
        Swal.fire('Success', 'Logout Successfully', 'success')
    }

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        {
            path: "/user/student/my-tution",
            label: "My Tuitions",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            path: "/user/student/post-new-tution",
            label: "Post New Tuition",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
            )
        },
        {
            path: "/user/student/applied-tutors",
            label: "Applied Tutors",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        },
        {
            path: "/user/student/payment-history",
            label: "Payments",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
            )
        },
        {
            path: "/user/student/profile-settings",
            label: "Profile Settings",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
            )
        }
    ];

    return (
        <>
            {/* Desktop Sidebar - Full Height */}
            <div className="hidden lg:flex lg:shrink-0 fixed left-0 top-0 bottom-0 z-30">
                <div className="flex flex-col w-64">
                    <div className="flex flex-col h-full bg-white border-r border-gray-200 overflow-y-auto">
                        {/* Logo/Brand Section */}
                        <div className="flex items-center px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center">
                                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">TP</span>
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold text-gray-900">Tuition Platform</h2>
                                    <p className="text-xs text-gray-500">Student Portal</p>
                                </div>
                            </div>
                        </div>

                        {/* User Profile Section */}
                        <div className="flex items-center shrink-0 px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 font-semibold text-sm">
                                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'S'}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.displayName || 'Student'}
                                    </p>
                                    <p className="text-xs text-gray-500">Student</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-4 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isActive(item.path)
                                            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                                    }`}
                                >
                                    <span className={`mr-3 ${isActive(item.path) ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`}>
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Logout Button */}
                        <div className="px-4 py-4 border-t border-gray-100 mt-auto">
                            <button
                                onClick={handleLogout}
                                className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo/Brand Section */}
                    <div className="flex items-center px-4 py-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">TP</span>
                            </div>
                            <div className="ml-3">
                                <h2 className="text-lg font-semibold text-gray-900">Tuition Platform</h2>
                            </div>
                        </div>
                    </div>

                    {/* User Profile Section */}
                    <div className="flex items-center px-4 py-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-emerald-600 font-semibold text-sm">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'S'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.displayName || 'Student'}
                                </p>
                                <p className="text-xs text-gray-500">Student</p>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    isActive(item.path)
                                        ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                                }`}
                            >
                                <span className={`mr-3 ${isActive(item.path) ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Logout Button */}
                    <div className="px-4 py-4 border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
