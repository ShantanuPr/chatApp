import React, { useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import Firestore configuration

const AddUserModal = ({ setShowModal }) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const errorRef = useRef();

  const handleAddUser = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;

    if (email === '' || name === '') {
      errorRef.current.textContent = 'Both fields are required';
      return;
    }

    try {
      await addDoc(collection(firestore, 'friends'), {
        email: email,
        name: name,
      });

      setShowModal(false); // Close modal after successful submission
    } catch (error) {
      errorRef.current.textContent = 'Failed to add user. Try again.';
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="email"
            placeholder="Enter Email"
            ref={emailRef}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <input
            type="text"
            placeholder="Enter Name"
            ref={nameRef}
            className="border border-gray-300 p-2 w-full mb-4 rounded"
          />
          <p ref={errorRef} className="text-red-500 mb-2"></p>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
          <button
            type="button"
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
