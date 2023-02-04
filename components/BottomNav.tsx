import React, { useState } from "react";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { HiOutlineLogout } from "react-icons/hi";

import InfoModal from "./InfoModal";

// react-auth
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { info } from "console";

import useAuthStore from "../store/authStore";
import { IoMdAdd } from "react-icons/io";

const BottomNav = () => {
  const [showInfo, setShowInfo] = useState(false);

  const { removeUser, userProfile }: any = useAuthStore();

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] ROUNDED";
  return (
    <>
      <InfoModal show={showInfo} onClose={() => setShowInfo(false)} />
      <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-1 px-4 bg-gray-50 shadow-[0px_7px_15px_0px_rgba(0,0,0,0.56)]">
        <Link href="/">
          <div className={normalLink}>
            <p className="text-2xl sm:text-md">{<AiFillHome />}</p>
          </div>
        </Link>
        <button onClick={() => setShowInfo(true)}>
          <div className={normalLink}>
            <p className="text-2xl sm:text-md">{<BiCategory />}</p>
          </div>
        </button>
        {userProfile && (
          <>
            <div className={normalLink}>
              <Link href="/upload">
                <button
                  className="
             border-[1px] border-[#F51997] px-2 py-2 md:px-4 text-md font-bold rounded-full flex items-center text-[#F51997] gap-1"
                >
                  <IoMdAdd className="text-md" />
                </button>
              </Link>
            </div>
            <div className={normalLink}>
              <p className="text-2xl sm:text-md">
                {
                  <HiOutlineLogout
                    onClick={() => {
                      removeUser();
                      googleLogout();
                    }}
                  />
                }
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default BottomNav;
