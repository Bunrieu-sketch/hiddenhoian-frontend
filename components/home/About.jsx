import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Scrollspy from 'react-scrollspy';

const About = ({ aboutTitle, aboutText }) => {
  const links = [
    {
      id: 1,
      url: '#header',
      text: 'home',
    },
    {
      id: 2,
      url: '#eat',
      text: 'eat',
    },
    {
      id: 3,
      url: '#travel',
      text: 'travel',
    },
    {
      id: 4,
      url: '#sleep',
      text: 'sleep',
    },
    {
      id: 5,
      url: '#see&do',
      text: 'see & do',
    },
    {
      id: 6,
      url: '#general',
      text: 'general',
    },
    {
      id: 7,
      url: '#maps',
      text: 'maps',
    },
  ];
  const [scrolled, setScrolled] = useState(false);
  const isBrowser = () => typeof window !== 'undefined';

  if (isBrowser()) {
    window.addEventListener('scroll', () => {
      const scrollHeight = window.pageYOffset;

      if (scrollHeight > 599) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }

  return (
    <Container id="about">
      <div className="section-center">
        <div className={`${scrolled ? 'fix' : null}`}>
          <Scrollspy
            items={[
              'about',
              'eat',
              'travel',
              'sleep',
              'see&do',
              'general',
              'maps',
            ]}
            currentClassName="active-link"
            offset={-50}
            scrolledPastClassName="scrolled"
          >
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </Scrollspy>
        </div>

        <div className="info">
          <h3>{aboutTitle}</h3>
          <p>{aboutText}</p>
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  padding-top: 0;

  .section-center {
    text-align: center;

    .info {
      padding: 4rem 0;
    }

    p {
      margin: 1.5rem auto 0;
      max-width: 42rem;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    max-width: 1300px;
    margin: 0 auto;

    li {
      a {
        display: block;
        text-transform: uppercase;
        padding: 10px 15px;
        font-size: 20px;
        color: #707070;
        border-top: 1px solid #c3c3c3;
        border-bottom: 1px solid #c3c3c3;
        border-left: 1px solid #c3c3c3;
        text-align: center;
        background: #fff;

        &:hover {
          background: var(--clr-orange);
          color: #fff;
          border-color: var(--clr-orange);
        }
      }
      &:last-child {
        border-right: 1px solid #c3c3c3;
      }
    }

    .active-link {
      a {
        background: var(--clr-orange);
        color: #fff;
        border-color: var(--clr-orange);
      }
    }

    .scrolled {
      background: #fff;
      color: #707070;
      border-color: #c3c3c3;
    }

    @media (max-width: 992px) {
      display: none;
    }
  }

  .fix {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    background: #fff;
  }
`;
export default About;
