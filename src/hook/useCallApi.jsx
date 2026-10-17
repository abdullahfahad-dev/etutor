import { useEffect, useState } from "react";
import useSecureAxios from "./useSecureAxios";

export function useCheckRole() {
  const { secureAxios, loading: axiosLoading } = useSecureAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    let isMounted = true;

    if (!axiosLoading) {
      setLoading(true);
      setError(null);

      secureAxios.get('/api/user/role-check')
        .then(response => {
          if (!isMounted) return;
          if (response?.data?.success) {
            setData(response.data);
            setLoading(false);
          } else {
            setData(null);
            setLoading(false);
          }
        })
        .catch(err => {
          if (!isMounted) return;
          setError(err);
          setLoading(false);
          setData(null);
        });
        
    return () => {
      isMounted = false;
    };
    }

  }, [secureAxios, axiosLoading]);


  return { data, loading, error };
}
