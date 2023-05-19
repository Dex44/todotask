import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Utils/AuthContext';

type NavbarProps = {
  onLogout: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
    const { userData } = useContext(AuthContext);
    const [name, setName] = useState('');
    useEffect(() => {
        let temp:any = {...userData}
        setName(temp?.name)
        console.log("user data nav",userData);
        
    }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          {"Welcome " + (name ?? "")} 
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={onLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;