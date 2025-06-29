"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, TextField, Heading, Text, Flex } from "@radix-ui/themes";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/auth/signin");
      } else {
        toast.error(data.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Sign-up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
        padding: "1rem",
      }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <div style={{ padding: "2rem" }}>
          <Heading
            size="6"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Create Account
          </Heading>

          <form onSubmit={handleSignUp}>
            <Flex direction="column" gap="4">
              <div>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Full Name
                </Text>
                <TextField.Root
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. John Doe"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Email
                </Text>
                <TextField.Root
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Password
                </Text>
                <TextField.Root
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div>
                <Text
                  as="label"
                  size="2"
                  weight="medium"
                  style={{ display: "block", marginBottom: "0.5rem" }}
                >
                  Confirm Password
                </Text>
                <TextField.Root
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                style={{ width: "100%" }}
                size="3"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </Flex>
          </form>

          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
            }}
          >
            <Text size="2" color="gray">
              Already have an account?{" "}
              <Link href="/auth/signin" style={{ color: "var(--accent-9)" }}>
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}
