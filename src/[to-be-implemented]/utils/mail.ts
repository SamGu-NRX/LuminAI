// import ResetPassword from "@/emails/reset-password";
// import LinkEmail from "@/emails/verify-email";
// import { render } from "@react-email/components";
// import { Resend } from "resend";

// const resend  = new Resend(process.env.RESEND_API_KEY);

// // Send a verification email to the user
// export const sendVerificationEmail = async (
//     email: string,
//     token: string
// ) => {
//     const confirmLink = `https://localhost:3000/auth/new-verification?token=${token}`;

//     await resend.emails.send({
//         from: "Sam from LuminAI <theluminaiteam@gmail.com>",
//         to: email,
//         subject: "Confirm your email",
//         html: render(LinkEmail({ token }))
//     })

//     resend.contacts.create({
//         email: email,
//         audienceId: 'ed288a7a-23ef-4f32-a2f1-3dc887da7a1c'
//     })


// }
// // Send password reset token to user
// export const sendPasswordResetEmail = async (
//     email: string,
//     token: string,
// ) => {
//     const resetLink = `https://localhost:3000/auth/new-password?token=${token}`;

//     await resend.emails.send({
//         from: "Sam from LuminAI <theluminaiteam@gmail.com>",
//         to: email,
//         subject: "Reset your password",
//         html: render(ResetPassword({ token }))
//     })

// }
