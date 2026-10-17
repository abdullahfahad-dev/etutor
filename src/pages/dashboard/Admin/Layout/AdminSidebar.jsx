import { Link, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../hook/useAuth";

export function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
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
            path: "/user/admin/users",
            label: "User Management",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            )
        },
        {
            path: "/user/admin/tuition-management",
            label: "Tuition Management",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            )
        },
        {
            path: "/user/admin/report-analysis",
            label: "Reports & Analytics",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">TP</span>
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold text-gray-900">Tuition Platform</h2>
                                    <p className="text-xs text-gray-500">Admin Panel</p>
                                </div>
                            </div>
                        </div>
                        {/* User Profile Section */}
                        <div className="flex items-center shrink-0 px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 font-semibold text-sm">
                                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.displayName || 'Admin'}
                                    </p>
                                    <p className="text-xs text-gray-500">Administrator</p>
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
                                            ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                    }`}
                                >
                                    <span className={`mr-3 ${isActive(item.path) ? 'text-purple-500' : 'text-gray-400 group-hover:text-purple-500'}`}>
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
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
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
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold text-sm">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.displayName || 'Admin'}
                                </p>
                                <p className="text-xs text-gray-500">Administrator</p>
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
                                        ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600'
                                }`}
                            >
                                <span className={`mr-3 ${isActive(item.path) ? 'text-purple-500' : 'text-gray-400 group-hover:text-purple-500'}`}>
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