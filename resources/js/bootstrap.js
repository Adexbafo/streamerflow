import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

if (typeof window !== 'undefined') {

    window.Pusher = Pusher;

    window.Echo = new Echo({

        broadcaster: 'reverb',

        key: import.meta.env.VITE_REVERB_APP_KEY,

        wsHost: import.meta.env.VITE_REVERB_HOST,

        wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,

        wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,

        forceTLS: false,

        enabledTransports: ['ws', 'wss'],

    });

}

import { initializeRealtimeNotifications }
    from './realtime-notifications';

if (typeof document !== 'undefined') {

    const userMeta = document
        .querySelector('meta[name="user-id"]');

    if (userMeta) {

        initializeRealtimeNotifications(
            Number(userMeta.getAttribute('content'))
        );

    }

}