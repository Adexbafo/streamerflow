import { Link, usePage } from '@inertiajs/react';

export default function Topbar() {

    const auth: any = usePage().props.auth;

    return (
        <header className="
            flex
            items-center
            justify-between
            bg-white
            border-b
            px-8
            py-4
            sticky
            top-0
            z-50
        ">

            {/* Search */}

            <div className="w-full max-w-xl">

                <input
                    type="text"
                    placeholder="Search streams, videos, creators..."
                    className="
                        w-full
                        border
                        rounded-2xl
                        px-5
                        py-3
                        outline-none
                        focus:ring-2
                        focus:ring-black
                    "
                />

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-4 ml-6">

                <Link
                    href="/notifications"
                    className="text-sm text-gray-600 hover:text-black"
                >
                    Notifications
                </Link>

                <div className="
                    w-10
                    h-10
                    rounded-full
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                ">

                    {auth.user.name.charAt(0)}

                </div>

            </div>

        </header>
    );
}