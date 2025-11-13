"use client";
import ProjectDetails from "./ProjectDetails";
import { useEffect, useState } from "react";
import TableHead from "./TableHead";
import ExportXl from "./ExportXl";
import Loading from "./Loading";

export default function Dashboard({ session }) {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [filterBy, setFilterBy] = useState({ field: "", value: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(null);

  const handleCopyClick = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(e.target.id);
      setMessage("ID copied");
      setTimeout(() => setMessage(""), 2000); // Reset "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSearch = (e) => {
    setFilterBy({ field: "id", value: e.target.value });
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setUsers([]);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users?${filterBy.field}=${filterBy.value}`
        );
        const data = await res.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load data");
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [filterBy]);

  return (
    <>
      <div className="relative flex flex-col w-full h-screen text-gray-700 bg-white border-l bg-clip-border">
        {error && (
          <div
            className={`z-200 absolute bottom-12 left-1/2  bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4`}
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
        {message && (
          <div
            className={`z-200 absolute bottom-12 left-1/2  bg-green-100 border-l-4 border-grenn-500 text-green-700 p-4`}
            role="alert"
          >
            <p>{message}</p>
          </div>
        )}
        <div className="relative px-4 py-2 text-gray-700 border-b rounded-none bg-clip-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <ExportXl users={users} />
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
                  onChange={handleSearch}
                  className="peer h-full w-full rounded border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Search ID
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-y-scroll overflow-x-auto min-h-[50vh]">
          {users?.length >= 1 ? (
            <table className="w-full mt-4 text-left table-auto min-w-max">
              <TableHead filterBy={filterBy} setFilterBy={setFilterBy} />
              <tbody>
                {users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <button
                              id={item._id}
                              onClick={handleCopyClick}
                              className="hover:bg-neutral-200 p-2 mx-auto rounded-full transition block cursor-pointer font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fill="currentColor"
                                  d="M6.644 2.983a.252.252 0 0 0-.253.252c0 .139.113.251.253.251h3.713c.14 0 .253-.112.253-.251a.252.252 0 0 0-.253-.252H6.644Zm3.713-1.342c.734 0 1.353.49 1.544 1.16l2.175.001c.621.004 1.122.205 1.432.638c.266.372.372.85.345 1.387L15.85 17.84c.042.552-.062 1.04-.328 1.445c-.312.473-.821.71-1.452.716H3.14c-.76-.03-1.323-.209-1.675-.609c-.327-.371-.47-.88-.464-1.5V4.84c-.013-.6.154-1.106.518-1.48c.376-.384.932-.554 1.647-.559h1.935c.19-.67.809-1.16 1.543-1.16h3.713Zm0 3.187H6.644c-.546 0-1.027-.27-1.317-.684H3.17c-.383.002-.602.07-.682.152c-.091.093-.144.252-.138.531v13.07c-.003.325.052.522.13.61c.054.061.286.135.685.151h10.9c.2-.002.28-.04.326-.109c.091-.138.133-.334.11-.658l.001-13.096c.014-.293-.027-.482-.096-.578c-.026-.035-.116-.072-.336-.073h-2.397c-.29.414-.771.684-1.317.684ZM17.2 0c.994 0 1.8.801 1.8 1.79v14.082c0 .988-.806 1.79-1.8 1.79h-1.958v-1.343h1.957c.249 0 .45-.2.45-.447V1.789a.449.449 0 0 0-.45-.447H9.643c-.248 0-.45.2-.45.447v.157h-1.35v-.157C7.843.801 8.649 0 9.643 0H17.2ZM8.196 11.751c.373 0 .675.3.675.671c0 .37-.302.671-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h4.051Zm4.052-2.684c.372 0 .675.3.675.671c0 .37-.303.671-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h8.103Zm0-2.684c.372 0 .675.3.675.671a.673.673 0 0 1-.675.671H4.145a.673.673 0 0 1-.676-.67c0-.371.303-.672.676-.672h8.103Z"
                                />
                              </svg>
                            </button>
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
                        <button
                          className={`px-2 py-1 text-center mx-auto font-sans text-xs rounded-sm ${
                            item.leadStatus === "open"
                              ? "text-green-900 bg-green-500/20"
                              : item?.leadStatus === "pending"
                              ? "text-neutral-900 bg-neutral-500/20"
                              : "text-amber-900 bg-amber-500/20"
                          } capitalize whitespace-nowrap`}
                        >
                          <span className="">{item?.leadStatus}</span>
                        </button>
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
          ) : (
            <Loading />
          )}
        </div>
        <div className="absolute bottom-0 w-full right-0 flex items-center justify-between p-2 bg-white border-t border-blue-gray-50">
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
        <ProjectDetails
          session={session}
          selected={selected}
          setSelected={setSelected}
          setMessage={setMessage}
          setError={setError}
        />
      )}
    </>
  );
}
