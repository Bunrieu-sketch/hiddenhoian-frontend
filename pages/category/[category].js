import { unslugify } from 'unslugify';
import styled from 'styled-components';
import {
  AllArticles,
  FeaturedArticles,
  Header,
} from '../../components/blogsByCategory';

const BlogsByCategory = ({ blogs, titlesData }) => {
  return (
    <Container className="section">
      <div className="section-center">
        <Header titlesData={titlesData} />
        <main>
          <FeaturedArticles blogs={blogs?.slice(0, 3)} />
          <AllArticles blogs={blogs?.slice(3)} />
        </main>
      </div>
    </Container>
  );
};

export const Container = styled.section``;

export default BlogsByCategory;

export const getStaticProps = async ({ params }) => {
  const { category } = params;

  // page data
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/blogs?sort=createdAt:desc&pagination[limit]=100&filters[category][$eqi]=${unslugify(
      category
    )}&populate=*`
  );
  const data = await res.json();

  // titles
  const titlesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home-page`
  );
  const titlesData = await titlesRes.json();

  return {
    props: {
      blogs: data?.data,
      titlesData: titlesData?.data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const data = await res.json();
  const blogs = data?.data;
  const categories = blogs?.map((blog) => blog?.attributes?.category);
  const paths = categories?.map((category) => ({
    params: { category },
  }));

  console.log('paths', paths);

  return {
    paths,
    fallback: true,
  };
};
