export default function Index({ videos }) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
                My Videos
            </h1>

            {videos.length === 0 ? (
                <p>No videos uploaded yet.</p>
            ) : (
                videos.map((video) => (
                    <div
                        key={video.id}
                        className="border p-4 mb-4 rounded"
                    >
                        <h2 className="font-bold">
                            {video.title}
                        </h2>

                        <p>
                            {video.processing_status}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
}