import { useState } from 'react';
import styled from 'styled-components';
import { SectionTitle } from '../common';

const Maps = ({ maps }) => {
  const [activeMap, setActiveMap] = useState(maps[0]);

  return (
    <Container id="maps" className="section">
      <div className="section-center">
        <SectionTitle title="Maps" />

        <div className="maps-center">
          <MapButtons id="btns">
            {maps?.map((map) => {
              return (
                <button
                  key={map?.id}
                  className={`${activeMap?.id === map?.id && 'active-btn'}`}
                  onClick={() => setActiveMap(map)}
                  title={map?.mapTitle}
                >
                  {map?.mapTitle}
                </button>
              );
            })}
          </MapButtons>
          <MapsContainer id="map">
            <iframe
              src={activeMap?.mapLink}
              width="934"
              height="504"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
            ></iframe>
          </MapsContainer>
        </div>
      </div>
    </Container>
  );
};

export const Container = styled.section`
  .title {
    h2 {
      margin-bottom: 1.25rem;
    }
    h4 {
      display: none;
    }
  }

  .maps-center {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 325px;
      margin-top: 2rem;

      #map {
        order: 1;
      }
      #btns {
        order: 2;
      }
    }
  }
`;

export const MapsContainer = styled.article`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  min-height: 400px;

  iframe {
    width: 100%;
    height: 100%;
  }
`;

export const MapButtons = styled.article`
  height: 255px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar * {
    background: transparent;
  }

  button {
    border: none;
    padding: 0 10px;
    margin: 0 5px 0;
    min-height: 80px;
    display: block;
    background: #52acf2;
    text-align: center;
    color: #fff;
    padding: 0 15px;
    line-height: 1.2;
    text-transform: capitalize;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);

    &:hover {
      background: #299df0;
    }
  }

  button.active-btn {
    background: #299df0;
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(1, 1fr);
    height: 520px;
    gap: 0.75rem;

    button {
      min-height: 120px;
      margin: 0 0;
      font-size: 1.25rem;
    }
  }
`;

export default Maps;
