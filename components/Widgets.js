import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Widgets() {
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
        <div className="w-[90%] xl:w-[75%] sticky bg-white py-1.5 z-50">
            <div className="flex items-center p-2 rounded-full bg-gray-200 relative">
                <MagnifyingGlassIcon className="h-5 z-50 text-gray-500"/>
                <input className="border-none focus:ring-0 bg-gray-200 absolute inset-0 rounded-full pl-10 focus:shadow-md" type="text" placeholder="search"/>
            </div>
        </div>
    </div>
  )
}
