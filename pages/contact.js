import styled from 'styled-components';
import { HeadSeo } from '../components/common';
import { ContactInfo, ContactForm } from '../components/contact';

const ContactPage = ({ data }) => {
  const { pageHeading, pageImage, infoText, email, address } = data.attributes;

  return (
    <>
      <HeadSeo
        title={pageHeading}
        description={
          'Contact Hidden Hoi An on the details below. Hidden Hoi An is dedicated to producing the best possible traveler resources.'
        }
      />
      <Container className="section">
        <div className="section-center">
          <h1>{pageHeading}</h1>

          <div className="contact-center">
            <ContactForm />

            <ContactInfo
              pageImage={pageImage}
              infoText={infoText}
              email={email}
              address={address}
            />
          </div>
        </div>
      </Container>
    </>
  );
};
export default ContactPage;

export const Container = styled.main`
  h1 {
    text-align: center;
    color: #444444;
    margin-bottom: 2rem;
  }

  .details {
    h4 {
      margin-bottom: 0.25rem;
    }

    a {
      margin-bottom: 0.75rem;
      display: block;
      color: var(--clr-orange);
    }
  }

  .contact-center {
    display: grid;
    grid-template-columns: 1fr;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
      column-gap: 2rem;
    }
  }
`;

export async function getStaticProps() {
  // data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/contact-page?populate=*`
  );
  const data = await res.json();

  return {
    props: {
      data: data.data,
    },
    revalidate: 1,
  };
}
