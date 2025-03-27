"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const ViewArtist = () => {
  const params = useParams();
  const artistId = params?.id as string;

  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!artistId) {
      setError("Invalid artist ID");
      setLoading(false);
      return;
    }

    const fetchArtist = async () => {
      console.log("Fetching artist with ID:", artistId); 
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/artist/${artistId}/`
        );

        if (!res.ok) {
          throw new Error(`Artist not found (Status: ${res.status})`);
        }

        const data = await res.json();
        setArtist(data);
      } catch (err) {
        console.error("Error fetching artist:", err);
        setError("Failed to load artist details.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [artistId]);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-6 w-64 mb-2" />
        <Skeleton className="h-6 w-64 mb-2" />
      </div>
    );

  if (error)
    return (
      <Alert variant="destructive" className="m-6">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  return (
    <div className="p-6 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{artist.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>DOB:</strong> {artist.dob?.split("T")[0]}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {artist.gender === "m"
              ? "Male"
              : artist.gender === "f"
              ? "Female"
              : "Other"}
          </p>
          <p>
            <strong>Address:</strong> {artist.address}
          </p>
          <p>
            <strong>First Release Year:</strong> {artist.first_release_year}
          </p>
          <p>
            <strong>Albums Released:</strong> {artist.no_of_albums_released}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewArtist;
