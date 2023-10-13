import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="relative p-16 flex flex-col gap-12 bg-black text-white dark:bg-black dark:text-darktext dark:border-t-[1px] dark:border-t-slate-700 lg:flex-row">
      <div className="flex flex-col gap-5 lg:w-1/4 ">
        <p className="text-xl font-bold uppercase">
          Sasto <span className="text-primary"> Bazaar</span>
        </p>

        <div className="flex flex-col gap-6">
          <p className="tracking-wide">
            Welcome to Sastobazaar, where shopping meets convenience! Dive into
            a seamless online shopping experience with a myriad of features
            designed to make your purchase journey enjoyable and hassle-free.
          </p>
          <div className="flex gap-5 text-5xl">
            <Link to="https://github.com/kriteshTimsina" target="_blank">
              <AiFillGithub />
            </Link>
            <Link to="https://twitter.com/kritstims" target="_blank">
              <AiFillTwitterCircle />
            </Link>
            <Link
              to="https://www.linkedin.com/in/kriteshtimsina/"
              target="_blank"
            >
              <AiFillLinkedin />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between lg:w-1/2 lg:justify-around">
        <div className="flex flex-col gap-5 ">
          <h1 className="font-bold text-lg">Categories</h1>
          <div className="text-slate-300 flex flex-col gap-1 ">
            <p>Menswear</p>
            <p>Womenswear</p>
            <p>Laptops and Accesories</p>
            <p>Ornaments</p>
            <p>Hoodies</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-lg">Help</h1>
          <div className=" text-slate-300 flex flex-col gap-1 ">
            <p>About us</p>
            <p>FAQs</p>
            <p>How it works</p>
            <p>Privacy policy</p>
            <p>Payment </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:w-1/4">
        <p className="font-bold text-lg">Get in touch</p>

        <div className="flex flex-col gap-1  text-slate-300">
          <p>sastobazaar@support.com</p>
          <p>+977980148391</p>
        </div>
      </div>

      <div className="flex flex-col items-center  text-slate-300 md:flex-row md:justify-between lg:right-0 lg:left-0 lg:absolute lg:bottom-3 lg:px-10">
        <p> &copy; Copyright All rights reserved.</p>
        <p>Terms & Conditions</p>
      </div>
    </div>
  );
};

export default Footer;
