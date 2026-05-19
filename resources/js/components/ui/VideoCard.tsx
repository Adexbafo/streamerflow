import { Link } from '@inertiajs/react';

interface Props {
    video: {
        title: string;
        slug: string;
        thumbnail_path?: string;
        views_count?: number;

        user: {
            name: string;
        };
    };
}

export default function VideoCard({
    video,
}: Props) {

    return (
        <Link
            href={`/videos/${video.slug}`}
            className="
            group
            block
            transition
            duration-300
            hover:-translate-y-1
"
        >

            <div className="
    aspect-video
    bg-gray-200
    rounded-2xl
    overflow-hidden
    mb-4
    shadow-sm
    group-hover:shadow-2xl
    transition
    duration-300
">

                {video.thumbnail_path ? (
                    <img
                        src={`/storage/${video.thumbnail_path}`}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Thumbnail
                    </div>
                )}

            </div>

            <h2 className="
    font-semibold
    text-lg
    line-clamp-2
    group-hover:text-black
">
                {video.title}
            </h2>

            <p className="text-gray-400 text-xs mt-1">
    {video.views_count ?? 0} views
            </p>

        </Link>
    );
}