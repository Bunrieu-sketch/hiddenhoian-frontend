import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import { SectionTitle } from '../common';
import { SleepSmall, SleepLarge } from '../blogLayouts';

const Sleep = ({ sleepDescription, sleepBlogs: blogs }) => {
  const responsive = {
    tablet: {
      breakpoint: { max: 992, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  const [isMobile, setIsMobile] = useState(false);

  const setDimension = () => {
    const ismobile = window.innerWidth < 992;
    if (ismobile !== isMobile) setIsMobile(ismobile);
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension, false);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [isMobile]);

  return (
    <Container id="sleep" className="section">
      <div className="section-center">
        <SectionTitle title="Sleep" description={sleepDescription} />
        {isMobile ? (
          <>
            <div className="blog-center">
              <Carousel
                showDots={true}
                renderDotsOutside={true}
                containerClass="carousel-container"
                rewind={true}
                responsive={responsive}
                renderButtonGroupOutside={true}
                removeArrowOnDeviceType={['tablet', 'mobile']}
                keyBoardControl={true}
              >
                {blogs?.map((blog) => {
                  return <SleepSmall key={blog?.id} {...blog} />;
                })}
              </Carousel>
            </div>
          </>
        ) : (
          <div className="blog-center-big">
            {blogs?.map((blog) => {
              return <SleepLarge key={blog?.id} {...blog} />;
            })}
          </div>
        )}
      </div>
    </Container>
  );
};

export const Container = styled.section`
  background-color: var(--clr-grey);

  .blog-center-big {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .carousel-container {
    width: 100%;
  }

  .react-multi-carousel-item {
    padding: 0 5px;
  }

  .blog-center {
    margin: 4rem auto 0;

    @media (max-width: 1024px) {
      margin: 4rem auto;
    }

    .react-multi-carousel-dot {
      button {
        border: 1px solid #ccc;
      }
    }
    .react-multi-carousel-dot--active {
      button {
        background: var(--clr-orange);
      }
    }
    .react-multiple-carousel__arrow--left {
      left: 0%;
    }
    .react-multiple-carousel__arrow--right {
      right: 0%;
    }

    .react-multi-carousel-dot-list {
      margin-top: 4rem;
      bottom: unset;
    }
  }
`;

export default Sleep;
