import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';
import slugify from 'slugify';

const BlogCard = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link
        href={`/${slugify(blog?.category, {
          lower: true,
        })}/${blog?.slug}`}
      >
        <a>
          <Image
            src={blog?.image?.data?.attributes?.url}
            alt={blog?.image?.data?.attributes?.name}
            width={480}
            height={320}
            className="image"
          />
          <div className="info">
            <h4>{blog?.title}</h4>
            <p>{blog?.shortDescription.substr(0, 150)}...</p>
            <span>
              read more <FaAngleDoubleRight />
            </span>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export const Wrapper = styled.article`
  height: 100%;

  a {
    color: var(--textColor);
    height: 100%;
  }

  span {
    width: 100% !important;
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  .info {
    width: calc(100% - 1rem);
    margin: 0 auto;
    background: var(--clr-white);
    padding: 15px;
    text-align: center;
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    margin-top: -2.5rem;
    z-index: 10;

    h4 {
      z-index: 10;
      padding: 30px 15px 15px;
      background: var(--clr-white);
      transition: var(--transition);
      margin-bottom: 0.5rem;
    }

    span {
      color: var(--clr-orange);
    }

    p {
      font-family: var(--thirdFont);
    }
  }
`;

export default BlogCard;
