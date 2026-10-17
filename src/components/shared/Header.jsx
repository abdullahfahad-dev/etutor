import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../hook/useAuth";

export function Header() {
    const { user, loading: userLoading, logout, userRole } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoggedIn(user ? true : false)
        }
        fetchData();
    }, [user, userLoading])


    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


    const [isProfileOpen, setIsProfileOpen] = useState(false);


    const [isScrolled, setIsScrolled] = useState(false);


    const profileRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        setIsLoggedIn(false);
        setIsProfileOpen(false);
        const result = await logout();
        console.log(result)
        Swal.fire('Success', 'Logout Successfully', 'success')
    }

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Tuitions', href: '/tutions' },
        { name: 'Tutors', href: '/tutors' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];
    if (userLoading) return ''


    const dashboardRoute = {
        student: { label: "Dashboard", to: "/user/student/my-tution" },
        tutor: { label: "My Application", to: "/user/tutor/my-application" },
        admin: { label: "Dashboard", to: "/user/admin/report-analysis" },
    };

    console.log(userRole)

    return (
        <div>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/95 backdrop-blur-sm py-4 border-b border-gray-100'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center">


                        <Link to={'/'} className="flex items-center gap-1 group">
                            <span className="text-2xl font-extrabold text-orange-500 group-hover:scale-110 transition-transform">e</span>
                            <span className="text-2xl font-bold text-emerald-600">Tutor</span>
                        </Link>


                        <div className="hidden lg:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>


                        <div className="hidden lg:flex items-center gap-3">
                            {isLoggedIn ? (
                                <>

                                    {dashboardRoute[userRole] && (
                                        <Link
                                            to={dashboardRoute[userRole].to}
                                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
                                        >
                                            {dashboardRoute[userRole].label}
                                        </Link>
                                    )}



                                    <div className="relative" ref={profileRef}>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex cursor-pointer items-center gap-2 focus:outline-none"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-emerald-100 border-2 border-emerald-500 p-0.5 overflow-hidden">
                                                <img
                                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Muzahidul"
                                                    alt="User"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </button>


                                        {isProfileOpen && (
                                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 overflow-hidden animate-fade-in-down">
                                                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                                    <p className="text-sm font-bold text-gray-800">{user?.displayName}</p>
                                                    <p className="text-xs text-gray-500">{user?.email}</p>
                                                </div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-medium cursor-pointer"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/user/login" className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors">
                                        Login
                                    </Link>
                                    <Link to="/user/register" className="px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-md shadow-emerald-200 transition-all hover:shadow-lg transform hover:-translate-y-0.5">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>


                        <button
                            className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>


                    {isMobileMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 animate-fade-in">
                            <div className="flex flex-col space-y-2 mt-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="px-4 py-3 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                <div className="border-t border-gray-100 my-2 pt-2">
                                    {isLoggedIn ? (
                                        <>
                                            <Link href="#" className="block px-4 py-3 text-emerald-600 font-bold bg-emerald-50/50 rounded-lg mb-2">
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => setIsLoggedIn(false)}
                                                className="w-full text-left px-4 py-3 text-red-500 font-medium hover:bg-red-50 rounded-lg"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col gap-3 px-4">
                                            <Link to="/user/register" className="w-full text-center py-3 text-gray-700 font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                                                Login
                                            </Link>
                                            <Link to="/user/login" className="w-full text-center py-3 text-white font-medium bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                                                Register
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
