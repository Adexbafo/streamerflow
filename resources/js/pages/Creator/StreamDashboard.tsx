import AppLayout from '@/layouts/AppLayout';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';

interface Props {
    stream: any;
}

export default function StreamDashboard({
    stream,
}: Props) {
    const [title, setTitle] = useState(stream.title);

    const [category, setCategory] = useState(
        stream.category
    );

    const [description, setDescription] = useState(
        stream.description || ''
    );

    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const [thumbnailPreview, setThumbnailPreview] =
        useState<string | null>(
            stream.thumbnail
                ? `/storage/${stream.thumbnail}`
                : null
        );

    const saveStream = () => {

        router.post(
            '/creator/stream',
            {
                title,
                category,
                description,
                thumbnail,
            },
            {
                forceFormData: true,
            }
        );

    };
    const [status, setStatus] =
        useState(stream.status);

    useEffect(() => {

        setStatus(stream.status);

    }, [stream.status]);

    const [likes, setLikes] = useState(128);

    const [followers, setFollowers] =
        useState(42);

    const [chatRate, setChatRate] =
        useState(18);

    const [streamHealth, setStreamHealth] =
        useState('Excellent');

    const copyStreamKey = async () => {

        await navigator.clipboard.writeText(
            stream.stream_key
        );

        alert('Stream key copied!');
    };


    const [quality, setQuality] =
        useState('1080p');

    const [latency, setLatency] =
        useState('Normal');

    const [bitrate, setBitrate] =
        useState('6000 kbps');




    useEffect(() => {

        (window as any).Echo.channel('streams')
            .listen('.stream.status.updated', (event: any) => {

                console.log('Realtime Stream Update:', event);

            });

        return () => {

            (window as any).Echo.leave('streams');

        };
    }, []);


    useEffect(() => {

        const interval = setInterval(() => {

            setLikes((prev) => prev + 1);

            setFollowers((prev) => prev + 1);

            setChatRate((prev) => prev + 1);

        }, 5000);

        return () => clearInterval(interval);

    }, []);



    return (
        <AppLayout>

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    Stream Dashboard
                </h1>

                {/* Stream Status */}

                <div className="bg-white rounded-3xl p-8 shadow-sm border mb-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500 mb-2">
                                Stream Status
                            </p>

                            <h2 className="text-3xl font-bold capitalize">
                                {status}
                            </h2>

                            <div className="flex flex-wrap gap-4 mb-8">

                                <button
                                    onClick={() => {

                                        router.post(
                                            '/creator/stream/start',
                                            {},
                                            {
                                                onSuccess: () => {

                                                    setStatus('live');

                                                },
                                            }
                                        );

                                    }}
                                    className="
    w-full
    sm:w-auto
    bg-red-600
    text-white
    px-6
    py-3
    rounded-2xl
    font-bold
"
                                >
                                    Go Live
                                </button>

                                <button
                                    onClick={() => router.post(
                                        '/creator/stream/end',
                                        {},
                                        {
                                            onSuccess: () => {

                                                setStatus('ended');

                                            },
                                        }
                                    )}
                                    className="
    w-full
    sm:w-auto
    bg-gray-900
    text-white
    px-6
    py-3
    rounded-2xl
    font-bold
"
                                >
                                    End Stream
                                </button>

                                <div className="flex flex-wrap gap-4 mt-4">

                                    <button
                                        onClick={() =>
                                            router.post('/creator/stream/ingest/start')
                                        }
                                        className="
    w-full
    sm:w-auto
    bg-green-600
    text-white
    px-6
    py-3
    rounded-2xl
    font-bold
"
                                    >
                                        Connect OBS
                                    </button>

                                    <button
                                        onClick={() =>
                                            router.post('/creator/stream/ingest/stop')
                                        }
                                        className="
    w-full
    sm:w-auto
    bg-gray-700
    text-white
    px-6
    py-3
    rounded-2xl
    font-bold
"
                                    >
                                        Disconnect OBS
                                    </button>

                                </div>

                                <div className="mt-6 space-y-2">

                                    <p className="text-sm text-gray-500">
                                        Encoder Status
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <div
                                            className={`
                w-3
                h-3
                rounded-full
                ${stream.is_ingesting
                                                    ? 'bg-green-500'
                                                    : 'bg-gray-400'
                                                }
            `}
                                        />

                                        <p className="font-semibold">

                                            {stream.is_ingesting
                                                ? 'OBS Connected'
                                                : 'OBS Offline'}

                                        </p>

                                    </div>

                                </div>

                                <div className="mt-4">

                                    <p className="text-sm text-gray-500">
                                        Playback Session ID
                                    </p>

                                    <div
                                        className="
            bg-black
            text-green-400
            rounded-2xl
            px-4
            py-3
            mt-2
            font-mono
            text-sm
        "
                                    >

                                        {stream.playback_id || 'No active playback session'}

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div
                            className={`
        px-5
        py-2
        rounded-full
        text-sm
        font-bold
        ${status === 'live'
                                    ? 'bg-red-500 text-white'
                                    : status === 'ended'
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-200 text-black'
                                }
    `}
                        >

                            {status?.toUpperCase()}

                        </div>

                    </div>

                </div>

                {/* Stream Key */}

                <div className="space-y-6">

                    <div>

                        <p className="text-sm text-gray-500 mb-2">
                            RTMP Server URL
                        </p>

                        <div
                            className="
                bg-black
                text-green-400
                p-4
                rounded-2xl
                font-mono
                break-all
            "
                        >

                            rtmp://streamerflow.live/app

                        </div>

                    </div>

                    <div>

                        <p className="text-sm text-gray-500 mb-2">
                            Stream Key
                        </p>

                        <div
                            className="
                bg-black
                text-green-400
                p-4
                rounded-2xl
                font-mono
                break-all
            "
                        >

                            {stream.stream_key}

                        </div>

                    </div>

                    <button
                        onClick={copyStreamKey}
                        className="
            bg-black
            text-white
            px-5
            py-3
            rounded-2xl
            font-bold
        "
                    >

                        Copy Stream Key

                    </button>

                </div>

                {/* Stream Information */}

                {/* Stream Settings */}


                {/* Broadcast Controls */}

                <div className="bg-white rounded-3xl p-8 shadow-sm border mt-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Broadcast Controls
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Stream Quality
                            </label>

                            <select
                                value={quality}
                                onChange={(e) =>
                                    setQuality(e.target.value)
                                }
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            >

                                <option>720p</option>
                                <option>1080p</option>
                                <option>1440p</option>
                                <option>4K</option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Stream Latency
                            </label>

                            <select
                                value={latency}
                                onChange={(e) =>
                                    setLatency(e.target.value)
                                }
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            >

                                <option>Low</option>
                                <option>Normal</option>
                                <option>Ultra Low</option>

                            </select>

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Bitrate
                            </label>

                            <select
                                value={bitrate}
                                onChange={(e) =>
                                    setBitrate(e.target.value)
                                }
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            >

                                <option>2500 kbps</option>
                                <option>4500 kbps</option>
                                <option>6000 kbps</option>
                                <option>9000 kbps</option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* Stream Settings */}

                <div className="bg-white rounded-3xl p-8 shadow-sm border mt-8">

                    <h2 className="text-2xl font-bold mb-6">
                        Stream Settings
                    </h2>

                    <form
                        className="space-y-6"
                        onSubmit={(e) => {

                            e.preventDefault();

                            saveStream();

                        }}
                    >

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Stream Title
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Category
                            </label>

                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                rows={4}
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2">
                                Stream Thumbnail
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {

                                    const file = e.target.files?.[0];

                                    if (file) {

                                        setThumbnail(file);

                                        setThumbnailPreview(
                                            URL.createObjectURL(file)
                                        );

                                    }

                                }}
                                className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                "
                            />

                        </div>

                        {stream.thumbnail && (

                            <div className="mt-4">

                                <img
                                    src={`/storage/${stream.thumbnail}`}
                                    alt="Stream Thumbnail"
                                    className="
                        rounded-2xl
                        w-full
                        h-56
                        object-cover
                    "
                                />

                            </div>

                        )}

                        <button
                            type="submit"
                            className="
                bg-black
                text-white
                px-6
                py-3
                rounded-2xl
                font-bold
            "
                        >

                            Save Stream Settings

                        </button>

                    </form>

                </div>
                {/* Stream Preview */}

                <div className="bg-white rounded-3xl p-8 shadow-sm border">

                    <h2 className="text-2xl font-bold mb-6">
                        Stream Preview
                    </h2>

                    <div className="rounded-3xl overflow-hidden border">

                        {/* Thumbnail */}

                        <div className="h-64 bg-gray-100">

                            {(stream.thumbnail || thumbnailPreview) ? (

                                <img
                                    src={
                                        thumbnailPreview
                                            ? thumbnailPreview
                                            : `/storage/${stream.thumbnail}`
                                    }
                                    className="
                        w-full
                        h-full
                        object-cover
                    "
                                />

                            ) : (

                                <div
                                    className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-400
                    "
                                >

                                    {status?.toUpperCase()}

                                </div>

                            )}

                        </div>

                        {/* Preview Details */}

                        <div className="p-6 space-y-3">

                            <div className="flex items-center gap-3">

                                <div
                                    className={`
    text-white
    text-xs
    font-bold
    px-3
    py-1
    rounded-full

    ${status === 'live'
                                            ? 'bg-red-500'
                                            : status === 'ended'
                                                ? 'bg-gray-900'
                                                : 'bg-gray-400'
                                        }
`}
                                >

                                    {status?.toUpperCase()}

                                </div>

                                <p className="text-sm text-gray-500">
                                    {stream.viewer_count} viewers
                                </p>

                            </div>

                            <h3 className="text-2xl font-bold">

                                {title || stream.title}

                            </h3>

                            <p className="text-gray-500">

                                {category || 'No category selected'}

                            </p>

                            <p className="text-gray-700 leading-relaxed">

                                {description || 'No description added yet.'}

                            </p>

                        </div>

                    </div>

                </div>


                {/* Stream Analytics */}

                <div className="grid md:grid-cols-4 gap-6 mt-8">

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                        <p className="text-sm text-gray-500 mb-2">
                            Total Viewers
                        </p>

                        <h3 className="text-3xl font-bold">
                            {stream.viewer_count}
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                        <p className="text-sm text-gray-500 mb-2">
                            Likes
                        </p>

                        <h3 className="text-3xl font-bold">
                            {likes}
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                        <p className="text-sm text-gray-500 mb-2">
                            Followers Gained
                        </p>

                        <h3 className="text-3xl font-bold">
                            +{followers}
                        </h3>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                        <p className="text-sm text-gray-500 mb-2">
                            Chat Rate
                        </p>

                        <h3 className="text-3xl font-bold">
                            {chatRate}/min
                        </h3>

                    </div>


                    <div className="bg-white rounded-3xl p-6 shadow-sm border">

                        <p className="text-sm text-gray-500 mb-2">
                            Stream Health
                        </p>

                        <h3
                            className={`
                text-2xl
                font-bold

                ${streamHealth === 'Excellent'
                                    ? 'text-green-500'
                                    : 'text-yellow-500'
                                }
            `}
                        >
                            {streamHealth}
                        </h3>

                    </div>

                </div>

            </div>

        </AppLayout>
    );
}