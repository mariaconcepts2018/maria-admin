"use client";
import { useEffect, useState } from "react";

export default function ProjectDetails({ selected, setSelected }) {
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
            modifiedBy: "admin",
            appointmentDate: appointmentDate,
          }
        : {
            leadStatus: status,
            notes: notes,
            modifiedBy: "admin",
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
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // setError("Error verifying phone number");
      // Handle error (e.g., show error message)
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
        setNotes(data.notes);
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
    <div className="z-200 absolute bottom-0 bg-black/50 w-full h-screen">
      {user ? (
        <div className="max-w-4xl mx-auto rounded bg-white border border-gray-200 h-screen p-8 overflow-y-scroll">
          <h2 className="text-lg text-center text-gray-800 mb-3">
            Project Overview
          </h2>

          {/* Project Info */}
          <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
            <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
              <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                Client
              </span>{" "}
              {user.name}
            </div>
            <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
              <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
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
                Date
              </span>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
              <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                Location
              </span>{" "}
              {user.location}
            </div>
            <div className=" border px-2 py-2 rounded-xs cursor-not-allowed">
              <span className="font-medium text-gray-900 rounded bg-neutral-200 py-1 px-2 mr-2">
                Lead Source
              </span>{" "}
              {user.leadSource}
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

          <h2 className="text-lg text-center text-gray-800 mt-6">
            Edit Project
          </h2>
          <form method="post" onSubmit={handleSubmit}>
            {/* Status Buttons */}
            <div className="flex justify-evenly">
              <div className="mt-2">
                <label className="block text-gray-800 font-medium mb-3 text-sm">
                  Project Status
                </label>
                <div className="flex min-w-sm">
                  {statusOptions.map((opt, index) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setStatus(opt)}
                      className={`${
                        index === 0
                          ? "rounded-l-lg"
                          : index === 2
                          ? "rounded-r-lg"
                          : "rounded-0"
                      } flex-1 py-1 px-2 text-sm cursor-pointer border transition-all uppercase font-medium 
                  ${
                    status === opt
                      ? opt === "open"
                        ? "bg-green-200 text-black border-green-500"
                        : opt === "pending"
                        ? "bg-neutral-200 text-black border-neutral-500"
                        : "bg-amber-200 text-black border-amber-500"
                      : "border-gray-300 text-gray-600 hover:bg-gray-100"
                  }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-gray-800 font-medium mb-3 text-sm">
                  Schedule Appointment
                </label>

                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"></div>
                  <input
                    datepicker="true"
                    id="default-datepicker"
                    type="date"
                    value={appointmentDate}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full py-1 px-2 text-sm w-full h-full"
                    placeholder="Select Date"
                  />
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="mt-8">
              <label className="block text-gray-800 font-medium mb-3 text-sm">
                Notes
              </label>
              <textarea
                rows="4"
                value={user.notes ? user.notes : undefined}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this project..."
                className="w-full rounded-lg border border-gray-300 p-3 text-gray-700 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
              />
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end gap-x-6">
              <button
                type="submit"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-1 rounded-lg font-medium shadow-md transition-all"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="border border-neutral-600 hover:bg-neutral-200 px-4 py-1 rounded-lg font-medium shadow-md transition-all"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}
