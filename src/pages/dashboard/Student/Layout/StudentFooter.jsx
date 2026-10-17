export function StudentFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm text-gray-600">
                            © {currentYear} Tuition Platform. All rights reserved.
                        </p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                            Help Center
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                            Guidelines
                        </a>
                        <a href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
                            Contact Support
                        </a>
                    </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
                        <p className="text-xs text-gray-500">
                            Student Portal - Last updated: {new Date().toLocaleDateString()}
                        </p>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-xs text-gray-500">All Services Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}