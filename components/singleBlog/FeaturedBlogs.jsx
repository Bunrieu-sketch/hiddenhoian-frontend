import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import styled from 'styled-components';

const FeaturedBlogs = ({ blogs }) => {
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

  if (blogs?.length === 0) return null;

  return (
    <Container className="section-center">
      <h3>You might also like</h3>

      <div className="blogs-center">
        {(isMobile ? blogs?.slice(0, 2) : blogs)?.map((blog) => (
          <BlogContainer key={blog?.id}>
            <Link
              href={`/${slugify(blog.attributes?.category, {
                lower: true,
              })}/${blog.attributes?.slug}`}
            >
              <a>
                <Image
                  src={blog?.attributes?.image?.data?.attributes?.url}
                  alt={blog?.attributes?.image?.data?.attributes?.name}
                  width={400}
                  height={240}
                  className="image"
                />
                <div className="info">
                  <h4>{blog?.attributes?.title}</h4>
                </div>
              </a>
            </Link>
          </BlogContainer>
        ))}
      </div>
    </Container>
  );
};

export const Container = styled.section`
  padding-bottom: 2rem;

  h3 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .blogs-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export const BlogContainer = styled.article`
  span {
    width: 100% !important;
  }

  h4 {
    margin-top: 0.5rem;
    transition: var(--transition);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }
`;

export default FeaturedBlogs;
