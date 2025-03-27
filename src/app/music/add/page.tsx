"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateMusic = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    artist_id: "",
    title: "",
    album_name: "",
    genre: "",
  });

  const [artists, setArtists] = useState([]); // ✅ Store artist list
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch artists from database
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/artist/");
        if (!res.ok) throw new Error("Failed to fetch artists");

        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error("Artists fetch error:", error);
        setError("Failed to fetch artists.");
      }
    };

    fetchArtists();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/music/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to create music (Status: ${res.status})`);
      }

      router.push("/music");
    } catch (error) {
      console.error("Music creation error:", error);
      setError("Failed to create music. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create New Music</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Artist Dropdown */}
        <label className="block text-gray-700">Artist</label>
        <select
          name="artist_id"
          value={formData.artist_id}
          onChange={(e) =>
            setFormData({ ...formData, artist_id: e.target.value })
          }
          required
          className="border p-2 w-full"
        >
          <option value="">Select Artist</option>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))
          ) : (
            <option disabled>Loading artists...</option>
          )}
        </select>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="border p-2 w-full"
          placeholder="Title"
        />

        {/* Album Name */}
        <input
          type="text"
          name="album_name"
          value={formData.album_name}
          onChange={(e) =>
            setFormData({ ...formData, album_name: e.target.value })
          }
          required
          className="border p-2 w-full"
          placeholder="Album Name"
        />

        {/* Genre */}
        <label className="block text-gray-700">Genre</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Genre</option>
          <option value="rnb">Rnb</option>
          <option value="country">Country</option>
          <option value="classic">Classic</option>
          <option value="rock">Rock</option>
          <option value="jazz">Jazz</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Music"}
        </button>
      </form>
    </div>
  );
};

export default CreateMusic;
