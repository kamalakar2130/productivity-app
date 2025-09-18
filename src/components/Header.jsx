import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "../assets/icons/MenuIcon.jsx";
import CloseIcon from "../assets/icons/CloseIcon.jsx";
export default function Header() {
  const links = [
    { page: "Home", path: "/" },
    { page: "Log Tracker", path: "/logTracker" },
    { page: "Todo List", path: "/todoList" },
    { page: "Planner", path: "/planner" },
    { page: "Profile", path: "/profile" },
    { page: "Focus Session", path: "/focusSession" },
    { page: "Code/Commmit Tracker", path: "/commitTracker" },
    { page: "Knowledge Notes", path: "/techNotes" },
    { page: "Habit Tracker", path: "/habitTracker" },
  ];

  const located = useLocation();
  const isActive = (path) => located.pathname === path;
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <header className="hidden lg:flex fixed w-full top-0 md:h-18 justify-between h-[4em] md:h-[5em]  items-center p-4 border-[.2em] border-gray-250 bg-gradient-to-r from-[#2a2a72] to-[#f25344] text-white rounded-full z-50">
        <Link to={"/"} onClick={() => setOpen(false)}>
          <h1 className="text-3xl sm:text-4xl p-2 font-bold rounded-lg hover:text-[#61ff79] w-fit cursor-pointer">
            ProApp
          </h1>
        </Link>
        <nav className="">
          {links.map((link) => {
            return (
              <Link
                key={link.page}
                to={link.path}
                className={`relative inline-block px-3 py-2 rounded-lg transition-all duration-500 ease-in-out
          after:content-[''] after:absolute after:left-0 after:-bottom-1
          after:h-[2px] after:transition-all after:duration-300 after:ease-in-out
          ${
            isActive(link.path)
              ? "text-[#61ff79] font-bold after:w-full after:bg-[#61ff79] bg-white/5 backdrop-blur-md border border-white/10 shadow-md"
              : "text-white after:w-0 after:bg-[#ff6161] hover:text-[#61ff79] hover:after:w-full hover:after:bg-[#61ff6e]"
          }`}
              >
                {link.page}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* MD SCREENS (Sidebar like ChatGPT) */}
      {/* Sidebar */}
      <aside
        className={`hidden md:flex lg:hidden fixed top-0 left-0 h-screen w-56 flex-col bg-[#2a2a72] text-white p-6 z-40 transition-transform duration-500
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={"/"} onClick={() => setSidebarOpen(false)}>
            <h1 className="text-2xl font-bold cursor-pointer hover:text-[#61ff79]">
              ProApp
            </h1>
          </Link>

          {/* Close Button */}
          <button
            className="ml-2 text-white hover:text-[#61ff79] focus:outline-none"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col space-y-4">
          {links.map((link) => (
            <Link
              key={link.page}
              to={link.path}
              className={`relative inline-block px-3 py-2 rounded-lg transition-all duration-300
          ${
            isActive(link.path)
              ? "text-[#61ff79] font-bold bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
              : "text-white hover:text-[#61ff79]"
          }`}
            >
              {link.page}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Floating Open Button */}
      {!sidebarOpen && (
        <button
          className="hidden md:flex lg:hidden fixed top-4 left-4 z-50 text-white bg-[#2a2a72] p-2 rounded-full shadow-lg hover:text-[#61ff79]"
          onClick={() => setSidebarOpen(true)}
        >
          <MenuIcon />
        </button>
      )}

      {/* Responsive for small screens */}
      <header className="md:hidden flex fixed w-full top-0 md:h-18 justify-between h-[4em] md:h-[5em]  items-center p-4 border-[.3em] border-gray-250 bg-gradient-to-r from-[#2a2a72] to-[#f25344] text-white rounded-full">
        <Link to={"/"} onClick={() => setOpen(false)}>
          <h1 className="text-3xl sm:text-4xl p-2 font-bold rounded-lg hover:text-[#61ff79] w-fit cursor-pointer">
            ProApp
          </h1>
        </Link>
        <button
          className="md:hidden relative z-[3] focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
        <nav
          className={`md:hidden absolute top-0 rounded-xl  width-35 left-50 right-0 text-2xl bg-gradient-to-r from-purple-900 to-red-400 transition-all duration-500 ease-in-out ${
            open ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-4 space-y-2 pl-2 focus:text-[#61ff79]">
            {links.map((link) => {
              return (
                <li key={link.page}>
                  <Link
                    to={link.path}
                    className={`relative inline-block px-3 py-2 rounded-lg transition-colors duration-300
          ${
            isActive(link.path)
              ? "text-[#61ff79] font-bold bg-white/10 backdrop-blur-md border border-white/20 shadow-md"
              : "text-white hover:text-[#61ff79]"
          }`}
                  >
                    {link.page}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
