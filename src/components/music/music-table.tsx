"use client";
import { useEffect, useState } from "react";
import { fetchMusic, deleteMusic } from "@/api/api"; // Add deleteMusic function in API
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";

interface Music {
  id: number;
  title: string;
  album_name: string;
  artist: string;
  genre: string;
  created_at: string;
  updated_at: string;
}

const MusicTable = () => {
  const [musicList, setMusicList] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getMusic = async () => {
      try {
        const data = await fetchMusic();
        setMusicList(data);
      } catch (err) {
        setError("Failed to load music.");
      } finally {
        setLoading(false);
      }
    };
    getMusic();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this music?")) return;

    try {
      await deleteMusic(id);
      setMusicList(musicList.filter((music) => music.id !== id));
    } catch {
      setError("Failed to delete music.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Music List</h2>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading music...</p>
      ) : musicList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Album</th>
                <th className="border px-4 py-2">Artist</th>
                <th className="border px-4 py-2">Genre</th>
                <th className="border px-4 py-2">Created Date</th>
                <th className="border px-4 py-2">Updated Date</th>
                <th className="border px-4 py-2">Actions</th>
                {/* Added Actions column */}
              </tr>
            </thead>
            <tbody>
              {musicList.map((music) => (
                <tr key={music.id} className="border-b">
                  <td className="border px-4 py-2">{music.id}</td>
                  <td className="border px-4 py-2">{music.title}</td>
                  <td className="border px-4 py-2">{music.album_name}</td>
                  <td className="border px-4 py-2">{music.artist}</td>
                  <td className="border px-4 py-2">
                    {music.genre.charAt(0).toUpperCase() + music.genre.slice(1)}
                  </td>
                  <td className="border px-4 py-2">
                    {music.created_at.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    {music.updated_at.split("T")[0]}
                  </td>
                  <td className="border px-4 py-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition">
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                        <DropdownMenuItem
                          onClick={() => router.push(`/music/${music.id}`)}
                          className="p-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-300">
                            View Details
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/music/edit/${music.id}`)}
                          className="p-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Edit className="w-5 h-5 text-yellow-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Edit Music
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(music.id)}
                          className="p-3 flex items-center space-x-2 hover:bg-red-100 dark:hover:bg-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Delete Music
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No music found.</p>
      )}
    </div>
  );
};

export default MusicTable;
