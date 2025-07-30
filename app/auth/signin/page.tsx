"use client";
import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Card, TextField, Heading, Text, Link } from "@radix-ui/themes";
import toast from "react-hot-toast";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Signed in successfully!");
        const callbackURL = searchParams.get("callbackUrl") || "/dashboard";
        router.push(callbackURL);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const callbackURL = searchParams.get("callbackUrl") || "/dashboard";
    signIn("google", { callbackUrl: callbackURL });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <Heading size="6" className="text-center mb-6">
          Clinical App Login
        </Heading>

        <form onSubmit={handleCredentialsSignIn} className="space-y-4">
          <div>
            <Text as="label" size="2" weight="medium" className="block mb-2">
              Email
            </Text>
            <TextField.Root
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@example.com"
              required
            />
          </div>

          <div>
            <Text as="label" size="2" weight="medium" className="block mb-2">
              Password
            </Text>
            <TextField.Root
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Signing in..." : "Sign in with Email"}
          </Button>
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="w-full mt-4"
          >
            Sign in with Google
          </Button>

          <div style={{ textAlign: "center" }}>
            <Text size="2" color="gray">
              Don&apos;t have an account?{" "}
              <Link href="/auth/signup" style={{ color: "var(--accent-9)" }}>
                Sign up
              </Link>
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SignInLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <Heading size="6" className="text-center mb-6">
          Clinical App Login
        </Heading>
        <div className="flex justify-center">
          <Text>Loading...</Text>
        </div>
      </Card>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm />
    </Suspense>
  );
}
