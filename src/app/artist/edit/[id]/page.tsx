"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast, ToastContainer } from "react-toastify";

const EditArtist = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums_released: 0,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArtist = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/artist/${id}/`);
        if (!res.ok) throw new Error(`Error ${res.status}: Artist not found`);

        const data = await res.json();

        setFormData({
          name: data.name,
          dob: data.dob.split("T")[0],
          gender: data.gender,
          address: data.address,
          first_release_year: data.first_release_year,
          no_of_albums_released: data.no_of_albums_released,
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch artist. Please try again.");
        toast.error("Failed to fetch artist. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/artist/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      toast.success("Artist updated successfully");
      router.push("/artist");
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update artist. Please try again.");
      toast.error("Failed to update artist. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Artist</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading artist details...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <Input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <label htmlFor="dob" className="font-semibold">
              Date of Birth
            </label>
            <Input
              id="dob"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label htmlFor="gender" className="font-semibold">
              Gender
            </label>
            <Select
              id="gender"
              value={formData.gender}
              onValueChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
              required
              className="w-full"
            >
              <SelectTrigger>
                <span>
                  {formData.gender ? formData.gender : "Select Gender"}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="m">Male</SelectItem>
                <SelectItem value="f">Female</SelectItem>
                <SelectItem value="o">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="font-semibold">
              Address
            </label>
            <Input
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* First Release Year */}
          <div className="space-y-2">
            <label htmlFor="first_release_year" className="font-semibold">
              First Release Year
            </label>
            <Input
              id="first_release_year"
              type="date"
              name="first_release_year"
              value={formData.first_release_year}
              onChange={(e) =>
                setFormData({ ...formData, first_release_year: e.target.value })
              }
              required
              className="w-full"
            />
          </div>

          {/* Number of Albums Released */}
          <div className="space-y-2">
            <label htmlFor="no_of_albums_released" className="font-semibold">
              Number of Albums Released
            </label>
            <Input
              id="no_of_albums_released"
              type="number"
              name="no_of_albums_released"
              value={formData.no_of_albums_released}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  no_of_albums_released: Number(e.target.value),
                })
              }
              required
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update
          </Button>
        </form>
      )}

      <ToastContainer />
    </div>
  );
};

export default EditArtist;
