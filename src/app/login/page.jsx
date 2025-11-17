"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// export const metadata = {
//   title: `Log In`,
//   // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
// };

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!res.error) router.push("/dashboard");
    else alert(res.error);
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <form onSubmit={handleLogin} className="flex flex-col gap-3 w-80 mx-auto">
        <h2 className="text-xl text-center font-bold">Log In</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-neutral-800 hover:bg-neutral-700 cursor-pointer text-white p-2 rounded">
          Log In
        </button>
      </form>
    </div>
  );
}
