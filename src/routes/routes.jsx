import { createBrowserRouter, Outlet } from "react-router";
import App from "../App";
import { Rootlayout } from "../components/shared/RootLayout";
import { Home } from "../pages/frontend/Home/Home";
import Register from "../pages/frontend/Register/Register";
import Login from "../pages/frontend/Login/Login";
import TuitionsPage from "../pages/frontend/Tutions/TutionsPage";
import TuitionDetailsPage from "../pages/frontend/TutionDetails/TutionDetails";
import TutorsPage from "../pages/frontend/Tutors/Tutors";
import TutorProfilePage from "../pages/frontend/SingleTutor/SingleTutor";
import ContactPage from "../pages/frontend/Contact/Contact";
import AboutPage from "../pages/frontend/AboutUs/AboutUs";
import { Studentlayout } from "../pages/dashboard/Student/Layout/StudentLayout";
import MyTutions from "../pages/dashboard/Student/pages/MyTutions/MyTutions";
import PostNewTuition from "../pages/dashboard/Student/pages/PostNewTution/PostNewTution";
import AppliedTutors from "../pages/dashboard/Student/pages/AppliedTutors/AppliedTutors";
import PaymentHistory from "../pages/dashboard/Student/pages/Payment/PaymentHistory";
import ProfileSettings from "../pages/dashboard/Student/pages/ProfileSettings/ProfileSettings";
import { Tutorlayout } from "../pages/dashboard/Tutor/Layout/TutorLayout";
import MyApplication from "../pages/dashboard/Tutor/pages/MyApplication/MyApplication";
import OngoingTuition from "../pages/dashboard/Tutor/pages/OngoingTution/OngoingTution";
import RevenueHistory from "../pages/dashboard/Tutor/pages/RevenueHistory/RevenueHistory";
import { Adminlayout } from "../pages/dashboard/Admin/Layout/AdminLayout";
import UserManagement from "../pages/dashboard/Admin/pages/Users/UserManagement";
import TuitionManagement from "../pages/dashboard/Admin/pages/TutionManagement/TutionManagement";
import ReportAnalysis from "../pages/dashboard/Admin/pages/ReportAnalysis/ReportAnalysis";
import { Privateroutes } from "./PrivateRoutes";
import { Authlayout } from "../components/shared/AuthLayout";
import AppliedTutorByTuition from "../pages/frontend/AppliedTutorByTuition/AppliedTutorByTuition";
import PaymentSuccess from "../pages/frontend/payment/PaymentSuccess";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Rootlayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/tutions',
                element: <TuitionsPage />
            },
            {
                path: '/tutions/:id',
                element: <TuitionDetailsPage />
            },
            {
                path: '/tutors',
                element: <TutorsPage />
            },
            {
                path: '/tutors/:id',
                element: <TutorProfilePage />
            },
            {
                path: '/contact',
                element: <ContactPage />
            },
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/payment-success',
                element: <PaymentSuccess />
            },
            {
                path: 'user',
                element: <Authlayout />,
                children: [
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    }
                ]
            }
        ]
    },
    {
                path: 'user',
                element: <Privateroutes><Outlet /></Privateroutes>,
                children: [
                    {
                        path: 'student',
                        element: <Studentlayout />,
                        children: [
                            {
                                path: 'my-tution',
                                element: <MyTutions />
                            },
                            {
                                path: 'post-new-tution',
                                element: <PostNewTuition />
                            },
                            {
                                path: 'applied-tutors',
                                element: <AppliedTutors />
                            },
                            {
                                path: 'applied-tutors/:id',
                                element: <AppliedTutorByTuition />
                            },
                            {
                                path: 'payment-history',
                                element: <PaymentHistory />
                            },
                            {
                                path: 'profile-settings',
                                element: <ProfileSettings />
                            }
                        ]
                    },
                    {
                        path: 'tutor',
                        element: <Tutorlayout />,
                        children: [
                            {
                                path: 'my-application',
                                element: <MyApplication />
                            },
                            {
                                path: 'on-going-tution',
                                element: <OngoingTuition />
                            },
                            {
                                path: 'revenue-history',
                                element: <RevenueHistory />
                            }
                        ]
                    },
                    {
                        path: 'admin',
                        element: <Adminlayout />,
                        children: [
                            {
                                path: 'users',
                                element: <UserManagement />
                            },
                            {
                                path: 'tuition-management',
                                element: <TuitionManagement />
                            },
                            {
                                path: 'report-analysis',
                                element: <ReportAnalysis />
                            }
                        ]
                    }
                ]
            }
]);

export default routes;