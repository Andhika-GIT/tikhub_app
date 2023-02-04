import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import type { NextPage } from "next";

import Image from "next/image";
import Link from "next/link";

// icons
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { AiOutlineComment } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

// zustand store
import useAuthStore from "../store/authStore";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const { userProfile }: any = useAuthStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.load();
  }, [post.video.asset.url]);

  return (
    <>
      <div className="flex flex-col border-b-2 border-gray-200 pb-6">
        <div>
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="md:w-16 md:h-16 w-10 h-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className="rounded-full"
                    src={post.postedBy.image}
                    alt="profile photo"
                    layout="responsive"
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex items-center gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName} {` `}{" "}
                    <GoVerified className="text-blue-400 text-md" />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:ml-20 flex-col">
          <div className="rounded-3xl">
            <Link href={`/detail/${post._id}`}>
              <video
                loop
                ref={videoRef}
                className="lg:w-[600px] h-[300px] md:w-[400px] md:h-[400px] w-[350px] h-[350px] rounded-2xl cursor-pointer bg-gray-100"
                controls
              >
                <source src={post.video.asset.url} type="video/mp4" />
              </video>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href={`/detail/${post._id}`}>
              <div className="mt-5 flex justify-start w-max gap-2 md:gap-4 items-center cursor-pointer border-2 border-gray-200 p-2 rounded-full hover:bg-primary">
                <AiOutlineComment className="text-lg md:text-2xl" />
                <p className="text-sm md:text-base font-bold text-primary">
                  Like & Comment
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
