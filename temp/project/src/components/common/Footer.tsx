import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center items-center bg-gray-200 h-24">
      <a className="text-gray-600 hover:text-gray-800" href="/">Home</a>
      <a className="ml-4 text-gray-600 hover:text-gray-800" href="/about">About</a>
    </footer>
  );
}

export default Footer;
