import styled from 'styled-components';
import { SectionTitle } from '../common';

const Maps = () => {
  return (
    <Container id="maps" className="section">
      <div className="section-center">
        <SectionTitle title="Maps" />
      </div>
    </Container>
  );
};

export const Container = styled.section`
  min-height: 60vh;

  .title {
    h2 {
      margin-bottom: 1.25rem;
    }
    h4 {
      display: none;
    }
  }
`;

export default Maps;
