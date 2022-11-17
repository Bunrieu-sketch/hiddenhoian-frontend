import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/footer?populate=*`)
      .then((res) => res.json())
      .then((data) => setFooterData(data?.data?.attributes));
  }, []);

  return (
    <Container>
      <div className="section-center">
        <article className="header">
          <div className="logo">
            <Link href="/">
              <a>
                <Image
                  src={footerData?.logo?.data?.attributes?.url}
                  alt="logo"
                  width={173}
                  height={50}
                  objectFit="contain"
                />
              </a>
            </Link>
          </div>
          <div className="links">
            {footerData?.pageLinks?.map((link) => (
              <Link href={link?.linkUrl} key={link?.id}>
                <a>{link?.linkText}</a>
              </Link>
            ))}
          </div>
        </article>

        <div className="text">
          <p>{footerData?.footerText}</p>
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.footer`
  background: #444;
  color: #ffffff;
  text-align: center;

  .links {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    flex-direction: column;
    margin-top: 1rem;
    text-transform: capitalize;

    @media (min-width: 992px) {
      flex-direction: row;
      gap: 1rem;
    }
  }

  a {
    color: #ffffff;
  }

  .section-center {
    padding: 20px 0;
  }

  .text p {
    text-align: center;
    margin: 2.5rem auto 0;
  }
`;

export default Footer;
