"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function AddLeadModal({
  closeModal,
  selected,
  setMessage,
  setError,
  session,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();
  const [notes, setNotes] = useState("");
  const [appointmentDate, setAppointmentDate] = useState();

  const statusOptions = ["open", "pending", "closed"];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const fomData = appointmentDate
        ? {
            leadStatus: status,
            notes: notes,
            modifiedBy: session.user.name,
            appointmentDate: appointmentDate,
          }
        : {
            leadStatus: status,
            notes: notes,
            modifiedBy: session.user.name,
          };

      console.log(fomData);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/update-user/${selected}`,
        {
          // Replace with your API route
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },

          body: new URLSearchParams(fomData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to Update");
      }
      console.log("Updated successfully");
      setMessage("Lead details have been updated.");
      setTimeout(() => setMessage(""), 2000);
      setSelected(null);
    } catch (error) {
      console.error("Error updating:", error);
      setError("Error updating changes.");
      setTimeout(() => setError(""), 2000);
    }
  };

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${selected}`
        );
        const data = await res.json();
        setUser(data);
        setNotes(data.notes ? data.notes : "");
        setStatus(data.leadStatus);
        setAppointmentDate(data.appointmentDate);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="z-200 absolute bottom-full top-0 left-0 bg-black/50 w-full h-screen">
      {user ? (
        <div className="max-w-4xl mx-auto rounded bg-white border border-gray-200 h-screen p-8 overflow-y-scroll">
          <form method="post" onSubmit={handleSubmit}>
            <h2 className="text-lg text-center text-gray-800 mb-3">Add Lead</h2>

            {/* Project Info */}
            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
              <label className=" border  rounded-xs cursor-not-allowed flex flex-row items-center">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 ml-1">
                  Name
                </span>{" "}
                <input type="text" className="px-2 py-2 w-full outline-none" />
              </label>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 ml-2">
                  Email
                </span>{" "}
                {user.email}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Phone
                </span>{" "}
                {user.phone}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Location
                </span>{" "}
                {user.location}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Company
                </span>{" "}
                {user.company}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Project
                </span>{" "}
                {user.service}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  BHK Type
                </span>{" "}
                {user.bhkType}
              </div>{" "}
              {/* col-span-2 */}
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Services
                </span>{" "}
                {user.services}
              </div>
              <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
                <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                  Floors
                </span>{" "}
                {user.floors}
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-x-6">
              <button
                type="submit"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-1 rounded-lg font-medium shadow-md transition-all cursor-pointer"
              >
                Save
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="border border-neutral-600 hover:bg-neutral-200 px-4 py-1 rounded-lg font-medium shadow-md transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
