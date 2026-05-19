import { Link, usePage } from '@inertiajs/react';
import SidebarLink from '@/components/layout/SidebarLink';
import Topbar from '@/components/layout/Topbar';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: Props) {

    const { auth } = usePage().props as any;

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}

            <div className="space-y-2 mt-8">

    <SidebarLink
        href="/"
        label="Home"
    />

    <SidebarLink
        href="/trending"
        label="Trending"
    />

    <SidebarLink
        href="/search"
        label="Search"
    />

    <SidebarLink
        href="/notifications"
        label="Notifications"
    />

    <SidebarLink
        href="/saved-videos"
        label="Saved Videos"
    />

    <SidebarLink
        href={`/channels/${auth.user.username}`}
        label="My Channel"
    />

</div>
            
            {/* Main Content */}
            {/* Topbar */}
        <div className="flex-1">
            <Topbar />

            <main className="flex-1 p-8">

                {children}

            </main>
        </div>

        </div>
    );
}