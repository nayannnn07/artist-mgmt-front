"use client";

import MusicTable from "@/components/music/music-table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const MusicPage = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          onClick={() => router.push("/music/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Music
        </Button>
      </div>
      <MusicTable />
    </div>
  );
};

export default MusicPage;
