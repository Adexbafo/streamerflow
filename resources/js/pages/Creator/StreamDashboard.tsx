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


    useEffect(() => {

    (window as any).Echo.channel('streams')
        .listen('.stream.status.updated', (event: any) => {

            console.log('Realtime Stream Update:', event);

        });

    return () => {

        (window as any).Echo.leave('streams');

    };
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

                            <div className="flex gap-4 mb-8">

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

</div>

                        </div>


                        <div
    className={`
        px-5
        py-2
        rounded-full
        text-sm
        font-bold
        ${
            status === 'live'
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

                <div className="bg-white rounded-3xl p-8 shadow-sm border mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Stream Key
                    </h2>

                    <div className="bg-black text-green-400 p-4 rounded-2xl font-mono break-all">

                        {stream.stream_key}

                    </div>

                </div>

                {/* Stream Information */}

                {/* Stream Settings */}

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

    ${
        status === 'live'
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

            </div>

        </AppLayout>
    );
}