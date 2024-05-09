"use client";
import { useRouter } from "next/navigation";
import CommentModal from "../../../components/CommentModal";
import Sidebar from "../../../components/Sidebar";
import Widgets from "../../../components/Widgets";
import { ModalState } from "../../context/ModalState";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { onSnapshot, doc } from "firebase/firestore";
import Post from "@/components/Post";
import { db } from "@/firebase";

export default function Postpage({ params }) {
  const postID = params.postid;
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const [post, setPost] = useState(null);

  useEffect(()=>{
    onSnapshot(doc(db, "posts", postID), (snapshot)=>{
      setPost(snapshot);
    })
  }, [db, postID])

  // if (!session) {
  //   router.push("/");
  // }

  return (
    <div>
      <ModalState.Provider value={{ open, setOpen, postId, setPostId }}>
        <main className="flex min-h-screen mx-auto">
          <Sidebar />

          <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
            <div className="flex items-center py-2 px-3 sticky bg-white top-0 z-50 border-b border-gray-200 space-x-1">
              <div className="hoverEffect" onClick={()=> router.push("/")}>
                <ArrowLeftIcon className="h-5 font-bold" />
              </div>
              <h2 className="font-bold sm:text-xl text-lg">Home</h2>
            </div>
            <Post post={post} id={postID}/>
          </div>

          <Widgets />

          <CommentModal />
        </main>
      </ModalState.Provider>
    </div>
  );
}
