import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../../../hook/useAuth";
import Swal from "sweetalert2";

const TutorSidebar = ({ sidebarOpen, setSidebarOpen }) => {
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
            path: "/user/tutor/my-application",
            label: "My Applications",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            path: "/user/tutor/on-going-tution",
            label: "Ongoing Tuitions",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            path: "/user/tutor/revenue-history",
            label: "Revenue History",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
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
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">TP</span>
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-lg font-semibold text-gray-900">Tuition Platform</h2>
                                    <p className="text-xs text-gray-500">Tutor Portal</p>
                                </div>
                            </div>
                        </div>

                        {/* User Profile Section */}
                        <div className="flex items-center shrink-0 px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">
                                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.displayName || 'Tutor'}
                                    </p>
                                    <p className="text-xs text-gray-500">Tutor</p>
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
                                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                    }`}
                                >
                                    <span className={`mr-3 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`}>
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
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
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
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold text-sm">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
                                    </span>
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.displayName || 'Tutor'}
                                </p>
                                <p className="text-xs text-gray-500">Tutor</p>
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
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                                }`}
                            >
                                <span className={`mr-3 ${isActive(item.path) ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`}>
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
};
export default TutorSidebar;