import './global.css';
import { SkeletonTheme } from 'react-loading-skeleton';


const MyApp = ({ Component, pageProps }) => {
  return (
    <SkeletonTheme>
      <div className="mx-auto max-w-screen-lg">
        <Component {...pageProps} />
      </div>
    </SkeletonTheme>
  );
};

export default MyApp;
