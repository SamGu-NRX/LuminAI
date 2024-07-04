import { db } from '../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

const generateEnrollmentLink = async (email) => {
  const token = uuidv4();
  await setDoc(doc(db, "enrollmentTokens", token), {
    email,
    enrolled: false,
    course: "AI Innovate Scholars",
    createdAt: new Date(),
  });
  return `https://your-domain.com/enroll?token=${token}`;
};

export default generateEnrollmentLink;
