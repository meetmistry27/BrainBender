// // import { useNavigate } from "react-router-dom";
// // const navigate = useNavigate();

// // export default function handleLogout(){
// //     // Clear localStorage
// //     localStorage.removeItem('authToken');
// //     localStorage.removeItem('userName');
// //     localStorage.removeItem('userEmail');

// //     // Redirect to login or home page
// //     navigate('/login'); // or '/' if you want to redirect to home
// //   };

// import { useNavigate } from "react-router-dom";

// export default function Logout() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear localStorage
//     localStorage.removeItem('authToken');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('userEmail');

//     // Redirect to login or home page
//     navigate('/login'); // or '/' if you want to redirect to home
//   };

//   return handleLogout;
// }
// src/components/Logout.tsx

import { useNavigate } from "react-router-dom";
import React from "react";

const Logout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    // Redirect to login page
    navigate('/profile'); // or '/' if you want to redirect to home
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
