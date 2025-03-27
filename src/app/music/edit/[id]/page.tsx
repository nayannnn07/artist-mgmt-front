"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Artist {
  id: number;
  name: string;
}

interface MusicData {
  title: string;
  album_name: string;
  artist_id: number | string;
  artist?: string; // Artist name for display
  genre: string;
  created_at: string;
  updated_at: string;
}

const EditMusic = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<MusicData>({
    title: "",
    album_name: "",
    artist_id: "",
    artist: "",
    genre: "",
    created_at: "",
    updated_at: "",
  });

  const [artists, setArtists] = useState<Artist[]>([]);
  const [initialArtistName, setInitialArtistName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const genres = ["rnb", "country", "classic", "rock", "jazz"];

  useEffect(() => {
    if (!id) return;

    const fetchMusic = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/music/${id}/`);
        if (!res.ok) throw new Error(`Error ${res.status}: Music not found`);

        const data = await res.json();

        setFormData({
          title: data.title,
          album_name: data.album_name,
          artist_id: data.artist_id ? data.artist_id.toString() : "",
          artist: data.artist || "",
          genre: data.genre,
          created_at: data.created_at.split("T")[0],
          updated_at: data.updated_at.split("T")[0],
        });

        setInitialArtistName(data.artist || "");

        // Fetch Artists
        const artistRes = await fetch("http://127.0.0.1:8000/api/artist/");
        if (!artistRes.ok) throw new Error("Failed to fetch artists");

        const artistData = await artistRes.json();
        setArtists(artistData);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/music/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      router.push("/music");
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update music. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Music</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading music details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="block mb-2">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
          </div>

          {/* Album Name */}
          <div>
            <Label htmlFor="album_name" className="block mb-2">
              Album Name
            </Label>
            <Input
              id="album_name"
              type="text"
              value={formData.album_name}
              onChange={(e) =>
                setFormData({ ...formData, album_name: e.target.value })
              }
              required
              className="border p-2 w-full"
            />
          </div>

          {/* Artist Dropdown */}
          <div>
            <Label htmlFor="artist_id" className="block mb-2">
              Artist
            </Label>
            <Select
              value={formData.artist_id || ""}
              onValueChange={(selectedArtistId) => {
                const selectedArtist = artists.find(
                  (artist) => artist.id.toString() === selectedArtistId
                );

                setFormData((prevData) => ({
                  ...prevData,
                  artist_id: selectedArtistId,
                  artist: selectedArtist
                    ? selectedArtist.name
                    : prevData.artist,
                }));
              }}
            >
              <SelectTrigger className="border p-2 w-full">
                <SelectValue placeholder={formData.artist || "Select Artist"} />
              </SelectTrigger>
              <SelectContent>
                {artists.map((artist) => (
                  <SelectItem key={artist.id} value={artist.id.toString()}>
                    {artist.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Genre Dropdown */}
          <div>
            <Label htmlFor="genre" className="block mb-2">
              Genre
            </Label>
            <Select
              value={formData.genre}
              onValueChange={(selectedGenre) => {
                setFormData({ ...formData, genre: selectedGenre });
              }}
            >
              <SelectTrigger className="border p-2 w-full">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update
          </Button>
        </form>
      )}
    </div>
  );
};

export default EditMusic;
