"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ session }) => {
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <div className="flex h-screen w-full max-w-[18rem] flex-col bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div className="p-4 mb-2">
          <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            MARIA - SERAH
          </h5>
          <p>CRM Portal</p>
        </div>
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <Link
            href={"/dashboard"}
            role="button"
            className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
              pathname === "/dashboard"
                ? "bg-neutral-800 text-white"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <div className="block grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Dashboard
          </Link>
          <Link
            href={"/import"}
            role="button"
            className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
              pathname === "/import"
                ? "bg-neutral-800 text-white"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                className="w-5 h-5"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.78 7.159a.75.75 0 0 0-1.06 0l-1.97 1.97V1.75a.75.75 0 0 0-1.5 0v7.379l-1.97-1.97a.75.75 0 0 0-1.06 1.06l3.25 3.25L8 12l.53-.53l3.25-3.25a.75.75 0 0 0 0-1.061ZM2.5 9.75a.75.75 0 1 0-1.5 0V13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.75a.75.75 0 0 0-1.5 0V13a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V9.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            Import
          </Link>
          <Link
            href={"/inbox"}
            role="button"
            className={`block flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start ${
              pathname === "/inbox"
                ? "bg-neutral-800 text-white"
                : "bg-white hover:bg-neutral-200"
            }`}
          >
            <div className="grid mr-4 place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            Inbox
            <div className="grid ml-auto place-items-center justify-self-end">
              <div className="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-full select-none whitespace-nowrap bg-blue-gray-500/20 text-blue-gray-900">
                <span className="">14</span>
              </div>
            </div>
          </Link>
          {session && (
            <div
              role="button"
              className="cursor-pointer border border-transparent hover:border-red-500 hover:text-red-500 flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start  hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
              onClick={handleLogout}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              Log Out
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
