export default function Show({ video }) {

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* Video Player */}

            <div className="mb-6">

                <video
                    controls
                    className="w-full rounded-lg"
                >
                    <source
                        src={`/storage/${video.video_path}`}
                        type="video/mp4"
                    />

                    Your browser does not support video playback.

                </video>

            </div>

            {/* Video Metadata */}

            <div className="mb-6">

                <h1 className="text-3xl font-bold mb-2">
                    {video.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-gray-500">

                    <span>
                        {video.views_count} views
                    </span>

                    <span>
                        {video.category?.name}
                    </span>

                </div>

            </div>

            {/* Creator Information */}

            <div className="border-t pt-6">

                <h2 className="font-bold text-lg">
                    {video.user.name}
                </h2>

                <p className="text-gray-500">
                    {video.region}
                </p>

            </div>

            {/* Description */}

            <div className="mt-6">

                <p>
                    {video.description}
                </p>

            </div>

        </div>
    );
}