import '../styles/globals.css';
import 'react-multi-carousel/lib/styles.css';
import { useState } from 'react';
import { Footer, Navbar, Sidebar } from '../components/common';

function MyApp({ Component, pageProps }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
