import { Navigate, Outlet } from "react-router";
import useAuth from "../../hook/useAuth";
import { Loading } from "../utils/Loading";

export function Authlayout() {
    const {user, loading: userLoading} = useAuth();
    if(userLoading) return <Loading />

    if(user){
        return <Navigate to={'/'} />
    }

    return <Outlet />
}
