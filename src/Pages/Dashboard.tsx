import React, { useContext } from 'react';
import { AuthContext } from '../Utils/AuthContext';
import TodoMain from '../Components/TodoMain';
import Navbar from '../Components/Navbar';

const Dashboard: React.FC = () => {
    const { setToken, setUserData } = useContext(AuthContext);
    const handleLogout = () => {
        setToken("")
        setUserData({})
    }
  return (
    <div>
      <Navbar onLogout={handleLogout}/>
      <div className="container">
        <div className="my-4">
      <TodoMain/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;