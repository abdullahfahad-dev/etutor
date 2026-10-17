import { useCallback, useEffect, useState } from "react";
import useSecureAxios from "../../hook/useSecureAxios";

export function useQuery(url,
    {
        enabled = true,
        params = {},
        initialData = null,
    } = {}
) {
    const secureAxios = useSecureAxios();

    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!enabled || !url) return;

        setLoading(true);
        setError(null);

        try {
            const res = await secureAxios.get(url, { params });
            setData(res.data);
        } catch (err) {
            setError(err);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, [secureAxios, url, enabled, JSON.stringify(params)]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        isLoading: loading,
        isError: !!error,
        isSuccess: !!data && !loading,
        refetch: fetchData,
    };
}

export function useMutation() {
    const secureAxios = useSecureAxios();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(
        async ({ url, method = "post", body = {}, config = {} }) => {
            setLoading(true);
            setError(null);

            try {
                const response = await secureAxios({
                    url,
                    method,
                    data: body,
                    ...config,
                });

                setData(response.data);
                return response.data; // ⭐ RTK Query unwrap এর মতো
            } catch (err) {
                setError(err);
                throw err; // ⭐ caller handle করতে পারবে
            } finally {
                setLoading(false);
            }
        },
        [secureAxios]
    );

    return [
        mutate,
        {
            data,
            loading,
            error,
            isSuccess: !!data && !loading,
            isError: !!error,
        },
    ];
}