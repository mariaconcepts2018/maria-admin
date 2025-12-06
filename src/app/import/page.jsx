import FileUpload from "@/components/FileUpload";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddLeadButton from "@/components/AddLeadButton";

export const metadata = {
  title: `CRM portal`,
  description: `The official CRM portal of ${process.env.NEXT_PUBLIC_SITE_NAME}.`,
  // metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default async function Page({}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <>
      <div className="w-full lg:w-1/2 lg:mx-auto flex flex-col justify-center items-center gap-y-6">
        <div>
          <AddLeadButton />

          <p className="text-center my-8">Or</p>
          <h2 className="text-center font-bold">Upload excel sheet:</h2>
        </div>
        <FileUpload />
      </div>
    </>
  );
}
