import { unslugify } from 'unslugify';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Header = ({ titlesData }) => {
  const { query } = useRouter();

  const {
    eatDescription,
    travelDescription,
    sleepDescription,
    seeAndDoDescription,
    generalDescription,
  } = titlesData?.attributes;

  const descriptions = {
    eat: eatDescription,
    travel: travelDescription,
    sleep: sleepDescription,
    'see-and-do': seeAndDoDescription,
    general: generalDescription,
  };

  return (
    <Container>
      <h1>
        Category : <span>{unslugify(query.category)}</span>
      </h1>
      <p>{descriptions[query.category] || ''}</p>
    </Container>
  );
};

export const Container = styled.header`
  text-align: center;

  h1 {
    color: #707070;
    margin-bottom: 2.5rem;

    span {
      color: #444;
    }
  }

  p {
    margin: 0 auto;
    font-family: var(--thirdFont);
    max-width: unset;
  }
`;
export default Header;
