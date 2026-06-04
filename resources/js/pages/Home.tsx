import AppLayout from '@/layouts/AppLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import VideoCard from '@/components/ui/VideoCard';

interface Props {
    videos: any[];

    liveStreams: any[];
}

export default function Home({
    videos,
    liveStreams,
}: Props) {

    return (
        <AppLayout>

            <div className="space-y-14">

                {/* Hero Section */}

                <section className="bg-gradient-to-r from-black to-gray-800 text-white rounded-3xl p-10">

                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to StreamerFlow
                    </h1>

                    <p className="text-lg text-gray-300 max-w-2xl">
                        Discover creators, trending streams,
                        and engaging video content from around the world.
                    </p>

                </section>

                <section>
                    {/* Live Streams */}

                    <section>

                        <SectionTitle
                            title="🔴 Live Now"
                            subtitle="Creators currently streaming"
                        />

                        {liveStreams.length === 0 ? (

                            <div className="text-gray-500">
                                No live streams right now.
                            </div>

                        ) : (

                            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-8
        ">

                                {liveStreams.map((stream) => (

                                    <a
                                        key={stream.id}
                                        href={`/streams/${stream.slug}`}
                                        className="
                        bg-white
                        rounded-2xl
                        overflow-hidden
                        shadow
                        hover:shadow-xl
                        transition
                    "
                                    >

                                        <div className="relative">

                                            <img
                                                src={
                                                    stream.thumbnail
                                                        ? `/storage/${stream.thumbnail}`
                                                        : 'https://placehold.co/800x450'
                                                }
                                                className="
                                w-full
                                h-56
                                object-cover
                            "
                                            />

                                            <div
                                                className="
                                absolute
                                top-4
                                left-4
                                bg-red-600  
                                text-white
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-bold
                            "
                                            >

                                                🔴 LIVE

                                            </div>

                                        </div>

                                        <div className="p-4">

                                            <h2 className="font-bold text-xl">

                                                {stream.title}

                                            </h2>

                                            <p className="text-gray-500 mt-2">

                                                @{stream.user.username}

                                            </p>

                                            <div className="text-sm text-gray-500 mt-2">
                                                👁 {stream.viewers_count} watching
                                            </div>

                                        </div>

                                    </a>


                                ))}

                            </div>

                        )}

                    </section>

                </section>

                {/* Latest Videos */}

                <section>

                    <SectionTitle
                        title="Latest Videos"
                        subtitle="Fresh uploads from creators"
                    />

                    {videos.length === 0 ? (

                        <div className="text-gray-500">
                            No videos uploaded yet.
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                            {videos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                />
                            ))}

                        </div>

                    )}

                </section>

            </div>

        </AppLayout>
    );
}