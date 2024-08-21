import BentoGrid from "@/components/bentoGrid/BentoGrid";
import DotPattern from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  // if (!(await isAuthenticated())) {
  //   redirect('/api/auth/login');
  // }
  return (
    <main className="p-5">
      <header className="flex items-center justify-between">
        <div>
          <h1>Next.js + RSAI CRM</h1>
        </div>
        <div className="flex items-center gap-5">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="ghost">Sign up</Button>
          </RegisterLink>
        </div>
      </header>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          School CRM All in One Place
        </p>
        <div className="my-4 flex items-center justify-between gap-3">
          <Button>Get Early Access</Button>
          <Button variant="outline" className="z-10">
            Download PDF
          </Button>
        </div>
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
      <div className="my-5">
        <BentoGrid />
      </div>
    </main>
  );
}
