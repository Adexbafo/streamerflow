import AppLayout from '@/layouts/AppLayout';
import {
    useEffect,
    useState,
    useRef,
} from 'react';
import Hls from 'hls.js';
import axios from 'axios';
import {
    useForm,
    usePage,
    router,
} from '@inertiajs/react';
import { toast } from 'sonner';



export default function Show({
    stream,
    streamConfig,
}: any) {

    const [viewerCount, setViewerCount] = useState(2431);

    const [messages, setMessages] = useState<any[]>([]);

    const [chatMessage, setChatMessage] = useState('');
    const [viewers, setViewers] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);
    const [showTipBox, setShowTipBox] = useState(false);
    const { flash } = usePage().props as any;

    const {
        data,
        setData,
        post,
        processing,
        reset,
    } = useForm({
        receiver_id: stream.user.id,
        creator_id: stream.user.id,
        amount: 100,
    });
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {

        if (!videoRef.current) return;

        const video = videoRef.current;

        if (Hls.isSupported()) {

            const hls = new Hls();

            hls.loadSource(streamConfig.hlsPlaybackUrl);

            hls.attachMedia(video);

            return () => {
                hls.destroy();
            };
        }

        else if (video.canPlayType('application/vnd.apple.mpegurl')) {

            video.src = streamConfig.hlsPlaybackUrl;
        }

    }, []);

    const sendMessage = async () => {

        if (!chatMessage.trim()) return;

        try {

            const response = await axios.post('/chat/send', {
                message: chatMessage,
            });

            setMessages((prev) => [
                ...prev,
                response.data.message,
            ]);

            setChatMessage('');

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {
        axios.post('/creator/stream/join');

        axios.get('/streams/1/messages')
            .then((response) => {

                setMessages(response.data);

            });

        (window as any).Echo.join('stream.1')

            .here((users: any) => {

                setViewerCount(users.length);

                setViewers(users);

            })

            .joining((user: any) => {

                setViewerCount((prev: number) => prev + 1);
                setViewers((prev) => [...prev, user]);

                setActivities((prev) => [

                    ...prev,

                    {
                        type: 'join',
                        user: user.name,
                    },

                ]);

            })

            .leaving((user: any) => {

                setViewerCount((prev: number) => prev - 1);

                setViewers((prev) =>
                    prev.filter((viewer) => viewer.id !== user.id)
                );

                setActivities((prev) => [

                    ...prev,

                    {
                        type: 'leave',
                        user: user.name,
                    },

                ]);

            })

            .listen('ViewerCountUpdated', (e: any) => {

                setViewerCount(e.viewerCount);

            })

            .listen('ChatMessageSent', (e: any) => {

                setMessages((prev) => [
                    ...prev,
                    e.message,
                ]);

            })

            .listen('TipSent', (e: any) => {

                setActivities((prev) => [

                    {
                        type: 'tip',
                        user: e.sender,
                        amount: e.amount,
                    },

                    ...prev,

                ]);

            })

            .listenForWhisper('typing', (e: any) => {

                setTypingUsers((prev) => {

                    if (prev.includes(e.user)) {
                        return prev;
                    }

                    return [...prev, e.user];

                });

                setTimeout(() => {

                    setTypingUsers((prev) =>
                        prev.filter((user) => user !== e.user)
                    );

                }, 2000);

            })

        return () => {

            (window as any).Echo.leave('stream.1');

        };

    }, []);

    useEffect(() => {

        if (!flash?.tip_activity) return;

        setActivities((prev) => [

            {
                type: 'tip',
                user: flash.tip_activity.sender,
                amount: flash.tip_activity.amount,
            },

            ...prev,

        ]);

    }, [flash]);

    useEffect(() => {

        const video = videoRef.current;

        if (!video) return;

        const hls = new Hls();

        hls.loadSource(streamConfig.hlsPlaybackUrl);

        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {

            video.play();

        });

        return () => {

            hls.destroy();

        };

    }, []);
    return (
        <AppLayout>

            <div className="flex flex-col xl:grid xl:grid-cols-12 gap-6">

                {/* Main Stream Area */}

                <div className="xl:col-span-8">

                    {/* Stream Player */}

                    <div className="relative mb-6">

                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">

                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />

                            LIVE

                        </div>

                        <div className="bg-black rounded-3xl overflow-hidden">

                            <video
                                ref={videoRef}
                                controls
                                autoPlay
                                muted
                                playsInline
                                className="
                w-full
                aspect-video
                bg-black
            "
                            />


                        </div>

                    </div>

                    {/* Stream Information */}

                    <div className="mb-6">

                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                            {stream.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-4 text-gray-500">

                            <span>
                                🔴 LIVE
                            </span>

                            <span>
                                {viewerCount} watching
                            </span>
                            <span>
                                {stream.category ?? 'Lifestyle'}
                            </span>

                        </div>

                        <div
                            className="
        flex
        flex-col
        sm:flex-row
        sm:flex-wrap
        gap-3
        mt-6
    "
                        >

                            <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
                                ❤️ Like
                            </button>

                            <button
                                onClick={() => setShowTipBox(!showTipBox)}
                                className="px-5 py-3 rounded-2xl bg-yellow-400 font-semibold"
                            >
                                💰 Tip
                            </button>

                            {showTipBox && (

                                <div className="mt-6 bg-white rounded-2xl p-6 border max-w-md">

                                    <h3 className="text-xl font-bold mb-4">
                                        Send Tip
                                    </h3>

                                    <input
                                        type="number"
                                        min="1"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData('amount', Number(e.target.value))
                                        }
                                        className="w-full border rounded-xl p-3 mb-4"
                                    />

                                    <button
                                        onClick={() => {

                                            post('/tips', {

                                                preserveScroll: true,

                                                onSuccess: () => {

                                                    toast.success('Tip sent successfully!');

                                                    setActivities((prev) => [

                                                        {
                                                            type: 'tip',
                                                            user: 'adexmakai',
                                                            amount: data.amount,
                                                        },

                                                        ...prev,

                                                    ]);

                                                    reset();

                                                    setShowTipBox(false);

                                                },

                                                onError: () => {

                                                    toast.error('Failed to send tip.');

                                                },


                                            });

                                        }}
                                        disabled={processing}
                                        className="px-6 py-3 rounded-2xl bg-black text-white"
                                    >
                                        {processing ? 'Sending...' : 'Send Tip'}
                                    </button>

                                </div>

                            )}

                            <button className="border px-5 py-2 rounded-xl hover:bg-gray-100 transition">
                                🔖 Save
                            </button>

                            <button className="border px-5 py-2 rounded-xl hover:bg-gray-100 transition">
                                📤 Share
                            </button>

                            <button className="border px-5 py-2 rounded-xl hover:bg-gray-100 transition">
                                ✂️ Clip
                            </button>

                        </div>

                    </div>



                    {/* Creator Section */}

                    <div className="
    bg-white
    border
    rounded-3xl
    p-6
    shadow-sm
    hover:shadow-md
    transition
    flex
    flex-col
    sm:flex-row
    gap-4
    sm:items-center
    sm:justify-between
">

                        <div>

                            <h3 className="font-bold">
                                {stream.user?.name}
                            </h3>

                            <p className="text-gray-500 text-sm">
                                {stream.description}
                            </p>

                        </div>

                        <div className="flex flex-wrap gap-3">

                            <button
                                className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
        "
                            >
                                Follow
                            </button>

                            <button
                                onClick={() => {

                                    router.post('/subscribe', {

                                        creator_id: stream.user.id,

                                    }, {

                                        preserveScroll: true,

                                        onSuccess: () => {

                                            toast.success(
                                                'Subscription successful!'
                                            );

                                        },

                                        onError: () => {

                                            toast.error(
                                                'Subscription failed.'
                                            );

                                        },

                                    });

                                }}
                                className="
            bg-purple-600
            text-white
            px-6
            py-3
            rounded-xl
            font-bold
        "
                            >
                                ⭐ Subscribe • 500 Coins
                            </button>

                        </div>
                    </div>

                    {/* Recommended Streams */}

                    <div className="mt-10">

                        <h2 className="text-2xl font-bold mb-6">
                            Recommended Streams
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                            {[1, 2, 3].map((stream) => (

                                <div
                                    key={stream}
                                    className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition"
                                >

                                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white font-bold">

                                        LIVE STREAM

                                    </div>

                                    <div className="p-4">

                                        <h3 className="font-bold mb-1">
                                            Building Stream UI #{stream}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            1.2k viewers
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>


                {/* Live Chat Sidebar */}

                <div
                    className="
        xl:col-span-4
        w-full
    "
                >

                    <div className="
    border
    border-gray-200
    rounded-3xl
    min-h-[500px]
    h-[65vh]
    xl:h-[80vh]
    flex
    flex-col
    bg-white
    shadow-sm
    xl:sticky
    xl:top-6
">

                        {/* Chat Header */}

                        <div className="p-4 border-b font-bold">

                            Live Chat

                        </div>

                        {/* Online Viewers */}

                        <div className="p-4 border-b">

                            <h3 className="font-bold mb-3">
                                Online Viewers
                            </h3>

                            <div className="space-y-2">

                                {viewers.map((viewer, index) => (

                                    <div
                                        key={index}
                                        className="
                            flex
                            items-center
                            justify-between
                            text-sm
                            bg-gray-50
                            rounded-xl
                            px-3
                            py-2
                        "
                                    >

                                        <span>
                                            {viewer.name}
                                        </span>

                                        <span className="text-green-500">
                                            ●
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Live Activity */}

                        <div className="p-4 border-b">

                            <h3 className="font-bold mb-3">
                                Live Activity
                            </h3>

                            <div className="space-y-2">

                                {activities.map((activity, index) => (

                                    <div
                                        key={index}
                                        className="
                            text-sm
                            text-gray-600
                            bg-gray-50
                            rounded-xl
                            px-3
                            py-2
                        "
                                    >

                                        {activity.user}{' '}

                                        {activity.type === 'join' && 'joined the stream'}

                                        {activity.type === 'leave' && 'left the stream'}

                                        {activity.type === 'tip' &&
                                            `tipped ${activity.amount} coins 🔥`}

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Chat Messages */}

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

                            {messages.map((message, index) => (

                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-3 shadow-sm"
                                >

                                    <div className="flex items-center gap-2 mb-1">

                                        <span className="font-bold text-sm">
                                            {message.user}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {message.time}
                                        </span>

                                    </div>

                                    <p className="text-sm text-gray-700">
                                        {message.message}
                                    </p>

                                </div>

                            ))}

                        </div>

                        {typingUsers.length > 0 && (

                            <div className="px-4 py-2 text-sm text-gray-500 italic">

                                {typingUsers.join(', ')}

                                {' '}is typing...

                            </div>

                        )}

                        {/* Chat Input */}

                        <div className="p-4 border-t">

                            <div className="
    flex
    flex-col
    sm:flex-row
    gap-2
">

                                <input
                                    type="text"
                                    value={chatMessage}
                                    className="
    flex-1
    border
    rounded-2xl
    px-4
    py-3
    text-sm
"
                                    onChange={(e) => {

                                        setChatMessage(e.target.value);

                                        (window as any).Echo
                                            .join('stream.1')
                                            .whisper('typing', {
                                                user: viewers[0]?.name || 'Viewer',
                                            });

                                    }}
                                />

                                <button
                                    onClick={sendMessage}
                                    className="
                        bg-black
                        text-white
                        w-full sm:w-auto px-5
                        rounded-2xl
                        font-semibold
                    "
                                >

                                    Send

                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
