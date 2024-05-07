"use client";
import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { signIn, useSession } from "next-auth/react";
import Moment from "react-moment";
import { useEffect, useState } from "react";

export default function Post({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasliked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, []);
  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user.uid) !== -1) {
      setHasliked(true);
    } else {
      setHasliked(false);
    }
    // !== -1 means that the person does not exist within the likes array
  }, [likes, session?.user.uid]);

  async function likePost() {
    if (session) {
      if (hasliked) {
        await deleteDoc(doc(db, "posts", post.id, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
        signIn();
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* {user_img} */}
      <img
        className="h-9 w-9 rounded-full mr-4"
        src={post.data().userImg}
        alt="user"
      />
      <div className="">
        {/* {header} */}
        <div className="flex items-center justify-between">
          {/* {post user-info} */}
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{post.data().username} -{" "}
            </span>
            <span className="text-sm sm:rext-[15px] hover:underline">
              <Moment fromNow>{post?.data().timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* {dot-icon} */}
          <EllipsisHorizontalIcon className="h-8 p-1 w-10 hoverEffect" />
        </div>
        {/* {post-text} */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.data().text}
        </p>

        {/* {post-img} */}
        <img className="rounded-2xl mr-2" src={post.data().image} alt="" />

        <div className="flex justify-between text-gray-600 mt-2">
          {/* {icons} */}
          <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 hoverEffect hover:text-sky-400 p-1" />
          <TrashIcon className="h-7 w-7 hoverEffect hover:text-red-800 p-1" />
          <div className="flex items-center">
            {hasliked ? (
              <HeartIconFilled
                onClick={likePost}
                className="h-7 w-7 hoverEffect text-red-500 p-1"
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="h-7 w-7 hoverEffect hover:text-red-500 p-1"
              />
            )}
            {likes.length > 0 && (
              <>
                <span className={`${hasliked && "text-red-500"}`}>
                  {likes.length}
                </span>
              </>
            )}
          </div>
          <ShareIcon className="h-7 w-7 hoverEffect hover:text-green-500 p-1" />
          <ChartBarIcon className="h-7 w-7 hoverEffect hover:text-yellow-500 p-1" />
        </div>
      </div>
    </div>
  );
}
