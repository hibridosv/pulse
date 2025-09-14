"use client";
import { Toaster } from "react-hot-toast";
import { useToastMessage } from "@/hooks/useToastMessage";


export function ToasterMessage() {
  useToastMessage();
  
  return <Toaster position="top-center" reverseOrder={false} />
}
