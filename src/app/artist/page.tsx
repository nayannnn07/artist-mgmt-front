"use client";
import { useRouter } from "next/navigation";
import ArtistTable from "@/components/artist/artist-table";
import { Button } from "@/components/ui/button";

const ArtistPage = () => {
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          onClick={() => router.push("/artist/add")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Add Artist
        </Button>
      </div>
      <ArtistTable />
    </div>
  );
};

export default ArtistPage;
