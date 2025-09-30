'use client';

import { LoadingPage } from "@/components/LoadingPage";
import useConfigStore from "@/stores/configStore";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { LuLoader } from "react-icons/lu";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { clearConfig, isLoaded } = useConfigStore();
  
  useEffect(() => {
    if (isLoaded){
      clearConfig();
    }
  }, [isLoaded, clearConfig]);
  

  if (status === "loading") {
    return <LoadingPage />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let usernameNew = username.includes("@") ? username : username + "@hibridosv.com";
    try {
      setUsername(usernameNew);
      setLoading(true);
      setError(null);
      setMessage("Iniciando sesión...");
      const result = await signIn('credentials', {
        username: usernameNew,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        setMessage("Redireccionando a /dashboard...");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    } finally {
      setLoading(false);
      setMessage(null);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1664298145390-fa6018ad4093?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
      <div className="absolute inset-0 bg-black opacity-60"></div> {/* Overlay oscuro */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Bienvenido de nuevo</h1>
          <p className="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                placeholder="Tu nombre de usuario o email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                placeholder="Tu contraseña"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            > { loading ? <LuLoader className="mr-2 animate-spin " size={18}/> : <BiSave className="mr-2" size={18}/> }
              Iniciar Sesión
            </button>
            <div className="text-center text-sm text-gray-500">{message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

