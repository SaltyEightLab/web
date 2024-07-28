import React from "react";
import UserButton from "./UserButton";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white p-4 mb-2 shadow-inner text-center flex justify-between items-center h-24">
      <div className="flex-1">
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src="/logo_green.png" alt="ロゴ" className="inline-block" />
      </div>
      <div className="flex-1 flex justify-end items-center">
        <Link 
          href="https://qiita.com/SaltyEight/items/c47b32b979c35be05e18" 
          className="mr-4 text-sm font-bold text-gray-600 hover:text-gray-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          使い方
        </Link>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;