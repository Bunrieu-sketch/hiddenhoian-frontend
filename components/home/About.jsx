import styled from 'styled-components';

const About = ({ aboutTitle, aboutText }) => {
  return (
    <Container className="section">
      <div className="section-center">
        <h3>{aboutTitle}</h3>
        <p>{aboutText}</p>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  .section-center {
    text-align: center;

    p {
      margin: 1.5rem auto 0;
      max-width: 42rem;
    }
  }
`;
export default About;
