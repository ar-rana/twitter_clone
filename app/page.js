import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen max-w-7xl mx-auto">
        <Sidebar />

        <Feed/>
      </main>
    </div>
  );
}
