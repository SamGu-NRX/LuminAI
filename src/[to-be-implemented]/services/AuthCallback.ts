// src/pages/AuthCallback.js
/*
import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading/Loading';

const AuthCallback = () => {
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      axios.get(`https://your-backend-url.com/auth/discord/callback?code=${code}`)
        .then(response => {
          const user = response.data.user;
          // Handle the authenticated user data
          console.log(user);
        })
        .catch(error => {
          console.error('Error during Discord OAuth2 callback:', error);
        });
    }
  }, [location]);

  return (<Loading />
  );
};

export default AuthCallback;
*/
