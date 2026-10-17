export function Footer() {
    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Tuitions', href: '#' },
        { name: 'Tutors', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
    ];
    return (
        <div>
            <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                        
                        
                        <div>
                            <div className="flex items-center gap-1 mb-6">
                                <span className="text-2xl font-extrabold text-orange-500">e</span>
                                <span className="text-2xl font-bold text-emerald-500">Tutor</span>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                eTutor is a trusted platform connecting ambitious students with expert tutors across the country. 
                                We are dedicated to making quality education accessible, affordable, and convenient for everyone.
                            </p>
                        </div>

                        
                        <div>
                            <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>
                            <ul className="space-y-3 text-sm">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href} 
                                            className="text-slate-400 hover:text-emerald-400 hover:pl-2 transition-all duration-300 flex items-center gap-2"
                                        >
                                            <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        
                        <div>
                            <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>123 Education Lane, Dhanmondi,<br/>Dhaka-1209, Bangladesh</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="hover:text-white transition-colors cursor-pointer">support@etutor.com</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span className="hover:text-white transition-colors cursor-pointer">+880 1712 345 678</span>
                                </li>
                            </ul>
                        </div>

                        
                        <div>
                            <h3 className="text-white text-lg font-bold mb-6">Follow Us</h3>
                            <p className="text-slate-400 text-sm mb-4">Stay connected with us for updates and news.</p>
                            <div className="flex gap-4">
                                
                                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg>
                                </a>
                                
                                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all duration-300 border border-slate-700 hover:border-slate-500">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                </a>
                                
                                <a href="#" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all duration-300">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                            </div>
                        </div>

                    </div>

                    
                    <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()} eTutor. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-slate-500">
                            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
