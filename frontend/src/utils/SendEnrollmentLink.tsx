import { useState } from 'react';
import generateEnrollmentLink from './generateEnrollmentLink';

const SendEnrollmentLink = () => {
  const [email, setEmail] = useState('');
  const [link, setLink] = useState('');

  const handleSendLink = async () => {
    const enrollmentLink = await generateEnrollmentLink(email);
    setLink(enrollmentLink);
    console.log('Enrollment link sent');
  };

  return (
    <div className="send-enrollment-link-container">
      <h1>Send Enrollment Link</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button onClick={handleSendLink}>Send Link</button>
      {link && <p>Enrollment Link: <a href={link}>{link}</a></p>}
    </div>
  );
};

export default SendEnrollmentLink;
