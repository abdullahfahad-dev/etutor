import { Navigate, useLocation } from "react-router";
import { Loading } from "../components/utils/Loading";
import useAuth from "../hook/useAuth";

export function Privateroutes({children}) {
    const {user, loading: userLoading} = useAuth();
    const location = useLocation();
    if(userLoading) return <Loading />;

    if(user){
        return children;
    }else{
        return <Navigate to={'/user/login'} state={{from: location}} replace />
    }
}
