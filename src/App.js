import React from 'react';
import './index.css'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; 
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';
import Navbar from './components/Navbar';

function App() {
  const [user] = useAuthState(auth);
  if (user){
    console.log(user)
  }

  return (
    <div className="App min-h-screen flex flex-col bg-gray-800 text-white"
    >
      <Navbar user={user}/>

      <main className="flex-grow mt-16 flex items-center justify-center ">
        <section className="w-full bg-gray-850 rounded-lg shadow-lg">
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </main>
    </div>
  );
}

export default App;
