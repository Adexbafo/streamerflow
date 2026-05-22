import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

if (typeof window !== 'undefined') {

    import('pusher-js').then(({ default: Pusher }) => {

        window.Pusher = Pusher;

        import('laravel-echo').then(({ default: Echo }) => {

            window.Echo = new Echo({
                broadcaster: 'reverb',

                key: import.meta.env.VITE_REVERB_APP_KEY,

                wsHost: import.meta.env.VITE_REVERB_HOST,

                wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,

                wssPort: import.meta.env.VITE_REVERB_PORT ?? 8080,

                forceTLS: false,

                enabledTransports: ['ws', 'wss'],
            });

        });

    });

}