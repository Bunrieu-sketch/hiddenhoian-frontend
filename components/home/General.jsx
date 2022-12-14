import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import { SectionTitle } from '../common';
import { GeneralLarge, GeneralSmall } from '../blogLayouts';

const General = ({ generalDescription, generalBlogs: blogs }) => {
  const responsive = {
    tablet: {
      breakpoint: { max: 992, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  return (
    <Container id="general" className="section">
      <div className="section-center">
        <SectionTitle title="General" description={generalDescription} />

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
              return <GeneralSmall key={blog?.id} {...blog} />;
            })}
          </Carousel>
        </div>

        <div className="blog-center-big">
          {blogs?.slice(0, 4).map((blog) => {
            return <GeneralLarge key={blog?.id} {...blog} />;
          })}
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  background-color: var(--clr-grey);
  .blog-center-big {
    grid-template-columns: repeat(4, 1fr);
    transform: translateX(-20px);
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

export default General;
