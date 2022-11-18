import styled from 'styled-components';
import { useRouter } from 'next/router';
import { unslugify } from 'unslugify';
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
} from 'react-share';

const ShareButtons = () => {
  const {
    asPath,
    query: { slug },
  } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${asPath}`;
  const title = `Check out this blog post on ${unslugify(slug)} -`;

  return (
    <Container>
      <div className="section-center">
        <article>
          <p>Share this post</p>
          <div className="social-links">
            <FacebookShareButton url={URL} quote={title}>
              <FacebookIcon size={24} round={true} />
            </FacebookShareButton>
            <TwitterShareButton url={URL} title={title}>
              <TwitterIcon size={24} round={true} />
            </TwitterShareButton>
            <PinterestShareButton url={URL} media={title}>
              <PinterestIcon size={24} round={true} />
            </PinterestShareButton>
          </div>
        </article>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  article {
    margin: 2rem 0;
    display: flex;
    gap: 2rem;
  }

  .social-links {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.25rem;
  }

  p {
    margin-bottom: 0;
    font-family: var(--thirdFont);
    text-transform: uppercase;
    font-weight: 500;
    align-self: center;
  }
`;

export default ShareButtons;
