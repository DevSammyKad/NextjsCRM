import { Button } from '@/components/ui/button';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect('/api/auth/login');
  }
  return (
    <main className="p-5">
      <header className="flex justify-between items-center">
        <div>
          <h1>Next.js + RSAI CRM</h1>
        </div>
        <div className="flex gap-5 items-center ">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant="ghost">Sign up</Button>
          </RegisterLink>
        </div>
      </header>
      {/* <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink> */}
      {/* <RegisterLink postLoginRedirectURL="/welcome">Sign up</RegisterLink> */}
    </main>
  );
}
