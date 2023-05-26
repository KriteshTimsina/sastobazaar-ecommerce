import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-evenly bg-gray-900">
      <div>
        <a>top</a>
        <h2 className="text-xl font-bold uppercase italic text-white">
          Sasto Bazaar
        </h2>
      </div>
      <div className="text-primary flex flex-col">
        <Link>home</Link>
        <Link>products</Link>
        <Link>categories</Link>
      </div>
    </div>
  );
};

export default Footer;
