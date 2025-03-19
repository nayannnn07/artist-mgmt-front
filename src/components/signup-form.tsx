"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    role: "super_admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Dummy API Call Simulation (Replace with actual signup API)
      const response = { success: true, access_token: "dummy_token" };

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        router.push("/dashboard");
      } else {
        throw new Error("Signup failed. Try again.");
      }
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 items-center min-h-screen", className)}
      {...props}
    >
      <Card className="overflow-hidden w-full max-w-3xl shadow-lg rounded-lg">
        <CardContent className="grid md:grid-cols-2">
          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full p-6"
            noValidate
          >
            <h1 className="text-2xl font-semibold text-center">Create an Account</h1>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Log in
              </a>
            </p>
          </form>

          {/* Image Section */}
          <div className="hidden md:flex items-center justify-center bg-gray-100 relative">
            <Image
              src="/images/login-img.jpg" // Make sure this is inside `public/images/`
              width={500}
              height={500}
              alt="Signup Illustration"
              className="object-cover w-full h-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
  