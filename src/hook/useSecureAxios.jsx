import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useAuth from "./useAuth";

const secureAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default function useSecureAxios() {
    const { user, loading: userLoading } = useAuth();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const requestIntercepter = secureAxios.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })
        setLoading(false)
        return () => {
            secureAxios.interceptors.request.eject(requestIntercepter)
        }
    }, [user, userLoading])


    return {
        secureAxios,
        loading
    };
}
