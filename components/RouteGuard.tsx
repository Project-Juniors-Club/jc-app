import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

import { authorizedState } from '../atoms/atoms';

export function RouteGuard({ children }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useRecoilState(authorizedState);
    const isAuth = useRef(authorized);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // // on route change start - hide page content by setting authorized to false  
        // const hideContent = () => setAuthorized(false);
        // router.events.on('routeChangeStart', hideContent);

        // // on route change complete - run auth check 
        // router.events.on('routeChangeComplete', authCheck)

        // // unsubscribe from events in useEffect return function
        // return () => {
        //     router.events.off('routeChangeStart', hideContent);
        //     router.events.off('routeChangeComplete', authCheck);
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const publicPaths = ['/users/create'];
        const path = url.split('?')[0];
        if (!authorized) {
            console.log("not authorized")
            router.push('/users/create');
            console.log(router.asPath);
        } else {
            console.log("authorised")
        }
    }

    return (children);
}