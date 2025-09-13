'use client';

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardPage() {
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to your dashboard.</p>
        <button onClick={() => signOut()} className="mt-6 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Sign out
        </button>
      </div>
    </div>
  );
}
