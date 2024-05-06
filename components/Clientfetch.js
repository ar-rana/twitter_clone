"use client";
import { useEffect, useState } from "react";

export async function fetchNews() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  );
  const data = await res.json();
  return {
    data,
  };
}

export async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?results=50&inc=name,login,picture"
  );
  const UserData = await res.json();
  return {
    UserData,
  };
}

export function Clientfetch() {
  const [news, setNews] = useState(null);
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(3);
  const [userCount, setUsercount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const newsResults = await fetchNews();
      const userList = await fetchUsers();
      //console.log("datanewsapi: ", newsResults);
      //console.log("dataUserapi: ", userList);
      setNews(newsResults.data);
      setUsers(userList.UserData)
    };
    fetchData();
  }, []);

  if (!news) {
    return (
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-2xl p-3 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-1">What's Happening?</h4>
        <div>Loading...</div>
      </div>
    );
  }
  //   console.log("newsssssss: ", news)
  return (
    <div className="space-y-3">
      <div className="bg-gray-100 rounded-2xl p-3 w-[90%] xl:w-[75%]">
        <h4 className="text-lg font-bold mb-2">What's Happening?</h4>
        {news.articles.slice(0, count).map((article) => (
          <div key={article.title} className="flex items-center">
            <div className="cursor-pointer hover:bg-gray-200 mb-1.5">
              <a
                className="text-gray-600 font-bold hover:underline space-x-1"
                href={article.url}
                target="_blank"
              >
                {article.title}
              </a>
              <p className="text-gray-700">{article.author}</p>
            </div>
            <img
              className="rounded-2xl"
              src={article.urlToImage}
              alt="err"
              width="70"
              height="50"
            />
          </div>
        ))}
        <button
          className="hover:underline p-1"
          onClick={() => setCount(count + 3)}
        >
          See More
        </button>
      </div>
      <div className="bg-gray-100 rounded-2xl p-3 w-[90%] xl:w-[75%] z-40 sticky top-16">
        <h4 className="font-bold text-lg">Who to Follow?</h4>
        {users.results.slice(0,userCount).map((user)=>(
          <div key={user.login.username} className="flex p-1.5 hover:bg-gray-200 items-center rounded-3xl cursor-pointer">
            <img className="rounded-full" src={user.picture.thumbnail} alt="err" width="45" height="40"/>
            <div className="truncate ml-1">
              <h4 className="font-bold truncate">{user.name.first} {user.name.last}</h4>
              <h5 className="text-gray-500 text-sm hover:underline">@{user.login.username}</h5>
            </div>
            <button className="bg-black text-white rounded-full font-bold px-3.5 py-1.5 ml-auto">Follow</button>
          </div>
        ))
        }
        <button className="hover:underline p-1" onClick={()=>setUsercount(userCount+3)}>See More</button>
      </div>
    </div>
  );
}
