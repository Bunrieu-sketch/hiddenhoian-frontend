import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { HeadSeo } from '../components/common';

const AboutPage = ({ data }) => {
  const { pageHeading, pageContent } = data.attributes;
  return (
    <>
      <HeadSeo title={pageHeading} description={pageContent.substr(0, 200)} />

      <Container className="section">
        <div className="section-center">
          <h2>{pageHeading}</h2>
          <div className="content">
            <ReactMarkdown>{pageContent}</ReactMarkdown>
          </div>
        </div>
      </Container>
    </>
  );
};

export const Container = styled.main`
  h2 {
    color: #444444;
    margin-bottom: 30px;
  }

  .content {
    padding-left: 2.5rem;
    p {
      max-width: unset;
    }
  }
`;

export default AboutPage;

export async function getStaticProps() {
  // data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/about-page?populate=*`
  );
  const data = await res.json();

  // footer data
  const footerRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/footer?populate=*`
  );
  const footerData = await footerRes.json();

  return {
    props: {
      data: data.data,
      footerData: footerData.data,
    },
    revalidate: 1,
  };
}
