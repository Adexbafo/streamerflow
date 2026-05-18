import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Video {
    id: number;
    title: string;
    slug: string;
    video_path: string;

    user?: {
        name: string;
    };
}

interface Creator {
    id: number;
    name: string;
    username: string;
}

interface Props {
    query: string;

    videos: {
        data: Video[];
    };

    creators: Creator[];
}

export default function Index({
    query,
    videos,
    creators,
}: Props) {

    return (
    <AppLayout>
        <div className="max-w-7xl mx-auto p-6">

            {/* Search Form */}

            <form
                method="GET"
                action="/search"
                className="mb-10"
            >

                <input
                    type="text"
                    name="q"
                    defaultValue={query}
                    placeholder="Search videos or creators..."
                    className="border p-3 rounded-lg w-full"
                />

            </form>

            {/* Creators */}

            {creators.length > 0 && (

                <div className="mb-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Creators
                    </h2>

                    <div className="space-y-3">

                        {creators.map((creator) => (

                            <Link
                                key={creator.id}
                                href={`/channels/${creator.username}`}
                                className="block border rounded-lg p-4 hover:bg-gray-50"
                            >

                                <h3 className="font-bold">
                                    {creator.name}
                                </h3>

                                <p className="text-gray-500">
                                    @{creator.username}
                                </p>

                            </Link>

                        ))}

                    </div>

                </div>

            )}

            {/* Videos */}

            <div>

                <h2 className="text-2xl font-bold mb-6">
                    Videos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {videos.data.map((video) => (

                        <Link
                            key={video.id}
                            href={`/videos/${video.slug}`}
                        >

                            <div className="border rounded-lg overflow-hidden">

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

                                    <h3 className="font-bold">
                                        {video.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-2">
                                        {video.user?.name}
                                    </p>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </div>
        </AppLayout>
);
}