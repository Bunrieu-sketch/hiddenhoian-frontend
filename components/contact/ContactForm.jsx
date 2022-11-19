import styled from 'styled-components';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [showMessage, setShowMessage] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowMessage(true);
          e.target.reset();
          setTimeout(() => {
            setShowMessage(false);
          }, 5000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <FormContainer>
      <form ref={form} onSubmit={sendEmail}>
        <h3>GET IN TOUCH</h3>
        {showMessage && <p className="success">Message sent successfully!</p>}
        <div className="form-group">
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Name"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="subject"
            id="subject"
            className="form-control"
            placeholder="Subject"
            required
          />
        </div>

        <div className="form-group">
          <textarea
            name="message"
            id="message"
            className="form-control"
            placeholder="Message"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="submit-btn btn">
            Send Message
          </button>
        </div>
      </form>
    </FormContainer>
  );
};

export const FormContainer = styled.article`
  h3 {
    margin-bottom: 1.5rem;
  }

  .success {
    background: #4f9b4f;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
    margin-bottom: 1rem;
    border-radius: var(--borderRadius);
    font-family: var(--thirdFont);
    max-width: 100%;
  }

  .form-group {
    margin: 1.25rem 0;
    .form-control {
      background: #efefef;
      border: 1px solid #e2e1e1;
      padding: 0 10px;
      display: block;
      width: 100%;
      line-height: 40px;
      font-size: 1rem;

      &::placeholder {
        font-family: var(--bodyFont);
      }
    }

    textarea {
      resize: vertical;
      height: 100px;
    }
  }

  .submit-btn {
    background: var(--clr-orange);
  }
`;

export default ContactForm;
