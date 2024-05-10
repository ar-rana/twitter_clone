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
import { db, storage } from "@/firebase";
import { signIn, useSession } from "next-auth/react";
import Moment from "react-moment";
import { useEffect, useState } from "react";
// import { deleteObject, ref } from "firebase/storage";
import { useContext } from "react";
import { ModalState } from "@/app/context/ModalState";

export default function Comment({ commentId, id, originalPostID,comment }) {
  const { setOpen } = useContext(ModalState);
  const { setPostId } = useContext(ModalState);
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasliked, setHasliked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostID,"comments",commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostID]);

  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user.uid) !== -1) {
      setHasliked(true);
    } else {
      setHasliked(false);
    }
    // !== -1 means that the person does not exist within the likes array
  }, [likes, session?.user.uid]);

  async function likeComment() {
    if (session) {
      if (hasliked) {
        await deleteDoc(doc(db, "posts", originalPostID,"comments", commentId, "likes", session.user.uid));
      } else {
        await setDoc(doc(db, "posts", originalPostID,"comments", commentId, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    } else {
      signIn();
    }
  }

  async function deleteComment() {
    if (window.confirm("Do you want you want to delete this comment?")) {
      deleteDoc(doc(db, "posts", originalPostID,"comments", commentId));
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      {/* {user_img} */}
      <img
        className="h-9 w-9 rounded-full mr-4"
        src={comment?.image}
        alt="user"
      />
      <div className="flex-1">
        {/* {header} */}
        <div className="flex items-center justify-between">
          {/* {comment user-info} */}
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{comment?.username} -{" "}
            </span>
            <span className="text-sm sm:rext-[15px] hover:underline">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* {dot-icon} */}
          <EllipsisHorizontalIcon className="h-8 p-1 w-10 hoverEffect" />
        </div>
        {/* {comment-text} */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {comment?.comment}
        </p>

        {/* {comment-img} */}

        <div className="flex justify-between text-gray-600 mt-2">
          {/* {icons} */}
          <div className="flex items-center">
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => {
                if (!session) {
                  signIn();
                } else {
                  setOpen((prevstate) => !prevstate);
                  setPostId(originalPostID);
                }
              }}
              className="h-7 w-7 hoverEffect hover:text-sky-400 p-1"
            />
            
          </div>
          
          {session?.user.uid === comment.commentUID && (
            <TrashIcon
              onClick={deleteComment}
              className="h-7 w-7 hoverEffect hover:text-red-800 p-1"
            />
          )}
          <div className="flex items-center">
            {hasliked ? (
              <HeartIconFilled
                onClick={likeComment}
                className="h-7 w-7 hoverEffect text-red-500 p-1"
              />
            ) : (
              <HeartIcon
                onClick={likeComment}
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
