import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@contexts';

export const RouteGuard = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const router = useRouter();
  const user = useUser();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const authCheck = (url: string) => {
      // redirect to login page if accessing a private page and not logged in 
      const publicPaths = ['/login', '/items'];
      const path = url.split('?')[0];
      if (!user && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        }, undefined, {shallow: true});
      } else {
        setAuthorized(true);
      }
    }

    // on initial load - run auth check 
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false  
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // on route change complete - run auth check 
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }

  }, [user, router]);

  return <>{authorized && <>{children}</>}</>;
}
