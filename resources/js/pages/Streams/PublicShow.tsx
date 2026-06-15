import AppLayout from '@/layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import Hls from 'hls.js';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import '@/echo';



export default function PublicShow() {

    const { stream } = usePage().props as any;

    const [message, setMessage] = useState('');

    const [showTipModal, setShowTipModal] = useState(false);

    const [tipAmount, setTipAmount] = useState(100);

    const [messages, setMessages] = useState<any[]>([]);

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {

        const interval = setInterval(() => {

            axios
                .get(`/streams/${stream.id}/messages`)
                .then((response) => {

                    setMessages(response.data);

                });

        }, 3000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        if (!videoRef.current) return;

        const video = videoRef.current;

        const streamUrl =
            'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

        if (Hls.isSupported()) {

            const hls = new Hls();

            hls.loadSource(streamUrl);

            hls.attachMedia(video);

            return () => {

                hls.destroy();

            };

        } else if (
            video.canPlayType('application/vnd.apple.mpegurl')
        ) {

            video.src = streamUrl;

        }

    }, []);

    useEffect(() => {

        axios.post('/creator/stream/join', {
            stream_id: stream.id,
        });

        return () => {

            axios.post('/creator/stream/leave', {
                stream_id: stream.id,
            });

        };

    }, []);

    useEffect(() => {

        if (!window.Echo) return;

        const channel = window.Echo.join(
            `stream.${stream.id}`
        );

        channel.listen(
            '.chat.message.sent',
            (event: any) => {

                console.log(
                    'REALTIME EVENT RECEIVED',
                    JSON.stringify(event, null, 2)
                );

                setMessages((prev) => [
                    ...prev,
                    event.message,
                ]);
            }
        );
        return () => {

            window.Echo.leave(
                `stream.${stream.id}`
            );

        };

    }, [stream.id]);

    return (

        <AppLayout>

            <div className="max-w-7xl mx-auto p-6">

                {/* Stream Header */}

                <div className="mb-6">

                    <div className="
                        flex
                        items-center
                        gap-4
                        mb-3
                    ">

                        <div className="
                            bg-red-600
                            text-white
                            px-4
                            py-1
                            rounded-full
                            text-sm
                            font-bold
                        ">

                            🔴 LIVE

                        </div>

                        <div className="text-gray-500">

                            @{stream.user.username}

                        </div>

                    </div>

                    <h1 className="
                        text-4xl
                        font-bold
                    ">

                        {stream.title}

                    </h1>

                    <div className="text-sm text-gray-500 mt-2">
                        👁 {stream.viewers_count} watching
                    </div>

                </div>

                {/* Stream Layout */}

                <div className="
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-8
                ">

                    {/* Video Player */}

                    <div className="xl:col-span-2">

                        <div className="
    bg-black
    rounded-2xl
    overflow-hidden
    aspect-video
">

                            <video
                                ref={videoRef}
                                controls
                                autoPlay
                                className="
            w-full
            h-full
            object-cover
        "
                            />

                        </div>

                        {/* Engagement Bar */}

                        <div className="
                            mt-6
                            flex
                            items-center
                            gap-4
                            flex-wrap
                        ">

                            <button
                                onClick={() => {

                                    router.post(
                                        `/users/${stream.user.id}/follow`
                                    );

                                }}
                                className="
        bg-blue-600
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
    "
                            >

                                Follow Creator

                            </button>

                            <button
                                onClick={() => setShowTipModal(true)}
                                className="
        bg-pink-600
        text-white
        px-5
        py-3
        rounded-xl
        font-semibold
    "
                            >

                                Send Tip

                            </button>

                            <button
                                onClick={() => {

                                    navigator.clipboard.writeText(
                                        window.location.href
                                    );

                                    alert('Stream link copied!');

                                }}
                                className="
                                    bg-gray-200
                                    px-5
                                    py-3
                                    rounded-xl
                                    font-semibold
                                "
                            >

                                Share Stream

                            </button>

                        </div>

                    </div>

                    {/* Live Chat */}

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow
                        p-6
                        h-[700px]
                        flex
                        flex-col
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-6
                        ">

                            Live Chat

                        </h2>

                        <div className="
                            flex-1
                            overflow-y-auto
                            space-y-4
                        ">

                            {messages.length === 0 ? (

                                <div className="text-gray-500 text-sm">
                                    No messages yet.
                                </div>

                            ) : (

                                messages.map((message, index) => (

                                    <div
                                        key={index}
                                        className="text-sm"
                                    >

                                        <span className="font-bold">
                                            {message.user}:
                                        </span>

                                        {' '}

                                        {message.message}

                                    </div>

                                ))

                            )}

                        </div>

                        <div className="mt-6 flex gap-3">

                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Send message..."
                                className="
                                    flex-1
                                    border
                                    rounded-xl
                                    px-4
                                    py-3
                                    text-sm
                                            "
                            />

                            <button
                                onClick={() => {

                                    axios.post('/chat/send', {

                                        stream_id: stream.id,

                                        message,

                                    });

                                    setMessage('');

                                }}
                                className="
        bg-blue-600
        text-white
        px-6
        rounded-xl
        font-semibold
    "
                            >

                                Send

                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {showTipModal && (

                <div
                    className="
            fixed
            inset-0
            bg-black/60
            flex
            items-center
            justify-center
            z-50
        "
                >

                    <div
                        className="
                bg-white
                rounded-2xl
                p-8
                w-full
                max-w-md
                space-y-6
            "
                    >

                        <h2 className="text-2xl font-bold">

                            Send Tip

                        </h2>

                        <div>

                            <label className="block mb-2 font-medium">

                                Tip Amount

                            </label>

                            <input
                                type="number"
                                value={tipAmount}
                                onChange={(e) =>
                                    setTipAmount(
                                        Number(e.target.value)
                                    )
                                }
                                className="
                        w-full
                        border
                        rounded-xl
                        px-4
                        py-3
                    "
                            />

                        </div>

                        <div className="
                flex
                justify-end
                gap-4
            ">

                            <button
                                onClick={() =>
                                    setShowTipModal(false)
                                }
                                className="
                        px-5
                        py-3
                        rounded-xl
                        bg-gray-200
                    "
                            >

                                Cancel

                            </button>

                            <button
                                onClick={() => {

                                    axios.post('/tips', {

                                        receiver_id: stream.user.id,

                                        amount: tipAmount,

                                    }).then(() => {

                                        alert(
                                            `${tipAmount} coins sent!`
                                        );

                                        setShowTipModal(false);

                                        window.location.reload();

                                    });

                                }}
                                className="
                        px-5
                        py-3
                        rounded-xl
                        bg-pink-600
                        text-white
                        font-semibold
                    "
                            >

                                Confirm Tip

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </AppLayout >

    );

}