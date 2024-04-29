import Image from "next/image";
import SidebarMenuitem from "./SidebarMenuitem";
import { HomeIcon } from '@heroicons/react/24/solid'
import { HashtagIcon, BellIcon, InboxIcon, BookmarkIcon,ClipboardIcon, UserIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
        <div className="hoverEffect">
            <Image width="40" height="40" src="https://i.pinimg.com/564x/cc/31/6f/cc316f97197528e5e26e613a93ab16a4.jpg"></Image>
        </div>
        <div classname="mt-4 mb-2.5 xl:items-start">
            <SidebarMenuitem text="Home" Icon={HomeIcon} active/>
            <SidebarMenuitem text="Explore" Icon={HashtagIcon}/>
            <SidebarMenuitem text="Notification" Icon={BellIcon}/>
            <SidebarMenuitem text="Messages" Icon={InboxIcon}/>
            <SidebarMenuitem text="Bookmarks" Icon={BookmarkIcon}/>
            <SidebarMenuitem text="Lists" Icon={ClipboardIcon}/>
            <SidebarMenuitem text="Profile" Icon={UserIcon}/>
            <SidebarMenuitem text="More" Icon={EllipsisHorizontalIcon}/>
        </div>
        <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline xl:m-1 mt-1">Tweet</button>
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start xl:mt-auto">
            <img className="h-10 w-10 rounded-full xl:mr-2" src="https://i.pinimg.com/564x/4f/f6/15/4ff6159b7790b36775f596c4efa46265.jpg" alt="User-img"/>
            <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold rounded-full">User-Name</h4>
                <p className="text-gray-400">@username</p>
            </div>
            <EllipsisHorizontalIcon className="h-7 xl:ml-7 hidden xl:inline"/>
        </div> 
    </div>
  )
}

