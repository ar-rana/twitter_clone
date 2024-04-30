import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Feed() {
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky bg-white top-0 z-50 border-b border-gray-200">
            <h2 className="text-lg font-bold sm:text-xl cursor-pointer">Home</h2>
            <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
                <SparklesIcon className="h-5"/>
            </div>
        </div>
    </div>
  )
}
