import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

const EatLarge = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/eat/${blog?.slug}`}>
        <a>
          <Image
            src={blog?.image?.data?.attributes?.url}
            alt={blog?.image?.data?.attributes?.name}
            width={360}
            height={300}
          />
          <div className="info">
            <h4>{blog?.title}</h4>
            <p>{blog?.shortDescription.substr(0, 110)}...</p>
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
  &:nth-of-type(1) {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
  }
  &:nth-of-type(2) {
    grid-row: 2 / 3;
    grid-column: 1 / 2;
  }
  &:nth-of-type(3) {
    grid-row: 3 / 4;
    grid-column: 1 / 2;
  }
  &:nth-of-type(4) {
    grid-row: 1 / 4;
    grid-column: 2 / 3;
  }

  a {
    color: var(--textColor);
    display: grid;
    grid-template-columns: 160px 1fr;
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  .info {
    background: var(--clr-white);
    padding: 10px 15px 10px 30px;

    h4 {
      margin-top: 0.25rem;
      transition: var(--transition);
      margin-bottom: 0.5rem;
    }

    span {
      color: var(--clr-orange);
    }
  }

  &:nth-of-type(4) {
    a {
      height: calc(100% - 4.5rem);
      position: relative;
      display: flex;

      span {
        width: 100% !important;
      }

      .info {
        position: absolute;
        bottom: -4.5rem;
        margin: 0 1.25rem;
        background: var(--clr-white);
        padding: 40px 30px;
      }
    }
  }
`;

export default EatLarge;
