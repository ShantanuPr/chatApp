import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

function Slider({ selectUserToChat, selectedUserId }) {
  const [acceptedUsers, setAcceptedUsers] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(firestore, `users/${currentUser.uid}/invites`),
      (snapshot) => {
        const users = snapshot.docs
          .filter(doc => doc.data().status === 'accepted')
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setAcceptedUsers(users);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="overflow-y-auto">
      {acceptedUsers.map((user) => (
        <div
          key={user.id}
          className={`flex items-center p-2 cursor-pointer ${selectedUserId === user.id ? 'bg-gray-600' : 'hover:bg-gray-500'}`}
          onClick={() => selectUserToChat(user)}
        >
          <span className="text-white">{user.fromName}</span>
        </div>
      ))}
    </div>
  );
}

export default Slider;
