import React, { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { topics } from "../../utils/constants";

interface IProps {
  mobile: boolean;
  onClose: () => void;
}

const Discover: NextPage<IProps> = ({ mobile, onClose }) => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "sm:border-2 sm:border-[#F51997] sm:rounded-full hover:bg-primary px-3 py-2 rounded flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "sm:border-2 sm:border-gray-300 sm:rounded-full hover:bg-primary px-3 py-2 rounded flex items-center gap-2 justify-center cursor-pointer text-black";
  const topicStyleMobile =
    "border-2 border-gray-300 rounded-full hover:bg-primary px-3 py-2 rounded flex items-center gap-2 justify-center cursor-pointer text-black";

  return mobile ? (
    <div className="border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3">populer topics</p>
      <div className="flex gap-3 mt-4 flex-wrap">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topicStyleMobile} onClick={() => onClose()}>
              <span className="font-bold text-sm">{item.icon}</span>
              <span className="font-medium text-sm capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="sm:border-b-2 sm:border-gray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden sm:block sm:text-center">
        populer topics
      </p>
      <div className="flex gap-3 flex-wrap sm:justify-center xl:justify-start">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl sm:text-sm xl:text-md">
                {item.icon}
              </span>
              <span className="hidden font-medium text-md xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
