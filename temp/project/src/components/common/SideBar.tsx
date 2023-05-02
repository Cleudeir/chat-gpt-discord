import React from 'react';

const SideBar = () => {
  return (
    <ul className="flex flex-col w-1/4 text-pink-50 rounded-md ">
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/">Home</a>
      </li>
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/clients">Clients</a>
      </li>
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/employees">Employees</a>
      </li>
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/products">Products</a>
      </li>
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/selves">Selves</a>
      </li>
      <li className="p-4 border-2 bg-slate-600 rounded-md">
        <a href="/pages">Pages</a>
      </li>
    </ul>
  );
};

export default SideBar;
