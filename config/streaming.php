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
            'http://127.0.0.1:8888'
        ),

    ],

];