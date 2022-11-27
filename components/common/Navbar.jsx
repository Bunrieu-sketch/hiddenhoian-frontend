import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Navbar = ({ toggleSidebar }) => {
  const router = useRouter();
  const [navData, setNavData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const setDimension = () => {
    const ismobile = window.innerWidth < 1200;
    if (ismobile !== isMobile) setIsMobile(ismobile);
  };

  const toggleSearchBox = () => {
    setShowSearch(!showSearch);
  };

  const onSearch = (e) => {
    e.preventDefault();
    router.push(`/search?s=${searchTerm}`, undefined, { shallow: true });
    setShowSearch(false);
    setSearchTerm('');
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
    <NavContainer id="header">
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
                  alt="HiddenHoiAn"
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
          <div className="nav-search" onClick={toggleSearchBox}>
            {showSearch ? <FaTimes style={{ color: 'red' }} /> : <FaSearch />}
          </div>
        </div>

        <SearchBox>
          <form
            onSubmit={onSearch}
            className={showSearch ? 'show-search' : null}
          >
            <input
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </SearchBox>
      </div>
    </NavContainer>
  );
};

export const NavContainer = styled.nav`
  background: var(--clr-white);

  .section-center {
    position: relative;
  }

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

export const SearchBox = styled.aside`
  position: absolute;
  top: 11px;
  background: #fff;
  max-width: 300px;
  right: 108px;

  @media (min-width: 992px) {
    top: 16px;
  }
  @media (min-width: 1200px) {
    top: 22px;
  }

  form {
    display: none;
    justify-content: center;
    align-items: center;
  }

  form.show-search {
    display: flex;
  }

  input {
    height: 40px;
    line-height: 40px;
    display: block;
    width: 100%;
    background: #fff;
    border: 0;
    border: 1px solid #707070;
    padding: 0 15px;
    font-weight: normal;
    font-size: 1rem;

    &::placeholder {
      color: #707070;
      font-family: var(--bodyFont);
      font-size: 1rem;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    background: #707070;
    color: #fff;
    border: 1px solid #707070;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background: #444;
    }
  }
`;

export default Navbar;
