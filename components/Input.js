"use client";
import { db, storage } from "@/firebase";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Input() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [base64, setBase64] = useState(null);
  //const [loading, setLoading] = useState(false);
  const fileChooser = useRef(null);
  //console.log("session: ",session);

  // if (loading) {
  //   return;
  // }
  // setLoading(true)

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, "posts"), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (base64) {
      await uploadString(imageRef, base64, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
    setBase64(null);
    setInput("");
    // setLoading(false)
  };

  const getBase64 = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = (readerEvent) => {
      //console.log(readerEvent.target.result)
      setBase64(readerEvent.target.result);
    };
  };

  if (!session) {
    return;
  }
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        title="Click to SignOut"
        onClick={signOut}
        className="h-8 rounded-full cursor-pointer hover:brightness-95"
        src={session.user.image}
        alt="img"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            row="2"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        {base64 && (
          <>
            <div className="relative">
              <XMarkIcon
                onClick={() => setBase64(null)}
                className="h-7 absolute cursor-pointer bg-white rounded-full hover:shadow-lg"
              />
              <img src={base64} className="" />
            </div>
          </>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex">
            <div className="" onClick={() => fileChooser.current.click()}>
              <PhotoIcon className="h-9 w-9 p-1 hoverEffect" />
              <input
                type="file"
                hidden
                ref={fileChooser}
                onChange={getBase64}
              />
            </div>
            <FaceSmileIcon className="h-9 w-9 p-1 hoverEffect" />
          </div>
          <button
            className="bg-blue-400 text-white rounded-full px-4 w-35 h-10 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
            disabled={!input.trim()}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
