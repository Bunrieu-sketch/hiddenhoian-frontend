import styled from 'styled-components';
import { HeadSeo } from '../../components/common';
import { useRouter } from 'next/router';
import { Header, AllBlogs } from '../../components/search';

const SearchPage = ({ blogs }) => {
  const { query, isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <Container className="section">
          <div className="section-center">
            <main>
              <div className="loading"></div>
            </main>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <HeadSeo title={`Search results for "${query?.title}"`} />

      <Container className="section">
        <div className="section-center">
          <Header />
          <main>{<AllBlogs blogs={blogs} />}</main>
        </div>
      </Container>
    </>
  );
};

export default SearchPage;

export const Container = styled.section``;

export const getStaticProps = async (context) => {
  const { title } = context?.params;

  // page data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=100&filters[title][$containsi]=${title}&populate=*`
  );
  const data = await res.json();

  return {
    props: {
      blogs: data?.data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const data = await res.json();
  const blogs = data?.data;
  const titles = blogs?.map((blog) => blog?.attributes?.title);
  const paths = titles?.map((title) => ({
    params: { title },
  }));

  return {
    paths,
    fallback: true,
  };
};
