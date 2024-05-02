"use client";
import { useEffect, useState } from "react";
import { fetchNews } from "@/app/page";

export function Clientfetch() {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const newsResults = fetchNews();
      setNews(newsResults.data);
    };
    setTimeout(fetchData(), 2000);
    setTimeout(console.log("newsssssss: ", news), 3000);
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
    <div>
      <h4>What's Happening?</h4>
      {news.articles.map((article) => (
        <div className="cursor-pointer hover:bg-gray-200 space-y-0.5">
            <a className="text-gray-600 hover:underline" href={article.url} target="_blank">{article.title}</a>
        </div>
      ))}
    </div>
  );
}
// const get = Clientfetch();
// console.log("dataaaaaaa: ", get)

// https://saurav.tech/NewsAPI/top-headlines/category/business/in.json

// export const getServerSideProps = (async () => {
//   // Fetch data from external API
//   const res = fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/in.json')
//   const newsResults = await res.json()
//   // Pass data to the page via props
//   return { props: { newsResults } }
// })
