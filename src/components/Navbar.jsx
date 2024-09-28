import React from 'react';
import SignOut from './SignOut';

function Navbar({user}) {

    return(

      <div>
      <header className="bg-gray-900 h-16 flex items-center justify-between px-6 md:px-10 fixed w-full z-10 shadow-lg">
        {/* App Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center space-x-2 hover:text-blue-500 transition-colors duration-300 ease-in-out">
         RealChat  
        </h1>
    
        {/* SignOut Component */}
        <div className="flex items-center space-x-4 ">
          {user?.displayName && <p>{user?.displayName}</p>}
          <SignOut />
        </div>

      </header>
    </div>
    
    );
}

export default Navbar;