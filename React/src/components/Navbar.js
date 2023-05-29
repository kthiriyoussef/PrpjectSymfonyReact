import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="block h-14 w-auto"
              src="https://iconrex.com/wp-content/uploads/2022/03/System-Management-Error-Icon-1.svg" // Replace with your logo image URL
              alt="Logo"
            />
            <h1 className="ml-1 text-white text-lg font-semibold">
              Error Management
            </h1>
          </div>
          <div className="hidden md:flex md:space-x-4">
            <a
              href="#"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Errors
            </a>
            <a
              href="#"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Reports
            </a>
            <a
              href="#"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Settings
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
