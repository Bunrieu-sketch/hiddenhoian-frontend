import styled from 'styled-components';
import { FaAngleUp } from 'react-icons/fa';

const GoToTop = ({ blog }) => {
  return (
    <Container href={`#`}>
      <FaAngleUp />
    </Container>
  );
};

export const Container = styled.a`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  background: var(--clr-orange);
  color: var(--clr-white);
  padding: 0.9rem;
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
  transition: var(--transition);

  svg {
    vertical-align: middle;
    margin-top: -0.25rem;
    font-size: 1.5rem;
  }

  &:hover {
    background: #707070;
  }
`;

export default GoToTop;
