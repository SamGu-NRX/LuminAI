import { toast } from 'sonner';
// import '@/styles/ToastNotif.scss'; // edit this
import { ReactElement, JSXElementConstructor, ReactNode } from 'react';

// Function to show toast notification
const showNotif = (message: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined, type: string) => {
  toast(message, {
    className: `toast-light dark:toast-dark toaster-container`,
    duration: 2000,
    // type: type,
    position: 'top-right',
    // Add custom CSS class for countdown bar
    // style: { animation: 'fadeout 4s ease-in-out forwards' },
  });
};

// return (
//   <div className="App">
//     <Toaster />
//     <button onClick={() => showNotif('Success! Message sent.', 'success')} className="btn">
//       Show Success Toast
//     </button>
//     <button onClick={() => showNotif('Failed! Message not sent.', 'error')} className="btn">
//       Show Error Toast
//     </button>
//   </div>
// )};

export default showNotif;
