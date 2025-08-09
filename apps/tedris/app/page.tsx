import { Button } from '@madrasah/ui/components/button';
import { getServerSession } from 'next-auth';
import KeycloakLogin from '../components/keycloak/login';
import KeycloakLogout from '../components/keycloak/logout';
import authOptions from '../lib/auth_options';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <KeycloakLogin />;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Madrasah Frontend</h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <Button variant="outline">Merhaba Dünya</Button>
          <KeycloakLogout />
        </div>
      </div>
    </main>
  );
}
