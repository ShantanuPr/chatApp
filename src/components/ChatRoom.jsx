import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore'; 
import { firestore, auth } from '../firebase'; 
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import Slider from './Slider';

function genID(a, b) {
  return [a, b].sort().join('_');
}

function ChatRoom() {
  const [receiverUid, setReceiverUid] = useState(null);  
  const [formValue, setFormValue] = useState('');
  const [error, setError] = useState('');
  const [messagesRef, setMessagesRef] = useState(null);
  const [messages] = useCollectionData(messagesRef, { idField: 'id' });

 
  const users = [
    { id: "Zwv4kSkaQ2gW6saeexEKnbqQug73", displayName: 'Anandan', photo: 'logo1.png' },
    { id: "UluQHwfE1ec813UTVrWZHf8MXFy1", displayName: 'Shantanu', photo: 'logo2.png' },
    
  ];

//  Register the current user 
  const registerUser = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error("User not authenticated.");
      }

      //  data for registration
      const registrationData = {
        uuid: currentUser.uid,
        email: currentUser.email,
      };

      // Send a PUT request to register the user
      const response = await axios.put('http://localhost:3000/register/user', registrationData);

      console.log("User registered:", response.data.message);
    } catch (err) {
      console.error("Error registering user:", err);
    }
  };

  useEffect(() => {
    const currentUser = auth.currentUser; 
    if (currentUser) {
      registerUser();
    }
  }, []); 

  useEffect(() => {
    if (receiverUid && auth.currentUser) {
      const newMessagesRef = collection(
        firestore, 
        `conversations/${genID(auth.currentUser.uid, receiverUid)}/messages`
      );
      const q = query(newMessagesRef, orderBy('createdAt'), limit(25));
      setMessagesRef(q);
    } else {
      setMessagesRef(null); // Reset when no user is selected
    }
  }, [receiverUid]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!auth.currentUser || !receiverUid) {
      setError('You must select a user and be logged in to send messages.');
      return;
    }

    try {
      await addDoc(collection(
        firestore, 
        `conversations/${genID(auth.currentUser.uid, receiverUid)}/messages`
      ), {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        from_uid: auth.currentUser.uid,
        to_uid: receiverUid,
      });

      setFormValue('');
      setError('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-none w-1/4 h-full p-5 bg-gray-800">
        <Slider 
          users={users.filter((u) => u.id !== auth.currentUser.uid)} 
          selectUserToChat={(user) => setReceiverUid(user.id)} 
          selectedUserId={receiverUid} 
        />
      </div>

      <div className="flex-grow flex flex-col pt-5 pr-5">
        <main className="flex-grow overflow-auto p-4 rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 shadow-inner">
          <div className="space-y-4">
            {messages && messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
          </div>
        </main>

        <form 
          onSubmit={sendMessage} 
          className="bg-gray-800 p-4 mb-5 flex items-center bg-gradient-to-br via-purple-900 from-indigo-900 to-gray-900 space-x-2 rounded-lg"
        >
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Say something nice"
            className="flex-grow p-2 text-lg bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-inner"
          />
          <button 
            type="submit" 
            disabled={!formValue || !receiverUid}
            className="w-16 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl shadow-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            🕊️
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default ChatRoom;
