// SignIn.jsx
import React, { useState } from 'react';
import { 
  auth, 
  signInWithGoogle, 
  signInWithEmailAndPassword, 
  signInWithDiscord 
} from '../../firebaseConfig';
import { UserAuth } from '../../context/AuthContext';
import { FaGoogle, FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('signin'); // 'signin', 'signup', 'resetPassword'


  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { user } = await googleSignIn();
      console.log(user, "Logged in with Google");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in');
      } catch (error) {
        console.error(error);
        setErrors({ ...errors, auth: 'Invalid email or password' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDiscordSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithDiscord();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    // Implement password reset logic
  };

  const handleSignUp = async () => {
    // Implement sign up logic
  };

  const inputClassNames = (field) => {
    let baseClasses = "w-full px-4 py-2 bg-white border border-slate-300 rounded-md text-md shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors";
    if (errors[field] && touched[field]) {
      baseClasses += " border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500";
    }
    return baseClasses;
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const validate = () => {
    let tempErrors = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Valid email is required';
    }
    if (mode !== 'resetPassword' && (!password || password.length < 6)) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-4" style={{animation: 'bounceIn 1s ease-in-out'}}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
        </h2>
        
        <form onSubmit={handleEmailSignIn} className="space-y-4">

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleBlur}
            placeholder="Email"
            className={inputClassNames('email')}
          />
          {errors.email && touched.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {mode !== 'resetPassword' && (
            <>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
                placeholder="Password"
                className={inputClassNames('password')}
              />
              {errors.password && touched.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
          </motion.button>
        </form>

        <div className="mt-4 flex flex-col space-y-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition duration-300"
            disabled={isLoading}
          >
            <FaGoogle className="mr-2" /> Continue with Google
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDiscordSignIn}
            className="flex items-center justify-center w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            disabled={isLoading}
          >
            <FaDiscord className="mr-2" /> Continue with Discord
          </motion.button>
        </div>

        <div className="mt-4 text-center">
          <a
            href="#"
            onClick={() => setMode('resetPassword')}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
          </span>
          <a href="#"
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-sm text-blue-600 hover:underline"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default SignIn;