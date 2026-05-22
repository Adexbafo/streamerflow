import AppLayout from '@/layouts/AppLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Show() {

    const [viewerCount, setViewerCount] = useState(2431);

    const [messages, setMessages] = useState<any[]>([]);

    const [chatMessage, setChatMessage] = useState('');
    const [viewers, setViewers] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);
    const [typingUsers, setTypingUsers] = useState<string[]>([]);

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

                console.log(user.name + ' joined');

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

                console.log(user.name + ' left');

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
    return (
        <AppLayout>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* Main Stream Area */}

                <div className="2xl:col-span-8">

                    {/* Stream Player */}

<div className="relative bg-black rounded-3xl h-[420px] mb-6 overflow-hidden">

    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-950" />

    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">

        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />

        LIVE

    </div>

    <div className="absolute inset-0 flex items-center justify-center translate-y-6">

        <div className="flex flex-col items-center justify-center h-full text-white">

    <div className="text-3xl font-bold mb-4">
        Stream Player
    </div>

    <div className="flex items-center gap-4 text-sm">

        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
            🔊 Volume
        </button>

        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
            ⚙️ Settings
        </button>

        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
            ✂️ Clip
        </button>

        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
            ⛶ Fullscreen
        </button>

    </div>

</div>

    </div>

</div>

                    {/* Stream Information */}

                    <div className="mb-6">

                        <h1 className="text-3xl font-bold mb-2">
                            Late Night Coding Stream
                        </h1>

                        <div className="flex items-center gap-4 text-gray-500">

                            <span>
                                🔴 LIVE
                            </span>

                            <span>
                                {viewerCount} watching
                            </span>
                            <span>
                                Gaming
                            </span>

                        </div>

                        <div className="flex items-center gap-4 mt-6">

    <button className="bg-black text-white px-5 py-2 rounded-xl hover:opacity-90 transition">
        ❤️ Like
    </button>

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

                    <div className="bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition flex items-center justify-between">

                        <div>

                            <h2 className="font-bold text-xl">
                                Adexmakai
                            </h2>

                            <p className="text-gray-500">
                                Building StreamerFlow Live
                            </p>

                        </div>

                        <button className="bg-black text-white px-6 py-3 rounded-xl">

                            Follow

                        </button>
                    </div>

                    {/* Recommended Streams */}

<div className="mt-10">

    <h2 className="text-2xl font-bold mb-6">
        Recommended Streams
    </h2>

    <div className="grid grid-cols-3 gap-6">

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

<div className="2xl:col-span-4">

    <div className="border border-gray-200 rounded-3xl h-[80vh] flex flex-col bg-white shadow-sm sticky top-6">

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

                        {activity.type === 'join'
                            ? 'joined the stream'
                            : 'left the stream'}

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

            <div className="flex gap-2">

                <input
                    type="text"
                    value={chatMessage}
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
                        px-5
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
