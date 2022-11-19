import '../styles/globals.css';
import 'react-multi-carousel/lib/styles.css';
import { Footer, Navbar } from '../components/common';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
