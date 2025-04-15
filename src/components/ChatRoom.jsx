import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import UserModal from './UserModal';
import Slider from './Slider';

function ChatRoom() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiverUid, setReceiverUid] = useState(null);

  const acceptInvite = async (inviteId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const inviteDoc = doc(firestore, `users/${currentUser.uid}/invites/${inviteId}`);
    await updateDoc(inviteDoc, { status: 'accepted' });
  };

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(firestore, `users/${currentUser.uid}/invites`),
      (snapshot) => {
        snapshot.docs.forEach(doc => {
          const invite = doc.data();
          if (invite.status === 'pending') {
            const accept = window.confirm(`${invite.fromName} invited you. Accept?`);
            if (accept) acceptInvite(doc.id);
          }
        });
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 h-full p-5 bg-gray-800">
        <button onClick={() => setIsModalOpen(true)} className="mb-4 bg-green-500 text-white p-2 rounded">Add User</button>
        <Slider selectUserToChat={(user) => setReceiverUid(user.id)} selectedUserId={receiverUid} />
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onInviteSent={() => {}}
      />
      {/* Chat functionality would go here */}
    </div>
  );
}

export default ChatRoom;
