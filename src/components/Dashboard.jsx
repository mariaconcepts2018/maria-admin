"use client";
import Link from "next/link";
import ProjectDetails from "./ProjectDetails";
import { useEffect, useState } from "react";

export default function Dashboard({}) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`
        );
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className="relative flex flex-col w-full h-screen text-gray-700 bg-white border-l bg-clip-border">
        <div className="relative px-4 py-2 text-gray-700 border-b rounded-none bg-clip-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="block w-full overflow-hidden md:w-max">
              <nav>
                <ul
                  role="tablist"
                  className="relative flex flex-row p-1 gap-x-6 rounded-lg"
                >
                  <li
                    onClick={() => setFilterBy("")}
                    role="tab"
                    className={`${
                      filterBy === "" ? "bg-neutral-200" : "bg-white"
                    } hover:bg-neutral-300 relative flex items-center justify-center w-full min-w-32 h-full border border-neutral-500 px-1 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center rounded-md cursor-pointer select-none text-blue-gray-900`}
                    data-value="all"
                  >
                    <div className="z-20 text-inherit flex flex-row justify-between w-full px-1 items-center">
                      <div className="p-0.5">All</div>
                      <div className="font-bold bg-neutral-800 rounded-lg text-white py-0.5 px-2.5">
                        {users.length}
                      </div>
                    </div>
                  </li>
                  <li
                    onClick={() => setFilterBy("New")}
                    role="tab"
                    className={`${
                      filterBy === "New" ? "bg-neutral-200" : "bg-white"
                    } hover:bg-neutral-300 relative flex items-center justify-center w-full min-w-32 h-full border border-neutral-500 px-1 py-1 font-sans text-base rounded-md antialiased font-normal leading-relaxed text-center cursor-pointer select-none`}
                    data-value="monitored"
                  >
                    <div className="z-20 text-inherit flex flex-row justify-between w-full px-1 items-center">
                      <div className="p-0.5">New</div>
                      <div className="font-bold bg-neutral-800 rounded-lg text-white py-0.5 px-2.5">
                        {users.filter((item) => item.status === "New").length}
                      </div>
                    </div>
                  </li>
                  <li
                    onClick={() => setFilterBy("Pending")}
                    role="tab"
                    className={`${
                      filterBy === "Pending" ? "bg-neutral-200" : "bg-white"
                    } hover:bg-neutral-300 relative flex items-center justify-center w-full min-w-32 h-full border border-neutral-500 px-1 py-1 font-sans text-base rounded-md antialiased font-normal leading-relaxed text-center cursor-pointer select-none`}
                    data-value="unmonitored"
                  >
                    <div className="z-20 text-inherit flex flex-row justify-between w-full px-1 items-center">
                      <div className="p-0.5">Pending</div>
                      <div className="font-bold bg-neutral-800 rounded-lg text-white py-0.5 px-2.5">
                        {
                          users.filter((item) => item.status === "Pending")
                            .length
                        }
                      </div>
                    </div>
                  </li>
                  <li
                    onClick={() => setFilterBy("Success")}
                    role="tab"
                    className={`${
                      filterBy === "Success" ? "bg-neutral-200" : "bg-white"
                    } hover:bg-neutral-300 relative flex items-center justify-center w-full min-w-32 h-full border border-neutral-500 px-1 py-1 font-sans text-base rounded-md antialiased font-normal leading-relaxed text-center cursor-pointer select-none`}
                    data-value="unmonitored"
                  >
                    <div className="z-20 text-inherit flex flex-row justify-between w-full px-1 items-center">
                      <div className="p-0.5">
                        &nbsp;&nbsp;Success&nbsp;&nbsp;
                      </div>
                      <div className="font-bold bg-neutral-800 rounded-lg text-white py-0.5 px-2.5">
                        {
                          users.filter((item) => item.status === "Success")
                            .length
                        }
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="w-full md:w-72">
              <div className="relative h-10 w-full min-w-[200px]">
                <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    ></path>
                  </svg>
                </div>
                <input
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Search ID
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 px-0 overflow-y-scroll">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="w-1 p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    ID
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Date
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Project
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Source
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Status
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Modified By
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Modified On
                  </p>
                </th>
                <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                    Edit
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length >= 1 &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="truncate block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                              {item._id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.name}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          {item.createdAt
                            ? `${new Date(item.createdAt).toLocaleDateString()}`
                            : "-"}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.service}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.leadSource}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                          <div
                            className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold ${
                              item.leadStatus === "open"
                                ? "text-green-900 bg-green-500/20"
                                : item?.leadStatus === "pending"
                                ? "text-neutral-900 bg-neutral-500/20"
                                : "text-amber-900 bg-amber-500/20"
                            } uppercase rounded-md select-none whitespace-nowrap`}
                          >
                            <span className="">{item?.leadStatus}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.modifiedBy ? item.modifiedBy : "-"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            {item.modifiedOn
                              ? `${new Date(
                                  item.modifiedOn
                                ).toLocaleDateString()}`
                              : "-"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => setSelected(item._id)}
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                            </svg>
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-0 w-full flex items-center justify-between p-2 border-t border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Page 1 of 10
          </p>
          <div className="flex gap-2">
            <button
              className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Previous
            </button>
            <button
              className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {selected && (
        <ProjectDetails selected={selected} setSelected={setSelected} />
      )}
    </>
  );
}
