import Image from 'next/image';
import styled from 'styled-components';
import { HeadSeo } from '../components/common';

const ContactPage = ({ data }) => {
  const { pageHeading, pageImage, infoText, email, address } = data.attributes;

  return (
    <>
      <HeadSeo
        title={pageHeading}
        description={
          'Contact Hidden Hoi An on the details below. Hidden Hoi An is dedicated to producing the best possible traveller resources.'
        }
      />
      <Container className="section">
        <div className="section-center">
          <h1>{pageHeading}</h1>

          <div className="contact-center">
            <article className="contact-form">
              <form>
                <h3>GET IN TOUCH</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="form-control"
                    placeholder="Subject"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    placeholder="Message"
                  ></textarea>
                </div>

                <div className="form-group">
                  <button type="submit" className="submit-btn btn">
                    Send Message
                  </button>
                </div>
              </form>
            </article>

            <article className="contact-info">
              <Image
                src={pageImage?.data?.attributes?.url}
                alt="contact image"
                width={965}
                height={643}
              />
              <p>{infoText}</p>
              <div className="details">
                <h4>E-mail</h4>
                <a href={`mailto:${email}`}>{email}</a>
                <h4>Address</h4>
                <p>{address}</p>
              </div>
            </article>
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

  .contact-form {
    h3 {
      margin-bottom: 1.5rem;
    }
  }

  .form-group {
    margin: 1.25rem 0;
    .form-control {
      background: #efefef;
      border: 1px solid #e2e1e1;
      padding: 0 10px;
      display: block;
      width: 100%;
      line-height: 40px;
      font-size: 1rem;

      &::placeholder {
        font-family: var(--bodyFont);
      }
    }

    textarea {
      resize: vertical;
      height: 100px;
    }
  }

  .submit-btn {
    background: var(--clr-orange);
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
