"use client";

import { useState } from "react";

const projects = ["interiors", "construction", "renovation", ""];
const leadSource = ["website", "whatsapp", "offline", ""];
const leadStatus = ["open", "pending", "closed", ""];

export default function TableHead({ filterBy, setFilterBy }) {
  const [options, setoptions] = useState({ field: "", show: false });
  return (
    <>
      <thead>
        <tr>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              ID
            </p>
          </th>
          <th className="p-4 transition-colors  border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
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
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
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
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <div className="relative flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none opacity-70">
              Project
              <button
                className={`${
                  filterBy.field === "service"
                    ? "bg-black text-white"
                    : "bg-none text-black"
                } rounded-full p-1 cursor-pointer`}
                onClick={() =>
                  setoptions({ field: "service", show: !options.show })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46"
                  />
                </svg>
              </button>
              <div
                className={`${
                  options.field === "service" && options.show
                    ? "scale-100"
                    : "scale-0 -translate-y-1/2 translate-x-1/2"
                } z-100 transition transform flex min-w-[240px] top-0 right-6 flex-col gap-1 p-1.5 absolute p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none`}
              >
                {projects.map((item, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => {
                      setFilterBy({
                        field: item ? options.field : "",
                        value: item,
                      });
                      setoptions({ ...options, show: false });
                    }}
                    className={`${
                      filterBy.value === "" && item === "" ? "hidden" : "block"
                    } cursor-pointer capitalize text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100`}
                  >
                    {item ? item : "Clear"}
                  </div>
                ))}
              </div>
            </div>
          </th>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <div className="relative flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Source
              <button
                className={`${
                  filterBy.field === "leadSource"
                    ? "bg-black text-white"
                    : "bg-none text-black"
                } rounded-full p-1 cursor-pointer`}
                onClick={() =>
                  setoptions({ field: "leadSource", show: !options.show })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46"
                  />
                </svg>
              </button>
              <div
                className={`${
                  options.field === "leadSource" && options.show
                    ? "scale-100"
                    : "scale-0 -translate-y-1/2 translate-x-1/2"
                } z-100 transition transform flex min-w-[240px] top-0 right-6 flex-col gap-1 p-1.5 absolute p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none`}
              >
                {leadSource.map((item, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => {
                      setFilterBy({
                        field: item ? options.field : "",
                        value: item,
                      });
                      setoptions({ ...options, show: false });
                    }}
                    className={`${
                      filterBy.value === "" && item === "" ? "hidden" : "block"
                    } cursor-pointer capitalize text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100`}
                  >
                    {item ? item : "Clear"}
                  </div>
                ))}
              </div>
            </div>
          </th>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <div className="relative flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Status
              <button
                className={`${
                  filterBy.field === "leadStatus"
                    ? "bg-black text-white"
                    : "bg-none text-black"
                } rounded-full p-1 cursor-pointer`}
                onClick={() =>
                  setoptions({ field: "leadStatus", show: !options.show })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  strokeWidth="1"
                  stroke="currentColor"
                >
                  <path
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46"
                  />
                </svg>
              </button>
              <div
                className={`${
                  options.field === "leadStatus" && options.show
                    ? "scale-100"
                    : "scale-0 -translate-y-1/2 translate-x-1/2"
                }  z-100 transition transform flex min-w-[240px] top-0 right-6 flex-col gap-1 p-1.5 absolute p-4 font-sans text-sm font-normal break-words whitespace-normal bg-white border rounded-lg shadow-lg w-max border-blue-gray-50 text-blue-gray-500 shadow-blue-gray-500/10 focus:outline-none`}
              >
                {leadStatus.map((item, i) => (
                  <div
                    key={i}
                    role="button"
                    onClick={() => {
                      setFilterBy({
                        field: item ? options.field : "",
                        value: item,
                      });
                      setoptions({ ...options, show: false });
                    }}
                    className={`${
                      filterBy.value === "" && item === "" ? "hidden" : "block"
                    } cursor-pointer capitalize text-slate-800 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100`}
                  >
                    {item ? item : "Clear"}
                  </div>
                ))}
              </div>
            </div>
          </th>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Modified By
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-4 h-4 text-blue-gray-900"
                strokeWidth="1"
                stroke="currentColor"
              >
                <path
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 7.25h15M7.385 12h9.23m-6.345 4.75h3.46"
                />
              </svg>
            </p>
          </th>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Modified On
            </p>
          </th>
          <th className="p-4 transition-colors border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Edit
            </p>
          </th>
        </tr>
      </thead>
    </>
  );
}
