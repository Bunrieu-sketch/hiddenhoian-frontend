import Image from 'next/image';
import styled from 'styled-components';
import { FaClock, FaUserAlt } from 'react-icons/fa';
import moment from 'moment/moment';

const Header = ({ blog }) => {
  return (
    <Container id={blog?.title}>
      <div className="banner">
        <Image
          src={blog?.image?.data?.attributes?.url}
          alt={blog?.image?.data?.attributes?.name}
          layout="fill"
          className="image"
          objectFit="cover"
        />
        <div className="info">
          <div className="section-center">
            <h1>{blog?.title}</h1>
            <div className="icons">
              <span>
                <FaClock />
                {moment(blog?.date).format('MMMM Do, YYYY')}
              </span>
              <span>
                <FaUserAlt />
                {blog?.author}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.header`
  width: 100%;
  height: 60vh;
  padding-top: 30px;

  @media (max-width: 768px) {
    height: 50vh;
    padding-top: 0;
  }

  .banner {
    position: relative;
    height: 100%;
  }

  .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
    width: 100%;
    max-width: var(--maxWidth);
    text-align: center;
  }

  h1 {
    color: var(--clr-white);
    font-size: 3rem;
  }

  .icons {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    gap: 3rem;

    span {
      color: var(--clr-white);
      font-family: var(--thirdFont);
    }

    svg {
      vertical-align: middle;
      margin-right: 0.75rem;
      margin-bottom: 0.15rem;
    }
  }

  @media (max-width: 768px) {
    .info {
      max-width: 100vw;
    }

    h1 {
      font-size: 2rem;
    }

    .icons {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

export default Header;
