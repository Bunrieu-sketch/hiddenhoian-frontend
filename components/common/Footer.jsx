import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/footer?populate[0]=socialLinks.icon&populate[1]=pageLinks&populate[2]=logo&populate=*`
    )
      .then((res) => res.json())
      .then((data) => setFooterData(data?.data?.attributes));
  }, []);

  return (
    <FooterContainer>
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
              <Link href={`/${link?.linkUrl}`} key={link?.id}>
                <a>{link?.linkText}</a>
              </Link>
            ))}
          </div>
        </article>

        <div className="text">
          <div className="icons">
            {footerData?.socialLinks?.map((link) => (
              <a
                key={link?.id}
                href={link?.url}
                target={'_blank'}
                rel="noopener noreferrer"
              >
                <Image
                  src={link?.icon?.data?.attributes?.url}
                  alt="icon"
                  width={20}
                  height={20}
                  objectFit="contain"
                />
              </a>
            ))}
          </div>
          <p>{footerData?.footerText}</p>
        </div>
      </div>
    </FooterContainer>
  );
};

export const FooterContainer = styled.footer`
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

    &:hover {
      text-decoration: underline;
    }
  }

  .section-center {
    padding: 20px 0;
  }

  .text {
    .icons {
      margin: 1rem 0 0.5rem 0;
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    p {
      text-align: center;
      margin: 0 auto;
    }
  }
`;

export default Footer;
