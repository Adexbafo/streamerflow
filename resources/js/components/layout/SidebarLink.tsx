import { Link, usePage } from '@inertiajs/react';

interface Props {
    href: string;
    label: string;
}

export default function SidebarLink({
    href,
    label,
}: Props) {

    const { url } = usePage();

    const active = url === href;

    return (
        <Link
            href={href}
            className={`
                block
                px-4
                py-3
                rounded-xl
                transition
                duration-200

                ${active
                    ? 'bg-black text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-black'
                }
            `}
        >
            {label}
        </Link>
    );
}