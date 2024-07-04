import { useEffect } from 'react';
import './styles.css'; 

const GoogleSignInButton = ({ clientId, onSuccess, onFailure }) => {
  useEffect(() => {
    const startApp = () => {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin',
        });
        attachSignin(document.getElementById('googleSignInButton'));
      });
    };

    const attachSignin = (element) => {
      auth2.attachClickHandler(element, {},
        (googleUser) => {
          onSuccess(googleUser);
        }, (error) => {
          onFailure(error);
        });
    };

    startApp();
  }, [clientId, onSuccess, onFailure]);

  return (
    <div className="flex flex-col items-center">
      <div id="googleSignInButton" className="custom-google-button">
        <div className="icon"></div>
        <span className="buttonText">Google</span>
      </div>
    </div>
  );
};

export default GoogleSignInButton;
