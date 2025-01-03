import React, { useState } from 'react';
import Login from './Login';
import SignUp from './Signup';


function LandingPage() {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>
        {showLogin ? <Login /> : <SignUp />}
        <button className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
export default LandingPage;