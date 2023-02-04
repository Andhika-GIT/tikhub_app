import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

// icons
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";

// child component
import Discover from "./sidebar-child/Discover";
import SuggestedAccounts from "./sidebar-child/SuggestedAccounts";
import Footer from "./sidebar-child/Footer";

const Sidebar = () => {
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] ROUNDED";

  return (
    <div>
      <div className="w-20 sm:w-[250px] xl:w-400 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
        <div className="sm:border-b-2 sm:pb-6 xl:pb-4 border-gray-200">
          <Link href="/">
            <div className={normalLink}>
              <p className="text-2xl sm:text-md">{<AiFillHome />}</p>
              <span className="text-sm md:text-xl hidden sm:block">
                For you
              </span>
            </div>
          </Link>
        </div>
        <Discover />
        <SuggestedAccounts />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
