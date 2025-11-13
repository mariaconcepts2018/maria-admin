import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
      <p>Your email: {session.user.email}</p>
    </div>
  );
}
