import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { SanityAssetDocument } from "@sanity/client";

// icons
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { client } from "../utils/client";
import { topics } from "../utils/constants";
import { BASE_URL } from "../utils";

// zustand store management
import useAuthStore from "../store/authStore";

const Upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<
    SanityAssetDocument | undefined
  >();
  const [wrongFileType, setWrongFileType] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0]);
  const [savingPost, setSavingPost] = useState(false);

  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  const uploadVideo = async (event: any) => {
    setWrongFileType(false);

    // take the uploaded file
    const selectedFile = event.target.files[0];

    const fileSize = Math.round(selectedFile.size / 1024);

    // define the video extension
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (!fileTypes.includes(selectedFile.type)) {
      setIsLoading(false);
      setWrongFileType(true);
      setErrorMessage("Unsupported Video Format");
      return;
    }

    if (fileSize > 10240) {
      setIsLoading(false);
      setWrongFileType(true);
      setErrorMessage("Video size is too big");
      return;
    }

    // file uploaded file matches the types that we define, upload it into sanity client asset
    client.assets
      .upload("file", selectedFile, {
        contentType: selectedFile.type,
        filename: selectedFile.name,
      })
      // get back the image data
      .then((data) => {
        setVideoAsset(data);
        setIsLoading(false);
      });
  };

  const handlePost = async () => {
    // check if all field is not null
    if (caption && videoAsset?._id && category) {
      setSavingPost(true);

      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await axios.post(`${BASE_URL}/api/post`, document);

      router.push("/");
    } else {
      setIsLoading(false);
      setWrongFileType(true);
      setErrorMessage("Please fill all input");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] lg:top-[90px] md:pt-10 bg-[#F8F8F8] justify-center">
      <div className=" bg-white rounded-lg xl:h-[90vh] h-full flex gap-6 flex-wrap justify-center items-center p-14 pt-6">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md text-gray-400 mt-1">
              Post a video to your account
            </p>
          </div>
          <div className="flex justify-center mt-5 md:hidden">
            {wrongFileType && (
              <p className="text-md text-red-400 font-semibold">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-3 md:mt-10 w-[260px] h-[420px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div className="w-[230px] flex justify-center">
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className="rounded-xl h-[390px] bg-black"
                    ></video>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center">
                        <p className="font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className="text-xl font-semibold">Upload Video</p>
                      </div>
                      <p className="text-gray-400 text-center mt-5 md:mt-10 text-sm leading-10">
                        MP4 or WebM or ogg <br />
                        720X1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 10mb
                      </p>
                      <p className="bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p2 w-52 outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      className="w-0 h-0"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-[100px] md:pb-10 mb">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            value={caption}
            maxLength="25"
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            onChange={(e: any) => {
              setCategory(e.target.value);
            }}
            className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
          >
            {topics.map((topic) => (
              <option
                key={topic.name}
                className="outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                value={topic.name}
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className="flex flex-col gap-3">
            <div className="flex gap-6 mt-10 mb-5">
              <button
                className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                onClick={() => {
                  setVideoAsset(undefined);
                }}
                type="button"
              >
                Discard
              </button>
              <button
                className="bg-[#F51997] text-white border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                onClick={handlePost}
                type="button"
              >
                Post
              </button>
            </div>
            <div className="hidden md:flex justify-center">
              {wrongFileType ? (
                <p className="text-md text-red-400 font-semibold">
                  {errorMessage}
                </p>
              ) : (
                <p className="text-white">blank</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
