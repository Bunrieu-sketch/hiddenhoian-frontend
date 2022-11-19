import { HeadSeo } from '../components/common';
import {
  Hero,
  About,
  Eat,
  Travel,
  Sleep,
  SeeAndDo,
  General,
  Maps,
} from '../components/home';

export default function Home({
  data,
  latestBlogs,
  eatBlogs,
  travelBlogs,
  sleepBlogs,
  seeAndDoBlogs,
  generalBlogs,
}) {
  const {
    aboutTitle,
    aboutText,
    eatDescription,
    travelDescription,
    sleepDescription,
    seeAndDoDescription,
    generalDescription,
    maps,
  } = data?.attributes;

  return (
    <>
      <HeadSeo title="Homepage" />
      <Hero latestBlogs={latestBlogs} />
      <main>
        <About aboutTitle={aboutTitle} aboutText={aboutText} />
        <Eat eatDescription={eatDescription} eatBlogs={eatBlogs} />
        <Travel
          travelDescription={travelDescription}
          travelBlogs={travelBlogs}
        />
        <Sleep sleepDescription={sleepDescription} sleepBlogs={sleepBlogs} />
        <SeeAndDo
          seeAndDoDescription={seeAndDoDescription}
          seeAndDoBlogs={seeAndDoBlogs}
        />
        <General
          generalDescription={generalDescription}
          generalBlogs={generalBlogs}
        />
        <Maps maps={maps} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  // recent blogs
  const recentBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=6&populate=*`
  );
  const recentBlogsData = await recentBlogsRes.json();

  // page data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/home-page?populate=*`
  );
  const data = await res.json();

  // blogs -> eat
  const eatBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=4&filters[category][$eqi]=eat&populate=*`
  );
  const eatBlogsData = await eatBlogsRes.json();

  // blogs -> travel
  const travelBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=5&filters[category][$eqi]=travel&populate=*`
  );
  const travelBlogsData = await travelBlogsRes.json();

  // blogs -> sleep
  const sleepBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=5&filters[category][$eqi]=sleep&populate=*`
  );
  const sleepBlogsData = await sleepBlogsRes.json();

  // blogs -> see and do
  const seeAndDoBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=3&filters[category][$eqi]=see and do&populate=*`
  );
  const seeAndDoBlogsData = await seeAndDoBlogsRes.json();

  // blogs -> general
  const generalBlogsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?sort=createdAt:desc&pagination[limit]=5&filters[category][$eqi]=general&populate=*`
  );
  const generalBlogsData = await generalBlogsRes.json();

  return {
    props: {
      latestBlogs: recentBlogsData.data,
      data: data.data,
      eatBlogs: eatBlogsData.data,
      travelBlogs: travelBlogsData.data,
      sleepBlogs: sleepBlogsData.data,
      seeAndDoBlogs: seeAndDoBlogsData.data,
      generalBlogs: generalBlogsData.data,
    },
    revalidate: 1,
  };
}
