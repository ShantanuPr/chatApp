import React, { useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore'; 
import { firestore } from '../firebase'; 

function UserModal({ isOpen, onClose, onUserAdded }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  // Function to check if the user with the given email and name exists in Firestore
  const checkUserExists = async (email, name) => {
    const usersCollection = collection(firestore, 'users');
    const userDocs = await getDocs(usersCollection);
    
    // Check if both the email and name match any existing user
    return userDocs.docs.some(doc => {
      const userData = doc.data();
      return userData.email === email && userData.name === name;
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');

    // Check if the user with the given email and name exists
    const userExists = await checkUserExists(email, name);
    if (!userExists) {
      setError('User cannot be found.');
      return;
    }

    try {
      // If user exists, proceed to add the user to Firestore
      await addDoc(collection(firestore, 'users'), {
        email,
        name, // Ensure that you also store the name
      });

      onUserAdded(); // Notify parent component to refresh the user list
      setEmail('');
      setName('');
      onClose(); // Close the modal after adding user
    } catch (err) {
      console.error('Error adding user:', err);
      setError('Failed to add user. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Add User</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleAddUser} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-2 border border-gray-400 rounded text-black"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 mb-2 border border-gray-400 rounded text-black"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
          <button type="button" onClick={onClose} className="mt-2 text-red-500">Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
