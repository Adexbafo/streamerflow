import AppLayout from '@/layouts/AppLayout';

interface Notification {
    id: string;

    data: {
        message: string;
        username: string;
    };

    created_at: string;
}

interface Props {
    notifications: {
        data: Notification[];
    };
}

export default function Index({
    notifications,
}: Props) {

    return (
    <AppLayout>
        <div className="max-w-4xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-10">
                Notifications
            </h1>

            <div className="space-y-4">

                {notifications.data.length === 0 ? (

                    <div className="border rounded-lg p-6 text-gray-500">

                        No notifications yet.

                    </div>

                ) : (

                    notifications.data.map((notification) => (

                        <div
                            key={notification.id}
                            className="border rounded-lg p-5"
                        >

                            <p className="font-medium">
                                {notification.data.message}
                            </p>

                            <p className="text-sm text-gray-400 mt-2">
                                {new Date(
                                    notification.created_at
                                ).toLocaleString()}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>
        </AppLayout>
);
}