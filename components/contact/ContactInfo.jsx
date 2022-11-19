import Image from 'next/image';
import styled from 'styled-components';

const ContactInfo = ({ pageImage, infoText, email, address }) => {
  return (
    <Container>
      <Image
        src={pageImage?.data?.attributes?.url}
        alt="contact image"
        width={965}
        height={643}
      />
      <p>{infoText}</p>
      <div className="details">
        <h4>E-mail</h4>
        <a href={`mailto:${email}`}>{email}</a>
        <h4>Address</h4>
        <p>{address}</p>
      </div>
    </Container>
  );
};

export const Container = styled.article``;
export default ContactInfo;
