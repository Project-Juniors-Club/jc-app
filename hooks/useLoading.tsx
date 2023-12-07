import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useLoading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      document.body.style.overflow = 'hidden';
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      document.body.style.overflow = 'auto';
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return loading;
};

export default useLoading;
