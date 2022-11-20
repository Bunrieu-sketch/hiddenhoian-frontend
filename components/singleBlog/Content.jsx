import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Content = ({ blog }) => {
  return (
    <Container className="section">
      <div className="section-center">
        <div className="single-blog-center">
          <ReactMarkdown>{blog?.body}</ReactMarkdown>
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  padding: 3rem 0;
  font-family: var(--thirdFont);

  .single-blog-center {
    max-width: 45rem;
    margin-left: auto;
    margin-right: auto;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    max-width: 100%;
    margin-bottom: 1.5rem;
    font-family: var(--thirdFont);
  }

  hr {
    margin: 1.5rem 0;
  }

  blockquote {
    font-size: 22px;
    line-height: 1.4;
    padding: 10px 0 10px 20px;
    margin: 0 0 25px;
    border-left: 4px solid #2b6;

    p {
      margin-bottom: 0;
    }
  }

  code {
    background: #f7fafa;
    color: rgb(50, 77, 103);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    margin-left: 1rem;
    font-family: 'Courier New', Courier, monospace;
  }

  pre code {
    display: block;
    white-space: pre;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
  }

  a {
    color: var(--clr-orange);

    &:hover {
      color: var(--clr-red2);
    }
  }
`;

export default Content;
