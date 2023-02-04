import React, { useState, useEffect } from "react";

// icons
import { MdFavorite } from "react-icons/md";

// zustand state
import useAuthStore from "../../store/authStore";

// shortener number
const shortNum = require("number-shortener");

interface Iprops {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({ likes, handleLike, handleDislike }: Iprops) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  // filterLikes contains array that is greater than zero if user already like the post
  const filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className="flex gap-6">
      <div className="mt-4 gap-3 flex flex justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <div
            className="bg-primary rounded-full p-2 md:p-3 text-[#F51997]"
            onClick={handleDislike}
          >
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        ) : (
          <div
            className="bg-primary rounded-full p-2 md:p-3"
            onClick={handleLike}
          >
            <MdFavorite className="text-lg md:text-xl" />
          </div>
        )}
        <p className="text-md font-semibold">{shortNum(likes?.length || 0)}</p>
      </div>
    </div>
  );
};

export default LikeButton;
