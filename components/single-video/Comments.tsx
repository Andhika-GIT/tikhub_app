import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// icons
import { GoVerified } from 'react-icons/go';

// zustand store
import useAuthStore from '../../store/authStore';
import NoResults from '../NoResults';

// types
import { IUser } from '../../types';

// utils
import { createOrGetUser } from '../../utils';

// react-oauth
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

// typescript interface
interface Icomment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

interface Iprops {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: Icomment[];
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: Iprops) => {
  const { userProfile, allUsers, addUser }: any = useAuthStore();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        });

        createOrGetUser(res.data, addUser);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const commentElement = comments?.map((item, idx) => (
    <>
      {allUsers.map(
        (user: IUser) =>
          user._id === (item.postedBy._id || item.postedBy._ref) && (
            <div className="p-3 items-center bg-gray-100 rounded-xl" key={idx}>
              <Link href={`/profile/${user._id}`}>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8">
                    <Image src={user.image} width={34} height={34} className="rounded-full" alt="user-profile" layout="responsive" />
                  </div>
                  <div className="block">
                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName.replaceAll(' ', '')}
                      {<GoVerified className="text-blue-400" />}
                    </p>
                    <p className="hidden md:block capitalize text-gray-400 text-xs">{user.userName}</p>
                  </div>
                </div>
              </Link>
              <div className="mt-4">
                <p>{item.comment}</p>
              </div>
            </div>
          )
      )}
    </>
  ));

  return (
    <div className="border-t-2 mt-4 border-gray-200 pt-4 px-10 bg-[#F8F8F8] lg:pb-0 pb-[150px]">
      <div className="overflow-scroll lg:h-[475px] flex flex-col gap-4">{comments?.length ? commentElement : <NoResults text="No comments yet" />}</div>

      {userProfile ? (
        <div className="absolute md:bottom-0 left-0 right-0 pt-6 pb-[120px] md:pb-6 px-3 md:px-10">
          <form onSubmit={addComment} className="flex gap-4">
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="type comment"
              className="bg-primary px-3 md:px-6 py-2 md:py-4 text-md font-medium border-2 md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button type="submit" className="bg-white text-sm md:text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-3 md:px-6 py-1 rounded-xl outline-none hover:text-white hover:bg-[#F51997]">
              {isPostingComment ? 'Commenting...' : 'add'}
            </button>
          </form>
        </div>
      ) : (
        <div className="px-2 py-4 border-t-2 flex flex-col gap-3">
          <p className="text-gray-400 text-center">Log in to like and comment on videos.</p>
          <div className="pr-4 flex justify-center">
            <button className="bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-7 py-1 rounded-md outline-none w-[200px] mt-3 hover:text-white hover:bg-[#F51997]" onClick={handleGoogleLogin}>
              Log in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
