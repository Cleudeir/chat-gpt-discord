import Link from "next/link";
import React from "react";
import { FiHome, FiUsers, FiShoppingBag, FiLogOut } from "react-icons/fi";

const SideBar = () => {
  return (
    <aside className="flex flex-col items-center justify-start pt-4 h-screen ">
      <nav className="flex flex-col w-full">
        <Link
          href="/"
          className="flex items-center py-2 pl-6 pr-8 text-gray-700 bg-white rounded-lg"
        >
          <FiHome size={24} />
          <span className="ml-3 font-medium">Home</span>
        </Link>

        <Link
          href="/clients"
          className="flex items-center py-2 pl-6 pr-8 mt-2 text-gray-700 bg-white rounded-lg"
        >
          <FiUsers size={24} />
          <span className="ml-3 font-medium">Clients</span>
        </Link>

        <Link
          href="/item"
          className="flex items-center py-2 pl-6 pr-8 mt-2 text-gray-700 bg-white rounded-lg"
        >
          <FiShoppingBag size={24} />
          <span className="ml-3 font-medium">Items</span>
        </Link>
      </nav>

      <div className="flex items-center py-5">        
        <FiLogOut size={24} />
        <span className="ml-3 font-medium">Logout</span>
      </div>
    </aside>
  );
};

export default SideBar;
