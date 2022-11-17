import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const TravelLarge = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/travel/${blog?.slug}`}>
        <a>
          <div className="img">
            <h5>
              Posted on <span>{blog?.date}</span>
            </h5>
            <Image
              src={blog?.image?.data?.attributes?.url}
              alt={blog?.image?.data?.attributes?.name}
              width={540}
              height={720}
            />
          </div>
          <div className="info">
            <small>{blog?.category}</small>
            <h4>{blog?.title}</h4>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export const Wrapper = styled.article`
  padding: 0 5px;

  a {
    color: var(--textColor);
  }

  .info {
    padding-left: 20px;
  }
  small {
    color: var(--textColor);
    text-transform: uppercase;
  }

  h4 {
    margin-top: 0.25rem;
    transition: var(--transition);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }

  .img {
    display: flex;
    gap: 2.75px;

    h5 {
      transform: rotate(180deg);
      writing-mode: tb;
      text-transform: uppercase;

      span {
        color: var(--clr-orange);
      }
    }
  }
`;

export default TravelLarge;
