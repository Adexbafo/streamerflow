import { Link, usePage } from '@inertiajs/react';
import SidebarLink from '@/components/layout/SidebarLink';
import Topbar from '@/components/layout/Topbar';

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({
    children,
}: Props) {

    const pageProps = usePage().props as any;

    console.log(pageProps);

    const {
        auth,
        walletBalance,
    } = pageProps;

    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* Sidebar */}

            <div className="hidden lg:flex lg:w-64 border-r bg-white flex-col p-6">

                <div className="text-2xl font-bold mb-10">
                    StreamerFlow
                </div>

                <div
                    className="
        mb-6
        px-4
        py-3
        rounded-2xl
        bg-yellow-100
        text-yellow-800
        font-bold
        text-sm
    "
                >
                    💰 {walletBalance} Coins
                </div>

                <div className="space-y-2">

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

                    <SidebarLink
                        href="/creator/videos/create"
                        label="Upload Videos"
                    />

                    <SidebarLink
                        href="/creator/stream"
                        label="Stream Dashboard"
                    />

                    <SidebarLink
                        href="/creator/revenue"
                        label="Revenue Dashboard"
                    />

                    <SidebarLink
                        href="/creator/withdrawals"
                        label="Withdrawals"
                    />

                </div>

            </div>

            {/* Main Content */}
            {/* Topbar */}
            <div className="flex-1">
                {/* Mobile Navigation */}

                <div className="lg:hidden flex items-center justify-between p-4 border-b bg-white sticky top-0 z-50">

                    <div className="text-xl font-bold">
                        StreamerFlow
                    </div>

                    <button className="border px-4 py-2 rounded-xl">
                        ☰
                    </button>

                </div>
                <Topbar />

                <main className="flex-1 p-8">

                    {children}

                </main>
            </div>

        </div>
    );
}