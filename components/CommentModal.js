"use client";
import { useContext } from "react";
import { ModalState } from "@/app/context/ModalState";

export default function CommentModal() {
  const { open, setOpen } = useContext(ModalState);
  return (
    <div className="">
        { open ? (
            <div className="">CommentModal is true</div>
        ): (
            <div className="">CommentModal is false</div>
        )}
    </div>
  )
}
