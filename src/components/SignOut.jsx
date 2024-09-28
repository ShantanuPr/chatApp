import React from 'react';
import { auth } from '../firebase'; // Import Firebase instance

function SignOut() {
  return (
    auth.currentUser && (
      <button 
        onClick={() => auth.signOut()} 
        className="flex items-center justify-center bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5 mr-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405 1.405A2 2 0 0118 21H6a2 2 0 01-2-2v-2m4-2V5a2 2 0 012-2h8a2 2 0 012 2v12"
          />
        </svg>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
