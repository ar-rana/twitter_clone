"use client";
import Image from "next/image";
import SidebarMenuitem from "./SidebarMenuitem";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar() {
  let username;
  const { data: session } = useSession();

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="hoverEffect">
        <Image
          width="40"
          height="40"
          src="https://i.pinimg.com/564x/cc/31/6f/cc316f97197528e5e26e613a93ab16a4.jpg"
        ></Image>
      </div>
      <div classname="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuitem text="Home" Icon={HomeIcon} active />
        <SidebarMenuitem text="Explore" Icon={HashtagIcon} />
        {session && (
          <>
            <SidebarMenuitem text="Notification" Icon={BellIcon} />
            <SidebarMenuitem text="Messages" Icon={InboxIcon} />
            <SidebarMenuitem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuitem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuitem text="Profile" Icon={UserIcon} />
            <SidebarMenuitem text="More" Icon={EllipsisHorizontalIcon} />
          </>
        )}
      </div>
      {session ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline xl:m-1 mt-1">
            Tweet
          </button>
          {/* {mini profile} */}
          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start xl:mt-auto">
            <img
              onClick={signOut}
              className="h-10 w-10 rounded-full xl:mr-2"
              src={session.user.image}
              alt="User-img"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold rounded-full">{session.user.name}</h4>
              <p className="text-gray-400">@{session.user.username}</p>
            </div>
            <EllipsisHorizontalIcon className="h-7 xl:ml-7 hidden xl:inline" />
          </div>
        </>
      ) : (
        <>
          <button
            onClick={signIn}
            className="bg-black text-white rounded-full w-40 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline xl:m-1 mt-1 hover:shadow-lg"
          >
            SignIn
          </button>
        </>
      )}
    </div>
  );
}
