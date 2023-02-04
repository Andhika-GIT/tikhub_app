import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";

// icons
import { GoVerified } from "react-icons/go";

import useAuthStore from "../../store/authStore";
import { IUser } from "../../types";

interface IProps {
  mobile: boolean;
  onClose: () => void;
}

const SuggestedAccounts: NextPage<IProps> = ({ mobile, onClose }) => {
  const { fetchAllUsers, allUsers } = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return mobile ? (
    <div className="border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 text-sm">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user?._id}`} key={user?._id}>
            <div
              className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded"
              onClick={() => onClose()}
            >
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="user-profile"
                  layout="responsive"
                />
              </div>
              <div className="flex flex-col">
                <p className="gap-1 items-center text-md font-bold text-primary lowercase flex">
                  {user.userName.replaceAll(" ", "")}
                  {<GoVerified className="text-blue-400" />}
                </p>
                <p className="capitalize sm:text-sm text-gray-400 sm:text-primary text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="xl:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden sm:text-sm sm:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user?._id}`} key={user?._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded sm:mt-2">
              <div className="w-8 h-8">
                <Image
                  src={user.image}
                  width={34}
                  height={34}
                  className="rounded-full"
                  alt="user-profile"
                  layout="responsive"
                />
              </div>
              <div className="hidden sm:block">
                <p className="gap-1 items-center text-md font-bold text-primary lowercase hidden xl:flex">
                  {user.userName.replaceAll(" ", "")}
                  {<GoVerified className="text-blue-400" />}
                </p>
                <p className="capitalize sm:text-sm text-gray-400 sm:text-primary text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
