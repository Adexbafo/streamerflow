import AppLayout from '@/layouts/AppLayout';
import { router } from '@inertiajs/react';

interface Props {
    stream: any;
}

export default function StreamDashboard({
    stream,
}: Props) {

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
                                {stream.status}
                            </h2>

                            <div className="flex gap-4 mb-8">

    <button
        onClick={() => router.post('/creator/stream/start')}
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
        onClick={() => router.post('/creator/stream/end')}
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
            stream.status === 'live'
                ? 'bg-red-500 text-white'
                : stream.status === 'ended'
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-black'
        }
    `}
>

                            {stream.status.toUpperCase()}

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

                <div className="bg-white rounded-3xl p-8 shadow-sm border">

                    <h2 className="text-2xl font-bold mb-6">
                        Stream Information
                    </h2>

                    <div className="space-y-4">

                        <div>

                            <p className="text-sm text-gray-500">
                                Title
                            </p>

                            <p className="font-semibold">
                                {stream.title}
                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Viewers
                            </p>

                            <p className="font-semibold">
                                {stream.viewer_count}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </AppLayout>
    );
}