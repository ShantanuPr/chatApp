import React, { useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function SignIn() {
  const [errorMessage, setErrorMessage] = useState('');

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account', // Forces account selection screen
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Prepare user data including display name
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,  // Add the user's name here
      };

      // Call the Cloud Function to store user data
      const response = await fetch('https://us-central1-chatapp-a1d5f.cloudfunctions.net/storeUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Check if response is not ok
      if (!response.ok) {
        const errorText = await response.text(); // Read the error response
        throw new Error(`Failed to store user data: ${errorText}`);
      }

      console.log("User data stored successfully.");

    } catch (error) {
      // Differentiate the error messages based on error type
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('The sign-in popup was closed. Please try again.');
      } else if (error.message.includes('Failed to store user data')) {
        setErrorMessage('There was an issue storing your data. Please try again later.');
      } else {
        setErrorMessage('An error occurred during sign-in. Please try again.');
      }
      console.error('Error during sign-in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-white mb-6 text-center">
          Welcome to Real Chat
        </h1>

        <p className="text-gray-300 text-center mb-8 max-w-xs mx-auto">
          Connect and communicate with your friends privately and securely.
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full py-3 px-5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Sign in with Google
        </button>

        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}

        <p className="text-gray-400 mt-6 text-center">
          Don’t have an account? Sign up now.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
