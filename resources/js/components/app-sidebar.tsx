import { Link } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: LayoutGrid,
    },

    {
        title: 'Trending',
        href: '/trending',
        icon: LayoutGrid,
    },

    {
        title: 'Search',
        href: '/search',
        icon: LayoutGrid,
    },

    {
        title: 'Notifications',
        href: '/notifications',
        icon: LayoutGrid,
    },

    {
        title: 'Saved Videos',
        href: '/saved-videos',
        icon: LayoutGrid,
    },

    {
        title: 'My Channel',
        href: '/channels/adexmakai',
        icon: LayoutGrid,
    },

    {
        title: 'Stream Dashboard',
        href: '/creator/stream',
        icon: LayoutGrid,
    },

    {
        title: 'Revenue Dashboard',
        href: '/creator/revenue',
        icon: LayoutGrid,
    },

    {
        title: 'Withdrawals',
        href: '/creator/withdrawals',
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
