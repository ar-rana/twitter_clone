"use client";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import Post from "./Post";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, []);
  // const posts = [
  //   {
  //     id: "1",
  //     name: "Aryan Rana",
  //     username: "rana",
  //     userImg: "https://i.pinimg.com/564x/4f/f6/15/4ff6159b7790b36775f596c4efa46265.jpg",
  //     img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     text: "good",
  //     timestamp: "2 hrs ago"
  //   },
  //   {
  //     id: "2",
  //     name: "Rana",
  //     username: "23rana",
  //     userImg: "https://i.pinimg.com/564x/4f/f6/15/4ff6159b7790b36775f596c4efa46265.jpg",
  //     img: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fHww",
  //     text: "great",
  //     timestamp: "1 hrs ago"
  //   },
  //   {
  //     id: "3",
  //     name: "Aryan",
  //     username: "211rana",
  //     userImg: "https://i.pinimg.com/564x/4f/f6/15/4ff6159b7790b36775f596c4efa46265.jpg",
  //     img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fHww",
  //     text: "greater",
  //     timestamp: "1 day ago"
  //   },
  // ]
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky bg-white top-0 z-50 border-b border-gray-200">
        <h2 className="text-lg font-bold sm:text-xl cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Post key={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
