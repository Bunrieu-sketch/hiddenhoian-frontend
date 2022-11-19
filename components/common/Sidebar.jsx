import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [sidebarData, setSidebarData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sidebar?populate=*`)
      .then((res) => res.json())
      .then((data) => setSidebarData(data?.data?.attributes));
  }, []);

  return (
    <SidebarContainer>
      <div className={`sidebar ${isSidebarOpen ? 'active-sidebar' : null}`}>
        <div className="sidebar-center">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <Link href="/">
                <a>
                  <Image
                    src={sidebarData?.logo?.data?.attributes?.url}
                    alt="logo"
                    width={195}
                    height={50}
                    objectFit="contain"
                  />
                </a>
              </Link>
            </div>
            <button className="sidebar-close-btn" onClick={toggleSidebar}>
              <FaTimes />
            </button>
          </div>

          <div className="sidebar-links">
            {sidebarData?.sidebarLinks?.map((link) => (
              <Link href={`${link?.linkUrl}`} key={link?.id}>
                <a className="link" onClick={toggleSidebar}>
                  {link?.linkText}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  .sidebar {
    position: fixed;
    top: -30px;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ccc;
    z-index: -1;
    opacity: 0;
    transform: scale(1.1);
    transition: var(--transition);
  }

  .sidebar.active-sidebar {
    top: 0;
    left: 0;
    transform: scale(1);
    opacity: 1;
    z-index: 99999;
  }

  .sidebar-center {
    margin-top: 10vh;
    padding: 15px;
  }

  .sidebar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .sidebar-close-btn {
    background: transparent;
    border: transparent;
    color: var(--clr-white);
    font-size: 1.5rem;
    align-self: start;
  }

  .sidebar-links {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .link {
    text-transform: capitalize;
    font-size: 1.5rem;
    color: var(--clr-orange);
    font-weight: bold;
  }

  @media (min-width: 992px) {
    display: none;
  }
`;

export default Sidebar;
