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

                {/* Action Buttons */}

                <div className="mt-4 flex gap-3 flex-wrap">

                    {/* Like Button */}

                    <form
                        method="POST"
                        action={`/videos/${video.id}/like`}
                    >

                        <button
                            type="submit"
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            ❤️ {video.likes?.length || 0} Likes
                        </button>

                    </form>

                    {/* Save Button */}

                    <form
                        method="POST"
                        action={`/videos/${video.id}/save`}
                    >

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            💾 Save Video
                        </button>

                    </form>

                    {/* Clip Button */}

                    <form
                        method="POST"
                        action="/clips/create"
                    >

                        <input
                            type="hidden"
                            name="video_id"
                            value={video.id}
                        />

                        <input
                            type="hidden"
                            name="start_time"
                            value="0"
                        />

                        <input
                            type="hidden"
                            name="duration"
                            value="15"
                        />

                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            🎬 Clip Video
                        </button>

                    </form>

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

            {/* Comments */}

            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-6">
                    Comments
                </h2>

                {/* Comment Form */}

                <form
                    method="POST"
                    action={`/videos/${video.id}/comments`}
                    className="mb-8"
                >

                    <textarea
                        name="body"
                        placeholder="Write a comment..."
                        className="border p-3 w-full rounded-lg"
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="bg-black text-white px-5 py-2 rounded mt-3"
                    >
                        Post Comment
                    </button>

                </form>

                {/* Comment List */}

                <div className="space-y-6">

                    {video.comments?.map((comment) => (

                        <div
                            key={comment.id}
                            className="border-b pb-4"
                        >

                            <h3 className="font-bold">
                                {comment.user?.name}
                            </h3>

                            <p className="text-gray-600 text-sm mb-2">
                                @{comment.user?.username}
                            </p>

                            <p>
                                {comment.body}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}