import React from "react";
import { auth } from "@/app/auth";

const Page = async () => {
  const data = await auth();
  return <div>{JSON.stringify(data?.user)}</div>;
};

export default Page;
