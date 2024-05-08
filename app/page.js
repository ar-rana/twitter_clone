"use client";
import CommentModal from "@/components/CommentModal";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { ModalState } from "./context/ModalState";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState("");
  return (
    <div>
      <ModalState.Provider value={{ open, setOpen, postId, setPostId }}>
        <main className="flex min-h-screen mx-auto">
          <Sidebar />

          <Feed />

          <Widgets />

          <CommentModal />
        </main>
      </ModalState.Provider>
    </div>
  );
}
