import { Outlet } from "react-router";
import { Studentsidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";
import { StudentFooter } from "./StudentFooter";
import useAuth from "../../../../hook/useAuth";
import Unauthorized from "../../Forbidden/Unauthorized";
import { Loading } from "../../../../components/utils/Loading";
import { useState } from "react";

export function Studentlayout() {
    const {userRole, userRoleLoading} = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    if(userRoleLoading) return <Loading />
    if(userRole != 'student') return <Unauthorized />
    
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            
            {/* Sidebar - Full Height */}
            <Studentsidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col lg:ml-64">
                {/* Header */}
                <StudentHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                
                {/* Content area */}
                <main className="flex-1 pt-16">
                    <div className="p-4 lg:p-8">
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    </div>
                </main>
                
                {/* Footer */}
                <StudentFooter />
            </div>
        </div>
    );
}
