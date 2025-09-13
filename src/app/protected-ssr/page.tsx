import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedSsrPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">Protected SSR Page</h1>
        <p className="mt-4 text-lg">You can only see this page if you are signed in.</p>
      </div>
    </div>
  );
}
