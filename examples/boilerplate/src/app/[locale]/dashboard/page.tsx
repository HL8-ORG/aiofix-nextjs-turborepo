import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }
  return (
    <div>
      Dashboard
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
