import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Post({post}) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
        {/* {user_img} */}
        <img className="h-9 w-9 rounded-full mr-4" src={post.userImg} alt="user"/>
        <div className="">
            {/* {header} */}
            <div className="flex items-center justify-between">
                {/* {post user-info} */}
                <div className="flex items-center space-x-2 whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
                    <span className="text-sm sm:text-[15px]">@{post.username} - </span>
                    <span className="text-sm sm:rext-[15px] hover:underline">{post.timestamp}</span>
                </div>
                {/* {dot-icon} */}
                <EllipsisHorizontalIcon className="h-8 p-1 w-10 hoverEffect"/>
            </div>
            {/* {post-text} */}
            <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.text}</p>

            {/* {post-img} */}
            <img className="rounded-2xl mr-2" src={post.img}alt="error"/>

            <div className="flex justify-between text-gray-600 mt-2">
                {/* {icons} */}
                <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 hoverEffect hover:text-sky-400 p-1"/>
                <TrashIcon className="h-7 w-7 hoverEffect hover:text-red-800 p-1"/>
                <HeartIcon className="h-7 w-7 hoverEffect hover:text-red-500 p-1"/>
                <ShareIcon className="h-7 w-7 hoverEffect hover:text-green-500 p-1"/>
                <ChartBarIcon className="h-7 w-7 hoverEffect hover:text-yellow-500 p-1"/>
            </div>
        </div>
    </div>

  )
}
