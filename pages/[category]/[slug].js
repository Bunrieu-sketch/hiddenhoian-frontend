import { unslugify } from 'unslugify';
import { HeadSeo } from '../../components/common';
import { useRouter } from 'next/router';
import {
  Content,
  GoToTop,
  Header,
  ShareButtons,
  FeaturedBlogs,
  RecentBlogs,
} from '../../components/singleBlog';

const SingleBlogPage = ({ blog, featuredBlogs, recentBlogs }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <section className="section">
          <div className="section-center">
            <main>
              <div className="loading"></div>
            </main>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <HeadSeo
        title={blog?.title}
        description={blog?.shortDescription}
        imageUrl={`${blog?.image?.data?.attributes?.url}`}
      />

      <Header blog={blog} />
      <main>
        <Content blog={blog} />
        <hr className="section-center" />
        <ShareButtons />
        <FeaturedBlogs blogs={featuredBlogs} />
        <hr className="section-center" />
        <RecentBlogs blogs={recentBlogs} />
        <GoToTop blog={blog} />
      </main>
    </>
  );
};
export default SingleBlogPage;

export const getStaticProps = async (context) => {
  const { category, slug } = context?.params;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/blogs?filters[category][$eqi]=${unslugify(
      category
    )}&filters[slug][$eqi]=${slug}&populate=*`
  );
  const data = await res.json();

  // same category blogs
  const featuredRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/blogs?sort=createdAt:desc&pagination[limit]=3&filters[category][$eqi]=${unslugify(
      category
    )}&filters[slug][$ne]=${slug}&populate=*`
  );
  const featuredData = await featuredRes.json();

  // other category blogs
  const recentBlogsRes = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/blogs?sort=createdAt:desc&pagination[limit]=4&filters[category][$ne]=${unslugify(
      category
    ).toLowerCase()}&populate=*`
  );
  const recentBlogsData = await recentBlogsRes.json();

  return {
    props: {
      blog: data?.data[0]?.attributes,
      featuredBlogs: featuredData?.data,
      recentBlogs: recentBlogsData?.data,
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const data = await res.json();
  const blogs = data?.data;

  const paths = blogs?.map((blog) => ({
    params: {
      category: blog?.attributes?.category,
      slug: blog?.attributes?.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};
