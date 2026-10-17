import useAuth from "../../../../hook/useAuth";

export function TutorHeader({ sidebarOpen, setSidebarOpen }) {
    const { user } = useAuth();

    return (
        <>
            {/* Desktop Header */}
            <div className="hidden lg:block fixed top-0 left-64 right-0 z-30 bg-white border-b border-gray-200 h-16">
                <div className="flex items-center justify-between h-full px-6">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Tutor Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage your applications and earnings</p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84l3.12 3.12M4.03 8.86l3.12 3.12M1.01 11.88l3.12 3.12" />
                            </svg>
                        </button>
                        
                        {/* User Profile */}
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">
                                    {user?.displayName || 'Tutor User'}
                                </p>
                                <p className="text-xs text-gray-500">Tutor</p>
                            </div>
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-semibold text-sm">
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-16">
                <div className="flex items-center justify-between h-full px-4">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold text-gray-900">Tutor Dashboard</h1>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'T'}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}