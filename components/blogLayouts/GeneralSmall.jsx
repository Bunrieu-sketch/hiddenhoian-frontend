import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const GeneralSmall = ({ attributes: blog }) => {
  return (
    <Wrapper>
      <Link href={`/general/${blog?.slug}`}>
        <a>
          <Image
            src={blog?.image?.data?.attributes?.url}
            alt={blog?.image?.data?.attributes?.name}
            width={200}
            height={300}
            className="image"
          />
          <div className="info">
            <h4>{blog?.title}</h4>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export const Wrapper = styled.article`
  span {
    width: 100% !important;
  }

  h4 {
    margin-top: 0.5rem;
    transition: var(--transition);
  }

  &:hover h4 {
    color: var(--clr-orange);
  }
`;

export default GeneralSmall;
