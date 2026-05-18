import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Video {
    id: number;
    title: string;
    slug: string;
    video_path: string;
    views_count: number;
    category?: {
        name: string;
    };
}

interface Props {
    creator: {
        name: string;
        username: string;
        region: string;
    };

    videos: {
        data: Video[];
    };
}

export default function Show({
    creator,
    videos,
}: Props) {

    return (
    <AppLayout>
        <div className="max-w-7xl mx-auto p-6">

            {/* Creator Header */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    {creator.name}
                </h1>

                <p className="text-gray-500 mt-2">
                    @{creator.username}
                </p>

                <p className="text-sm text-gray-400 mt-1">
                    {creator.region}
                </p>

                <div className="mt-4 flex items-center gap-4">

    <span className="text-sm text-gray-500">
        {creator.followers_count} followers
    </span>

    <form
        method="POST"
        action={`/channels/${creator.id}/follow`}
    >

        <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
        >
            Follow
        </button>

    </form>

</div>

            </div>

            {/* Creator Videos */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {videos.data.map((video) => (

                    <Link
                        key={video.id}
                        href={`/videos/${video.slug}`}
                    >

                        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">

                            <video
                                className="w-full h-64 object-cover"
                                muted
                            >
                                <source
                                    src={`/storage/${video.video_path}`}
                                    type="video/mp4"
                                />
                            </video>

                            <div className="p-4">

                                <h2 className="font-bold text-lg mb-2">
                                    {video.title}
                                </h2>

                                <div className="flex items-center gap-3 text-sm text-gray-400">

                                    <span>
                                        {video.views_count} views
                                    </span>

                                    <span>
                                        {video.category?.name}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </Link>

                ))}

            </div>

        </div>
        </AppLayout>
);
}