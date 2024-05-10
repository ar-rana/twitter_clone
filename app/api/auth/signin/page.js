"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { options } from "../[...nextauth]/options";

export default function Signin() {
  const [IsLoadingG, setIsLoadingG] = useState();

  // const handleLoginWithGoogle = async () => {
  //   setIsLoadingG(false);
  //   await signIn("google");
  //   setIsLoadingG(true);
  //   return;
  // };

  return (
    <div className="">
      {options.providers.map((provider) => (
        <div key={provider.name} className="flex flex-col items-center space-y-7 mt-[30%] xl:mt-[10%]">
          <img
            className="w-36 xl:w-40 rounded-3xl object-cover"
            src="https://i.pinimg.com/564x/cc/31/6f/cc316f97197528e5e26e613a93ab16a4.jpg"
            alt="error"
          />
          <button
            onClick={()=>signIn(provider.id, {callbackUrl: "/"})}
            className="bg-black rounded-full px-3 py-1 text-white hover:shadow-lg"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}
