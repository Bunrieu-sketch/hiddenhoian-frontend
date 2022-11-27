import { unslugify } from 'unslugify';
import styled from 'styled-components';
import { HeadSeo } from '../../components/common';
import { useRouter } from 'next/router';
import {
  AllArticles,
  FeaturedArticles,
  Header,
  OtherCategories,
} from '../../components/blogsByCategory';

const BlogsByCategory = ({ blogs, titlesData, categories }) => {
  const { query, isFallback } = useRouter();

  const featuredBlogs = blogs?.filter((blog) => blog?.attributes?.featured);
  const nonFeaturedBlogs = blogs?.filter((blog) => !blog?.attributes?.featured);

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
            <FeaturedArticles blogs={featuredBlogs} />
            <AllArticles blogs={nonFeaturedBlogs} />
            <OtherCategories categories={categories} />
          </main>
        </div>
      </Container>
    </>
  );
};

export const Container = styled.section``;

export default BlogsByCategory;

export const getStaticProps = async (context) => {
  const { category } = context?.params;

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

  // other categories
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=100&fields[0]=category`
  );
  const categoriesData = await categoriesRes.json();
  const categories = [
    ...new Set(categoriesData?.data?.map((blog) => blog?.attributes?.category)),
  ]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 3);

  return {
    props: {
      blogs: data?.data,
      titlesData: titlesData?.data,
      categories,
    },
    revalidate: 1,
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
