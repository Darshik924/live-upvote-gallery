import React from "react";

const Navbar = () => {
  const navItemsClass =
    "text-lg px-4 py-2 font-semibold font-sans cursor-pointer hover:text-blue-500 transition duration-200";

  return (
    <nav className="fixed top-0 bg-gray-400 left-0 w-full h-16 shadow-md flex items-center justify-between px-10 z-50">
      <h1 className="text-2xl font-bold text-gray-800">Imagirium</h1>

      <div className="flex gap-8 text-gray-700">
        <div className={navItemsClass}>Home</div>
        <div className={navItemsClass}>Uploads</div>
        <div className={navItemsClass}>Images</div>
      </div>
    </nav>
  );
};

export default Navbar;
