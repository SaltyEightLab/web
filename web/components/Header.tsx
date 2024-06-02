import React from 'react';

const Header = () => {
  return (
    <header className="bg-white p-4 mb-2 shadow-inner text-center flex justify-between items-center h-24">
      <div className="flex-1"></div>
      <div className="flex-1 flex justify-center items-center">
        <img src="/logo_green.png" alt="ロゴ" className="inline-block" />
      </div>
      <div className="flex-1"></div>
    </header>
  );
};

export default Header;