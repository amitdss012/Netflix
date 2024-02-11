// import React from 'react'
// import { UserAuth } from '../context/AuthContext'
// import { Navigate } from 'react-router-dom';

// export const ProfileProtect = ({children}) => {

//     const {user} = UserAuth();
//     if(!user){
//         return <Navigate to="/login" />
//     }

// }










import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const ProfileProtect = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProfileProtect;

