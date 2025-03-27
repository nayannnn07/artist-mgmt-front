"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ViewMusic = () => {
  const params = useParams();
  const musicId = params?.id as string;

  const [music, setMusic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!musicId) {
      setError("Invalid music ID");
      setLoading(false);
      return;
    }

    const fetchMusic = async () => {
      console.log("Fetching music with ID:", musicId); // ✅ Debugging
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/music/${musicId}/`);

        if (!res.ok) {
          throw new Error(`Music not found (Status: ${res.status})`);
        }

        const data = await res.json();
        setMusic(data);
      } catch (err) {
        console.error("Error fetching music:", err);
        setError("Failed to load music details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, [musicId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">{music.title}</h2>
      <p>
        <strong>Album:</strong> {music.album_name}
      </p>
      <p>
        <strong>Artist:</strong> {music.artist}
      </p>
      <p>
        <strong>Genre:</strong> {music.genre}
      </p>
      <p>
        <strong>Created Date:</strong> {music.created_at?.split("T")[0]}
      </p>
      <p>
        <strong>Updated Date:</strong> {music.updated_at?.split("T")[0]}
      </p>
    </div>
  );
};

export default ViewMusic;
