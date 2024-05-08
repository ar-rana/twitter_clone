"use client";
import { useContext, useEffect, useState } from "react";
import { ModalState } from "@/app/context/ModalState";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Moment from "react-moment";
import { useSession } from "next-auth/react";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function CommentModal() {
  const { data: session } = useSession();
  const { open, setOpen } = useContext(ModalState);
  const { postId } = useContext(ModalState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    if (postId) {
      const docRef = doc(db, "posts", postId);
      onSnapshot(docRef, (snapshot) => {
        setPost(snapshot.data());
      });
    }
  }, [postId, db]);

  return (
    <div className="">
      {open && (
        <Modal
          className="max-w-lg h-[300px] w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-400 rounded-xl shadow-md"
          isOpen={open}
          onRequestClose={() => setOpen(false)}
        >
          <div className="p-1">
            <div className="border-b border-gray-200">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect p-0 w-9 h-9 flex items-center justify-center"
              >
                <XMarkIcon className="h-[22px] text-gray-600" />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 absolute z-[-1] h-full left-7 top-11 bg-gray-300" />
              <img
                className="h-9 w-9 rounded-full mr-4"
                src={post?.userImg}
                alt="user"
              />
              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[15px]">
                @{post?.username} -{" "}
              </span>
              <span className="text-sm sm:rext-[15px] hover:underline">
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </span>
            </div>
            <p className="text-gray-600 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.text}
            </p>
            <div className="flex p-3 space-x-3">
              <img
                className="h-8 rounded-full cursor-pointer hover:brightness-95"
                src={session?.user.image}
                alt="User"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    row="2"
                    placeholder="Reply Here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex">
                    <div className="">
                      <PhotoIcon className="h-9 w-9 p-1 hoverEffect" />
                      <input type="file" hidden />
                    </div>
                    <FaceSmileIcon className="h-9 w-9 p-1 hoverEffect" />
                  </div>
                  <button
                    className="bg-blue-400 text-white rounded-full px-4 w-35 h-10 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                    disabled={!input.trim()}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
