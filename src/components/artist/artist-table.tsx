"use client";
import { useEffect, useState } from "react";
import { fetchArtists, deleteArtist } from "@/api/api";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

interface Artist {
  id: number;
  name: string;
  dob: string;
  gender: string;
  address: string;
  first_release_year: number;
  no_of_albums_released: number;
  created_at: string;
  updated_at: string;
}

const ArtistTable = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteArtistId, setDeleteArtistId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (err) {
        setError("Failed to load artists.");
      } finally {
        setLoading(false);
      }
    };
    getArtists();
  }, []);

  const handleDelete = async () => {
    if (!deleteArtistId) return;

    try {
      await deleteArtist(deleteArtistId);
      setArtists(artists.filter((artist) => artist.id !== deleteArtistId));
      setDeleteArtistId(null); // Close the dialog
    } catch {
      setError("Failed to delete artist.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
        Artist List
      </h2>

      {error && (
        <Alert variant="destructive" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-gray-600 dark:text-gray-300 text-center">
          Loading artists...
        </div>
      ) : artists.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr className="text-center">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">DOB</th>
                <th className="px-5 py-3">Gender</th>
                <th className="px-5 py-3">Address</th>
                <th className="px-5 py-3">First Release Year</th>
                <th className="px-5 py-3">Albums Released</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {artists.map((artist, index) => (
                <tr
                  key={artist.id}
                  className={`text-center ${
                    index % 2 === 0
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "bg-gray-300 dark:bg-gray-800"
                  } hover:bg-gray-400 dark:hover:bg-gray-600 transition`}
                >
                  <td className="px-5 py-4">{artist.id}</td>
                  <td className="px-5 py-4">{artist.name}</td>
                  <td className="px-5 py-4">{artist.dob.split("T")[0]}</td>
                  <td className="px-5 py-4">
                    {artist.gender === "m"
                      ? "Male"
                      : artist.gender === "f"
                      ? "Female"
                      : "Other"}
                  </td>
                  <td className="px-5 py-4">{artist.address}</td>
                  <td className="px-5 py-4">{artist.first_release_year}</td>
                  <td className="px-5 py-4">{artist.no_of_albums_released}</td>
                  <td className="px-5 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition">
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
                        <DropdownMenuItem
                          onClick={() => router.push(`/artist/${artist.id}`)}
                          className="p-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Eye className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                          <span className="text-gray-700 dark:text-gray-300">
                            View Details
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/artist/edit/${artist.id}`)
                          }
                          className="p-3 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <Edit className="w-5 h-5 text-yellow-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Edit Artist
                          </span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDeleteArtistId(artist.id)}
                          className="p-3 flex items-center space-x-2 hover:bg-red-100 dark:hover:bg-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                          <span className="text-gray-700 dark:text-gray-300">
                            Delete Artist
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
        <div className="text-gray-600 dark:text-gray-300 text-center">
          No artists found.
        </div>
      )}

      <AlertDialog
        open={!!deleteArtistId}
        onOpenChange={(open) => !open && setDeleteArtistId(null)}
      >
        <AlertDialogTrigger asChild>
          <button style={{ display: "none" }} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this artist? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel
              onClick={() => setDeleteArtistId(null)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md text-gray-800 dark:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArtistTable;
