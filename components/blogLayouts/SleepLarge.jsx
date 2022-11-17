import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

const SleepLarge = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/sleep/${blog?.slug}`}>
        <a>
          <Image
            src={blog?.image?.data?.attributes?.url}
            alt={blog?.image?.data?.attributes?.name}
            width={320}
            height={480}
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
  padding: 0 15px;
  position: relative;
  margin-bottom: 5rem;

  &:first-of-type {
    grid-column: 1 / span 2;
  }

  a {
    color: var(--textColor);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  span {
    width: 100% !important;
  }

  .info {
    position: absolute;
    bottom: -2.5rem;
    width: calc(100% - 3.5rem);
    background: var(--clr-white);
    padding: 10px 15px;

    h4 {
      margin-top: 0.25rem;
      transition: var(--transition);
      margin-bottom: 0.5rem;
    }

    span {
      color: var(--clr-orange);
    }
  }
`;

export default SleepLarge;
