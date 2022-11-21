import styled from 'styled-components';
import BlogCard from './BlogCard';

const AllBlogs = ({ blogs }) => {
  if (blogs?.length === 0) {
    return (
      <Container>
        <div className="blog-center no-blogs">
          <h2>No blogs found :/</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
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
      grid-template-columns: repeat(4, 1fr);
      align-items: center;
      gap: 2rem 1.75rem;
    }
  }

  .no-blogs {
    min-height: calc(100vh - 552px);
    place-items: center;
    display: grid;
    grid-template-columns: 1fr;

    h2 {
      text-align: center;
      color: #707070;
    }
  }
`;

export default AllBlogs;
