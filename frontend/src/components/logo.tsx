import { APP_DATA } from "@/lib/constants";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center space-x-1 text-xl font-extrabold uppercase"
    >
      <span className="">{APP_DATA.NAME.split(" ")[0]}</span>
      <span className="text-primary">{APP_DATA.NAME.split(" ")[1]}</span>
    </Link>
  );
};

export default Logo;
