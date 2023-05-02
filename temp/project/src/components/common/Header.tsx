import React from "react";
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-6">
        {/* Add your logo and adjust the height and width according to your needs */}
        <a href="/" className="flex">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </a>
        <nav>
          <ul className="flex items-center">
            <li className="ml-8">
              <a href="/">Home</a>
            </li>
            <li className="ml-8">
              <a href="/clients">Clients</a>
            </li>
            <li className="ml-8">
              <a href="/employees">Employees</a>
            </li>
            <li className="ml-8">
              <a href="/products">Products</a>
            </li>
            <li className="ml-8">
              <a href="/pages">Pages</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
