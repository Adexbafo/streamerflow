

declare global {
    interface Window {
        Echo: any;
        latestNotification: any;
    }
}

export function initializeRealtimeNotifications(
    userId: number
) {

    if (!window.Echo) return;

    window.Echo
        .private(`App.Models.User.${userId}`)
        .notification((notification: any) => {

            console.log(
                'Realtime notification received:',
                notification
            );

            window.latestNotification = notification;

            window.dispatchEvent(
                new Event('notification-received')
            );

        });

}