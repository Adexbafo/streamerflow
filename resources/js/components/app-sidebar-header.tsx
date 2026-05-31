import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell } from 'lucide-react';
import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {

    const {
        notifications,
        unreadNotificationsCount,
    } = usePage().props as any;
    const [showNotifications, setShowNotifications] = useState(false);
    const notificationItems =
        notifications?.data ?? notifications ?? [];
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="relative ml-auto">

                <button
                    onClick={() => {

                        const nextState = !showNotifications;

                        setShowNotifications(nextState);

                        if (nextState && unreadNotificationsCount > 0) {

                            router.post(
                                '/notifications/read-all',
                                {},
                                {
                                    preserveScroll: true,
                                    preserveState: true,
                                }
                            );

                        }

                    }}
                    className="
            relative
            rounded-xl
            p-2
            hover:bg-gray-100
            transition
        "
                >

                    <Bell className="h-6 w-6" />

                    {unreadNotificationsCount > 0 && (

                        <span
                            className="
                    absolute
                    -top-1
                    -right-1
                    bg-red-600
                    text-white
                    text-xs
                    rounded-full
                    min-w-[20px]
                    h-5
                    flex
                    items-center
                    justify-center
                    px-1
                "
                        >
                            {unreadNotificationsCount}
                        </span>

                    )}

                </button>

                {showNotifications && (

                    <div
                        className="
            absolute
            right-0
            mt-3
            w-80
            rounded-2xl
            border
            bg-white
            shadow-xl
            z-50
            overflow-hidden
        "
                    >

                        <div className="flex items-center justify-between p-4 border-b">

                            <div className="font-semibold">
                                Notifications
                            </div>

                            <button
                                onClick={() => {

                                    router.post(
                                        '/notifications/read-all',
                                        {},
                                        {
                                            preserveScroll: true,
                                            preserveState: true,
                                        }
                                    );

                                }}
                                className="
            text-xs
            text-blue-600
            hover:underline
        "
                            >
                                Mark all as read
                            </button>

                        </div>


                        <div className="max-h-96 overflow-y-auto">

                            {notificationItems.length === 0 ? (

                                <div className="p-4 text-sm text-gray-500">
                                    No notifications yet.
                                </div>

                            ) : (

                                notificationItems.map((notification: any) => (

                                    <button
                                        key={notification.id}
                                        onClick={() => {

                                            if (notification.data.url) {

                                                router.visit(notification.data.url);

                                                setShowNotifications(false);

                                            }

                                        }}
                                        className="
        w-full
        text-left
        border-b
        p-4
        hover:bg-gray-50
        transition
    "
                                    >

                                        <button
                                            key={notification.id}
                                            onClick={() => {

                                                if (notification.data.url) {

                                                    router.visit(notification.data.url);

                                                    setShowNotifications(false);

                                                }

                                            }}
                                            className="
        w-full
        text-left
        border-b
        p-4
        hover:bg-gray-50
        transition
    "
                                        >

                                            <div className="flex items-start gap-3">

                                                <div className="text-2xl">

                                                    {notification.data.type === 'stream_live' && '🔴'}

                                                    {notification.data.type === 'follow' && '👤'}

                                                    {notification.data.type === 'tip' && '💰'}

                                                    {notification.data.type === 'subscription' && '💜'}

                                                </div>

                                                <div className="flex-1">

                                                    <div className="font-semibold text-sm">
                                                        {notification.data.title}
                                                    </div>

                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {notification.data.message}
                                                    </div>

                                                    <div className="text-xs text-gray-400 mt-2">
                                                        {new Date(
                                                            notification.created_at
                                                        ).toLocaleString()}
                                                    </div>

                                                </div>

                                            </div>

                                        </button>

                                        <div className="text-sm text-gray-600 mt-1">
                                            {notification.data.message}
                                        </div>

                                        <div className="text-xs text-gray-400 mt-2">
                                            {new Date(
                                                notification.created_at
                                            ).toLocaleString()}
                                        </div>

                                    </button>

                                ))

                            )}

                        </div>

                    </div>

                )}

            </div>
        </header>
    );
}
