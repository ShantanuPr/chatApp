import React, { useState } from 'react';
import AddUserModal from './UserModal'; // Import your modal component

function Slider({ users, selectUserToChat, selectedUserId }) {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleAddUser = () => {
    setShowModal(true); // Open modal when the "Add User" button is clicked
  };

  return (
    <div className="flex flex-col space-y-4 p-5 bg-gradient-to-br from-blue-500 to-gray-900 rounded-lg h-full overflow-y-auto">
      {/* Add User Button */}
      <div>
        <button
          className="bg-zinc-700 text-white px-4 py-2 rounded hover:bg-zinc-600 transition duration-150"
          onClick={handleAddUser}
        >
          Add User
        </button>

        {/* Conditionally render Add User Modal */}
        {showModal && <AddUserModal setShowModal={setShowModal} />}
      </div>

      {/* User List */}
      {users && users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center cursor-pointer transition-transform transform 
            ${selectedUserId === user.id ? 'shadow-lg rounded-lg shadow-blue-500' : 'hover:shadow-md'} 
            p-2 transition-all duration-200`} 
          onClick={() => selectUserToChat(user)} // Select user for chat on click
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && selectUserToChat(user)} // Handle keyboard interaction
          aria-label={`Select ${user.displayName} to chat`} // Accessibility
        >
          {/* User Profile Image */}
          <img 
            src={`/Profile_images/${user.photo}`} 
            alt={user.displayName} 
            className="w-16 h-16 rounded-full border-2 border-gray-600 mr-4 transition-all duration-200" 
          />
          {/* Display User Name */}
          <p className="text-white text-sm truncate">{user.displayName}</p> 
        </div>
      ))}
    </div>
  );
}

export default Slider;
