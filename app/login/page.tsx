import Link from "next/link";
import { Chrome, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-slate-50 px-4 py-10 md:grid-cols-[1fr_520px] md:px-8">
      <section className="hidden items-center justify-center md:flex">
        <div className="max-w-xl space-y-5">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            Skill-Check
          </Link>
          <h1 className="text-4xl font-semibold tracking-normal text-slate-950">
            Step into your next interview feeling prepared.
          </h1>
          <p className="text-lg leading-8 text-slate-600">
            Sign in to continue practicing with realistic AI-led interviews,
            transcript feedback, and score history.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center">
        <Card className="w-full max-w-md shadow-soft">
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <p className="text-sm text-slate-500">Log in or create a candidate account.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="secondary" className="w-full">
              <Chrome className="h-4 w-4" />
              Continue with Google
            </Button>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <Input id="password" type="password" placeholder="********" />
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard">Log in</Link>
            </Button>
            <p className="text-center text-sm text-slate-500">
              New to Skill-Check?{" "}
              <Link href="/dashboard" className="font-medium text-indigo-600">
                Sign up
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
