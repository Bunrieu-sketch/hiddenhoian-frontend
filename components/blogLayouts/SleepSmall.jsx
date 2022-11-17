import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';

const SleepSmall = ({ attributes: blog }) => {
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
  a {
    color: var(--textColor);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  span {
    width: 100% !important;
  }

  position: relative;
  margin-bottom: 2.5rem;

  .info {
    position: absolute;
    bottom: -2.5rem;
    width: 95%;
    background: var(--clr-white);
    padding: 10px 15px;

    h4 {
      margin-top: 0.25rem;
      transition: var(--transition);
      margin-bottom: 0.5rem;
    }

    p {
      font-family: var(--thirdFont);
    }

    span {
      color: var(--clr-orange);
    }
  }

  @media (max-width: 568px) {
    margin-bottom: 8rem;
    .info {
      bottom: -8rem;
    }
  }
`;

export default SleepSmall;
