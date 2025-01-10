"use client";


import React from "react";
import EditBookPage from "@/components/EditBook";
import NavBar from "@/components/NavBar";
interface Params {
  id: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  return (
    <>
      <NavBar />
      <EditBookPage params={params} />
    </>
  );
}