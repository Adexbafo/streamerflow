import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';

interface Video {
    id: number;
    title: string;
    slug: string;
    video_path: string;
    views_count: number;
    likes_count: number;

    user?: {
        name: string;
    };

    category?: {
        name: string;
    };
}

interface Props {
    videos: {
        data: Video[];
    };
}

export default function Index({ videos }: Props) {

    return (
    <AppLayout>
        <div className="max-w-7xl mx-auto p-6">

            <h1 className="text-4xl font-bold mb-10">
                🔥 Trending Videos
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {videos.data.map((video) => (

                    <Link
                        key={video.id}
                        href={`/videos/${video.slug}`}
                    >

                        <div className="border rounded-lg overflow-hidden hover:shadow-xl transition">

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

                                <p className="text-sm text-gray-500">
                                    {video.user?.name}
                                </p>

                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">

                                    <span>
                                        👁 {video.views_count}
                                    </span>

                                    <span>
                                        ❤️ {video.likes_count}
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