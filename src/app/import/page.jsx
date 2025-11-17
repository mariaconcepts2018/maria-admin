import FileUpload from "@/components/FileUpload";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: `CRM portal - Import Data`,
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Page({}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <>
      <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col justify-center items-center gap-y-6">
        <FileUpload />
      </div>
    </>
  );
}
