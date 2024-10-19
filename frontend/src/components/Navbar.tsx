// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="mb-8">
      <ul className="flex space-x-4 justify-center">
        {['Home', 'Quizzes', 'Analytics', 'Profile'].map((item) => (
          <li key={item}>
            <Link
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                item === 'Quizzes' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
