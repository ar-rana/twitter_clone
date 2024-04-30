import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        className="h-8 rounded-full cursor-pointer hover:brightness-95"
        src="https://i.pinimg.com/564x/4f/f6/15/4ff6159b7790b36775f596c4efa46265.jpg"
        alt="img"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            row="2"
            placeholder="What's Happening?"
          ></textarea>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className=" flex">
            <PhotoIcon className="h-9 w-9 p-1 hoverEffect" />
            <FaceSmileIcon className="h-9 w-9 p-1 hoverEffect" />
          </div>
          <button className="bg-blue-400 text-white rounded-full px-4 w-35 h-10 font-bold shadow-md hover:brightness-95 disabled:opacity-50" disabled>Tweet</button>
        </div>
      </div>
    </div>
  );
}
