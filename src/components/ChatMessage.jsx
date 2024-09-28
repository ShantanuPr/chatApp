import React from 'react';
import { auth } from '../firebase'; 

function ChatMessage({message:{from_uid ,to_uid, text}}) {

  const messageClass = from_uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`flex items-center ${messageClass === 'sent' ? 'flex-row-reverse' : ''}`}>
     
      <p className={`${messageClass === 'sent' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} p-2 rounded-xl `}>
        {text}
      </p>
    </div>
  );
}

export default ChatMessage;
