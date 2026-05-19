import AppLayout from '@/layouts/AppLayout';
import SectionTitle from '@/components/ui/SectionTitle';
import VideoCard from '@/components/ui/VideoCard';

interface Props {
    videos: any[];
}

export default function Home({
    videos,
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