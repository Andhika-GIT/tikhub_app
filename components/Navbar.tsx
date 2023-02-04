import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import axios from "axios";

// icons
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

// utils
import { createOrGetUser } from "../utils";

// store data management
import useAuthStore from "../store/authStore";

// react-auth
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

import Logo from "../utils/tikhub-logo.png";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const user = false;
  const { userProfile, addUser, removeUser }: any = useAuthStore();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        createOrGetUser(res.data, addUser);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-4 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]  ">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktik"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative">
        <form
          onSubmit={handleSearch}
          className="static top-0 md:top-10 -left-[100px] md:-left-20 bg-white"
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
            className="bg-primary p-1 md:p-3 text-sm md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[150px] md:w-[300px] rounded-full top-0 md:placeholder:text-base placeholder:text-[10px]"
          />
          <button className="absolute hidden md:block md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 md:text-lg text-sm text-gray-400">
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button
                className="
              hidden md:flex border-2 px-2 md:px-4 text-md font-semibold items-center gap-2
              "
              >
                <IoMdAdd className="text-xl" /> {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile?.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile?.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}
            <button type="button" className="px-2 hidden md:block">
              <AiOutlineLogout
                color="red"
                fontSize={30}
                onClick={() => {
                  removeUser();
                  googleLogout();
                }}
              />
            </button>
          </div>
        ) : (
          <button
            className="bg-white text-sm md:text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-4 md:px-6 py-1 rounded-xl outline-none w-full md:mt-3 hover:text-white hover:bg-[#F51997]"
            onClick={handleGoogleLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
