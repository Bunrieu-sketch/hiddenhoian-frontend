import styled from 'styled-components';
import BlogCard from './BlogCard';
import SectionTitle from './SectionTitle';

const AllArticles = ({ blogs }) => {
  if (blogs?.length === 0) return null;

  return (
    <Container>
      <SectionTitle title="all articles" />
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

export default AllArticles;
