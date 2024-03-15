import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ServerProtectedComponent({
    children,
}: {
    children: React.ReactNode;
}) {
    const token = cookies().get('Authorization')?.value;

    if (!token) {
        redirect('/login');
        return null;
    }

    return <>{children}</>;
}
