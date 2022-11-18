import { unslugify } from 'unslugify';
import styled from 'styled-components';
import {
  AllArticles,
  FeaturedArticles,
  Header,
} from '../../components/blogsByCategory';
import { HeadSeo } from '../../components/common';
import { useRouter } from 'next/router';

const BlogsByCategory = ({ blogs, titlesData }) => {
  const { query } = useRouter();

  const {
    eatDescription,
    travelDescription,
    sleepDescription,
    seeAndDoDescription,
    generalDescription,
  } = titlesData?.attributes;

  const descriptions = {
    eat: eatDescription,
    travel: travelDescription,
    sleep: sleepDescription,
    'see-and-do': seeAndDoDescription,
    general: generalDescription,
  };

  return (
    <>
      <HeadSeo
        title={unslugify(query.category)}
        description={descriptions[query.category] || ''}
      />

      <Container className="section">
        <div className="section-center">
          <Header titlesData={titlesData} />
          <main>
            <FeaturedArticles blogs={blogs?.slice(0, 3)} />
            <AllArticles blogs={blogs?.slice(3)} />
          </main>
        </div>
      </Container>
    </>
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

  return {
    paths,
    fallback: true,
  };
};
