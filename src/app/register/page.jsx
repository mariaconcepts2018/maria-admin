"use client";
import { useState } from "react";

// export const metadata = {
//   title: `Register`,
//   // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
// };

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) alert("Registered! You can log in now.");
    else alert("Error registering user.");
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 w-80 mx-auto"
      >
        <h2 className="text-xl text-center font-bold">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-neutral-800 hover:bg-neutral-700 cursor-ponter text-white p-2">
          Register
        </button>
      </form>
    </div>
  );
}
