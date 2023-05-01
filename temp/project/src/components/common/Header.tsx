import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 p-4">
      <div className="flex justify-between text-white">
        <div className="flex items-center">
          <img src="/logo.png" alt="logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">SuperMarket</h1>
        </div>
        <nav className="hidden md:flex">
          <a href="/" className="mx-2 hover:underline">
            Home
          </a>
          <a href="/clients" className="mx-2 hover:underline">
            Clien          </a>
          <a href="/employees" className="mx-2 hover:underline">
            Employees
          </a>
          <a href="/products" className="mx-2 hover:underline">
            Products
          </a>
          <a href="/selves" className="mx-2 hover:underline">
            Selves
          </a>
          <a href="/pages" className="mx-2 hover:underline">
            Pages
          </a>
        </nav>
        <div className="md:hidden">
          <button className="text-white">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
