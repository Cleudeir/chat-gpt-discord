import React from "react";
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Add your logo and adjust the height and width according to your needs */}
        <a href="/" className="flex">
          <Image src="/images/favicon.ico" alt="Logo" width={40} height={40} />
        </a>        
      </div>
    </header>
  );
};

export default Header;
