import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const secureAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default function useSecureAxios() {
    const { user, loading: userLoading } = useAuth();

    useEffect(() => {
        const requestIntercepter = secureAxios.interceptors.request.use(async function (config) {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    config.headers.Authorization = `Bearer ${token}`;
                } catch {
                    if (user.accessToken) {
                        config.headers.Authorization = `Bearer ${user.accessToken}`;
                    }
                }
            }
            return config;
        });

        return () => {
            secureAxios.interceptors.request.eject(requestIntercepter);
        };
    }, [user, userLoading]);

    return {
        secureAxios,
        loading: userLoading
    };
}
