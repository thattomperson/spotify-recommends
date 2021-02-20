import './global.css';
import Head from 'next/head'

const MyApp = ({ Component, pageProps }) => {
  return (<>
    <Head>
      <title>Recommends</title>
    </Head>

    <div className="mx-auto max-w-screen-lg">
      <Component {...pageProps} />
    </div>
  </>);
};

export default MyApp;
