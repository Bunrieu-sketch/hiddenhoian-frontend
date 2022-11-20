import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import { SectionTitle } from '../common';
import { SnDSmall, SnDLarge } from '../blogLayouts';

const SeeAndDo = ({ seeAndDoDescription, seeAndDoBlogs: blogs }) => {
  const responsive = {
    tablet: {
      breakpoint: { max: 992, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <Container id="see&do" className="section">
      <div className="section-center">
        <SectionTitle title="See & Do" description={seeAndDoDescription} />

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
              return <SnDSmall key={blog?.id} {...blog} />;
            })}
          </Carousel>
        </div>

        <div className="blog-center-big">
          {blogs?.map((blog) => {
            return <SnDLarge key={blog?.id} {...blog} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  .blog-center-big {
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
      margin: 4rem auto 2rem;
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
      margin-top: 2rem;
      bottom: unset;
    }
  }
`;

export default SeeAndDo;
