// import emailjs from '@emailjs/browser';

// // Your emailjs configuration
// const serviceID = 'service_gbbqoy5';
// const templateIDForm = 'template_t15io2f'; // form email
// const templateIDUser = 'template_857nuy8';  // confirmation email

// // Function to send email
// const sendEmails = (formData) => {
//   // Email to yourself
//   emailjs.send(serviceID, templateIDForm, formData)
//     .then((response) => {
//       console.log('Email sent to admin:', response.status, response.text);
//     }, (error) => {
//       console.log('Failed to send email to admin:', error);
//     });

//   // Confirmation email to user
//   const userFormData = { ...formData, to_email: formData.email };
//   emailjs.send(serviceID, templateIDUser, userFormData)
//     .then((response) => {
//       console.log('Confirmation email sent to user:', response.status, response.text);
//     }, (error) => {
//       console.log('Failed to send confirmation email to user:', error);
//     });
// };

// export default sendEmails;
