import React from "react";
import {
  MagnifyingGlassIcon,
  HeartIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Easy Search",
    description: "Search any product you want using our advance search feature",
    icon: MagnifyingGlassIcon,
  },
  {
    name: "Secure Authentication",
    description:
      "Our authentication process follows industry standard which are aligned with the Government rules and regulations.",
    icon: LockClosedIcon,
  },
  {
    name: "Wishlist Feature",
    description:
      "You can save your favorite item for future purchase so that it don't lost in feed",
    icon: HeartIcon,
  },
  {
    name: "Advanced Login",
    description:
      "Tired of inserting your username and password every time you visit the website? We cut out your hard work to only one click. You can login into your account with only one click.",
    icon: FingerPrintIcon,
  },
];

function AboutUs() {
  return (
    <>
      <div className="py-24 sm:py-32  mx-auto p-4 pt-navtop">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              About <span className="text-blue-500 italic">Sasto Bazaar</span>
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to Sastobazaar, where shopping meets convenience! Dive
              into a seamless online shopping experience with a myriad of
              features designed to make your purchase journey enjoyable and
              hassle-free.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

    </>
  );
}

export default AboutUs;
