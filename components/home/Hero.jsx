import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';

const Hero = ({ latestBlogs: blogs }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Container>
      <Carousel
        containerClass="carousel-container"
        rewind={true}
        responsive={responsive}
        renderButtonGroupOutside={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        keyBoardControl={true}
        infinite={true}
      >
        {blogs?.map((b) => {
          const blog = b?.attributes;
          return (
            <Article key={b?.id}>
              <Image
                src={blog?.image?.data?.attributes?.url}
                alt={blog?.image?.data?.attributes?.name}
                layout="fill"
                className="image"
                objectFit="cover"
              />
              <div className="info">
                <div className="section-center">
                  <h3>{blog?.category}</h3>
                  <h1>
                    <Link
                      href={`/${slugify(blog?.category, {
                        lower: true,
                      })}/${blog?.slug}`}
                    >
                      <a>{blog?.title}</a>
                    </Link>
                  </h1>
                  <h4>{blog?.shortDescription.substr(0, 120)}</h4>
                </div>
              </div>
            </Article>
          );
        })}
      </Carousel>
    </Container>
  );
};

export const Container = styled.header`
  cursor: grab;

  .carousel-container {
    width: 100%;
    height: 50vh;

    @media (max-width: 768px) {
      height: 40vh;
    }
  }

  .react-multi-carousel-track {
    height: 100%;
  }

  .react-multiple-carousel__arrow {
    border-radius: 0;
    background: transparent;
    border: 1px solid var(--clr-white);
    padding: 0.5rem 1rem;

    &::before {
      transition: var(--transition);
      font-size: 1.5rem;
    }

    &:hover {
      background: var(--clr-white);
      &::before {
        color: var(--clr-orange);
      }
    }
  }

  .react-multiple-carousel__arrow--left {
    left: 5vw;
  }
  .react-multiple-carousel__arrow--right {
    right: 5vw;
  }
`;

export const Article = styled.article`
  position: relative;
  height: 100%;

  transition: var(--transition);

  &::after {
    transition: var(--transition);
  }

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        to bottom right,
        rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.25),
        rgba(0, 0, 0, 0.25)
      );
      z-index: 1;
    }
  }

  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 100%;
    padding: 120px 30px;
    z-index: 2;

    h3,
    h4 {
      color: var(--clr-white);
    }

    h1 {
      margin-bottom: 2.5rem;
      a {
        transition: var(--transition);
        color: var(--clr-white);

        &:hover {
          color: var(--clr-orange);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .info {
      padding: 70px 0;
      max-width: 100vw;
    }
  }
`;

export default Hero;
