"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/api/api";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const credentials = { email, password };
      console.log("Attempting login with:", email);
      const response = await login(credentials);
      console.log("Login successful:", response);

      // Handle successful login
      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);

        if (response.refresh_token) {
          localStorage.setItem("refresh_token", response.refresh_token);
        }

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        setError(
          error.message || "Invalid email or password. Please try again."
        );
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative button handler as a backup approach
  const handleLoginClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const credentials = { email, password };
      console.log("Attempting login with:", email);
      const response = await login(credentials);
      console.log("Login successful:", response);

      // Handle successful login
      if (response && response.access_token) {
        localStorage.setItem("access_token", response.access_token);

        if (response.refresh_token) {
          localStorage.setItem("refresh_token", response.refresh_token);
        }

        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
        }

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Explicitly set method to POST and add noValidate to prevent browser validation */}
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
            noValidate
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Artist Management System</h1>
                <p>Welcome!</p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}

              <div className="grid gap-3">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder=""
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  placeholder=""
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder=""
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="lname"
                  type="text"
                  placeholder=""
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  placeholder=""
                  value=""
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
                <div className="flex gap-4">
                  {["Male", "Female", "Other"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="radio" name="gender" value="" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  className="p-2 border rounded-md"
                  value=""
                  //   onChange={(e) => setRole(e.target.value)}
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="artist_manager">Artist Manager</option>
                  <option value="artist">Artist</option>
                </select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc123@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <a
                href="#"
                className="text-sm underline-offset-2 hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Forgot your password?
              </a>

              {/* Changed to use onClick handler as an alternative approach */}
              <Button
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-300"
                disabled={isLoading}
                onClick={handleLoginClick}
              >
                {isLoading ? "Logging In..." : "Login"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Log in
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              width={500}
              height={500}
              src="/assets/images/login-img.jpg"
              alt="Image"
              objectFit="cover"
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" onClick={(e) => e.preventDefault()}>
          Privacy Policy
        </a>
        asdashbasjdhbjhabdsjhbcjasbjhasdjajs djas djhasbdjabsdjbasjd
        iasbdjhabsdjasbd aisdbajsbdjb .
      </div>
    </div>
  );
}
