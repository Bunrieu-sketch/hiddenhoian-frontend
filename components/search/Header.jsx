import styled from 'styled-components';
import { useRouter } from 'next/router';

const Header = () => {
  const { query } = useRouter();

  return (
    <Container>
      <h1>
        Results for : <span>{query.title}</span>
      </h1>
    </Container>
  );
};

export const Container = styled.header`
  text-align: center;

  h1 {
    color: #707070;
    margin-bottom: 3rem;

    span {
      color: #444;
    }
  }
`;
export default Header;
