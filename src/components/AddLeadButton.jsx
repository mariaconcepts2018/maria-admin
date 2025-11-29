"use client";
import AddLeadModal from "./AddLeadModal";
import { useState } from "react";

export default function AddLeadButton({ users }) {
  const [open, setOpen] = useState(false);

  const handleClick = (e) => setOpen(true);
  const closeModal = (e) => setOpen(false);

  return (
    <>
      {!open && (
        <button
          onClick={handleClick}
          className="bg-neutral-200 text-neutral-800 rounded shadow border border-neutral-800 px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-neutral-300 transition"
        >
          Add Lead
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5zm-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5h-2z"
            />
          </svg>
        </button>
      )}
      {open && <AddLeadModal closeModal={closeModal} />}
    </>
  );
}
