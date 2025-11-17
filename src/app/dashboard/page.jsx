import Dashboard from "@/components/Dashboard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: `CRM portal - Dashboard`,
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <>
      <Dashboard session={session} />
    </>
  );
}
