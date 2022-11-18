import styled from 'styled-components';
import BlogCard from './BlogCard';
import SectionTitle from './SectionTitle';

const FeaturedArticles = ({ blogs }) => {
  return (
    <Container className="section">
      <SectionTitle title="featured articles" />
      <div className="blog-center">
        {blogs?.map((blog) => {
          return <BlogCard key={blog?.id} {...blog} />;
        })}
      </div>
    </Container>
  );
};

export const Container = styled.section`
  .blog-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
      align-items: center;
    }
  }
`;

export default FeaturedArticles;
