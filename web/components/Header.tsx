import React from 'react';
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="bg-white p-4 mb-2 shadow-inner text-center flex justify-between items-center h-24">
      <div className="flex-1">{process.env.AUTH_GITHUB_ID}</div>
      <div className="flex-1 flex justify-center items-center">
        <img src="/logo_green.png" alt="ロゴ" className="inline-block" />
      </div>
      <div className="flex-1 flex justify-end">
        <UserButton />
      </div>
    </header>
  );
};

export default Header; 