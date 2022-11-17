import '../styles/globals.css';
import 'react-multi-carousel/lib/styles.css';
import { Footer } from '../components/common';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
