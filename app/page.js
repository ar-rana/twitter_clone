import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen mx-auto">
        <Sidebar />

        <Feed />

        <Widgets/>
      </main>
    </div>
  );
}

export async function fetchNews() {
  const res = await fetch(
    "https://saurav.tech/NewsAPI/top-headlines/category/business/in.json"
  );
  const data = await res.json();
  return {
    data
  };
}

