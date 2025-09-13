'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-2xl font-bold">Protected Page</h1>
        <p className="mt-4 text-lg">You can only see this page if you are signed in.</p>
      </div>
    </div>
  );
}
