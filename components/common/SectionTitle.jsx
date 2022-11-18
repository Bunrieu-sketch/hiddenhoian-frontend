import styled from 'styled-components';
import { FaAngleDoubleRight } from 'react-icons/fa';
import Link from 'next/link';
import slugify from 'slugify';

const SectionTitle = ({ title, description }) => {
  return (
    <Container>
      <div className="title">
        <h2>{title}</h2>
        <h4>
          <Link
            href={`/category/${slugify(title, {
              lower: true,
            })}`}
          >
            <a>
              see all in <span>{title}</span> <FaAngleDoubleRight />
            </a>
          </Link>
        </h4>
      </div>
      <div className="underlines">
        <div className="underline"></div>
        <div className="big-underline"></div>
        <div className="underline"></div>
      </div>
      <p className="description">{description}</p>
    </Container>
  );
};

export const Container = styled.div`
  margin-bottom: 30px;

  .title {
    display: flex;
    gap: 1.75rem;
    align-items: baseline;

    h2 {
      margin-bottom: 0.25rem;
    }

    h4 {
      a {
        color: var(--clr-orange);
        text-transform: lowercase;
        margin-bottom: 0.25rem;
      }
    }

    span {
      text-transform: capitalize;
    }

    svg {
      vertical-align: middle;
    }
  }

  .underlines {
    margin-bottom: 0.75rem;
    .underline,
    .big-underline {
      width: 3rem;
      height: 1px;
      background: var(--clr-orange);
      margin-bottom: 2px;
    }

    .big-underline {
      width: 4.5rem;
    }
  }

  @media (max-width: 992px) {
    margin-bottom: -2rem;

    .description {
      display: none;
    }
  }
`;

export default SectionTitle;
