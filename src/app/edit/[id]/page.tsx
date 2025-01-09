"use client";


import React from "react";
import EditBookPage from "@/components/EditBook";
interface Params {
  id: string;
}

export default function Page({ params }: { params: Promise<Params> }) {
  return (
    <>
      <EditBookPage params={params} />
    </>
  ); 
}