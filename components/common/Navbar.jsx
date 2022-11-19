import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Navbar = ({ toggleSidebar }) => {
  const [navData, setNavData] = useState([]);
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const setDimension = () => {
    const ismobile = window.innerWidth < 1200;
    if (ismobile !== isMobile) setIsMobile(ismobile);
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension, false);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [isMobile]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/navbar?populate=*`)
      .then((res) => res.json())
      .then((data) => setNavData(data?.data?.attributes));
  }, []);

  return (
    <NavContainer>
      <div className="section-center">
        <div className="nav-center">
          <button className="nav-toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="nav-logo">
            <Link href="/">
              <a>
                <Image
                  src={navData?.logo?.data?.attributes?.url}
                  alt="logo"
                  width={isMobile ? 130 : 173}
                  height={isMobile ? 38 : 50}
                  objectFit="contain"
                />
              </a>
            </Link>
          </div>
          <div className="nav-links">
            {navData?.navLinks?.map((link) => (
              <Link href={`${link?.linkUrl}`} key={link?.id}>
                <a
                  className={`link ${
                    link?.linkUrl === router.asPath ? 'active-link' : null
                  }`}
                >
                  {link?.linkText}
                </a>
              </Link>
            ))}
          </div>
          <div className="nav-search">
            <FaSearch />
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

export const NavContainer = styled.nav`
  .nav-center {
    padding: 10px 0;
    display: grid;
    grid-template-columns: auto 1fr auto;
    place-items: center;
  }

  .nav-toggle-btn {
    background: transparent;
    border: transparent;
    cursor: pointer;

    svg {
      color: #444;
      font-size: 1.75rem;
    }
  }

  .nav-links {
    display: none;
  }

  .nav-search {
    cursor: pointer;

    svg {
      color: #707070;
      font-size: 1rem;
      transition: var(--transition);

      &:hover {
        color: var(--clr-orange);
      }
    }
  }

  @media (min-width: 992px) {
    .nav-center {
      padding: 15px 0;
      grid-template-columns: 130px 1fr 130px;
    }

    .nav-toggle-btn {
      display: none;
    }

    .nav-links {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding-right: 15px;
      padding-left: 15px;
      width: 100%;
      max-width: 540px;
    }

    .link {
      color: #707070;
      text-transform: uppercase;
    }
    .link.active-link {
      color: var(--clr-orange);
    }

    .nav-search {
      justify-self: end;
    }
  }

  @media (min-width: 1200px) {
    .nav-center {
      grid-template-columns: 173px 1fr 173px;
    }
  }
`;

export default Navbar;
