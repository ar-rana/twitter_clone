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

export function Clientfetch() {
  const [news, setNews] = useState(null);
  const [count, setCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      const newsResults = await fetchNews();
      //console.log("dataaaa: ", newsResults);
      setNews(newsResults.data);
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
    <div className="bg-gray-100 rounded-2xl p-3 w-[90%] xl:w-[75%]">
      <h4 className="text-lg font-bold mb-2">What's Happening?</h4>
      {news.articles.slice(0, count).map((article) => (
        <div className="flex items-center">
          <div className="cursor-pointer hover:bg-gray-200 mb-1.5">
            <a
              className="text-gray-600 font-bold hover:underline space-x-1"
              href={article.url}
              target="_blank"
            >
              {article.title}
            </a>
            <p className="text-gray-700">{article.author}</ p>
          </div>
          <img className="rounded-2xl" src={article.urlToImage} alt="err" width="70" height="50"/>
        </div>
      ))}
      <button className="hover:underline" onClick={()=>setCount(count+3)}>See More</button>
    </div>
  );
}

