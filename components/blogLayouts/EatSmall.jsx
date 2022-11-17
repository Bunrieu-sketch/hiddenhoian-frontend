import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

const EatSmall = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/eat/${blog?.slug}`}>
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
  a {
    color: var(--textColor);
  }

  span {
    width: 100% !important;
  }

  position: relative;

  &:hover h4 {
    color: var(--clr-orange);
  }

  .info {
    position: absolute;
    bottom: 0%;
    width: calc(100% - 2rem);
    margin: 0 1rem;
    background: var(--clr-white);
    padding: 10px 15px;
    text-align: center;

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

export default EatSmall;
