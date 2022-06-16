import './global.css';
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';


const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
      includedDomains: [process.env.NEXT_PUBLIC_VERCEL_URL, 'recommend.ttp.sh'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (<>
    <Head>
      <title>Recommends</title>
    </Head>

    <div className="mx-auto max-w-screen-2xl">
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  </>);
};

export default MyApp;
