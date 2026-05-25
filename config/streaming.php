<?php

return [

    'rtmp' => [

        'server' => env(
            'RTMP_SERVER',
            'rtmp://127.0.0.1/live'
        ),

    ],

    'hls' => [

        'playback_url' => env(
            'HLS_PLAYBACK_URL',
            'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
        ),

    ],

];