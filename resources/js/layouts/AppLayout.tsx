import { Link, usePage } from '@inertiajs/react';

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

            <aside className="w-64 bg-white border-r min-h-screen p-6">

                <h1 className="text-2xl font-bold mb-10">
                    StreamerFlow
                </h1>

                <nav className="space-y-4">

                    <Link
                        href="/"
                        className="block hover:text-blue-500"
                    >
                        Home
                    </Link>

                    <Link
                        href="/trending"
                        className="block hover:text-blue-500"
                    >
                        Trending
                    </Link>

                    <Link
                        href="/search"
                        className="block hover:text-blue-500"
                    >
                        Search
                    </Link>

                    <Link
                        href="/notifications"
                        className="block hover:text-blue-500"
                    >
                        Notifications
                    </Link>

                    <Link
                        href="/saved-videos"
                        className="block hover:text-blue-500"
                    >
                        Saved Videos
                    </Link>

                    <Link
                        href={`/channels/${auth.user.username}`}
                        className="block hover:text-blue-500"
                    >
                        My Channel
                    </Link>

                </nav>

            </aside>

            {/* Main Content */}

            <main className="flex-1 p-8">

                {children}

            </main>

        </div>
    );
}