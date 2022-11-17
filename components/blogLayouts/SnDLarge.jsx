import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

const SnDLarge = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/see-and-do/${blog?.slug}`}>
        <a>
          <div className="info">
            <h4>{blog?.title}</h4>
            <p>{blog?.shortDescription.substr(0, 150)}...</p>
            <span>
              read more <FaAngleDoubleRight />
            </span>
          </div>
          <Image
            src={blog?.image?.data?.attributes?.url}
            alt={blog?.image?.data?.attributes?.name}
            width={400}
            height={300}
            className="image"
          />
        </a>
      </Link>
    </Wrapper>
  );
};

export const Wrapper = styled.article`
  padding: 0 15px;

  a {
    color: var(--textColor);
    display: flex;
    flex-direction: column;
  }

  span {
    width: 100% !important;
  }

  h4 {
    transition: var(--transition);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  .info {
    /* order: 1; */
    padding: 40px 30px;
    order: 1 h4 {
      margin-top: 0.25rem;
      transition: var(--transition);
      margin-bottom: 0.5rem;

      &:hover {
        color: var(--clr-orange);
      }
    }

    span {
      color: var(--clr-orange);
    }
  }

  &:nth-of-type(even) .info {
    order: 2;
  }
`;

export default SnDLarge;
