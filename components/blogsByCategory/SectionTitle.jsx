import styled from 'styled-components';

const SectionTitle = ({ title }) => {
  return (
    <Container>
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="underlines">
        <div className="underline"></div>
        <div className="big-underline"></div>
        <div className="underline"></div>
      </div>
    </Container>
  );
};

export const Container = styled.div`
  margin-bottom: 30px;

  .title {
    display: flex;
    gap: 1.75rem;
    align-items: baseline;

    h3 {
      margin-bottom: 0.25rem;
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
`;

export default SectionTitle;
