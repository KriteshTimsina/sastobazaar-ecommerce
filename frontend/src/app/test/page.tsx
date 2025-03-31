import React from "react";
import { auth } from "@/app/auth";

const Page = async () => {
  const data = await auth();
  return <div>{JSON.stringify(data)}</div>;
};

export default Page;
