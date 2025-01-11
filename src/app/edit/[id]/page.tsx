"use client";


import React from "react";
import EditBookPage from "@/components/EditBook";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
interface Params {
  id: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  return (
    <>
      <SessionProvider>
        <NavBar />
        <EditBookPage params={params} />
      </SessionProvider>
    </>
  );
}