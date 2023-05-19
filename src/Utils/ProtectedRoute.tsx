import React, { useContext, useEffect } from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { log } from 'console';

const ProtectedRoute = () => {
	const outlet = useOutlet();
    const { token } = useContext(AuthContext);
    console.log("token Data----",token);
    
	return <>{token ? [outlet] : <Navigate to="/" />}</>;
};

export default ProtectedRoute;